from flask_login import UserMixin

from admin import db


class Admin(db.Model, UserMixin):
    """Admin model for the admins.

    The admin model is extended by the UserMixin model supplied by the
    Flask-Login package. The UserMixin model contains several commonly
    used fields like is_authenticated, is_annonymous, and others which
    are commonly needed for authenticating a user.

    The application requires atleast one superadmin throughout its life-
    cycle as only they can create or remove other admins. Default value
    of is_superadmin is false.

    An Admin is related to two other models so far. First one is to a
    Staff through one-to-many relationship. An Admin can create many
    staffs. Another is to the GithubAccessHistory, also through a one-
    to-many relationship. An Admin can invoke or revoke permissions of
    many Staffs many times.

    Any history of invoking or revoking github permissions on any staff
    by the Admin can be accessed through github_actions field.
    """
    __tablename__ = 'admins'
    
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(128), nullable=False, unique=True)
    password = db.Column(db.String(128), nullable=False)
    is_superadmin = db.Column(db.Boolean(), default=True, nullable=False)

    added_staffs = db.relationship('Staff', backref='added_by')
    github_actions = db.relationship('GithubAccessHistory', backref='action_by')

    def __init__(self, email, password, is_super=False):
        self.email = email
        self.password = password
        self.is_superadmin = is_super

    def to_json(self):
        return {
            'id': self.id,
            'email': self.email,
            'password': self.password,
            'is_superadmin': self.is_superadmin
        }


class Staff(db.Model):
    """Staff model for the staffs.

    Staff is a simple model for the staffs, where each staff is
    identified by his email. It contains a github_status field
    which contains the current access status of the staff to the
    organization's github repositories. This field can contain 
    one of the following values:
        1. 'uninvited': the staff has not been invited yet
        2. 'pending': the staff is invited but not accepted invitation
        3. 'granted': the staff has access to the github repos
    
    This model is backreferenced by an Admin who created the Staff.
    During initialization, it is required to pass the Admin through
    added_by parameter.

    Any history of invoked or revoked permissions on this Staff can be
    accessed through github_actions field.
    """
    __tablename__ = 'staffs'
    
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(128), nullable=False, unique=True)
    github_status = db.Column(db.String(128), nullable=False)


    admin_id = db.Column(db.Integer, db.ForeignKey('admins.id'))
    github_actions = db.relationship('GithubAccessHistory', backref='action_on')

    def __init__(self, email, added_by, github_status='None'):
        self.email = email
        self.github_status = github_status
        self.added_by = added_by
    
    def to_json(self):
        return {
            'id': self.id,
            'email': self.email,
            'github_status': self.github_status,
            'added_by': self.added_by.email
        }


class GithubAccessHistory(db.Model):
    """History of Github access permission by Admins on Staffs.

    Contains all the detailed invoked or revoked histories of 
    github permission on staffs.

    This model is backreferenced by Admin through action_by field,
    and Staff through action_on field. Therefore, the Admin and the
    Staff related to a particular history should be supplied to the
    initializer through the respected arguments.

    admin_id and staff_id will then automatically contain the ids of
    respective models related to the particular history.
    """
    __tablename__ = 'githubaccesshistory'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    action = db.Column(db.String(128), nullable=False)
    datetime = db.Column(db.DateTime, nullable=False)

    admin_id = db.Column(db.Integer, db.ForeignKey('admins.id'))
    staff_id = db.Column(db.Integer, db.ForeignKey('staffs.id'))

    def __init__(self, action, datetime, action_by, action_on):
        self.action = action
        self.datetime = datetime
        self.action_by = action_by
        self.action_on = action_on
