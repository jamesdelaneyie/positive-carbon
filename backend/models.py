import os
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from twilio.rest import Client


db = SQLAlchemy()

account_sid = os.environ.get('TWILIO_ACCOUNT_SID')
auth_token = os.environ.get('TWILIO_AUTH_TOKEN')

client = Client(account_sid, auth_token)

class BaseModel(db.Model):
    """
    Abstract model
    """

    __abstract__ = True

    id = db.Column(db.Integer, primary_key=True)
    date_created = db.Column(db.DateTime, server_default=db.func.now())
    date_modified = db.Column(db.DateTime, server_default=db.func.now(), onupdate=db.func.now())

    def update(self, **kwargs):
        for key, value in kwargs.items():
            try:
                getattr(self, key)
                setattr(self, key, value)
            except AttributeError:
                pass

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}

class Commodity(BaseModel):
    """
    Commodity model
    """

    __tablename__ = 'commodity'

    name = db.Column(db.String(100), nullable=False)
    symbol = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(500), nullable=False)

    # if this commodity has an associated price, set it to self.price else set it to 0
    @property
    def price(self):
        if self.commodity_price:
            if(self.commodity_price[-1].price):
                return f'{self.commodity_price[-1].price:,.2f}'
            else:
                return 0
        else:
            return 0
        
    # a funtion that returns if the commodity price went up or down
    @property
    def price_change(self):
        if self.commodity_price:
            if len(self.commodity_price) > 1:
                # round the prices to two decimal places
                if round(self.commodity_price[-1].price, 2) > round(self.commodity_price[-2].price, 2):
                    return 'up'
                elif round(self.commodity_price[-1].price, 2) < round(self.commodity_price[-2].price, 2):
                    return 'down'
                else:
                    return 'same'
            else:
                return 'same'
        else:
            return 'same'

    # a function that returns the percentage change in price
    @property
    def price_change_percentage(self):
        if self.commodity_price:
            if len(self.commodity_price) > 1:
                # round the prices to two decimal places
                if round(self.commodity_price[-1].price, 2) > round(self.commodity_price[-2].price, 2):
                    return round(((self.commodity_price[-1].price - self.commodity_price[-2].price) / self.commodity_price[-2].price) * 100, 2)
                elif round(self.commodity_price[-1].price, 2) < round(self.commodity_price[-2].price, 2):
                    return round(((self.commodity_price[-2].price - self.commodity_price[-1].price) / self.commodity_price[-2].price) * 100, 2)
                else:
                    return 0
            else:
                return 0
        else:
            return 0
        
    def __repr__(self):
        return f'{self.name}'

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'symbol': self.symbol,
            'description': self.description,
            'price': self.price,
            'price_change': self.price_change,
            'price_change_percentage': self.price_change_percentage,
            'currency': 'EUR'
        }


