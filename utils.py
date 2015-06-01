#! -*- coding: utf-8 -*-

from json import JSONEncoder, JSONDecoder
from bson.objectid import ObjectId

class MongoEncoder(JSONEncoder):
    def default(self, obj, **kwargs):
        if isinstance(obj, ObjectId):
            return str(obj)
        else:
            return JSONEncoder.default(obj, **kwargs)


class MongoDecoder(JSONDecoder):
    def default(self, obj, **kwargs):
        if isinstance(obj, ObjectId):
            return str(obj)
        else:
            return JSONDecoder.default(obj, **kwargs)
