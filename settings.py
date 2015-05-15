#! -*- coding: utf-8 -*-

import os

import tornado.options


# Make filepaths relative to settings.
path = lambda root,*a: os.path.join(root, *a)
PROJECT_ROOT = os.path.dirname(os.path.abspath(__file__))

MEDIA_ROOT = path(PROJECT_ROOT, 'media')
TEMPLATE_ROOT = path(PROJECT_ROOT, 'templates')
STATIC_ROOT = path(PROJECT_ROOT, 'static')

settings = {}

settings["template_root"] = TEMPLATE_ROOT
settings["templates_html"] = path(TEMPLATE_ROOT, "html")
settings["react_components_dir"] = path(TEMPLATE_ROOT, "jsx")

settings["project_root"] = PROJECT_ROOT
settings["media_root"] = MEDIA_ROOT
settings["static_path"] = STATIC_ROOT
settings["static_js_path"] = path(STATIC_ROOT, "js")

# MOTOR SETTINGS
import motor
settings["db"] = motor.MotorClient("mongodb://localhost:27017").react_comments

tornado.options.define("port", default=8888, help="run on the given port", type=int)
tornado.options.define("config", default=None, help="tornado config file")
tornado.options.define("debug", default=True, help="debug mode")
tornado.options.options.logging = None
tornado.options.options.parse_command_line()

settings.update(tornado.options.options.as_dict())
