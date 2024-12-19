from models import db

from datetime import date

class WatchList(db.Model):
    __tablename__ = "watch_list"

    id = db.Column(db.Integer, primary_key=True)
    stockId = db.Column(db.Integer, nullable=False)
    userId = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Integer, nullable=False)
    shares = db.Column(db.Integer, nullable=False)
    createdAt = db.Column(db.Date, default=date.today)
    updatedAt = db.Column(db.Date, default=date.today)
    