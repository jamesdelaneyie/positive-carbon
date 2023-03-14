from models import db, Commodity, CommodityPrice
from app import app

app.app_context().push()

import random
import datetime

base_currency = 'EUR'
symbols = 'ALU,COFFEE,BRENTOIL,CANO,LCO,COCOA,XCU,CORN,COTTON,CPO,ETHANOL,GFU22,XAU,HOU22,IRD,LHOG,LCAT,LGOU22,LUMBER,NG,COAL,NI,OAT,XPD,XPT,POTATOES,XRX22,RICE,XRP2,ROBUSTA,RUBBER,RUTH,XAG,SOYBEAN,SUGAR,TIN,UK-EL,UK-NG,ZWH23,WTIOIL,ZNC'

# Get today's date
today = datetime.date.today()

# Calculate the date one year ago
one_year_ago = today - datetime.timedelta(days=2)


# iterate from a year ago to today and add an entry for each day for each commodity
# get the list of commodities from the database
commodities = Commodity.query.all()
# iterate over the list of commodities
for commodity in commodities:
    # get the symbol for the current commodity
    start_price = CommodityPrice.query.filter_by(commodity_id=commodity.id).first()
    start_price = start_price.price
    last_close = 0
    # iterate over the dates from a year ago to today
    # Iterate over every day from today to one year ago
    for i in range((today - one_year_ago).days + 1):
        date = one_year_ago + datetime.timedelta(days=i)
        # get the price for the current commodity and date
        if last_close == 0:
            price = start_price
            price = price * (1 + (random.random() - 0.5) * 0.08)
        else:
            price = last_close        
        # generate a high price for the day by +0-4% of the current price
        high = price * (1 + random.random() * 0.04)
        # generate a low price for the day by -0-4% of the current price
        low = price * (1 - random.random() * 0.04)
        # close is half way between high and low
        close = (high + low) / 2
        last_close = close
        # calculate the change and change percentage
        change = price - close
        change_percentage = round((change / close) * 100, 2)
        # multiply the change and change percentage by -1
        change = change * -1
        change_percentage = change_percentage * -1
        # set the close price to the price
        # randomise a number between 1000-1000000 
        volume = random.randint(1000, 1000000)

        # print all the values
        print("Commodity: " + commodity.name)
        print("       Date: " + str(date))
        print("       Open: " + str(price))
        print("       High: " + str(high))
        print("        Low: " + str(low))
        print("      Close: " + str(close))
        print("     Volume: " + str(volume))
        print("     Change: " + str(change))
        print("   Change %: " + str(change_percentage))

        # create a new CommodityPrice object
        """commodity_price = CommodityPrice(
            commodity_id=commodity.id,
            currency=base_currency,
            price=price,
            high=high,
            low=low,
            close=close,
            volume=volume,
            change=change,
            change_percentage=change_percentage,
            date_created=date
        )"""

        # save the price to the database
        #db.session.add(price)
    
