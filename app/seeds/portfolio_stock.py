from app.models import db, PortfolioStock, environment, SCHEMA
from sqlalchemy.sql import text
from decimal import Decimal


def seed_portfolio_stocks():
    portfolio_stock_data = [
        {"portfolio_id": 1, "stock_id": 1, "quantity": 3, "price": Decimal('150.00')},
        {"portfolio_id": 1, "stock_id": 5, "quantity": 4, "price": Decimal('120.00')},
        {"portfolio_id": 2, "stock_id": 2, "quantity": 2, "price": Decimal('130.00')},
        {"portfolio_id": 3, "stock_id": 3, "quantity": 1, "price": Decimal('170.00')},
        {"portfolio_id": 3, "stock_id": 4, "quantity": 3, "price": Decimal('180.00')},
        {"portfolio_id": 4, "stock_id": 6, "quantity": 1, "price": Decimal('110.00')},
        {"portfolio_id": 4, "stock_id": 7, "quantity": 2, "price": Decimal('90.00')},
        {"portfolio_id": 5, "stock_id": 9, "quantity": 1, "price": Decimal('140.00')},
        {"portfolio_id": 5, "stock_id": 12, "quantity": 4, "price": Decimal('160.00')},
        {"portfolio_id": 6, "stock_id": 13, "quantity": 2, "price": Decimal('200.00')},
        {"portfolio_id": 6, "stock_id": 16, "quantity": 1, "price": Decimal('180.00')},
        {"portfolio_id": 7, "stock_id": 17, "quantity": 3, "price": Decimal('160.00')},
        {"portfolio_id": 7, "stock_id": 20, "quantity": 1, "price": Decimal('150.00')},
        {"portfolio_id": 8, "stock_id": 23, "quantity": 4, "price": Decimal('140.00')}
    ]
    
    portfolio_stock_obj = []
    for entry in portfolio_stock_data:
        portfolio_stock = PortfolioStock(
            portfolio_id=entry["portfolio_id"],
            stock_id=entry["stock_id"],
            quantity=entry["quantity"],
            price=entry["price"]
        )
        portfolio_stock_obj.append(portfolio_stock)

    db.session.add_all(portfolio_stock_obj)
    db.session.commit()

def undo_portfolio_stocks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.portfolio_stocks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM portfolio_stocks"))
        
    db.session.commit()