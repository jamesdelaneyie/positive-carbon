from models import db, Commodity, CommodityPrice
from app import app

app.app_context().push()

#delete every entry in the CommodityPrice table except the last one for each commodity
# get the list of commodities from the database
commodities = Commodity.query.all()
# iterate over the list of commodities
for commodity in commodities:
    # get the symbol for the current commodity
    symbol = commodity.symbol
    # get the list of commodity prices for the current commodity
    commodity_prices = CommodityPrice.query.filter_by(commodity_id=commodity.id).all()
    # skip the last commodity price in the list
    commodity_prices = commodity_prices[:-1]
    # iterate over the list of commodity prices
    for commodity_price in commodity_prices:
        # delete the commodity price from the database
        db.session.delete(commodity_price)
        # commit the changes to the database
        db.session.commit()