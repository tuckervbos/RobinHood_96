from app.models import db, Portfolio, environment, SCHEMA
from sqlalchemy.sql import text
from decimal import Decimal

def seed_portfolios():
    portfolios_data = [
        {"user_id": 1, "portfolio_name": "Portfolio A", "quantity": 10, "price": Decimal('1000.00')},
        {"user_id": 2, "portfolio_name": "Portfolio A", "quantity": 15, "price": Decimal('1200.00')},
        {"user_id": 2, "portfolio_name": "Portfolio B", "quantity": 20, "price": Decimal('1500.00')},
        {"user_id": 3, "portfolio_name": "Portfolio A", "quantity": 25, "price": Decimal('1300.00')},
        {"user_id": 3, "portfolio_name": "Portfolio C", "quantity": 30, "price": Decimal('1100.00')},
        {"user_id": 4, "portfolio_name": "Portfolio D", "quantity": 10, "price": Decimal('1000.00')},
        {"user_id": 5, "portfolio_name": "Portfolio E", "quantity": 5, "price": Decimal('900.00')},
        {"user_id": 6, "portfolio_name": "Portfolio F", "quantity": 12, "price": Decimal('1400.00')},
        {"user_id": 6, "portfolio_name": "Portfolio G", "quantity": 18, "price": Decimal('1600.00')},
        {"user_id": 7, "portfolio_name": "Portfolio H", "quantity": 25, "price": Decimal('1200.00')},
        {"user_id": 8, "portfolio_name": "Portfolio I", "quantity": 30, "price": Decimal('1700.00')}
    ]
    
    portfolio_obj = []
    for entry in portfolios_data:
        portfolio = Portfolio(
            user_id=entry["user_id"],
            portfolio_name=entry["portfolio_name"],
            quantity=entry["quantity"],
            price=entry["price"]
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
