from flask import Module
from flask import render_template, make_response, request, jsonify
import json

web_routes = Module(__name__, url_prefix="/stock", name="stock_routes")

@web_routes.route('/quote', methods=['GET'])
def get_quote():
    """
        Description : View fucntion to Handle the clients display requests
        
        input_param : client_id - configured host name of the client
        input_type : string
    
    """
    if request.method == 'GET':
            response_data = {  'form' : render_template('get_quote.html'),
                           'response_data': {
										}
                        }
            resp = make_response(jsonify(response_data), 200)
            return resp
