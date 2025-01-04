from app.models import db, Stock, environment, SCHEMA
from sqlalchemy.sql import text


def seed_stocks():
    stocks_data = [
        {"company_name": "Apple Inc.", "company_description": "American multinational technology company", "ticker": "AAPL", "price": 145.30, "graph_image": "/images/1.webp"},
        {"company_name": "Microsoft Corporation", "company_description": "American multinational technology company", "ticker": "MSFT", "price": 299.35, "graph_image": "/images/2.webp"},
        {"company_name": "Tesla, Inc.", "company_description": "American electric vehicle and clean energy company", "ticker": "TSLA", "price": 700.80, "graph_image": "/images/3.webp"},
        {"company_name": "Amazon.com, Inc.", "company_description": "American multinational technology company", "ticker": "AMZN", "price": 3332.10, "graph_image": "/images/4.webp"},
        {"company_name": "Alphabet Inc.", "company_description": "American multinational conglomerate, parent company of Google", "ticker": "GOOGL", "price": 2844.30, "graph_image": "/images/5.webp"},
        {"company_name": "Meta Platforms, Inc.", "company_description": "American multinational technology conglomerate, parent company of Facebook", "ticker": "META", "price": 332.10, "graph_image": "/images/6.webp"},
        {"company_name": "NVIDIA Corporation", "company_description": "American multinational technology company", "ticker": "NVDA", "price": 221.10, "graph_image": "/images/7.webp"},
        {"company_name": "Twitter, Inc.", "company_description": "American microblogging and social networking service", "ticker": "TWTR", "price": 42.00, "graph_image": "/images/8.webp"},
        {"company_name": "Berkshire Hathaway Inc.", "company_description": "American multinational conglomerate holding company", "ticker": "BRK.A", "price": 448740.00, "graph_image": "/images/9.webp"},
        {"company_name": "Johnson & Johnson", "company_description": "American multinational corporation that develops medical devices and pharmaceuticals", "ticker": "JNJ", "price": 175.50, "graph_image": "/images/10.webp"},
        {"company_name": "Walmart Inc.", "company_description": "American multinational retail corporation", "ticker": "WMT", "price": 145.40, "graph_image": "/images/11.webp"},
        {"company_name": "Procter & Gamble Co.", "company_description": "American multinational consumer goods corporation", "ticker": "PG", "price": 153.00, "graph_image": "/images/12.webp"},
        {"company_name": "Visa Inc.", "company_description": "American multinational financial services corporation", "ticker": "V", "price": 223.40, "graph_image": "/images/13.webp"},
        {"company_name": "Home Depot, Inc.", "company_description": "American home improvement retail corporation", "ticker": "HD", "price": 292.80, "graph_image": "/images/14.webp"},
        {"company_name": "Coca-Cola Company", "company_description": "American multinational corporation that manufactures nonalcoholic beverages", "ticker": "KO", "price": 61.90, "graph_image": "/images/15.webp"},
        {"company_name": "Pfizer Inc.", "company_description": "American multinational pharmaceutical corporation", "ticker": "PFE", "price": 47.50, "graph_image": "/images/16.webp"},
        {"company_name": "Intel Corporation", "company_description": "American multinational corporation and technology company", "ticker": "INTC", "price": 52.40, "graph_image": "/images/17.webp"},
        {"company_name": "AT&T Inc.", "company_description": "American multinational conglomerate holding company", "ticker": "T", "price": 18.20, "graph_image": "/images/18.webp"},
        {"company_name": "ExxonMobil", "company_description": "American multinational oil and gas corporation", "ticker": "XOM", "price": 88.50, "graph_image": "/images/19.webp"},
        {"company_name": "Chevron Corporation", "company_description": "American multinational corporation engaged in energy and petrochemical", "ticker": "CVX", "price": 160.90, "graph_image": "/images/20.webp"},
        {"company_name": "PepsiCo, Inc.", "company_description": "American multinational food and beverage corporation", "ticker": "PEP", "price": 183.40, "graph_image": "/images/21.webp"},
        {"company_name": "McDonald's Corporation", "company_description": "American multinational fast-food corporation", "ticker": "MCD", "price": 280.60, "graph_image": "/images/22.webp"},
        {"company_name": "Walt Disney Company", "company_description": "American multinational diversified entertainment and media conglomerate", "ticker": "DIS", "price": 182.80, "graph_image": "/images/23.webp"},
        {"company_name": "Nike, Inc.", "company_description": "American multinational corporation that designs, manufactures, and markets sports equipment", "ticker": "NKE", "price": 137.70, "graph_image": "/images/24.webp"},
        {"company_name": "Oracle Corporation", "company_description": "American multinational computer technology corporation", "ticker": "ORCL", "price": 86.00, "graph_image": "/images/25.webp"},
        {"company_name": "Salesforce, Inc.", "company_description": "American cloud-based software company", "ticker": "CRM", "price": 208.50, "graph_image": "/images/26.webp"},
        {"company_name": "IBM", "company_description": "American multinational technology company", "ticker": "IBM", "price": 132.60, "graph_image": "/images/27.webp"},
        {"company_name": "AbbVie Inc.", "company_description": "American biopharmaceutical company", "ticker": "ABBV", "price": 159.40, "graph_image": "/images/28.webp"},
        {"company_name": "Lockheed Martin", "company_description": "American aerospace, arms, defense, information security, and technology company", "ticker": "LMT", "price": 455.50, "graph_image": "/images/29.webp"},
        {"company_name": "Starbucks Corporation", "company_description": "American multinational chain of coffeehouses", "ticker": "SBUX", "price": 98.40, "graph_image": "/images/30.webp"},
        {"company_name": "General Electric", "company_description": "American multinational conglomerate corporation", "ticker": "GE", "price": 104.00, "graph_image": "/images/31.webp"},
        {"company_name": "3M Company", "company_description": "American multinational conglomerate", "ticker": "MMM", "price": 175.60, "graph_image": "/images/32.webp"},
        {"company_name": "Abbott Laboratories", "company_description": "American multinational medical devices and health care company", "ticker": "ABT", "price": 113.50, "graph_image": "/images/33.webp"},
        {"company_name": "General Motors", "company_description": "American multinational corporation that designs, manufactures, markets, and distributes vehicles", "ticker": "GM", "price": 53.10, "graph_image": "/images/34.webp"},
        {"company_name": "The Goldman Sachs Group", "company_description": "American multinational investment bank and financial services company", "ticker": "GS", "price": 369.10, "graph_image": "/images/35.webp"},
        {"company_name": "American Express Company", "company_description": "American multinational financial services corporation", "ticker": "AXP", "price": 171.20, "graph_image": "/images/36.webp"},
        {"company_name": "Raytheon Technologies", "company_description": "American multinational conglomerate specializing in aerospace and defense", "ticker": "RTX", "price": 114.50, "graph_image": "/images/37.webp"},
        {"company_name": "Caterpillar Inc.", "company_description": "American manufacturer of construction and mining equipment", "ticker": "CAT", "price": 237.20, "graph_image": "/images/38.webp"},
        {"company_name": "Citigroup Inc.", "company_description": "American multinational investment bank and financial services corporation", "ticker": "C", "price": 48.30, "graph_image": "/images/39.webp"},
        {"company_name": "Morgan Stanley", "company_description": "American multinational investment bank and financial services company", "ticker": "MS", "price": 88.40, "graph_image": "/images/40.webp"}
    ]
    
    stocks = []
    for stock_data in stocks_data:
        stock = Stock(
            company_name=stock_data['company_name'],
            company_description=stock_data['company_description'],
            ticker=stock_data['ticker'],
            price=stock_data['price'],
            graph_image=stock_data['graph_image']
        )
        stocks.append(stock)

    db.session.add_all(stocks)
    db.session.commit()



def undo_stocks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.stocks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM stocks"))
        
    db.session.commit()