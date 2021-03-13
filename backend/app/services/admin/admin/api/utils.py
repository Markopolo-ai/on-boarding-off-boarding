import functools

from flask import jsonify
from flask_login import current_user


def require_login(func):
    """A decorator function to check whether the current user is
    logged in.
    """
    @functools.wraps(func)
    def check_login(*args, **kwargs):
        if current_user.is_authenticated:
            return func(*args, **kwargs)
        else:
            return jsonify({
                'status': 'fail',
                'message': 'User is not authenticated'
            }), 401
    return check_login


def require_superadmin_permission(func):
    """A decorator function to check whether the current user is
    a superadmin.
    """
    @functools.wraps(func)
    def check_superadmin_capability(*args, **kwargs):
        if current_user.is_superadmin:
            return func(*args, **kwargs)
        else:
            return jsonify({
                'status': 'fail',
                'message': 'requires superadmin capability'
            }), 401
    return check_superadmin_capability
