import datetime

from flask import Blueprint, jsonify, request
from flask_login import current_user
from sqlalchemy import exc

from admin import db
from admin.api.models import Admin, Staff, GithubAccessHistory
from admin.api.utils import require_login, require_superadmin_permission


github_blueprint = Blueprint('github', __name__)


@github_blueprint.route('/github', methods=['GET'])
@require_login
def get_histories():
    histories = GithubAccessHistory.query.all()
    response = {
        'status': 'success',
        'data': [
            {
                'id': history.id,
                'action': history.action,
                'datetime': history.datetime,
                'action_by': history.action_by.email,
                'action_on': history.action_on.email
            } for history in histories
        ]
    }
    return jsonify(response), 200


@github_blueprint.route('/github/<history_id>', methods=['GET'])
@require_login
def get_history(history_id):
    response = {
        'status': 'fail',
        'message': 'History does not exist'
    }

    history = GithubAccessHistory.query.filter_by(id=history_id).first()
    if not history:
        return jsonify(response), 404
    else:
        response = {
            'status': 'success',
            'data': {
                'id': history.id,
                'action': history.action,
                'datetime': history.datetime,
                'action_by': history.action_by.email,
                'action_on': history.action_on.email
            }
        }
        return jsonify(response), 200



@github_blueprint.route('/github/<history_id>', methods=['DELETE'])
@require_login
@require_superadmin_permission
def delete_history(history_id):
    response = {
        'status': 'fail',
        'message': 'History does not exist'
    }

    history = GithubAccessHistory.query.filter_by(id=history_id).first()
    if not history:
        return jsonify(response), 404
    else:
        try:
            db.session.delete(history)
            db.session.commit()
            response = {
                'status': 'success',
                'data': 'Successfully deleted history'
            }
            return jsonify(response), 200
        except exc.IntegrityError:
            db.session.rollback()
            response['message'] = 'Sorry! We messed up something'
            return jsonify(response), 500


@github_blueprint.route('/github', methods=['POST'])
@require_login
def push_history():
    response = {
        'status': 'fail',
        'message': 'Invalid payload'
    }
    
    data = request.get_json()
    if not data:
        return jsonify(response), 400
    
    action = data['action']
    admin_id = data['admin_id']
    staff_id = data['staff_id']

    admin = Admin.query.filter_by(id=admin_id).first()
    if not admin:
        response['message'] = 'Admin does not exist'
        return jsonify(response), 404

    staff = Staff.query.filter_by(id=staff_id).first()
    if not staff:
        response['message'] = 'Staff does not exist'
        return jsonify(response), 404
    
    try:
        history = GithubAccessHistory(
            action,
            datetime.datetime.now(),
            admin,
            staff            
        )
        db.session.add(history)
        db.session.commit()

        response['status'] = 'success'
        response['message'] = 'History was pushed successfully'
        return jsonify(response), 201
    except exc.IntegrityError as e:
        db.session.rollback()
        response['message'] = 'Sorry! We messed up something'
        return jsonify(response), 500


@github_blueprint.route('/github/admin/<admin_id>')
@require_login
def get_histories_by_admin(admin_id):
    response = {
        'status': 'fail',
        'message': 'Admin does not exist'
    }
    
    admin = Admin.query.filter_by(id=admin_id).first()
    if not admin:
        return jsonify(response), 404

    histories = GithubAccessHistory.query.filter_by(action_by=admin).all()
    if not histories:
        response['message'] = 'Histories do not exist'
        return jsonify(response), 404
    else:
        response = {
            'status': 'success',
            'data': [
                {
                    'id': history.id,
                    'action': history.action,
                    'datetime': history.datetime,
                    'action_by': history.action_by.email,
                    'action_on': history.action_on.email
                } for history in histories
            ]
        }
        return jsonify(response), 200


@github_blueprint.route('/github/staff/<staff_id>')
@require_login
def get_histories_by_staff(staff_id):
    response = {
        'status': 'fail',
        'message': 'Staff does not exist'
    }
    
    staff = Staff.query.filter_by(id=staff_id).first()
    if not staff:
        return jsonify(response), 404

    histories = GithubAccessHistory.query.filter_by(action_on=staff).all()
    if not histories:
        response['message'] = 'Histories do not exist'
        return jsonify(response), 404
    else:
        response = {
            'status': 'success',
            'data': [
                {
                    'id': history.id,
                    'action': history.action,
                    'datetime': history.datetime,
                    'action_by': history.action_by.email,
                    'action_on': history.action_on.email
                } for history in histories
            ]
        }
        return jsonify(response), 200
