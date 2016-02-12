from flask import (
    Flask,
)
from jinja2 import (
    ChoiceLoader,
)
import logging
from logging import config  # noqa
import settings
from views import (
    MyTemplateLoader,
    register_modules
)

logging.config.dictConfig(settings.LOG_CONFIG)
logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

app = Flask(__name__)
app.jinja_loader = ChoiceLoader([MyTemplateLoader("templates")])
with app.app_context():
    register_modules()


def main():
    '''
        description:

            Main function of the app
    '''
    from tornado.wsgi import WSGIContainer
    from tornado.httpserver import HTTPServer
    from tornado.ioloop import IOLoop
    from tornado import autoreload
    from tornado.log import enable_pretty_logging

    enable_pretty_logging()

    http_server = HTTPServer(WSGIContainer(app))
    http_server.listen(5001)
    ioloop = IOLoop.instance()
    autoreload.start(ioloop)
    ioloop.start()

if __name__ == '__main__':
    main()
