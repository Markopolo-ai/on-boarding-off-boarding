import decimal
from flask import Flask, jsonify, abort
from dataclasses import dataclass
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import UniqueConstraint
from decimal import Decimal


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:root@db/main'
CORS(app)

db = SQLAlchemy(app)


@dataclass
class Product(db.Model):
    id: int
    title: str
    image: str
    price: Decimal
    discounted_price: Decimal
    id = db.Column(db.Integer, primary_key=True, autoincrement=False)
    title = db.Column(db.String(200))
    image = db.Column(db.String(200))
    price = db.Column(db.Numeric(10, 2))
    discounted_price = db.Column(db.Numeric(10, 2))



@app.route('/api/products')
def getAllProduct():
    return jsonify(Product.query.all())


if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0')
