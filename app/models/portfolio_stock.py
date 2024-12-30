from .db import db, environment, SCHEMA, add_prefix_for_prod


class PortfolioStock(db.Model):
    __tablename__ = "portfolio_stocks"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    portfolio_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('portfolios.id')), primary_key=True)
    stock_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('stocks.id')), primary_key=True)

    def to_dict(self):
        return {
            "portfolio_id": self.portfolio_id,
            "stock_id": self.stock_id
        }

