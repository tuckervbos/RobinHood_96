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
    # print("BACK END TEST =" ,data["name"])
    try:
        portfolio = Portfolio(
            user_id=current_user.id,
            portfolio_name=data["name"]
            # created_at=data['createdAt'],
            # updated_at=data['updatedAt']
        )
        db.session.add(portfolio)
        db.session.commit()
        returnPortfolio= {
            "portfolio_id": portfolio.id,
            "portfolio_name":portfolio.portfolio_name,
            "user_id": portfolio.user_id
        }
        return jsonify(returnPortfolio), 201
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
    
    portfolios = db.session.query(Portfolio, Stock, PortfolioStock).\
    outerjoin(PortfolioStock, PortfolioStock.portfolio_id == Portfolio.id).\
    outerjoin(Stock, Stock.id == PortfolioStock.stock_id).\
    filter(Portfolio.id == portfolio_id).all()
    result = {}
    for portfolio, stock, portfolioStock in portfolios:
        if portfolio.id not in result:
            result[portfolio.id] = {
                "portfolio_id": portfolio.id,
                "portfolio_name": portfolio.portfolio_name,
                "stocks": []
            }
        if stock:  
            result[portfolio.id]["stocks"].append({
                "id": stock.id,
                "name": stock.company_name,
                "ticker": stock.ticker,
                "price": stock.price,
                "quantity": portfolioStock.quantity
            })

    response = list(result.values())
    return jsonify(response), 200




@portfolio_routes.route('/', methods=['GET']) 
@login_required
def get_all_portfolios():
    """
    Get all portfolios for the current user.
    """
    portfolios = db.session.query(Portfolio, Stock).\
    outerjoin(PortfolioStock, PortfolioStock.portfolio_id == Portfolio.id).\
    outerjoin(Stock, Stock.id == PortfolioStock.stock_id).\
    filter(Portfolio.user_id == current_user.id).all()
    result = {}
   
    
    for portfolio, stock in portfolios:
        if portfolio.id not in result:
            result[portfolio.id] = {
                "portfolio_id": portfolio.id,
                "portfolio_name": portfolio.portfolio_name,
                "stocks": []
            }
        if stock:  #! changed code to only add stocks if stocks exist
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
        portfolio.portfolio_name = data['name']
        # portfolio.updated_at = data.get('updatedAt', portfolio.updated_at)
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
    
    #query all stocks in portfolio
    stocks = PortfolioStock.query.filter_by(portfolio_id=portfolio_id).all()
    # print("BACK END TEST= ",stocks)
    # print("old BALANCE",current_user.account_balance)
    sellAmount = 0
    for stock in stocks:
        sellAmount += stock.price * stock.quantity
        #print(f"sellAMount: {sellAmount}, Stock ID: {stock.stock_id}, Portfolio ID: {stock.portfolio_id}")
    #add portfolio.price to users accountbalance
    current_user.account_balance += sellAmount
    # print("NEW BALANCE",current_user.account_balance)

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


@portfolio_routes.route('/sell', methods=['PATCH'])
@login_required
def sell_portfolio():
    """
    Sell a stock in a particular portfolio
    """
    data = request.get_json()
    stock = PortfolioStock.query.filter_by(portfolio_id=data['info']['portfolioId'], stock_id=data['info']['stockId']).first()
    if not stock:
        return jsonify({"error": "stock not found"}), 404

    if stock.quantity <= 0:
        return jsonify({"error": "Insufficient quantity"}), 400
    current_user.account_balance += stock.price
    stock.quantity -= 1

    db.session.commit()
    return jsonify(stock.to_dict()), 200


@portfolio_routes.route('/buy', methods=['PATCH'])
@login_required
def buy_portfolio():
    """
    Buy a stock in a particular portfolio
    """
    # data = request.get_json()
    # stock = PortfolioStock.query.filter_by(portfolio_id=data['info']['portfolioId'], stock_id=data['info']['stockId']).first()
    # if not stock:
    #     return jsonify({"error": "stock not found"}), 404
    # if current_user.account_balance <= 0:
    #     return jsonify({"error": "Insufficient funds"}), 400
    # current_user.account_balance -= stock.price
    # stock.quantity += 1
    # db.session.commit()
    # return jsonify(stock.to_dict()), 200
       
    data = request.get_json()
    portfolio_id = data['info']['portfolioId']
    stock_id = data['info']['stockId']

    portfolio = Portfolio.query.filter_by(id=portfolio_id, user_id=current_user.id).first()
    if not portfolio:
        return jsonify({"error": "Portfolio not found"}), 404

    stock = Stock.query.get(stock_id)
    if not stock:
        return jsonify({"error": "Stock not found"}), 404

    portfolio_stock = PortfolioStock.query.filter_by(portfolio_id=portfolio_id, stock_id=stock_id).first()

    if not portfolio_stock:
        portfolio_stock = PortfolioStock(
            portfolio_id=portfolio_id,
            stock_id=stock_id,
            quantity=1
        )
        db.session.add(portfolio_stock)
    else:
        portfolio_stock.quantity += 1

    if current_user.account_balance < stock.price:
        return jsonify({"error": "Insufficient funds"}), 400
    current_user.account_balance -= stock.price

    db.session.commit()
    return jsonify({
        "portfolio_id": portfolio_id,
        "stock_id": stock_id,
        "quantity": portfolio_stock.quantity,
        "updated_balance": current_user.account_balance
    }), 200


@portfolio_routes.route('/deleteStock', methods=['DELETE'])
@login_required
def delete_stock_portfolio():
    """
    Delete a stock from a particular portfolio, sells all shares
    """
    data = request.get_json()
    stock = PortfolioStock.query.filter_by(portfolio_id=data['info']['portfolioId'], stock_id=data['info']['stockId']).first()
    if not stock:
        return jsonify({"error": "stock not found"}), 404
    sellPrice = stock.price * stock.quantity
    current_user.account_balance += sellPrice
    db.session.delete(stock)
    db.session.commit()
    return jsonify(stock.to_dict()), 200