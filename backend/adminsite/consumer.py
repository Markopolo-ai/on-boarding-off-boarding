
import pika

params = pika.URLParameters(
    "amqps://jskrsdpc:Vv1dDx6RaCDJIU7KyF4qVtBAHqD6HQ8X@toad.rmq.cloudamqp.com/jskrsdpc")

connection = pika.BlockingConnection(params)
channel = connection.channel()
channel.queue_declare(queue='admin')


def callback(ch, method, properties, body):
    print('Receieved in Admin')
    print(body)


channel.basic_consume(queue='admin', on_message_callback=callback)
print("Started Consuming....")
channel.start_consuming()
channel.close()
