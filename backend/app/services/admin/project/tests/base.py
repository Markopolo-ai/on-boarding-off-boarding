from flask_testing import TestCase

from project import app, db


class BaseTestCase(TestCase):
    def create_app(self):
        app.config.from_object('project.config.TestingConfig')
        return app
    
    def set_up_db(self):
        db.create_all()
        db.session.commit()
    
    def delete_db(self):
        db.session.remove()
        db.drop_all()
