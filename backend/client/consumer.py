# amqps: // jskrsdpc: Vv1dDx6RaCDJIU7KyF4qVtBAHqD6HQ8X@toad.rmq.cloudamqp.com/jskrsdpc
import json
import pika
from main import Product, db


params = pika.URLParameters(
    "amqps://jskrsdpc:Vv1dDx6RaCDJIU7KyF4qVtBAHqD6HQ8X@toad.rmq.cloudamqp.com/jskrsdpc")

connection = pika.BlockingConnection(params)
channel = connection.channel()
channel.queue_declare(queue='client')


def callback(ch, method, properties, body):
    print('Receieved in client')
    data = json.loads(body)
    if properties.content_type == "product_created":
        product = Product(id=data['id'], title=data['title'], image=data['image'],
                          price=data['price'], discounted_price=data['discounted_price'])
        db.session.add(product)
        db.session.commit()
    elif properties.content_type == "product_updated":
        product = Product.query.get(data['id'])
        product.title = data['title']
        product.image = data['image']
        product.price = data['price']
        product.discounted_price = data['discounted_price']
        db.session.commit()
    elif properties.content_type == "product_deleted":
        product = Product.query.get(data)
        db.session.delete(product)
        db.session.commit()


channel.basic_consume(
    queue='client', on_message_callback=callback, auto_ack=True)
print("Started Consuming....")
channel.start_consuming()
channel.close()
