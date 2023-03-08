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
    description = db.Column(db.String(100), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'symbol': self.symbol,
            'description': self.description,
            'price': self.commodity_price[0].price,
            'currency': self.commodity_price[0].currency
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


    def to_dict(self):
        return {
            'commodity_id': self.commodity_id,
            'commodity_name': self.commodity.name,
            'commodity_symbol': self.commodity.symbol,
            'price': self.price,
            'currency': self.currency,
            'date_created': self.date_created
        }

class User(BaseModel):
    """
    User model
    """

    __tablename__ = 'user'

    username = db.Column(db.String(100), nullable=False)
    password = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)

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


