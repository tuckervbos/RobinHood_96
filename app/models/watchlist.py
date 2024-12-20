from .db import db, environment, SCHEMA, add_prefix_for_prod

class Watchlist(db.Model):
    __tablename__ = "watchlists"

    __table_args__ = (
        # db.UniqueConstraint("user_id", "watchlist_name", name="unique_user_watchlist_stock"),
        {'schema': SCHEMA} if environment == "production" else {}
    )
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'), ondelete="CASCADE"), nullable=False)
    stock_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('stocks.id'), ondelete="CASCADE"), nullable=False)
    watchlist_name = db.Column(db.String(100),nullable = False)
    

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "stock_id": self.stock_id,
            "watchlist_name": self.watchlist_name,
    
        }

