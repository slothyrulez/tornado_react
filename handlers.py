#! -*- coding: utf-8 -*-

# Python std
import os

# Tornado
import tornado.web
import tornado.gen
# Jinja
from jinja2 import Environment, ChoiceLoader, FileSystemLoader, FunctionLoader, TemplateNotFound

# PyReact
from react.jsx import JSXTransformer, TransformError

# Application
import settings

class ReactFileSystemStringLoader(FileSystemLoader):

    def get_source(self, environment, template):
        contents, filename, uptodate  = super(ReactFileSystemStringLoader, self).get_source(environment, template)
        contents = JSXTransformer().transform_string(contents)
        return contents, filename, uptodate


def React_FileSystem_String_Transformer(name):

        infile = os.path.join(settings.settings["react_components_dir"], os.path.basename(name))
        outfile = os.path.join(settings.settings["static_js_path"], os.path.basename(name))

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

        react_components_dir = self.application.settings["react_components_dir"]

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

class MainHandler(BaseHandler):
    def get(self):
        self.render_jinja("basic.html")

class CommentsHandler(BaseHandler):
    def get(self):
        self.render_jinja("comments.html")


class CommentsDataHandler(tornado.web.RequestHandler):
    @tornado.gen.coroutine
    def get(self):
        db = self.settings["db"]
        comments = db.react_comments.comments
        cursor = comments.find()
        while (yield cursor.fetch_next):
            doc = cursor.next_object
            print(type(doc))

        import ipdb
        ipdb.set_trace()

        data = { "data": [
            { "author": "Pete Hunt", "text": "This is one comment"},
            { "author": "Jordan Walke", "text": "This is *another* comment"}
        ]}

        print("api/CommentsHandler")
        self.write(data)

    def post(self):
        db = self.settings["db"]
        comments = db.react_comments.comments

        author = self.get_argument('author', '')
        text = self.get_argument('text', '')
        if not author:
            data = { "data": [] }
        else:
            data = { "author": author, "text": text }
            comments.insert(data)

        self.write(data)


class TweetsDataHandler(tornado.web.RequestHandler):
    def get(self):
        db = self.settings["db"]
        tweets = db.react_tweets.tweets


        pass
