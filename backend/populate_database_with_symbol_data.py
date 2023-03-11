import json
import requests
from app import app
from flask_sqlalchemy import SQLAlchemy
from models import db, Commodity, CommodityPrice

app.app_context.push()

base_currency = 'EUR'
symbols = 'ALU,COFFEE,BRENTOIL,CANO,LCO,COCOA,XCU,CORN,COTTON,CPO,ETHANOL,GFU22,XAU,HOU22,IRD,LHOG,LCAT,LGOU22,LUMBER,NG,COAL,NI,OAT,XPD,XPT,POTATOES,XRX22,RICE,XRP2,ROBUSTA,RUBBER,RUTH,XAG,SOYBEAN,SUGAR,TIN,UK-EL,UK-NG,ZWH23,WTIOIL,ZNC'

# for each symbol
# for symbol in symbols.split(','):
    # get the 




