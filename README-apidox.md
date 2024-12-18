###TODO
*Add search url?
*review the stock details, verify they are correct \* Xiau will do search params

### All endpoints that require proper authorization

All endpoints that require authentication and the current user does not have the
correct role(s) or permission(s).

- Request: endpoints that require proper authorization
- Error Response: Require proper authorization
  - Status Code: 403
  - Headers:
    - Content-Type: application/json
  - Body: "message": "Forbidden"

### get current user

Gets current users information

- Require Authentication: true
- Request

  - Method: GET
  - Route path: /api/session
  - Body:

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
      \*Body:
      userName
      firstName
      lastName
      email
      accountBalance
      userId

- Successful Response when there is no logged in user

  - Headers:
    - Content-Type: application/json
  - Status Code: 200
    \*body: {user: null}

- Error Response
  - Headers:
    * Content-Type: application/json
    *status code: 500
    \*body: {msg: user not found}

### Login a user

Creates user session

- Require Authentication: true
- Request

  - Method: POST
  - Route path: /api/login
  - Body:
    credential
    Password

- Successful Response
  - Status Code: 200
  - Headers:
    - Content-Type: application/json

### Logout a user

Ends a users session

- Require Authentication: true
- Request

  - Method: DELETE
  - Route path: /api/logout

- Successful Response
  - Status Code: 200
  - Headers:
    - Content-Type: application/json

### Login a user

Creates user session

- Require Authentication: true
- Request

  - Method: POST
  - Route path: /api/login
  - Body:
    credential
    Password

- Successful Response
  - Status Code: 200
  - Headers:
    - Content-Type: application/json

### Signup

Creates a new user in the DB, and returns current users info, logs them in

- Require Authentication: false
- Request

  - Method: POST
  - Route path: /api/signup
  - Body:
    username
    firstName
    lastName
    email
    password

- Successful Response
  - Status Code: 201
  - Headers:
    - Content-Type: application/json

### Add money to Account Balance

adds money to users account balance

- Require Authentication: true
- Request

  - Method: POST
  - Route path: /api/balance
  - Body: {balance: <dollar amount>}

- Successful Response
  - Status Code: 200
  - Headers:
    - Content-Type: application/json

### withdraw money

removes money from users account balance

- Require Authentication: true
- Request

  - Method: POST
  - Route path: /api/session
  - Body: {withdrawalAmount: <dollar amount>}

- Successful Response
  - Status Code: 200
  - Headers:
    - Content-Type: application/json

### Update user

updates users info

- Require Authentication: false
- Request

  - Method: PATCH
  - Route path: /api/session
  - Body:
    username
    firstName
    lastName
    email
    password

- Successful Response
  - Status Code: 200
  - Headers:
    - Content-Type: application/json

### Delete user

deletes users profile

- Require Authentication: false
- Request

  - Method: DELETE
  - Route path: /api/session
  - Body:

- Successful Response
  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body: {msg: "user deleted"}

### Create new Portfolio for the current user

adds a new portfolio for the logged in user

- Require Authentication: true
- Request

  - Method: POST
  - Route path: /api/portfolios
  - Body:
    id
    companyName
    companyDescription
    ticker
    price
    createdAt
    updatedAt

- Successful Response
  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:
    id
    companyName
    companyDescription
    ticker
    price
    createdAt
    updatedAt
    msg: "successfully created new portfolio"

### Get portfolio by portfolio Id

gets the current users portfolio

- Require Authentication: true
- Request

  - Method: GET
  - Route path: /api/portfolios/:portfolioId
  - Body:

- Successful Response
  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:
    id
    shares
    price
    stockId
    stock

### Get all portfolios for current user

gets the current users portfolio

- Require Authentication: false
- Request

  - Method: GET
  - Route path: /api/user/:userId/portfolios
  - Body:

- Successful Response
  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:
    id
    shares
    price
    stockId

### Update portfolio by portfolio ID

reduces or adds stocks to users portfolio
Update the user account balance, adding our subtracting the total

- Require Authentication: true
- Request

  - Method: PATCH
  - Route path: /api/portfolios/:portfolioId
  - Body:
    price
    shares

- Successful Response
  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body: msg: "successfully update portfolio"

### Delete portfolio by ID

deletes portfolio

- Require Authentication: true
- Request

  - Method: DELETE
  - Route path: /api/portfolios/:portfolioId
  - Body:

- Successful Response
  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body: {msg: "portfolio deleted successfully"}

### Get stock by stock ID

gets all info for one stock

- Require Authentication: false
- Request

  - Method: GET
  - Route path: /api/stocks/:stockId
  - Body:

- Successful Response
  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:
    companyName
    companyDescription
    ticker
    price
    graphImage

### Get all stocks

adds a stock to the users portfolio

- Require Authentication: false
- Request

  - Method: GET
  - Route path: /api/stocks
  - Body:

- Successful Response
  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body: {msg: "stocks loaded successfully"}

### post stock to users portfolio

adds a stock to the users portfolio
Users should be able to update the amount of stocks they want to purchase.

- Require Authentication: true
- Request

  - Method: POST
  - Route path: /api/stocks/:stocksId/buy
  - Body:
    id
    companyName
    companyDescription
    ticker
    price
    createdAt
    updatedAt

- Successful Response
  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body: {msg: "stock added successfully to portfolio"}

### Delete stock form portfolio

deletes stocks from a portfolio

- Require Authentication: true
- Request

  - Method: DELETE
  - Route path: /api/stocks/:stocksId/delete
  - Body:

- Successful Response
  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body: {msg: "stock deleted successfully"}

### Get watchList by current user

gets all the stocks on the current users watchlist

- Require Authentication: false
- Request

  - Method: GET
  - Route path: /api/watchList
  - Body:

- Successful Response
  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:
    id
    shares
    price
    stockId

### post stock to users watchlist

adds a stock to the users watchlist

- Require Authentication: true
- Request

  - Method: POST
  - Route path: /api/watchList
  - Body:
    id
    companyName
    companyDescription
    ticker
    price
    createdAt
    updatedAt

- Successful Response
  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body: {msg: "stock added successfully to watchList"}

### Delete stock form session users watchlist

deletes stocks from watchlist

- Require Authentication: true
- Request

  - Method: DELETE
  - Route path: /api/watchList/:stocksId
  - Body:

- Successful Response
  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body: {msg: "stock deleted successfully"}
