#! -*- coding: utf-8 -*-

import tornado
import motor

from .base import BaseHandler, BsonHandler

class CommentsHandler(BaseHandler):

    def get(self):
        self.render_jinja("comments.html")


class CommentsDataHandler(BsonHandler):

    @tornado.gen.coroutine
    def get_comments(self, db):
        print(type(db.find()))
        print(data)
        tornado.gen.Return(data)

    @tornado.gen.coroutine
    def get(self):
        db = self.settings["db"]
        comments = db.react_comments.comments
        data = yield comments.find({}).to_list(100)
        ## data = yield motor.Op(comments.find({}).next_object)
        # while (yield cursor.fetch_next):
        #     doc = cursor.next_object
        #     print(type(doc))
        data = data if data else []
        self.response["data"] = data
        self.write_json()

    @tornado.gen.coroutine
    def post(self):
        db = self.settings["db"]
        comments = db.react_comments.comments

        author = self.get_argument('author', '')
        text = self.get_argument('text', '')
        if not author:
            data = {"data": []}
        else:
            data = {"author": author, "text": text}
            # Insert injects MDB Object id on the data dict
            result = yield comments.insert(data)
        print("YIELDED result: ", result)

        self.response["data"] = result
        self.write_json()
