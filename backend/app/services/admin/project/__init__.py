import os

from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app_settings = os.getenv('APP_SETTINGS')
app.config.from_object(app_settings)

db = SQLAlchemy(app)

class Admin(db.Model):
    __tablename__ = 'admins'
    userid = db.Column(db.Integer, primary_key=True, autoincrement=True)
    email = db.Column(db.String(128), nullable=False)
    password = db.Column(db.String(128), nullable=False)

    def __init__(self, email, password):
        self.email = email
        self.password = password


@app.route('/admin/ping', methods=['GET'])
def ping():
    return jsonify({
        'status': 'success',
        'message': 'ping pong!'
    })
