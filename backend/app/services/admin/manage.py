import unittest

from flask_script import Manager

from admin import create_app, db, bcrypt

app = create_app()
manager = Manager(app)

@manager.command
def recreate_db():
    db.drop_all()
    db.create_all()
    db.session.commit()


@manager.command
def create_superadmin():
    from admin.api.models import Admin
    superadmin = Admin('superadmin', bcrypt.generate_password_hash('superadmin').decode('utf-8'), True)
    db.session.add(superadmin)
    db.session.commit()


@manager.command
def test():
    tests = unittest.TestLoader().discover('admin/tests', pattern='test*.py')
    result = unittest.TextTestRunner(verbosity=2).run(tests)
    if result.wasSuccessful():
        return 0
    return 1


if __name__ == '__main__':
    manager.run()
