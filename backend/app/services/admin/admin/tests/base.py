from flask_testing import TestCase

from admin import create_app, db


class BaseTestCase(TestCase):
    """Base test class required by the flask_testing package.
    """
    def create_app(self):
        app = create_app()
        app.config.from_object('admin.config.TestingConfig')
        return app
    
    def setUp(self):
        db.create_all()
        db.session.commit()
    
    def tearDown(self):
        db.session.remove()
        db.drop_all()
