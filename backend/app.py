import os
from flask import Flask, request, jsonify
from flask_admin import Admin
from flask_migrate import Migrate
from flask_admin.contrib.sqla import ModelView
from models import db, Commodity, CommodityPrice, User, UserWatchlist, PriceAlert

from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity, unset_jwt_cookies, jwt_required, JWTManager

basedir = os.path.abspath(os.path.dirname(__file__))

app = Flask(__name__)
app.secret_key = 'secret_key'

app.config["JWT_SECRET_KEY"] = "please-remember-to-change-me"
jwt = JWTManager(app)


app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'database.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'

admin = Admin(app, name='Commodities App', template_mode='bootstrap3')
admin.add_view(ModelView(Commodity, db.session))

class CommodityPriceView(ModelView):
    column_display_pk = True
    column_hide_backrefs = False
    column_list = ('id', 'commodity', 'price', 'currency', 'date_created')

admin.add_view(CommodityPriceView(CommodityPrice, db.session))
admin.add_view(ModelView(User, db.session))

class UserWatchlistView(ModelView):
    column_display_pk = True
    column_hide_backrefs = False
    column_list = ('id', 'user', 'commodity')

admin.add_view(UserWatchlistView(UserWatchlist, db.session))
admin.add_view(ModelView(PriceAlert, db.session))

db.init_app(app)
migrate = Migrate(app, db)

@app.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if type(data) is dict:
                data["access_token"] = access_token 
                response.data = json.dumps(data)
        return response
    except (RuntimeError, KeyError):
        # Case where there is not a valid JWT. Just return the original respone
        return response

