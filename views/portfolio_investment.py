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
portfolio_investment = Blueprint('portfolio_investment', __name__)


class PortFolioInvestment(BaseView):
    '''
        view class for PortFolioInvestment rest action
    '''

    def get_user_profiles(self):
        return [
            {
                'id': 1,
                'name': 'test1'
            },
            {
                'id': 2,
                'name': 'test2'
            }
        ]

    def get_refresh_rates(self):
        return [
            {
                'id': 1,
                'name': '2 minutes'
            },
            {
                'id': 2,
                'name': '5 minutes'
            }
        ]

    def company_details(self):
        return [
            {
                'profile_id': 1,
                'id': 1,
                'name': 'Company Name1',
                'inv_amount': 12323,
                'inv_price': 23,
                'inv_date': '26-Jul-2015',
                'quantity': 100023,
                'comments': '',
                'inv_total_amount': 100000,
                'live_price': 3023,
                'today_change': 121,
                'today_gain': 3121,
                'today_percentage': '3%',
                'total_change': 340,
                'total_gain': 10,
                'total_percent': '10%',
                'transaction_details': [
                    {
                        'id': 1,
                        'name': 'Company Name1',
                        'inv_price': 23,
                        'inv_date': "01/02/2016",
                        'quantity': 1000,
                        'inv_total_amount': 23000,
                        'live_price': 25,
                        'today_change': 2,
                        'today_gain': 2000,
                        'today_percentage': "10%",
                        'total_change': -2,
                        'total_gain': 2000,
                        'total_percent': "10%",
                        'company_id': 1
                    }
                ]
            },
            {
                'profile_id': 2,
                'id': 2,
                'name': 'Company Name2',
                'inv_amount': 10000,
                'inv_price': 2323,
                'inv_date': '27-Jul-2015',
                'quantity': 1000,
                'comments': '',
                'inv_total_amount': 100000,
                'live_price': 30,
                'today_change': -1,
                'today_gain': 3,
                'today_percentage': '3%',
                'total_change': -10,
                'total_gain': 30,
                'total_percent': '20%',
                'transaction_details': []
            },
            {
                'profile_id': 1,
                'id': 3,
                'name': 'Company Name3',
                'inv_amount': 30000,
                'inv_price': 23321,
                'inv_date': '25-Jul-2015',
                'quantity': 3000,
                'comments': '',
                'inv_total_amount': 100000,
                'live_price': 30,
                'today_change': -1,
                'today_gain': 13,
                'today_percentage': '3%',
                'total_change': -10,
                'total_gain': 301,
                'total_percent': '30%',
                'transaction_details': []
            }
        ]

    def get_response_data(self):
        return {
            'user_profiles': self.get_user_profiles(),
            'refresh_rates': self.get_refresh_rates(),
            'company_details': self.company_details(),

        }

    def get(self, id):
        logger.info("GET request for the Portfolio Investment endpoint")
        response_data = {
            'form': render_template('views/portfolioInvestment.html'),
            'response_data': self.get_response_data()
        }
        resp = make_response(jsonify(response_data), 200)
        return resp

    def post(self, req_data):
        logger.info(req_data)
        return 'PortFolioInvestment POST'

register_api(portfolio_investment, PortFolioInvestment, 'portfolio_investment',
             '/portfolio_investment/', 'id', 'int'
             )
