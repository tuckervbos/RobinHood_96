from flask import Blueprint, jsonify, request

from flask_login import login_required, current_user

from app.models import Watchlist, Stock, db,WatchlistStock

watchlist_routes = Blueprint('watchlists', __name__) 
# change watchlist to watchlists???

# checked
@watchlist_routes.route('/', methods=['POST'])
@login_required
def create_watchlist():
    """
    Create a new watchlist for the current user.
    """
    data = request.get_json()
    try:
        watchlist = Watchlist( 
            user_id=current_user.id,
            # stock_id=data["stock_id"],
            # When we create a watchlist, is it mandatory to have a stock?
            watchlist_name=data["watchlist_name"]
        )
        db.session.add(watchlist)
        db.session.commit()
        return jsonify(watchlist.to_dict()), 201
    except KeyError as e:
        return jsonify({"error": f"Missing field: {str(e)}"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# maybe we dont need this route
@watchlist_routes.route('/<int:watchlist_id>', methods=['GET'])
@login_required
def get_watchlist(watchlist_id):
    """
    Get a specific watchlist by ID for the current user.
    """
    watchlist = Watchlist.query.filter_by(id=watchlist_id, user_id=current_user.id).first()
    if watchlist:
        return jsonify(watchlist.to_dict()), 200
    return jsonify({"error": "watchlist not found"}), 404

# checked
@watchlist_routes.route('/', methods=['GET'])
@login_required
def get_all_watchlists():
    """
    Get all watchlists for the current user.
    """
    # watchlists = Watchlist.query.filter_by(user_id=current_user.id).all()
    # return jsonify([watchlist.to_dict() for watchlist in watchlists]), 200
    watchlists = db.session.query(Watchlist, Stock).\
    outerjoin(WatchlistStock, WatchlistStock.watchlist_id == Watchlist.id).\
    outerjoin(Stock, Stock.id == WatchlistStock.stock_id).\
    filter(Watchlist.user_id == current_user.id).all()
    result = {}
    
    for watchlist, stock in watchlists:
        if watchlist.id not in result:
            watchlist_data = result.setdefault(watchlist.id, {
            "watchlist_id": watchlist.id,
            "watchlist_name": watchlist.watchlist_name,
            "stocks": [] 
        })
        if stock:
            watchlist_data["stocks"].append({
                "id": stock.id,
                "name": stock.company_name,
                "ticker": stock.ticker,
                "price": stock.price
            })
    response = list(result.values())
    return jsonify(response), 200






# checked
@watchlist_routes.route('/<int:watchlist_id>', methods=['DELETE'])
@login_required
def delete_watchlist(watchlist_id):
    """
    Delete a watchlist for the current user.
    """
    watchlist = Watchlist.query.filter(Watchlist.id==watchlist_id,Watchlist.user_id==current_user.id).first()
    if not watchlist:
        return jsonify({"error": "watchlist not found"}), 404
    db.session.delete(watchlist)
    db.session.commit()
    return jsonify({"message": "watchlist deleted successfully"}), 200

# checked
@watchlist_routes.route('/<int:watchlist_id>/<int:stock_id>/delete', methods=['DELETE'])
@login_required
def delete_stock_from_watchlist(watchlist_id,stock_id):
    watchlist = Watchlist.query.filter_by(id=watchlist_id, user_id=current_user.id).first()
    if not watchlist:
        return jsonify({"message": "Watchlist not found or access denied"}), 404
    
    watchlist_stock = WatchlistStock.query.filter_by(watchlist_id=watchlist_id, stock_id=stock_id).first()
    if not watchlist_stock:
        return jsonify({"message": "Stock not found in the specified watchlist"}), 404

    db.session.delete(watchlist_stock)
    db.session.commit()

    return jsonify({
        "message": "Stock removed from watchlist successfully",
    }), 200

