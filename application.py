#! -*- coding: utf-8 -*-

"""
Urls handler
"""

import tornado.web

import handlers
import settings


def make_app():
    return tornado.web.Application([
        (r"/", handlers.MainHandler),
        (r"/comments", handlers.CommentsHandler),
        (r"/api/comments", handlers.CommentsDataHandler),
        (r"/static/(.*)", tornado.web.StaticFileHandler,
            {"path": settings.settings['static_path']}),
    ], **settings.settings)