@app.route('/api/token', methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    
    if not email:
        return jsonify({"msg": "Email is required"}), 400
    if not password:
        return jsonify({"msg": "Password is required"}), 400
    
    user = User.query.filter_by(email=email).first()
    if user is None:
        return jsonify({"msg": "Email not known"}), 401
    
    # Check the password
    if not user.check_password(password):
        return jsonify({"msg": "Incorrect Password"}), 401
    

    access_token = create_access_token(identity=email)
    response = {"user_id": user.id, "access_token":access_token}
    return response

@app.route("/api/logout", methods=["POST"])
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response


@app.route('/api/register', methods=['POST'])
def signup():
    email = request.json.get('email', None)
    password = request.json.get('password', None)
    username = request.json.get('username', None)

    if not email:
        return jsonify({"msg": "Email is required"}), 400
    if not password:
        return jsonify({"msg": "Password is required"}), 400
    if not username:
        return jsonify({"msg": "Name is required"}), 400

    user = User.query.filter_by(email=email).first()
    if user:
        return jsonify({"msg": "Email already exists"}), 400

    user = User(email=email, username=username, password=password)
    user.set_password(password)
    db.session.add(user)
    db.session.commit()
    return jsonify({"msg": "User created successfully"}), 201

@app.route('/api/profile')
@jwt_required()
def my_profile():
    response_body = {
        "name": "Nagato",
        "about" :"Hello! I'm a full stack developer that loves python and javascript"
    }

    return response_body

@app.route('/api/index')
def index():
    commodities = Commodity.query.all()
    commodities = [commodity.to_dict() for commodity in commodities]
    return jsonify(commodities)

@app.route('/api/commodities')
def prices():
    commodity_prices = CommodityPrice.query.all()
    commodity_prices = [commodity_prices.to_dict() for commodity_prices in commodity_prices]
    return jsonify(commodity_prices)

@app.route('/api/commodities/<commodity_symbol>')
def price(commodity_symbol):
    # get the id for the commodity symbol
    commodity_id = Commodity.query.filter_by(symbol=commodity_symbol).first().id
    commodity_info = Commodity.query.filter_by(symbol=commodity_symbol).first().to_dict()
    single_commodity_prices = CommodityPrice.query.filter_by(commodity_id=commodity_id).order_by(CommodityPrice.date_created.desc())
    single_commodity_prices = [single_commodity_prices.to_dict() for single_commodity_prices in single_commodity_prices]
    return jsonify({"info": commodity_info, "prices": single_commodity_prices})

@app.route('/api/commodities/search/<search_term>')
def commodities(search_term):
    commodities = Commodity.query.filter(Commodity.name.like(f'%{search_term}%')).all()
    commodities = [commodity.to_dict() for commodity in commodities]
    return jsonify(commodities)

@app.route('/api/users')
def users():
    users = User.query.all()
    users = [users.to_dict() for users in users]
    return jsonify(users)


@app.route('/api/user/<user_id>') # add a route to get a user's watchlist
def watchlist(user_id):
    # get the user for the user_id
    user = User.query.filter_by(id=user_id).first()

    # check if the user exists
    if not user:
        return jsonify({"message": f"user {user_id} not found"}), 404

    # get the commodities with the users id from the UserWatchlist table
    commodities = UserWatchlist.query.filter_by(user_id=user_id).all()
    commodities = [commodity.to_dict() for commodity in commodities]

    return jsonify({"user": user.to_dict(), "commodities": commodities})


@app.route('/api/user/<user_id>/add', methods=['POST'])
def add_to_watchlist(user_id):
    # get the symbol from the body of the request
    symbol = request.json.get('symbol')
    
    # get the user for the user_id
    user = User.query.filter_by(id=user_id).first()

    # check if the user exists
    if not user:
        return jsonify({"message": f"user {user_id} not found"}), 404

    # get the commodity for the symbol
    commodity = Commodity.query.filter_by(symbol=symbol).first()

    # check if the commodity exists
    if not commodity:
        return jsonify({"message": f"commodity {symbol} not found"}), 404

    # check if the user already has the commodity in their watchlist by checking if the user has a UserWatchlist object with the user_id and commodity_id
    user_watchlist = UserWatchlist.query.filter_by(user_id=user_id, commodity_id=commodity.id).first()

    # check if the user already has the commodity in their watchlist
    if user_watchlist:
        return jsonify({"message": f"user {user_id} already has {symbol} in their watchlist"}), 400

    # add the commodity to the user's watchlist
    user_watchlist = UserWatchlist(user_id=user_id, commodity_id=commodity.id)
    db.session.add(user_watchlist)
    db.session.commit()

    return jsonify({"message": "success"})

@app.route('/api/user/<user_id>/remove', methods=['POST'])
def remove_from_watchlist(user_id):
    # get the symbol from the body of the request
    symbol = request.json.get('symbol')
    
    # get the user for the user_id
    user = User.query.filter_by(id=user_id).first()

    # check if the user exists
    if not user:
        return jsonify({"message": f"user {user_id} not found"}), 404

    # get the commodity for the symbol
    commodity = Commodity.query.filter_by(symbol=symbol).first()

    # check if the commodity exists
    if not commodity:
        return jsonify({"message": f"commodity {symbol} not found"}), 404

    # check if the user already has the commodity in their watchlist by checking if the user has a UserWatchlist object with the user_id and commodity_id
    user_watchlist = UserWatchlist.query.filter_by(user_id=user_id, commodity_id=commodity.id).first()

    # check if the user already has the commodity in their watchlist
    if not user_watchlist:
        return jsonify({"message": f"user {user_id} does not have {symbol} in their watchlist"}), 400

    # remove the commodity from the user's watchlist
    db.session.delete(user_watchlist)
    db.session.commit()

    return jsonify({"message": "success"})


@app.route('/api/set-price-alert/', methods=['POST'])
def set_price_alert():
    # get the symbol from the body of the request
    symbol = request.json.get('symbol')
    user_id = request.json.get('user')

    print(symbol, user_id)
    
    # get the user for the user_id
    user = User.query.filter_by(id=user_id).first()

    # check if the user exists
    if not user:
        return jsonify({"message": f"user {user_id} not found"}), 404

    # get the commodity for the symbol
    commodity = Commodity.query.filter_by(symbol=symbol).first()

    # check if the commodity exists
    if not commodity:
        return jsonify({"message": f"commodity {symbol} not found"}), 404

    # get the price alert for the user and commodity
    price_alert = PriceAlert.query.filter_by(user_id=user_id, commodity_id=commodity.id).first()

    # check if the user already has a price alert for the commodity
    if price_alert:
        return jsonify({"message": f"user {user_id} already has a price alert for {symbol}"}), 400

    # get the price from the body of the request
    price = request.json.get('price')

    # add the price alert to the database
    price_alert = PriceAlert(user_id=user_id, commodity_id=commodity.id, price=price)
    db.session.add(price_alert)
    db.session.commit()

    return jsonify({"message": "success"})


if __name__ == '__main__':
    app.run()