from app.models import db, Watchlist, environment, SCHEMA
from sqlalchemy.sql import text


def seed_watchlists():
    watchlists_data = [
        {"user_id": 1, "watchlist_name": "Watchlist A"},
        {"user_id": 1, "watchlist_name": "Watchlist B"},
        {"user_id": 2, "watchlist_name": "Watchlist C"},
        {"user_id": 2, "watchlist_name": "Watchlist D"},
        {"user_id": 3, "watchlist_name": "Watchlist E"},
        {"user_id": 3, "watchlist_name": "Watchlist F"},
        {"user_id": 4, "watchlist_name": "Watchlist G"},
        {"user_id": 4, "watchlist_name": "Watchlist H"},
        {"user_id": 5, "watchlist_name": "Watchlist I"},
        {"user_id": 5, "watchlist_name": "Watchlist J"},
        {"user_id": 6, "watchlist_name": "Watchlist K"},
        {"user_id": 6, "watchlist_name": "Watchlist L"},
        {"user_id": 7, "watchlist_name": "Watchlist M"},
        {"user_id": 7, "watchlist_name": "Watchlist N"},
        {"user_id": 8, "watchlist_name": "Watchlist O"},
        {"user_id": 8, "watchlist_name": "Watchlist P"},
        {"user_id": 1, "watchlist_name": "Watchlist C"},
        {"user_id": 1, "watchlist_name": "Watchlist D"},
        {"user_id": 1, "watchlist_name": "Watchlist E"},
        {"user_id": 1, "watchlist_name": "Watchlist F"},
    ]

    watchlist_obj = []
    for entry in watchlists_data:
        watchlist = Watchlist(
            user_id=entry["user_id"],
            watchlist_name=entry["watchlist_name"]
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