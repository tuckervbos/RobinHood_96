from flask import Blueprint, jsonify, request

from flask_login import login_required, current_user

from app.models import Watchlist, db

watchlist_routes = Blueprint('watchlist', __name__)

@watchlist_routes.route('/', methods=['POST'])
@login_required
def create_watchlist():
    """
    Create a new watchlist for the current user.
    """
    data = request.get_json()
    try:
        watchlist = Watchlist( #! Watchlist does not include number of stocks???
            user_id=current_user.id,
            stock_id=data["stock_id"],
            created_at=data['createdAt'],
            updated_at=data['updatedAt']
        )
        db.session.add(watchlist)
        db.session.commit()
        return jsonify(watchlist.to_dict()), 201
    except KeyError as e:
        return jsonify({"error": f"Missing field: {str(e)}"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500


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


@watchlist_routes.route('/', methods=['GET'])
@login_required
def get_all_watchlists():
    """
    Get all watchlists for the current user.
    """
    watchlists = Watchlist.query.filter_by(user_id=current_user.id).all()
    return jsonify([watchlist.to_dict() for watchlist in watchlists]), 200


@watchlist_routes.route('/<int:watchlist_id>', methods=['PATCH'])
@login_required
def update_watchlist(watchlist_id):
    """
    Update an existing watchlist for the current user.
    """
    data = request.get_json()
    watchlist = Watchlist.query.filter_by(id=watchlist_id, user_id=current_user.id).first()
    if not watchlist:
        return jsonify({"error": "watchlist not found"}), 404
    try:
        watchlist.price = data.get('price', watchlist.price) 
        watchlist.updated_at = data.get('updatedAt', watchlist.updated_at)
        db.session.commit()
        return jsonify(watchlist.to_dict()), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@watchlist_routes.route('/<int:watchlist_id>', methods=['DELETE'])
@login_required
def delete_watchlist(watchlist_id):
    """
    Delete a watchlist for the current user.
    """
    watchlist = Watchlist.query.filter_by(id=watchlist_id, user_id=current_user.id).first()
    if not watchlist:
        return jsonify({"error": "Portfolio not found"}), 404
    db.session.delete(watchlist)
    db.session.commit()
    return jsonify({"message": "watchlist deleted successfully"}), 200