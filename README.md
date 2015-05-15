Proof of concept

Testing PyReact + Tornado + Motor + Jinja2 + reactjs

```
 $ mkdir tornado_react && cd tornado_react
 $ virtualenv --no-site-packages -p python3.4 .
 $ source bin/activate
 $ git clone https://github.com/slothyrulez/tornado_react.git
 $ svn checkout http://v8.googlecode.com/svn/trunk/ v8
 $ svn checkout http://pyv8.googlecode.com/svn/trunk/ pyv8
 $ cd v8
 $ export V8_HOME=`pwd`
 $ cd ../pyv8
 $ python setup.py build && python setup.py install
 $ cd ..
 $ pip install -r requirements.txt

```
