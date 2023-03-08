import os
from flask import Flask, jsonify
from models import db, Commodity, CommodityPrice, User, UserWatchlist

basedir = os.path.abspath(os.path.dirname(__file__))

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'database.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

@app.route('/index')
def index():
    commodities = Commodity.query.all()
    commodities = [commodity.to_dict() for commodity in commodities]
    return jsonify(commodities)

@app.route('/prices')
def prices():
    commodity_prices = CommodityPrice.query.all()
    commodity_prices = [commodity_prices.to_dict() for commodity_prices in commodity_prices]
    return jsonify(commodity_prices)

@app.route('/prices/<commodity_symbol>')
def price(commodity_symbol):
    # get the id for the commodity symbol
    commodity_id = Commodity.query.filter_by(symbol=commodity_symbol).first().id
    single_commodity_prices = CommodityPrice.query.filter_by(commodity_id=commodity_id).order_by(CommodityPrice.date_created.desc())
    single_commodity_prices = [single_commodity_prices.to_dict() for single_commodity_prices in single_commodity_prices]
    return jsonify(single_commodity_prices)



@app.route('/users')
def users():
    users = User.query.all()
    users = [users.to_dict() for users in users]
    return jsonify(users)

@app.route('/commodities/<search_term>')
def commodities(search_term):
    commodities = Commodity.query.filter(Commodity.name.like(f'%{search_term}%')).all()
    commodities = [commodity.to_dict() for commodity in commodities]
    return jsonify(commodities)


if __name__ == '__main__':
    app.run()