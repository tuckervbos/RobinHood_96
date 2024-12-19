from .db import db, environment, SCHEMA, add_prefix_for_prod

class Stock(db.Model):
    __tablename__ = "stocks"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer,primary_key=True)
    company_name = db.Column(db.String(),nullable=False)
    company_description = db.Column(db.String())
    ticker = db.Column(db.String(20), nullable=False, unique=True)
    price = db.Column(db.Numeric(precision=10, scale=2))
    graph_image = db.Column(db.String())


    stock_portfolio = db.relationship("Portfolio",backref="stock", cascade="all, delete-orphan")
    stock_watchlist = db.relationship("Watchlist",backref="stock", cascade="all, delete-orphan")

    def to_dict(self):
        return {
            "id": self.id,
            "company_name": self.company_name,
            "company_description": self.company_description,
            "ticker": self.ticker,
            "price": self.price,
            "graph_image": self.graph_image
        }


    