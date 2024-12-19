from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, db

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/user/<int:user_id>', methods=['GET'])
@login_required 
def get_user(user_id): 
    user = users.get(user_id) 
    if not user: 
        return jsonify({'message': 'User not found'}), 404 
    return jsonify(user.to_dict())

@user_routes.route('/user/<int:user_id>', methods=['PUT'])
@login_required 
def update_user(user_id): 
    user = users.get(user_id) 
    if not user: 
        return jsonify({'message': 'User not found'}), 404 
    data = request.get_json() 
    user.username = data.get('username', user.username) 
    user.email = data.get('email', user.email) 
    return jsonify({ 
        'message': 'User updated successfully', 
        'user': user.to_dict() 
        })

@user_routes.route('/user/<int:user_id>', methods=['DELETE'])
@login_required 
def delete_user(user_id): 
    user = users.pop(user_id, None) 
    if not user: 
        return jsonify({'message': 'User not found'}), 404 
    return jsonify({'message': 'User deleted successfully'})

@user_routes.route('/user/<int:user_id>/add_money', methods=['POST'])
@login_required 
def add_money(user_id): 
    user = users.get(user_id) 
    if not user: 
        return jsonify({'message': 'User not found'}), 404 
    data = request.get_json() 
    amount = data.get('amount', 0) 
    user.balance += amount 
    return jsonify({'message': 'Money added successfully', 'balance': user.balance})

@user_routes.route('/user/<int:user_id>/withdraw_money', methods=['POST'])
@login_required 
def withdraw_money(user_id): 
    user = users.get(user_id) 
    if not user: 
        return jsonify({'message': 'User not found'}), 404 
    data = request.get_json() 
    amount = data.get('amount', 0) 
    if amount > user.balance: 
        return jsonify({'message': 'Insufficient balance'}), 400 
    user.balance -= amount 
    return jsonify({'message': 'Money withdrawn successfully', 'balance': user.balance})