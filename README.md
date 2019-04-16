# Pintereach API

## Base URL: https://pintereach-buildweek.herokuapp.com/

## Endpoints

### GET /users

- returns array of users, used for testing purposes

### GET /users/:id

- returns single user by id

### GET /aricles

- returns array of all articles in database

### GET /users/:id/articles

- returns articles saved by user

### GET /articles/:id

- returns single article by id

### POST /auth/register

- requires name, username, password, email and optional img
- username and email must be unique, will fail if user is already registered

```
{
	"username": "korynewton",
	"password": "password",
	"name": "Kory Newton",
	"email":"korynewton@testingemail.com",
	"img": "https://media.istockphoto.com/vectors/user-sign-icon-person-symbol-human-avatar-vector-id639085682?k=6&m=639085682&s=612x612&w=0&h=z8N0zm0o750rt3qJaHFgWrdFIeyOSMAbq0uUm25bTm4="
}
```

### POST /auth/login

- requires username and password

```
{
	"username": "janeDoe",
	"password": "test"
}
```

- returns message and JWT upon successful log in

```
{
  "message": "welcome janeDoe",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoyLCJ1c2VybmFtZSI6ImphbmVEb2UiLCJyb2xlcyI6WyJVc2VyIl0sImlhdCI6MTU1NTM4MDQxMywiZXhwIjoxNTU1NDY2ODEzfQ.P6bGrwC_4uNu9aKK2_C2YWcs0EdChOJIGeQ6EIje5no"
}
```

### POST /articles

- adds article to database
- title, url, and user_id required, optional img

```
{
	"title":"Emergence of the geometric phase from quantum measurement back-action",
	"url": "https://www.nature.com/articles/s41567-019-0482-z",
	"user_id": 4
}
```

- returns article object with id to client upon successful POST
