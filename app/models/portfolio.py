from .db import db, environment, SCHEMA, add_prefix_for_prod

class Portfolio(db.Model):
    __tablename__ = "portfolios"

    __table_args__ = (
        # db.UniqueConstraint("user_id", "portfolio_name", name="unique_user_portfolio_stock"),
        {'schema': SCHEMA} if environment == "production" else {}
    )

    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'), ondelete="CASCADE"), nullable=False)
    stock_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('stocks.id'), ondelete="CASCADE"), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Numeric(precision=10, scale=2))
    portfolio_name = db.Column(db.String(100),nullable=False)


    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "stock_id": self.stock_id,
            "quantity": self.quantity,
            "price": str(self.price) if self.price is not None else None ,
            "portfolio_name": self.portfolio_name,
            "stock": self.stock.to_dict() if self.stock else None,
            "user": self.user.to_dict() if self.user else None,
        }