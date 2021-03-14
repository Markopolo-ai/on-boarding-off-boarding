import datetime

from flask_testing import TestCase


from admin import create_app, db
from admin.api.models import (
    Admin,
    Staff,
    GithubAccessHistory
)


class TestModels(TestCase):
    """Test class for API models.
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

    def test_admin(self):
        admin1 = Admin('musabbirhasansammak@gmail.com', 'somestupidpassword', True)
        admin2 = Admin('sammakmusabbirhasan@gmail.com', 'anotherstupidpassword', False)

        self.assertTrue(admin1.id is None)
        self.assertTrue(admin2.id is None)
        self.assertFalse(admin2.is_superadmin)
        self.assertTrue(admin1.is_superadmin)
        self.assertTrue(admin1.email == 'musabbirhasansammak@gmail.com')
        self.assertFalse(admin2.email == 'musabbirhasansammak@gmail.com')
        self.assertTrue(len(admin2.added_staffs) == 0)
        self.assertTrue(len(admin1.added_staffs) == 0)
        self.assertTrue(len(admin1.github_actions) == 0)
        self.assertTrue(len(admin2.github_actions) == 0)
    
    def test_staff(self):
        admin1 = Admin('musabbirhasansammak@gmail.com', 'somestupidpassword', True)
        admin2 = Admin('sammakmusabbirhasan@gmail.com', 'anotherstupidpassword', False)

        staff1 = Staff('staff1@something.com', admin1, 'pending')
        staff2 = Staff('staff2@someotherthing.com', admin2)

        self.assertTrue(staff1.added_by is admin1)
        self.assertTrue(staff2.added_by is admin2)
        self.assertIn(staff1, admin1.added_staffs)
        self.assertIn(staff2, admin2.added_staffs)
        self.assertFalse(staff1.github_status == 'granted')
        self.assertTrue(staff2.github_status == 'uninvited')
    
    def test_github_access_history(self):
        admin1 = Admin('musabbirhasansammak@gmail.com', 'somestupidpassword', True)
        admin2 = Admin('sammakmusabbirhasan@gmail.com', 'anotherstupidpassword', False)

        staff1 = Staff('staff1@something.com', admin1, 'pending')
        staff2 = Staff('staff2@someotherthing.com', admin2)

        history1 = GithubAccessHistory('Invoked permission', datetime.datetime.now(), admin1, staff1)
        history2 = GithubAccessHistory('Invoked permission', datetime.datetime.now(), admin1, staff2)
        history3 = GithubAccessHistory('Revoked permission', datetime.datetime.now(), admin2, staff1)
        history4 = GithubAccessHistory('Revoked permission', datetime.datetime.now(), admin1, staff1)

        self.assertTrue(len(staff1.github_actions) > 0)
        self.assertTrue(len(staff2.github_actions) > 0)
        self.assertTrue(len(admin1.github_actions) > 0)
        self.assertTrue(len(admin2.github_actions) > 0)


if __name__ == '__main__':
    unittest.main()
