from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Portfolio, Stock, PortfolioStock, db 

portfolio_routes = Blueprint('portfolios', __name__)

@portfolio_routes.route('/', methods=['POST'])
@login_required
def create_portfolio():
    """
    Create a new portfolio for the current user.
    """
    data = request.get_json()
    try:
        portfolio = Portfolio(
            user_id=current_user.id,
            stock_id=data["stock_id"],
            quantity=data["quantity"],
            price=data["price"],
            portfolio_name=data["portfolio_name"]
            # created_at=data['createdAt'],
            # updated_at=data['updatedAt']
        )
        db.session.add(portfolio)
        db.session.commit()
        return jsonify(portfolio.to_dict()), 201
    except KeyError as e:
        return jsonify({"error": f"Missing field: {str(e)}"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@portfolio_routes.route('/<int:portfolio_id>', methods=['GET'])
@login_required
def get_portfolio(portfolio_id):
    """
    Get a specific portfolio by ID for the current user.
    """
    portfolio = Portfolio.query.filter_by(id=portfolio_id, user_id=current_user.id).first()
    if portfolio:
        return jsonify(portfolio.to_dict()), 200
    return jsonify({"error": "Portfolio not found"}), 404

print("TEST TEST TEST",current_user)

@portfolio_routes.route('/', methods=['GET']) #!user id needs to be passed into url, and needs to be seperate from get one portfolio????
@login_required
def get_all_portfolios():
    """
    Get all portfolios for the current user.
    """
    portfolios = db.session.query(Portfolio, Stock).\
    join(PortfolioStock, PortfolioStock.portfolio_id == Portfolio.id).\
    join(Stock, Stock.id == PortfolioStock.stock_id).\
    filter(Portfolio.user_id == current_user.id).all()
    result = {}
    print("TEST TEST TEST",current_user)
    
    for portfolio, stock in portfolios:
        if portfolio.id not in result:
            result[portfolio.id] = {
                "portfolio_id": portfolio.id,
                "portfolio_name": portfolio.portfolio_name,
                "stocks": []
            }
        result[portfolio.id]["stocks"].append({
            "id": stock.id,
            "name": stock.company_name,
            "ticker": stock.ticker,
            "price": stock.price
        })
    response = list(result.values())
    return jsonify(response), 200



@portfolio_routes.route('/<int:portfolio_id>', methods=['PATCH'])
@login_required
def update_portfolio(portfolio_id):
    """
    Update an existing portfolio for the current user.
    """
    data = request.get_json()
    portfolio = Portfolio.query.filter_by(id=portfolio_id, user_id=current_user.id).first()
    if not portfolio:
        return jsonify({"error": "Portfolio not found"}), 404
    try:
        portfolio.price = data.get('price', portfolio.price)
        portfolio.updated_at = data.get('updatedAt', portfolio.updated_at)
        db.session.commit()
        return jsonify(portfolio.to_dict()), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@portfolio_routes.route('/<int:portfolio_id>', methods=['DELETE'])
@login_required
def delete_portfolio(portfolio_id):
    """
    Delete a portfolio for the current user.
    """
    portfolio = Portfolio.query.filter_by(id=portfolio_id, user_id=current_user.id).first()
    if not portfolio:
        return jsonify({"error": "Portfolio not found"}), 404
    db.session.delete(portfolio)
    db.session.commit()
    return jsonify({"message": "Portfolio deleted successfully"}), 200

# Delete stock from user's portfolio
# Removes a stock from the current user's portfolio.
# Refunds stock price to user's account balance.
@portfolio_routes.route('/<int:stock_id>/delete', methods=['DELETE'])
@login_required
def delete_stock_from_portfolio(stock_id):
    portfolio_entry = Portfolio.query.filter_by(user_id=current_user.id, stock_id=stock_id).first()
    if not portfolio_entry:
        return jsonify({"message": "Stock not found in portfolio"}), 404

    user = current_user
    # user.account_balance += portfolio_entry.shares * portfolio_entry.price

    db.session.delete(portfolio_entry)
    db.session.commit()

    return jsonify({
        "message": "Stock removed from portfolio successfully",
        "updated_balance": user.account_balance
    }), 200
