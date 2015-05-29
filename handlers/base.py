#! -*- coding: utf-8 -*-

# Python std
import os
import json

# Tornado
import tornado.web
import tornado.gen
# Jinja
from jinja2 import Environment, ChoiceLoader, FileSystemLoader, FunctionLoader, TemplateNotFound

# PyReact
from react.jsx import JSXTransformer, TransformError

# PYMONGO
from bson.json_util import dumps

# Application
import settings
from utils import MongoEncoder


class ReactFileSystemStringLoader(FileSystemLoader):

    def get_source(self, environment, template):
        contents, filename, uptodate = super(
            ReactFileSystemStringLoader, self).get_source(environment, template)
        contents = JSXTransformer().transform_string(contents)
        return contents, filename, uptodate


def React_FileSystem_String_Transformer(name):

    infile = os.path.join(
        settings.settings["react_components_dir"], os.path.basename(name))
    outfile = os.path.join(
        settings.settings["static_js_path"], os.path.basename(name))

    js = JSXTransformer().transform(infile, outfile)
    to_template = "<script src='{{ static_url('js/%s') }}'></script>" % name

    return to_template


class TemplateRendering(object):

    """
    A simple class to hold methods for rendering templates.
    """

    def render_template(self, template_name, **kwargs):
        templates_dir = []
        if self.settings.get('templates_html', ''):
            templates_dir.append(
                self.application.settings["templates_html"]
            )

        react_components_dir = self.application.settings[
            "react_components_dir"]

        env = Environment(loader=ChoiceLoader([
            FileSystemLoader(templates_dir),
            FunctionLoader(React_FileSystem_String_Transformer),
        ]))

        try:
            template = env.get_template(template_name)
        except TemplateNotFound:
            raise TemplateNotFound(template_name)
        content = template.render(kwargs)
        return content


class BaseHandler(tornado.web.RequestHandler, TemplateRendering):

    """
    RequestHandler already has a `render()` method. I'm writing another
    method `render_jinja()` and keeping the API almost same.
    """

    def render_jinja(self, template_name, **kwargs):
        """
        This is for making some extra context variables available to
        the template
        """
        kwargs.update({
            'settings': self.application.settings,
            'db': self.application.settings["db"],
            'static_url': self.static_url,
            'request': self.request,
            'xsrf_token': self.xsrf_token,
            'xsrf_form_html': self.xsrf_form_html,
        })
        self.write(self.render_template(template_name, **kwargs))

class JsonHandler(BaseHandler):

    """
    Request handler where requests and responses speak JSON
    """

    def prepare(self):
        # Incorporate request JSON into arguments dictionary.
        if self.request.body:
            try:
                # import ipdb
                # ipdb.set_trace()
                # json_data = json.loads(self.request.body.decode("utf-8"))
                print(self.request.body_arguments)
                self.request.arguments.update(self.request.body_arguments)
            except ValueError:
                message = 'Unable to parse JSON.'
                self.send_error(400, message=message)  # Bad Request

        # Set up response dictionary.
        self.response = dict()

    def set_default_headers(self):
        self.set_header('Content-Type', 'application/json')

    def write_error(self, status_code, **kwargs):
        if 'message' not in kwargs:
            if status_code == 405:
                kwargs['message'] = 'Invalid HTTP method.'
            else:
                kwargs['message'] = 'Unknown error.'

        self.response = kwargs
        self.write_json()

    def write_json(self):
        output = dumps(self.response)
        self.write(output)

class MainHandler(BaseHandler):
    """ / """
    def get(self):
        self.render_jinja("basic.html")


