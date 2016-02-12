from flask import (
    render_template,
    make_response,
    jsonify
)
from flask import (
    Blueprint
)
from flask import send_from_directory
import logging

logger = logging.getLogger(__name__)

base_routes = Blueprint('base_routes', __name__)


@base_routes.route('/')
def load_index():
    '''
        Description : View function to load the root URL

    '''
    return render_template("index.html")


@base_routes.route('/static_files/<path:file_name>')
def static_files(file_name):
    '''
        Description : View function to the static files

    '''
    return send_from_directory('static_files', file_name)


@base_routes.route('/about')
def about():
    '''
        Description : View function to load about page URL

    '''
    response_data = {
        'form': render_template("about.html")
    }
    return make_response(jsonify(response_data), 200)
