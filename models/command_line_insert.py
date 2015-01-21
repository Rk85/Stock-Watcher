"""
    Inserts the Staic Data in all the required static DB Tables
"""

import sys
import os
cwd = os.path.normpath(os.getcwd())
sys.path.append(cwd)
from quote_history import TradeHistory
from db_base import session
import datetime
import urllib2
import json

if len(sys.argv) < 2:
    print "Please provide atleast one Scrip to query"
    sys.exit(0)


def get_symbol_details(symbols):
    '''
        Description: Given a symbol it retrieves the details about the 
                      symbol
        
        input_param : symbol - selected symbol 
        input_type : string
        
    '''
    url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.historicaldata%20where%20symbol%20in%20({0})%20and%20startDate%20%3D%20'{1}'%20and%20endDate%20%3D%20'{2}'%0A&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback="
    endDate = datetime.date.today()
    startDate = datetime.date.today().replace(year=endDate.year-1)
    response = urllib2.urlopen(url.format(symbols, startDate, endDate))
    data = json.loads(response.read())
    quotes = []
    if data and isinstance(data, dict) and data.get('query'):
        quotes = data.get("query", {}).get("results", {}).get('quote', [])
    result_quotes = [ {
       'symbol': quote['Symbol'],
       'date': quote['Date'],
       'open_val': quote['Open'],
       'high_val': quote['High'],
       'low_val': quote['Low'],
       'close_val': quote['Close'],
       'volume': quote['Volume'],
       'adj_close': quote['Adj_Close']
    } for quote in quotes ]  
    return result_quotes

input_quotes = [ symbol.upper() for symbol in sys.argv[1:] ]

# Since we need to maintain only 1 year data delete everything before querying new items
session.query(TradeHistory).filter(TradeHistory.symbol.in_(input_quotes)).delete(synchronize_session=False)
session.commit()
symbols = ''
for quote in input_quotes[:-1]:
   symbols = symbols + '\'' + quote + '\'%2C'
symbols = symbols + '\'' + input_quotes[-1] + '\''
for method in get_symbol_details(symbols):
    new_item = TradeHistory(**method)
    session.add(new_item)

session.commit()

