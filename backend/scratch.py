from app import db, Commodity, CommodityPrice
commodity_gold = Commodity(name='Gold', symbol='XAU', description='Gold is a precious metal used in jewelry and electronics')
db.session.add(commodity_gold)
commodity_silver = Commodity(name='Silver', symbol='XAG', description='Silver is a precious metal used in jewelry and electronics')
db.session.add(commodity_silver)
db.session.commit()

from app import db, CommodityPrice
commodity_gold_price = CommodityPrice(commodity_id=1, price=200, currency='EUR')
db.session.add(commodity_gold_price)
commodity_silver_price = CommodityPrice(commodity_id=2, price=150, currency='EUR')
db.session.add(commodity_silver_price)
db.session.commit()

from app import db, CommodityPrice
commodity_gold_price = CommodityPrice(commodity_id=1, price=125, currency='EUR')
db.session.add(commodity_gold_price)
db.session.commit()

commodity_gold_price = CommodityPrice(commodity_id=1, price=129, currency='EUR')
db.session.add(commodity_gold_price)
commodity_gold_price = CommodityPrice(commodity_id=1, price=94, currency='EUR')
db.session.add(commodity_gold_price)
commodity_gold_price = CommodityPrice(commodity_id=1, price=208, currency='EUR')
db.session.add(commodity_gold_price)
commodity_gold_price = CommodityPrice(commodity_id=1, price=58, currency='EUR')
db.session.add(commodity_gold_price)
commodity_gold_price = CommodityPrice(commodity_id=1, price=181, currency='EUR')
db.session.add(commodity_gold_price)
commodity_gold_price = CommodityPrice(commodity_id=1, price=72, currency='EUR')
db.session.add(commodity_gold_price)
commodity_gold_price = CommodityPrice(commodity_id=1, price=113, currency='EUR')
db.session.add(commodity_gold_price)
commodity_gold_price = CommodityPrice(commodity_id=1, price=247, currency='EUR')
db.session.add(commodity_gold_price)
commodity_gold_price = CommodityPrice(commodity_id=1, price=170, currency='EUR')
db.session.add(commodity_gold_price)
commodity_gold_price = CommodityPrice(commodity_id=1, price=68, currency='EUR')
db.session.add(commodity_gold_price)
commodity_gold_price = CommodityPrice(commodity_id=1, price=89, currency='EUR')
db.session.add(commodity_gold_price)
db.session.commit()

db.session.add(commodity_gold_price)

from app import User
user_james = User(username='james', email="jamesdelaneyie@gmail.com", password='jamespass')
db.session.add(user_james)
db.session.commit()

from app import db, UserWatchlist
user_watchlist = UserWatchlist(user_id=1, commodity_id=1)
db.session.add(user_watchlist)
db.session.commit()


# db.drop_all()
# db.create_all()

# print(Commodity.query.all())

import os
from flask import Flask, jsonify
from flask_uploads import UploadSet, IMAGES, configure_uploads
from flask_sqlalchemy import SQLAlchemy

from models import Commodity

from apscheduler.schedulers.background import BackgroundScheduler

import requests



basedir = os.path.abspath(os.path.dirname(__file__))

app = Flask(__name__, instance_relative_config=True)

photos = UploadSet('photos', IMAGES)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'database.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['UPLOADED_PHOTOS_DEST'] = 'path/to/upload/folder'
configure_uploads(app, photos)





base_currency = 'EUR'
symbol = 'XAU' 
endpoint = 'latest'
access_key = 'knxbsx6g27duqwd30w8tna7lbj59z8r83rdjesfn37p31cdqe799tum72qsd'
api_url = 'https://commodities-api.com/api/'+endpoint+'?access_key='+access_key+'&base='+base_currency+'&symbols='+symbol


def get_data_and_add_to_db():
    with app.app_context():
        response = requests.get(api_url)
        latest_data = response.json()['data']['rates']['XAU']

        data = Commodity(name='Gold', price=latest_data)
        #db.session.add(data)
        #db.session.commit()

scheduler = BackgroundScheduler()
scheduler.add_job(func=get_data_and_add_to_db, trigger='interval', seconds=60)
# scheduler.start()


@app.route('/index')
def index():
    commodities = Commodity.query.all()
    return jsonify([commodity.to_dict() for commodity in commodities])
