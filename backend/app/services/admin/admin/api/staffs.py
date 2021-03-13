from flask import Blueprint, jsonify, request
from flask_login import current_user
from sqlalchemy import exc

from admin import db
from admin.api.models import Admin, Staff
from admin.api.utils import require_login


staffs_blueprint = Blueprint('staffs', __name__)

@staffs_blueprint.route('/staffs/add', methods=['POST'])
@require_login
def add_staff():
    response = {
        'status': 'fail',
        'message': 'Invalid payload'
    }
    
    data = request.get_json()
    if not data:
        return jsonify(response), 400
    
    email = data['email']
    github_status = data['github_status']
    
    try:
        staff = Staff.query.filter_by(email=email).first()
        if not staff:
            db.session.add(Staff(email, current_user, github_status))
            db.session.commit()

            response['status'] = 'success'
            response['message'] = f'{email} was added to the staff panel'
            return jsonify(response), 201
        else:
            response['message'] = 'Staff already exists with the given email'
            return jsonify(response), 400
    except exc.IntegrityError as e:
        db.session.rollback()
        response['message'] = 'Sorry! We messed up something'
        return jsonify(response), 500


@staffs_blueprint.route('/staffs/edit/<staff_id>', methods=['PUT'])
@require_login
def edit_staff(staff_id):
    response = {
        'status': 'fail',
        'message': 'Invalid payload'
    }
    
    data = request.get_json()
    if not data:
        return jsonify(response), 400
    
    email = data['email']
    github_status = data['github_status']

    try:
        staff = Staff.query.filter_by(id=staff_id).first()
        if staff:
            if email != staff.email:
                another_staff = Staff.query.filter_by(email=email).first()
                if another_staff:
                    response['message'] = 'Email is already taken'
                    return jsonify(response), 400
                else:
                    staff.email = email
            staff.github_status = github_status
            db.session.commit()

            response['status'] = 'success'
            response['message'] = f'{email} was updated'
            return jsonify(response), 200
        else:
            response['message'] = 'Staff is not found'
            return jsonify(response), 404
    except exc.IntegrityError as e:
        db.session.rollback()
        response['message'] = 'Sorry! We messed up something'
        return jsonify(response), 500


@staffs_blueprint.route('/staffs/<staff_id>', methods=['GET'])
@require_login
def get_staff(staff_id):
    response = {
        'status': 'fail',
        'message': 'Staff does not exist'
    }

    staff = Staff.query.filter_by(id=staff_id).first()
    if not staff:
        return jsonify(response), 404
    else:
        response = {
            'status': 'success',
            'data': {
                'id': staff.id,
                'email': staff.email,
                'github_status': staff.github_status
            }
        }
        return jsonify(response), 200


@staffs_blueprint.route('/staffs/<staff_id>', methods=['DELETE'])
@require_login
def delete_staff(staff_id):
    response = {
        'status': 'fail',
        'message': 'Staff does not exist'
    }

    staff = Staff.query.filter_by(id=staff_id).first()
    if not staff:
        return jsonify(response), 404
    else:
        try:
            db.session.delete(staff)
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


@staffs_blueprint.route('/staffs', methods=['GET'])
@require_login
def get_staffs():
    staffs = Staff.query.all()
    response = {
        'status': 'success',
        'data': [
            {
                'id': staff.id,
                'email': staff.email,
                'github_status': staff.github_status
            } for staff in staffs
        ]
    }
    return jsonify(response), 200
