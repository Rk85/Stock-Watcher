from flask import Module
from flask import render_template, make_response, request, jsonify
import json
import urllib2
import datetime

web_routes = Module(__name__, url_prefix="/stock", name="stock_routes")


def get_all_companies():
    '''
        description: Retrives all the available company details
                        in the exchanges

    '''
    url = "https://query.yahooapis.com/v1/public/yql?q=select%20company%20from"
    url = url + "%20yahoo.finance.industry%20where%20id%20in%20(select%20"
    url = url + "industry.id%20from%20yahoo.finance.sectors)%20%7C%20"
    url = url + "truncate(count%3D100)&format=json&diagnostics=true&"
    url = url + "env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&"
    url = url + "callback="
    response = urllib2.urlopen(url)
    data = json.loads(response.read())
    industries = []
    if data and isinstance(data, dict) and data.get('query'):
        industries = data.get(
            "query", {}).get(
            "results", {}).get(
            'industry', [])
    companies = []
    for industry in industries:
        company = industry.get('company', {})
        if isinstance(company, dict) and \
                company.get('name') and \
                company.get("symbol"):
                    companies.append({
                        'company_name': company['name'],
                        'symbol': company['symbol']
                    })
    return companies


def get_symbol_details(symbol):
    '''
        Description: Given a symbol it retrieves the details about the
                      symbol

        input_param : symbol - selected symbol
        input_type : string

    '''
    url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20"
    url = url + "yahoo.finance.historicaldata%20where%20symbol%20%3D%20%22"
    url = url + "{0}%22%20and%20startDate%20%3D%20%22{1}%22%20and%20endDate"
    url = url + "%20%3D%20%22{2}%22&format=json&diagnostics=true&env=store"
    url = url + "%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback="
    end_date = datetime.date.today()
    start_date = datetime.date.today().replace(year=end_date.year - 1)
    response = urllib2.urlopen(url.format(symbol, start_date, end_date))
    data = json.loads(response.read())
    quotes = []
    if data and isinstance(data, dict) and data.get('query'):
        quotes = data.get("query", {}).get("results", {}).get('quote', [])
    result_quotes = {
        'close_price_details': [],
        'volume_details': []
    }

    for quote in quotes:
        result_quotes['close_price_details'].append(
            [
                quote.get('Date'),
                float(quote.get('Close'))
            ])
        result_quotes['volume_details'].append(
            [
                quote.get('Date'),
                float(quote.get('Volume'))
            ])
    return result_quotes


def get_trade_details(symbol):
    '''
        Description: Retrieves the current day trade details for the symbol

        input_param : symbol - selected symbol
        input_type : string

    '''
    url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from"
    url = url + "%20yahoo.finance.quote%20where%20symbol%20%3D%20%22{0}"
    url = url + "%22&format=json&diagnostics=true&env=store%3A%2F%2F"
    url = url + "datatables.org%2Falltableswithkeys&callback="
    response = urllib2.urlopen(url.format(symbol))
    data = json.loads(response.read())
    quote_details = data["query"].get(
        "results", {}).get(
        'quote', []) if data.get(
        'query') else {}
    return quote_details


@web_routes.route('/quote', methods=['GET'])
@web_routes.route('/quote/<string:symbol>', methods=['GET'])
def get_quote(symbol=None):
    """
        Description : View function to Handle the clients display requests

        input_param : symbol - selected symbol
        input_type : string

    """
    if request.method == 'GET':
        if not symbol:
            response_data = {
                'form': render_template('get_quote.html'),
                'response_data': {
                    'company_details': []  # get_all_companies()
                }
            }
            resp = make_response(jsonify(response_data), 200)
            return resp
        else:
            response_data = {
                'response_data': {
                    'quote_details': get_symbol_details(symbol),
                    'trade_details': get_trade_details(symbol)
                }
            }
            resp = make_response(jsonify(response_data), 200)
            return resp


@web_routes.route('/invest', methods=['GET'])
def get_stock_invest():
    """
        description : View function to Handle the clients display requests

    """
    if request.method == 'GET':
        response_data = {
            'form': render_template('views/portfolioInvestment.html'),
            'response_data': {
                'user_profiles': [
                    {
                        'id': 1,
                        'name': 'test1'
                    },
                    {
                        'id': 2,
                        'name': 'test2'
                    }
                ],
                'refresh_rates': [
                    {
                        'id': 1,
                        'name': '2 minutes'
                    },
                    {
                        'id': 2,
                        'name': '5 minutes'
                    }
                ],
                'company_details': [
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
            }
        }
        resp = make_response(jsonify(response_data), 200)
        return resp


@web_routes.route('/trans', methods=['GET'])
def get_trans_details():
    """
        description : View function to Handle the clients display requests

    """
    if request.method == 'GET':
        response_data = {
            'form': render_template('views/historyTransaction.html'),
            'response_data': {}
        }
        resp = make_response(jsonify(response_data), 200)
        return resp
