from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Stock, Portfolio, Watchlist, db

stock_routes = Blueprint('stocks', __name__)

# Get all stocks
@stock_routes.route('/')
def all_stocks():
    stocks = Stock.query.all()
    return jsonify([stock.to_dict() for stock in stocks]), 200

# Get a single stock by stock ID
@stock_routes.route('/<int:stock_id>')
@login_required
def stock(stock_id):
    stock = Stock.query.filter_by(id=stock_id).first()
    if stock:
        return jsonify(stock.to_dict()), 200
    return jsonify({ 'error': 'Stock not found' }), 404

# Adds a stock to the current user's portfolio. 
# Updates the account balance.
@stock_routes.route('/<int:stock_id>/buy', methods=['POST'])
@login_required
def buy_stock(stock_id):
    stock = Stock.query.get(stock_id)
    if not stock:
        return jsonify({"message": "Stock not found"}), 404

    data = request.get_json()
    quantity = data.get('quantity', 0)

    if quantity <= 0:
        return jsonify({"message": "Quantity must be greater than zero"}), 400

    total_price = quantity * stock.price
    user = current_user

    if user.account_balance < total_price:
        return jsonify({"message": "Insufficient balance"}), 400

    user.account_balance -= total_price

    portfolio_entry = Portfolio(
        user_id=user.id,
        stock_id=stock.id,
        quantity=data["quantity"],
        price=stock.price,
        portfolio_name=data["portfolio_name"]
    )
    db.session.add(portfolio_entry)
    db.session.commit()

    return jsonify({
        "message": "Stock added to portfolio successfully",
        "portfolio": portfolio_entry.to_dict(),
        "remaining_balance": user.account_balance
    }), 200


# add stock to watchlist
@stock_routes.route('/<int:stock_id>/add', methods=['POST'])
@login_required
def add_stock(stock_id):
    data = request.get_json()
    watchlist_name = data.get("watchlist_name")
    stock = Stock.query.get(stock_id)
    if not stock:
        return jsonify({"message": "Stock not found"}), 404

    watchlist = Watchlist.query.filter_by(watchlist_name=watchlist_name, user_id=current_user.id).first()
    if not watchlist:
        return jsonify({"message": "Watchlist not found",}), 404

    if stock in watchlist.stocks:
        return jsonify({"message": "Stock already in watchlist"}), 400


    # watchlist_entry = Watchlist(
    #     user_id=current_user.id,
    #     stock_id=stock.id,
    #     watchlist_name=data["watchlist_name"]
    # )
    # db.session.add(watchlist_entry)
    watchlist.stocks.append(stock)
    db.session.commit()

    return jsonify({
        "message": "Stock added to watchlist successfully",
        "watchlist": watchlist.to_dict()
    }), 200