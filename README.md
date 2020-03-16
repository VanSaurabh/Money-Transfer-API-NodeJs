# Money-Transfer-API-NodeJs
Money transfer api using Node Js

# Technology stack

```bash
Node Js
Express JS
MongoDB
Mongoose
Http Rest API
```

## Available RESTful APIs

```python
Get all accounts
GET - http://localhost:3000/accounts

Get one account by id
GET - http://localhost:3000/accounts/<accountId>

Delete account by id  
DELETE - http://localhost:3000/accounts/<accountId>

Add account
POST - http://localhost:8080/moneytransfer-v1/accounts

Add Transfer Details
POST - http://localhost:3000/transfers

Update Transfer details
PUT - http://localhost:3000/transfers/<transferId>

Delete transfer details
DELETE - http://localhost:3000/<tranferId>
```

## Http Status
```python
200 OK: The request has succeeded
201 OK: New resource has been created
204 OK: The resource has been deleted successfully
400 Bad Request: The request was invalid or cannot be served
404 Not Found: There is no resource behind the URL
500 Internal Server Error: The server encountered an unexpected condition
```

