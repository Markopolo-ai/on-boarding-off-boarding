from flask import Blueprint, jsonify, request
from flask_login import login_user, logout_user, current_user
from sqlalchemy import exc

from admin import db, bcrypt, login_manager
from admin.api.models import Admin, Staff
from admin.api.utils import require_superadmin_permission, require_login


admins_blueprint = Blueprint('admins', __name__)


@login_manager.user_loader
def load_user(user_id):
    """
    Utility function required by Flask_Login package to load admins
    from the database.
    """
    return Admin.query.filter_by(id=user_id).first()


@admins_blueprint.route('/admins/login', methods=['GET', 'POST'])
def login():
    if request.method == 'GET':
        response = {
            'status': 'success',
            'loggedIn': False
        }
        if not current_user.is_authenticated:
            return jsonify(response), 200
        else:
            response['loggedIn'] = True
            response['id'] = current_user.id
            return jsonify(response), 200
    
    elif request.method == 'POST':
        response = {
            'status': 'fail',
            'message': 'Already logged in'
        }
        if current_user.is_authenticated:
            return jsonify(response), 400

        data = request.get_json()
        if not data:
            response['message'] = 'Invalid payload'
            return jsonify(data), 400
        
        email = data['email']
        password = data['password']
        remember = data['remember']

        admin = Admin.query.filter_by(email=email).first()
        if not admin:
            response['message'] = 'Incorrect email'
            return jsonify(response), 400
        else:
            if not bcrypt.check_password_hash(admin.password, password):
                response['message'] = 'Incorrect password'
                return jsonify(response), 400
        
        login_user(admin, remember)

        return jsonify({
            'status': 'success',
            'message': 'Logged in successfully'
        })


@admins_blueprint.route('/admins/logout', methods=['POST'])
@require_login
def logout():
    logout_user()
    return jsonify({
        'status': 'success',
        'message': 'Successfully logged out'
    }), 200


@admins_blueprint.route('/admins/add', methods=['POST'])
@require_login
@require_superadmin_permission
def add_admin():
    response = {
        'status': 'fail',
        'message': 'Invalid payload'
    }
    
    data = request.get_json()
    if not data:
        return jsonify(response), 400
    
    email = data['email']
    password = data['password']
    is_superadmin = data['is_superadmin']
    
    try:
        admin = Admin.query.filter_by(email=email).first()
        if not admin:
            db.session.add(Admin(email,
                                 bcrypt.generate_password_hash(password).decode('utf-8'),
                                 is_superadmin))
            db.session.commit()

            response['status'] = 'success'
            response['message'] = f'{email} was added to the admin panel'
            return jsonify(response), 201
        else:
            response['message'] = 'Admin already exists with the given email'
            return jsonify(response), 400
    except exc.IntegrityError as e:
        db.session.rollback()
        response['message'] = 'Sorry! We messed up something'
        return jsonify(response), 500


@admins_blueprint.route('/admins/edit/<admin_id>', methods=['PUT'])
@require_login
@require_superadmin_permission
def edit_admin(admin_id):
    response = {
        'status': 'fail',
        'message': 'Invalid payload'
    }
    
    data = request.get_json()
    if not data:
        return jsonify(response), 400
    
    email = data['email']
    password = data['password']
    is_superadmin = data['is_superadmin']
    
    try:
        admin = Admin.query.filter_by(id=admin_id).first()
        if admin:
            if email is not admin.email:
                another_admin = Admin.query.filter_by(email=email).first()
                if another_admin:
                    response['message'] = 'Email already taken'
                    return jsonify(response), 400
                else:
                    admin.email = email
            
            admin.password = bcrypt.generate_password_hash(password).decode('utf-8')
            admin.is_superadmin = is_superadmin
            db.session.commit()

            response['status'] = 'success'
            response['message'] = f'{email} was updated'
            return jsonify(response), 201
        else:
            response['message'] = 'Admin does not exist'
            return jsonify(response), 404
    except exc.IntegrityError as e:
        db.session.rollback()
        response['message'] = 'Sorry! We messed up something'
        return jsonify(response), 500


@admins_blueprint.route('/admins/<admin_id>', methods=['GET'])
@require_login
def get_admin(admin_id):
    response = {
        'status': 'fail',
        'message': 'Admin does not exist'
    }

    admin = Admin.query.filter_by(id=admin_id).first()
    if not admin:
        return jsonify(response), 404
    else:
        response = {
            'status': 'success',
            'data': {
                'id': admin.id,
                'email': admin.email,
                'password': admin.password,
                'is_superadmin': admin.is_superadmin
            }
        }
        return jsonify(response), 200


@admins_blueprint.route('/admins/<admin_id>', methods=['DELETE'])
@require_login
@require_superadmin_permission
def delete_admin(admin_id):
    response = {
        'status': 'fail',
        'message': 'Admin does not exist'
    }

    admin = Admin.query.filter_by(id=admin_id).first()
    if not admin:
        return jsonify(response), 404
    else:
        try:
            db.session.delete(admin)
            db.session.commit()
            response = {
                'status': 'success',
                'data': 'Successfully deleted'
            }
            return jsonify(response), 200
        except exc.IntegrityError:
            db.session.rollback()
            response['message'] = 'Sorry! We messed up something'
            return jsonify(response), 500


@admins_blueprint.route('/admins', methods=['GET'])
@require_login
def get_admins():
    admins = Admin.query.all()
    response = {
        'status': 'success',
        'data': [
            {
                'id': admin.id,
                'email': admin.email,
                'is_superadmin': admin.is_superadmin
            } for admin in admins
        ]
    }
    return jsonify(response), 200
