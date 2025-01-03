from .db import db, environment, SCHEMA, add_prefix_for_prod

class Portfolio(db.Model):
    __tablename__ = "portfolios"
    
    __table_args__ = (
        {'schema': SCHEMA} if environment == "production" else {}
    )

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'), ondelete="CASCADE"), nullable=False)
    portfolio_name = db.Column(db.String(100), nullable=False)
    # quantity = db.Column(db.Integer, nullable=False)
    # price = db.Column(db.Numeric(precision=10, scale=2))

    stocks_in_portfolio = db.relationship(
        "Stock",
        secondary="portfolio_stocks",
        back_populates="portfolios_in_stock"  
    )

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "portfolio_name": self.portfolio_name,
            # "quantity": self.quantity,
            # "price": self.price
        }