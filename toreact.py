#! -*- coding: utf-8 -*-

"""
Suron entry point / server
"""

# import tornado.ioloop
import tornado.options
import tornado.httpserver
import tornado.ioloop

from application import make_app


def main():
    app = make_app()
    app.listen(app.settings["port"])
    # server = tornado.httpserver.HTTPServer(app)
    # server.bind(app.settings["port"])
    # server.start(0)  # forks one process per cpu
    tornado.ioloop.IOLoop.current().start()

if __name__ == '__main__':
    main()
