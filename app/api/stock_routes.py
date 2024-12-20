from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Stock, Portfolio, db

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
    shares = data.get('shares', 0)

    if shares <= 0:
        return jsonify({"message": "Shares must be greater than zero"}), 400

    total_price = shares * stock.price
    user = current_user

    if user.account_balance < total_price:
        return jsonify({"message": "Insufficient balance"}), 400

    user.account_balance -= total_price

    portfolio_entry = Portfolio(
        user_id=user.id,
        stock_id=stock.id,
        quantity=stock.quantity,
        price=stock.price
    )
    db.session.add(portfolio_entry)
    db.session.commit()

    return jsonify({
        "message": "Stock added to portfolio successfully",
        "portfolio": portfolio_entry.to_dict(),
        "remaining_balance": user.account_balance
    }), 200

# Delete stock from user's portfolio
# Removes a stock from the current user's portfolio.
# Refunds stock price to user's account balance.
@stock_routes.route('/<int:stock_id>/delete', methods=['DELETE'])
@login_required
def delete_stock_from_portfolio(stock_id):
    portfolio_entry = Portfolio.query.filter_by(user_id=current_user.id, stock_id=stock_id).first()
    if not portfolio_entry:
        return jsonify({"message": "Stock not found in portfolio"}), 404

    user = current_user
    user.account_balance += portfolio_entry.shares * portfolio_entry.price

    db.session.delete(portfolio_entry)
    db.session.commit()

    return jsonify({
        "message": "Stock removed from portfolio successfully",
        "updated_balance": user.account_balance
    }), 200
