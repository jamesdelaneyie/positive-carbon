

from app import User
user_james = User(username='james', email="jamesdelaneyie@gmail.com", password='jamespass')
db.session.add(user_james)
db.session.commit()

from app import db, UserWatchlist
user_watchlist = UserWatchlist(user_id=1, commodity_id=1)
db.session.add(user_watchlist)
db.session.commit()






basedir = os.path.abspath(os.path.dirname(__file__))

app = Flask(__name__, instance_relative_config=True)

photos = UploadSet('photos', IMAGES)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'database.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['UPLOADED_PHOTOS_DEST'] = 'path/to/upload/folder'
configure_uploads(app, photos)



from apscheduler.schedulers.background import BackgroundScheduler
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

