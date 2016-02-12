import logging
from flask.views import MethodView
from flask import (
    request,
)
from functools import wraps
logger = logging.getLogger(__name__)

VERSION = 1.0


def register_api(app, view, endpoint, url, pk='id', pk_type='int'):
    '''
        description:  registering the flask api views

        input_param: app - flask app to register the url rules
        input_type: flask app
        input_param: view - view class to register
        input_type: class
        input_param: endpoint - view end point name
        input_type: str
        input_param: url - url to register for this view
        input_type: str
        input_param: pk - unique key name to identify the resource
        input_type: str
        input_param: pk_type - type of the unique key
        input_type: str

        return_type:
    '''
    logger.info("Registering the api url endpoints")
    logger.debug("with detail view name: {0}, endpoint: {1}, url: {2}\
        key name: {3}, key type: {4}".format(view.__name__, endpoint, url, pk, pk_type))
    view_func = view.as_view(endpoint)
    url = "/api/{0}{1}".format(VERSION, url)
    logger.info("registering the url {0}".format(url))
    app.add_url_rule(url,
                     defaults={pk: None},
                     view_func=view_func,
                     methods=['GET', 'OPTIONS'])
    app.add_url_rule(url,
                     view_func=view_func,
                     methods=['POST', 'OPTIONS'])
    app.add_url_rule('{0}<{1}:{2}>/'.format(url, pk_type, pk),
                     view_func=view_func,
                     methods=['GET', 'PUT', 'DELETE', 'OPTIONS'])
    logger.info("completed api server endpoint registration")


def register_modules():
    '''
        description: registers the flask blueprints with the application

        input_param:
        input_type:

        return_type:
    '''
    from flask import current_app
    from .base_routes import base_routes
    from .portfolio_investment import portfolio_investment
    from .history_transaction import transaction_history
    logger.info("registering the api server modules")
    current_app.register_blueprint(base_routes)
    current_app.register_blueprint(portfolio_investment)
    current_app.register_blueprint(transaction_history)


def validate_request(f):
    '''
        description:  decorator to validate the request data

        input_param: f - function that need to be decorated
        input_type: func

        return_type: func
    '''
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if request.method in ["POST", "PUT"]:
            logger.info("validating the api server request for the method {0}".format(request.method))
            req_data = request.get_json() if request.json else request.form
            logger.debug("POST data {0}".format(req_data))
            kwargs['req_data'] = req_data
        return f(*args, **kwargs)
    return decorated_function


class BaseView(MethodView):
    '''
        Base view class for the rest apis
    '''

    decorators = [validate_request]
