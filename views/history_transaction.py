import logging
from flask import (
    Blueprint,
    render_template,
    make_response,
    jsonify
)
from . import (
    register_api,
    BaseView
)

logger = logging.getLogger(__name__)
transaction_history = Blueprint('transaction_history', __name__)


class TransactionHistory(BaseView):
    '''
        view class for PortFolioInvestment rest action
    '''

    def get(self, id):
        logger.info("GET request for the Transaction History view endpoint")
        response_data = {
            'form': render_template('views/historyTransaction.html'),
            'response_data': {}
        }
        resp = make_response(jsonify(response_data), 200)
        return resp

    def post(self, req_data):
        logger.info(req_data)
        return 'PortFolioInvestment POST'

register_api(transaction_history, TransactionHistory, 'transaction_history',
             '/transaction_history/', 'id', 'int'
             )
