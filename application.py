#! -*- coding: utf-8 -*-

"""
Urls handler
"""

import tornado.web

import handlers
import settings


def make_app():
    return tornado.web.Application([
        (r"/", handlers.base.MainHandler),
        (r"/comments", handlers.comments.CommentsHandler),
        (r"/api/comments", handlers.comments.CommentsDataHandler),
        (r"/dice", handlers.dice.DiceHandler),
        (r"/api/dice", handlers.dice.DiceDataHandler),
        (r"/static/(.*)", tornado.web.StaticFileHandler,
            {"path": settings.settings['static_path']}),
    ], **settings.settings)
