from app.models import db, Watchlist, environment, SCHEMA
from sqlalchemy.sql import text


def seed_watchlists():
    watchlists_data = [
        {"user_id": 1, "stock_id": 1},
        {"user_id": 1, "stock_id": 5},
        {"user_id": 2, "stock_id": 2},
        {"user_id": 2, "stock_id": 3},
        {"user_id": 3, "stock_id": 4},
        {"user_id": 3, "stock_id": 6},
        {"user_id": 4, "stock_id": 7},
        {"user_id": 4, "stock_id": 10},
        {"user_id": 5, "stock_id": 9},
        {"user_id": 5, "stock_id": 12},
        {"user_id": 6, "stock_id": 13},
        {"user_id": 6, "stock_id": 16},
        {"user_id": 7, "stock_id": 17},
        {"user_id": 7, "stock_id": 20},
        {"user_id": 8, "stock_id": 23}
    ]
    
    watchlist_obj = []
    for entry in watchlists_data:
        watchlist = Watchlist(
            user_id=entry["user_id"],
            stock_id=entry["stock_id"]
        )
        watchlist_obj.append(watchlist)

    db.session.add_all(watchlist_obj)
    db.session.commit()


def undo_watchlists():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.watchlists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM watchlists"))
        
    db.session.commit()