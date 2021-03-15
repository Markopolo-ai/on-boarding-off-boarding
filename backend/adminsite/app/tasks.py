from __future__ import absolute_import, unicode_literals
from celery import shared_task
from .models import Product
import requests
import random
import json
from .producer import publish
from django.core import serializers


@shared_task
def populate_Product():

    data = requests.get(
        'https://api.evaly.com.bd/go-catalog/api/v1/public/products?page=' +
        str(random.randint(1, 100))+'&limit=10')
    clean_json = json.loads(data.text)
    raw_data = clean_json["data"]
    for data in raw_data:
        product = Product()
        product.title = data['name']
        product.image = data['image_urls'][0]
        product.price = data['max_price']
        product.discounted_price = data['min_discounted_price']
        product.save()
        serialized_obj = serializers.serialize('json', [product, ])
        serialized_obj = json.loads(serialized_obj)

        resdata = {
            "id": serialized_obj[0]['pk'],
            "title": serialized_obj[0]['fields']['title'],
            "image": serialized_obj[0]['fields']['image'],
            "price": serialized_obj[0]['fields']['price'],
            "discounted_price": serialized_obj[0]['fields']['discounted_price'],
        }
        publish("product_created", resdata)
        print(resdata)
