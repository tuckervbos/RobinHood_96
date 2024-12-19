from flask import Blueprint, jsonify
#import current user to access users ID
from app.models import User
#import db
from ...instance import db
#import the watchlist model
from ..models import Watchlist
#initialize blueprint
bp = Blueprint("watchList", __name__)

#get all stocks on watchlist
@bp.route('/watchlist', methods=["GET"])
def get_all_watchList():
    watchlist_items = Watchlist.query.filter_by(user.id = userId).all() #! what will the user be called???
    if watchlist_items:
        return jsonify(watchlist_items)
    return jsonify({"msg":"no stocks on watchlist"})