from app.models import db, Portfolio, environment, SCHEMA
from sqlalchemy.sql import text
# from decimal import Decimal

def seed_portfolios():
    portfolios_data = [
        {"user_id": 1, "portfolio_name": "Portfolio A"},
        {"user_id": 2, "portfolio_name": "Portfolio A"},
        {"user_id": 2, "portfolio_name": "Portfolio B"},
        {"user_id": 3, "portfolio_name": "Portfolio A"},
        {"user_id": 3, "portfolio_name": "Portfolio C"},
        {"user_id": 4, "portfolio_name": "Portfolio D"},
        {"user_id": 5, "portfolio_name": "Portfolio E"},
        {"user_id": 6, "portfolio_name": "Portfolio F"},
        {"user_id": 6, "portfolio_name": "Portfolio G"},
        {"user_id": 7, "portfolio_name": "Portfolio H"},
        {"user_id": 8, "portfolio_name": "Portfolio I"}
    ]
    
    portfolio_obj = []
    for entry in portfolios_data:
        portfolio = Portfolio(
            user_id=entry["user_id"],
            portfolio_name=entry["portfolio_name"],
            # quantity=entry["quantity"],
            # price=entry["price"]
        )
        portfolio_obj.append(portfolio)

    db.session.add_all(portfolio_obj)
    db.session.commit()


def undo_portfolios():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.portfolios RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM portfolios"))
        
    db.session.commit()