#gives access to certain flask methods
from flask import Blueprint, jsonify, request
#import current user to access users ID
from flask_login import login_required, current_user
#gives access to stock and watchlist tables
from app.models import Watchlist, Stock
#allows interaction with db
from ...instance import db
#import the watchlist model
from ..models import Watchlist

#initialize blueprint
watchlist_routes = Blueprint("watchlist", __name__)

#get all stocks on watchlist
@watchlist_routes.route('/', methods=["GET"])
#requires user to be logged in
@login_required
def get_all_watchlist():
    watchlist_items = Watchlist.query.filter_by(current_user.id = Watchlist.user_id).all() #!Watchlist needs to be included before user_id???
    if watchlist_items:
        return jsonify(item.to_dict() for item in watchlist_items), 200
    return jsonify({"msg":"no stocks on watchlist"}),404

#delete item from watchlist
@watchlist_routes.route('/<int:stockId>', methods=["DELETE"])
@login_required
def delete_watchlist():
    item_to_delete = Watchlist.query.filter_by(current_user.id = Watchlist.user_id, stockId = Watchlist.stock_id).first()
    if item_to_delete:
        db.session.delete(item_to_delete)
        db.session.commit()
        return jsonify({"message": "Stock deleted successfully from watchlist"}), 200
    return jsonify({"error": "Stock could not be found"}), 404

#post a new stock to watchlist
@watchlist_routes.route('/', methods=["POST"])
@login_required
def add_to_watchlist():
    #grab the data from the request
    data = request.get_json()
    #get the stocks price by quering the db using the request stock_id
    stock_price = Stock.query.filterby(id = data["stock_id"]).first() #! Query the stock price each time a new watchlist obj is created???

    try:
        #create a new object which represents one row on the db
        new_item = Watchlist(
            #use curretnusers id 
            user_id = current_user.id,
            stock_id = data["stock_id"]
            #use the price atttribute from the stock_price obj
            price = stock_price.price
            created_at = data['createdAt'],
            updated_at = data['updatedAt']
        )
        #add the new obj to db
        db.session.commit()
        #save changes to db
        return jsonify(new_item.to_dict()), 201
    #if a field is missing
    except KeyError as e:
        return jsonify({"error": f"Missing field: {str(e)}"}), 400
    #all other errors
    except Exception as e:
        return jsonify({"error": str(e)}), 500
