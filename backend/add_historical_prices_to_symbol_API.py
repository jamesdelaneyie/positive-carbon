from models import db, Commodity, CommodityPrice
from app import app

app.app_context().push()

import requests
import json
import os
from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

base_currency = 'EUR'
endpoint = 'timeseries'
symbols = 'POTATOES'
todaysDate = '2023-03-09'
aYearAgo = '2023-01-09'
access_key_1 = os.environ.get('COMMODITIES_API_KEY_1')
access_key_2 = os.environ.get('COMMODITIES_API_KEY_2')

api_url = 'https://commodities-api.com/api/'+endpoint+'?access_key='+access_key_2+'&start_date='+aYearAgo+'&end_date='+todaysDate+'&base='+base_currency+'&symbols='+symbols


# Get the list of commodities from the API
response = requests.get(api_url)
commodities = json.loads(response.text)
#print(commodities)
#print(json.dumps(commodities, indent=4))

commodity_prices = commodities['data']['rates']

# pretty print the commodities to the console
#print(json.dumps(commodities, indent=4))

# iterate over the commodity prices and add them to the database
"""

the format of the data looks like this: 

"rates": {
            "2023-02-09": {
                "POTATOES": 0.033444816053511635
            },
            "2023-02-11": {
                "POTATOES": 0.03389830508474538
            },
            
        }
"""
for date, commodity in commodity_prices.items():
    print(date, commodity['POTATOES'])
    # get the commodity id from the database by using the commodity symbol
    commodity_id = Commodity.query.filter_by(symbol='POTATOES').first().id
    # add the latest price to the database
    commodity_price = commodity['POTATOES']
    # convert the date to a datetime object
    date = datetime.strptime(date, '%Y-%m-%d')
    # calculate the price 
    commodity_price = 1/commodity_price
    db.session.add(CommodityPrice(commodity_id=commodity_id, price=commodity_price, currency=base_currency, date_created=date))

# Commit the changes to the database
db.session.commit()