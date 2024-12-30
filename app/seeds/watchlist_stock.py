from app.models import db, WatchlistStock, environment, SCHEMA
from sqlalchemy.sql import text

def seed_watchlist_stocks():
    watchlist_stock_data = [
        {"watchlist_id": 1, "stock_id": 1},
        {"watchlist_id": 1, "stock_id": 2},
        {"watchlist_id": 1, "stock_id": 3},
        {"watchlist_id": 2, "stock_id": 4},
        {"watchlist_id": 2, "stock_id": 5},
        {"watchlist_id": 2, "stock_id": 6},
        {"watchlist_id": 3, "stock_id": 7},
        {"watchlist_id": 3, "stock_id": 8},
        {"watchlist_id": 3, "stock_id": 9},
        {"watchlist_id": 4, "stock_id": 10},
        {"watchlist_id": 4, "stock_id": 11},
        {"watchlist_id": 4, "stock_id": 12},
        {"watchlist_id": 5, "stock_id": 13},
        {"watchlist_id": 5, "stock_id": 14},
        {"watchlist_id": 5, "stock_id": 15},
        {"watchlist_id": 6, "stock_id": 16},
        {"watchlist_id": 6, "stock_id": 17},
        {"watchlist_id": 6, "stock_id": 18},
        {"watchlist_id": 7, "stock_id": 19},
        {"watchlist_id": 7, "stock_id": 20},
        {"watchlist_id": 7, "stock_id": 21},
        {"watchlist_id": 8, "stock_id": 22},
        {"watchlist_id": 8, "stock_id": 23},
        {"watchlist_id": 8, "stock_id": 24},
        {"watchlist_id": 9, "stock_id": 25},
        {"watchlist_id": 9, "stock_id": 26},
        {"watchlist_id": 9, "stock_id": 27},
    ]
    
    watchlist_stock_obj = []
    for entry in watchlist_stock_data:
        watchlist_stock = WatchlistStock(
            watchlist_id=entry["watchlist_id"],
            stock_id=entry["stock_id"]
        )
        watchlist_stock_obj.append(watchlist_stock)

    db.session.add_all(watchlist_stock_obj)
    db.session.commit()

def undo_watchlist_stocks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.watchlist_stocks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM watchlist_stocks"))
        
    db.session.commit()
