from flask import Flask, request
from flask_restful import Resource, Api
from flask_cors import CORS
from pyspark import SparkContext
from pyspark.sql import SparkSession
from uszipcode import SearchEngine
import json

sc = SparkContext('local')


app = Flask(__name__)
api = Api(app)
CORS(app)
spark = SparkSession.builder.appName('hackathon').getOrCreate()
search = SearchEngine(simple_zipcode=True)

class People(Resource):
    def get(self):
        with open('datasets/data.json', 'r') as d:
            data = json.load(d)
            print(data)

        return data

api.add_resource(People, '/people') # Route_1

if __name__ == '__main__':
     app.run(port=5002)