class CommodityPrice(BaseModel):
    """
    CommodityPrice model
    """

    __tablename__ = 'commodity_price'

    # Foreign key to Commodity model
    commodity_id = db.Column(db.Integer, db.ForeignKey('commodity.id'), nullable=False)
    # Currency. All prices are in EUR
    currency = db.Column(db.String(100), nullable=False)
    # Commodity relationship
    commodity = db.relationship('Commodity', backref=db.backref('commodity_price', lazy=True))

    # Price of the commodity
    price = db.Column(db.Float, nullable=False)

    # Open, high, low, close, volume of the commodity
    # open = db.Column(db.Float, nullable=True)
    high = db.Column(db.Float, nullable=True)
    low = db.Column(db.Float, nullable=True)
    close = db.Column(db.Float, nullable=True)
    volume = db.Column(db.Float, nullable=True)
    change = db.Column(db.Float, nullable=True)
    change_percentage = db.Column(db.Float, nullable=True)

    # created_at comes from the BaseModel
    # populated at the time of creation with either the current datetime (live) or date from the API (historical)
    # date_created = db.Column(db.DateTime, nullable=False)

    # add a function that runs after the model is created
    def __init__(self, **kwargs):
        super(CommodityPrice, self).__init__(**kwargs)
        # if the price is not set, set it to 0
        price_alerts = PriceAlert.query.filter_by(commodity_id=self.commodity_id).all()
        # if there are any price alerts
        if price_alerts:
            # loop through each price alert
            for price_alert in price_alerts:
                # check if the price has crossed the alert price
                if self.price < price_alert.price:
                    # get the name of the commodity
                    commodity_name = Commodity.query.filter_by(id=self.commodity_id).first().name
                    reciever_username = price_alert.user.username
                    # get the user's phone number
                    user = User.query.filter_by(username=reciever_username).first()
                    # send the user a text message
                    price_for_update = f'{self.price:.2f}'
                    sms_message = "\nHey " + reciever_username + ", the price of " + commodity_name + " has dropped to €" + str(price_for_update) + "! \n\nSent from PricePulse."
                    message = client.messages.create(
                        body=sms_message,
                        from_='+15073796464',
                        to=user.phone_number
                    )
                    #print(message.sid)
                    print('Price Alert Drop')
                elif self.price > price_alert.price:
                    # get the name of the commodity
                    commodity_name = Commodity.query.filter_by(id=self.commodity_id).first().name
                    reciever_username = price_alert.user.username
                    # get the user's phone number
                    user = User.query.filter_by(username=reciever_username).first()
                    # send the user a text message
                    price_for_update = f'{self.price:.2f}'
                    sms_message = "\nHey " + reciever_username + ", the price of " + commodity_name + " has risen to €" + str(price_for_update) + "! \n\nSent from PricePulse."
                    message = client.messages.create(
                        body=sms_message,
                        from_='+15073796464',
                        to=user.phone_number
                    )
                    #print(message.sid)
                    print('Price Alert Increase')
    

    def __repr__(self):
        return f'{self.price}'

    def to_dict(self):
        return {
            'commodity_id': self.commodity_id,
            'price': self.price,
            'high': self.high,
            'low': self.low,
            'close': self.close,
            'volume': self.volume,
            'change': self.change,
            'change_percentage': self.change_percentage,
            'date_created': self.date_created,
            'time': self.date_created.strftime('%H:%M:%S')
        }


class User(BaseModel):
    """
    User model
    """

    __tablename__ = 'user'

    username = db.Column(db.String(100), nullable=False)
    password = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    phone_number = db.Column(db.String(100), nullable=True)

    # check password against the hashed password
    def check_password(self, password):
        return check_password_hash(self.password, password)
    
    # hash the password
    def set_password(self, password):
        hashed_password = generate_password_hash(password)
        self.password = hashed_password


    def __init__(self, username, email, phone_number, password):
        self.username = username
        self.email = email
        self.phone_number = phone_number
        self.set_password(password)

    def __repr__(self):
        return f'{self.username}'
    
    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'phone_number': self.phone_number,
            'email': self.email
        }

class UserWatchlist(BaseModel):
    """
    UserWatchlist model
    """

    __tablename__ = 'user_watchlist'

    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    commodity_id = db.Column(db.Integer, db.ForeignKey('commodity.id'), nullable=False)

    user = db.relationship('User', backref=db.backref('user_watchlist', lazy=True))
    commodity = db.relationship('Commodity', backref=db.backref('user_watchlist', lazy=True))

    def to_dict(self):
        return {
            'name': self.commodity.name,
            'symbol': self.commodity.symbol,
            'price': self.commodity.price,
            'price_change': self.commodity.price_change,
        }


class PriceAlert(BaseModel):
    """
    PriceAlert model
    """

    __tablename__ = 'commodity_price_alert'

    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    commodity_id = db.Column(db.Integer, db.ForeignKey('commodity.id'), nullable=False)
    price = db.Column(db.Float, nullable=False)

    user = db.relationship('User', backref=db.backref('commodity_price_alert', lazy=True))
    commodity = db.relationship('Commodity', backref=db.backref('commodity_price_alert', lazy=True))

    def __repr__(self):
        return f'{self.price}'

    def to_dict(self):
        return {
            'commodity_id': self.commodity_id,
            'price': f'{self.price:.5f}',
            'date_created': self.date_created,
            'time': self.date_created.strftime('%H:%M:%S')
        }
