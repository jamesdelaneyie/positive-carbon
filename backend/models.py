from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

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
                # return the price to two decimal places with a trailing zero if needed
                return f'{self.commodity_price[-1].price:.2f}'
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

    commodity_id = db.Column(db.Integer, db.ForeignKey('commodity.id'), nullable=False)
    price = db.Column(db.Float, nullable=False)
    currency = db.Column(db.String(100), nullable=False)

    commodity = db.relationship('Commodity', backref=db.backref('commodity_price', lazy=True))

    def __repr__(self):
        return f'{self.price}'


    def to_dict(self):
        return {
            'commodity_id': self.commodity_id,
            'commodity_name': self.commodity.name,
            'commodity_symbol': self.commodity.symbol,
            'price': f'{self.price:.5f}',
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
    #phone_number = db.Column(db.String(100), nullable=False)

    def __init__(self, username, password, email):
        self.username = username
        self.password = password
        self.email = email

    def __repr__(self):
        return f'{self.username}'
    

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
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



