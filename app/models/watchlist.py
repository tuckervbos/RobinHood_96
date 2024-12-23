from .db import db, environment, SCHEMA, add_prefix_for_prod


class Watchlist(db.Model):
    __tablename__ = "watchlists"

    __table_args__ = (
        {'schema': SCHEMA} if environment == "production" else {}
    )
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    watchlist_name = db.Column(db.String(100), nullable=False)

    stocks = db.relationship(
        "Stock",
        secondary="watchlist_stocks",
        backref="watchlists_in_stock"  # backref for Watchlist -> Stock
    )

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "watchlist_name": self.watchlist_name,
        }

