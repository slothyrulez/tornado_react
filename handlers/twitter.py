#! -*- coding: utf-8 -*-

import tornado

class TweetsDataHandler(tornado.web.RequestHandler):

    def get(self):
        db = self.settings["db"]
        tweets = db.react_tweets.tweets

        pass


