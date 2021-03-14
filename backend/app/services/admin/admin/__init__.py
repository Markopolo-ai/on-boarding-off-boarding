import os

from flask import Flask
from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager


db = SQLAlchemy()
bcrypt = Bcrypt()
login_manager = LoginManager()


def create_app(script_info=None):
    app = Flask(__name__)
    app_settings = os.getenv('APP_SETTINGS')
    app.config.from_object(app_settings)

    db.init_app(app)
    bcrypt.init_app(app)
    login_manager.init_app(app)

    from admin.api.admins import admins_blueprint
    from admin.api.staffs import staffs_blueprint
    from admin.api.github import github_blueprint
    app.register_blueprint(admins_blueprint)
    app.register_blueprint(staffs_blueprint)
    app.register_blueprint(github_blueprint)

    app.shell_context_processor({
        'app': app,
        'db': db
    })

    return app