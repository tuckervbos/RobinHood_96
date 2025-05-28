from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    users_data = [
        {'username': 'Demo', 'firstname': 'Demo', 'lastname': 'Demo', 'email': 'demo@aa.io', 'password': 'password', 'account_balance': 1500.50},
        {'username': 'marnie', 'firstname': 'mar', 'lastname': 'nie', 'email': 'marnie@aa.io', 'password': 'password', 'account_balance': 1500.50},
        {'username': 'bobbie', 'firstname': 'bob', 'lastname': 'bie', 'email': 'bobbie@aa.io', 'password': 'password', 'account_balance': 1500.50},
        {'username': 'xiaoxue', 'firstname': 'rich1', 'lastname': 'man', 'email': 'demo1@aa.io', 'password': 'password', 'account_balance': 50000.00},
        {'username': 'jack', 'firstname': 'rich2', 'lastname': 'man', 'email': 'demo2@aa.io', 'password': 'password', 'account_balance': 50000.00},
        {'username': 'tucker', 'firstname': 'rich3', 'lastname': 'man', 'email': 'demo3@aa.io', 'password': 'password', 'account_balance': 50000.00},
        {'username': 'bee', 'firstname': 'rich4', 'lastname': 'man', 'email': 'demo4@aa.io', 'password': 'password', 'account_balance': 50000.00},
        {'username': 'grayson', 'firstname': 'rich5', 'lastname': 'man', 'email': 'demo5@aa.io', 'password': 'password', 'account_balance': 50000.00},
    ]

    # users = []
    for user_data in users_data:
        if not User.query.filter_by(email=user_data['email']).first():
            user = User(
            username=user_data['username'],
            firstname=user_data['firstname'],
            lastname=user_data['lastname'],
            email=user_data['email'],
            password=user_data['password'], 
            account_balance=user_data['account_balance']
            )
            # users.append(user)
            db.session.add_all(user)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
        
    db.session.commit()
