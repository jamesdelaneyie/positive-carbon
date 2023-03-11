from models import db, Commodity, CommodityPrice
from app import app

app.app_context().push()

import requests
import json
from flask_sqlalchemy import SQLAlchemy

base_currency = 'EUR'
endpoint = 'latest'
symbols = 'ALU,COFFEE,BRENTOIL,CANO,LCO,COCOA,XCU,CORN,COTTON,CPO,ETHANOL,GFU22,XAU,HOU22,IRD,LHOG,LCAT,LGOU22,LUMBER,NG,COAL,NI,OAT,XPD,XPT,POTATOES,XRX22,RICE,XRP2,ROBUSTA,RUBBER,RUTH,XAG,SOYBEAN,SUGAR,TIN,UK-EL,UK-NG,ZWH23,WTIOIL,ZNC'
access_key = 'knxbsx6g27duqwd30w8tna7lbj59z8r83rdjesfn37p31cdqe799tum72qsd'
access_key_2 = 'a5zd0kdh2inweg1y2812m0qiasmdy0tb2ejthwssi20f95g1sclel2g4qjin'

api_url = 'https://commodities-api.com/api/'+endpoint+'?access_key='+access_key_2+'&base='+base_currency+'&symbols='+symbols

# Get the list of commodities from the API
response = requests.get(api_url)
commodities = json.loads(response.text)
commodities = commodities['data']['rates']

# pretty print the commodities to the console
print(json.dumps(commodities, indent=4))

iterator = 0
# Iterate over the list of commodities and add them to the database
for commodity_symbol, commodity_price in commodities.items():
    #print(commodity_symbol, commodity_price)
    print(iterator, commodity_symbol, 1/commodity_price)
    # get the commodity id from the database by using the commodity symbol
    commodity_id = Commodity.query.filter_by(symbol=commodity_symbol).first().id
    # add the latest price to the database
    commodity_price = 1/commodity_price
    db.session.add(CommodityPrice(commodity_id=commodity_id, price=commodity_price, currency=base_currency))
    iterator += 1

# Commit the changes to the database
db.session.commit()