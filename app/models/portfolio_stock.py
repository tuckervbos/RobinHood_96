from .db import db, environment, SCHEMA, add_prefix_for_prod


class PortfolioStock(db.Model):
    __tablename__ = "portfolio_stocks"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    portfolio_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('portfolios.id')), primary_key=True)
    stock_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('stocks.id')), primary_key=True)
    quantity = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Numeric(precision=10, scale=2))

    def to_dict(self):
        return {
            "portfolio_id": self.portfolio_id,
            "stock_id": self.stock_id,
            "quantity":self.quantity,
            "price":self.price,
<<<<<<< HEAD
        }

=======
        }
>>>>>>> 92be0e5ed394236ee9bc1ce47b8b490743fbb43d
