from flask import Blueprint,jsonify,request
from flask_login import login_required,current_user
from app.models import Stock

search_routes = Blueprint('search_routes', __name__)

@search_routes.route('/search', methods=['GET'])
# @login_required
def search_stocks():
    wanted_stock = request.args.get("input",'').strip()

    if not wanted_stock:
        return jsonify({"message":"Which stock you want to search?????"}),400
    
    stock_result = Stock.query.filter(
        Stock.ticker.ilike(f'%{wanted_stock}%') |
        Stock.company_name.ilike(f'%{wanted_stock}%')
    ).all()

    result_list = []

    for stock in stock_result:
        result_list.append({
            'id': stock.id,
            'ticker': stock.ticker,
            'company_name': stock.company_name,
            'graph_image': stock.graph_image or 'dont have image yet',
            'price': stock.price,
            'company_description':stock.company_description
        })

    return jsonify({'results_list':result_list},200)
