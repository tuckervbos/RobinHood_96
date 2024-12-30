from app.models import db, PortfolioStock, environment, SCHEMA
from sqlalchemy.sql import text

def seed_portfolio_stocks():
    portfolio_stock_data = [
        {"portfolio_id": 1, "stock_id": 1},
        {"portfolio_id": 1, "stock_id": 5},
        {"portfolio_id": 2, "stock_id": 2},
        {"portfolio_id": 3, "stock_id": 3},
        {"portfolio_id": 3, "stock_id": 4},
        {"portfolio_id": 4, "stock_id": 6},
        {"portfolio_id": 4, "stock_id": 7},
        {"portfolio_id": 5, "stock_id": 9},
        {"portfolio_id": 5, "stock_id": 12},
        {"portfolio_id": 6, "stock_id": 13},
        {"portfolio_id": 6, "stock_id": 16},
        {"portfolio_id": 7, "stock_id": 17},
        {"portfolio_id": 7, "stock_id": 20},
        {"portfolio_id": 8, "stock_id": 23}
    ]
    
    portfolio_stock_obj = []
    for entry in portfolio_stock_data:
        portfolio_stock = PortfolioStock(
            portfolio_id=entry["portfolio_id"],
            stock_id=entry["stock_id"]
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
