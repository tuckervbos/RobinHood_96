from app.models import db, Portfolio, environment, SCHEMA
from sqlalchemy.sql import text
from decimal import Decimal


def seed_portfolios():
    portfolios_data = [
        {"user_id": 1, "stock_id": 1, "quantity": 10, "price": Decimal('145.30')},
        {"user_id": 1, "stock_id": 5, "quantity": 15, "price": Decimal('2844.30')},
        {"user_id": 2, "stock_id": 2, "quantity": 20, "price": Decimal('299.35')},
        {"user_id": 2, "stock_id": 3, "quantity": 8, "price": Decimal('700.80')},
        {"user_id": 3, "stock_id": 4, "quantity": 5, "price": Decimal('3332.10')},
        {"user_id": 3, "stock_id": 6, "quantity": 12, "price": Decimal('332.10')},
        {"user_id": 4, "stock_id": 7, "quantity": 25, "price": Decimal('221.10')},
        {"user_id": 4, "stock_id": 10, "quantity": 30, "price": Decimal('145.40')},
        {"user_id": 5, "stock_id": 9, "quantity": 40, "price": Decimal('175.50')},
        {"user_id": 5, "stock_id": 12, "quantity": 50, "price": Decimal('153.00')},
        {"user_id": 6, "stock_id": 13, "quantity": 35, "price": Decimal('223.40')},
        {"user_id": 6, "stock_id": 16, "quantity": 22, "price": Decimal('61.90')},
        {"user_id": 7, "stock_id": 17, "quantity": 18, "price": Decimal('47.50')},
        {"user_id": 7, "stock_id": 20, "quantity": 8, "price": Decimal('160.90')},
        {"user_id": 8, "stock_id": 23, "quantity": 10, "price": Decimal('280.60')}
    ]
    
    portfolio_obj = []
    for entry in portfolios_data:
        portfolio = Portfolio(
            user_id=entry["user_id"],
            stock_id=entry["stock_id"],
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