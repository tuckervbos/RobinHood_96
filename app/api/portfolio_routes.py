from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Portfolio, User, db

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
            company_name=data['companyName'],
            company_description=data['companyDescription'],
            ticker=data['ticker'],
            price=data['price'],
            created_at=data['createdAt'],
            updated_at=data['updatedAt']
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


@portfolio_routes.route('/', methods=['GET'])
@login_required
def get_all_portfolios():
    """
    Get all portfolios for the current user.
    """
    portfolios = Portfolio.query.filter_by(user_id=current_user.id).all()
    return jsonify([portfolio.to_dict() for portfolio in portfolios]), 200


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