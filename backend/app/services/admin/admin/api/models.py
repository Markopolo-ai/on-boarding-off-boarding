from flask_login import UserMixin

from admin import db


class Admin(db.Model, UserMixin):
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
