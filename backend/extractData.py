from pyspark import SparkContext
from pyspark.sql import SparkSession
from uszipcode import SearchEngine
from pandas import pandas as pd

import os
import json

spark = SparkSession.builder.appName('hackathon').getOrCreate()
df = spark.read.option("sep", "|").csv('datasets/CCHC.csv', header=True)
zipcodes = df.select("Zip").toPandas()
search = SearchEngine(simple_zipcode=True)
zips = []
for zipcode in zipcodes['Zip']:
    zc = search.by_zipcode(str(zipcode))
    locations = {}
    locations['lat'] = zc.lat
    locations['lng'] = zc.lng
    if locations['lat'] == None:
        print("Error: {}".format(zipcode))
        continue
    zips.append(locations)

# print(zips)

# print(json.dumps(zipcodes))
with open(os.path.join('datasets', 'data.json'), "w+") as output_file:
    output_file.write(json.dumps(zips))