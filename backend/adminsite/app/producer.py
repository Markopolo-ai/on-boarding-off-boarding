# amqps: // jskrsdpc: Vv1dDx6RaCDJIU7KyF4qVtBAHqD6HQ8X@toad.rmq.cloudamqp.com/jskrsdpc
import pika
import json
from decimal import Decimal


class DecimalEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, Decimal):
            return {
                "_type": "decimal",
                "value": str(obj)
            }
        return super(DecimalEncoder, self).default(obj)


params = pika.URLParameters(
    "amqps://jskrsdpc:Vv1dDx6RaCDJIU7KyF4qVtBAHqD6HQ8X@toad.rmq.cloudamqp.com/jskrsdpc")

connection = pika.BlockingConnection(params)
channel = connection.channel()


def publish(method, body):
    properties = pika.BasicProperties(method)
    channel.basic_publish(exchange="", routing_key='client',
                          body=json.dumps(body, cls=DecimalEncoder), properties=properties)
