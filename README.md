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

### DELETE /articles/:id

- deletes single article by id

### PUT /articles/:id

- updates article with the updated information passed on request body.
- will update with any of the following: title,url, img or user_id
- returns entire edited object upon successful update

### POST /auth/register

- requires name, username, password, email and optional img
- username and email must be unique, will fail if user is already registered
- example registration:

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
- exaple login:

```
{
	"username": "janeDoe",
	"password": "test"
}
```

- returns message and JWT upon successful log in
- login response example:

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

## Table Details

# Users:

| column   | type                                  |
| -------- | ------------------------------------- |
| id       | primary key, auto-increments          |
| username | string,required (128 characters max)  |
| email    | string, required (128 characters max) |
| password | string, required (128 characters max) |
| name     | string, required (128 characters max) |
| img      | string, optional (300 characters max) |

# Articles:

| column name | type                                       |
| ----------- | ------------------------------------------ |
| id          | primary key, auto-increments               |
| title       | string,required (300 characters max)       |
| url         | string, required (300 characters max)      |
| user_id     | integer, FK references id on 'users' table |
