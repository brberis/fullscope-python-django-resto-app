[comment]: <> (This readme was created by Nodinq Readme Generator)
![alt text](https://img.shields.io/badge/License-MIT-brightgreen)
![alt text](https://img.shields.io/badge/Ver.-0.0.0-blue)

# Python Django React NextJs Resto App


## Description

This project under development is a web application for managing a restaurant and catering company. It is built using a combination of technologies including Django, Next.js, REST API, React Redux, MySQL, JWT authentication, and Tailwind CSS. The application is deployed on DigitalOcean Droplet using NodeJs, NGINX and Gunicorn.


The application includes several features to aid in managing the business, such as:

- Control Inventory: Keep track of stock levels and manage inventory.
- Manage Recipes: Create, update and delete recipes, and manage recipe ingredients
- Order and Billing System: Create and manage orders and billing
- Event Calendar: Schedule and manage events
- Catering Administration: Manage catering services and orders
- Employee Schedule: Create and manage employee schedules
- Production and Labor: Track production and labor costs
- Quote manager: Create, manage and track quotes.

This project aims to provide an all-in-one solution for managing a restaurant and catering company, allowing for streamlined operations and easy access to important information.

## User Story

As a restaurant manager, I want to use a web application to control my inventory, manage recipes, create and manage orders and billing, schedule and manage events, manage catering services, create and manage employee schedules, track production and labor costs, and create, manage and track quotes, so that I can streamline my operations and have easy access to important information.

As a chef, I want to be able to create, update and delete recipes, manage recipe ingredients, and view inventory levels so that I can plan my menus and ensure I have the necessary ingredients on hand.

As an event planner, I want to be able to view the catering menu, create catering orders, track quotes and manage a team so that I can plan and manage events effectively.

As an owner, I want to be able to view and manage financial information, including orders and billing, so that I can accurately track the financial health of the business. Plus view all the above information in one place, so that I can make informed decisions about the business.

<img src="https://github.com/brberis/python-django-react-nextjs-jwt/blob/main/web.jpg?raw=true" width="300px" >


## User Story

As a developer, I want a starting point code to develop a full-stack web application using Django and Next.js, so that I can efficiently create advanced and dynamic web applications with ease.

This repository contains a sample project that provides a starting point for developers who wish to build a full-stack web application using Django and Next.js. It demonstrates how to use Django as the backend and Next.js as the frontend, with JSON Web Tokens (JWT) for authentication. The project includes a Django server that serves a REST API and a Next.js frontend that consumes the API. The frontend uses JWT for authentication and authorization, with the Django server serving as the JWT issuer and verifier.

By using this project as a starting point, I can save development time by having a structured codebase and can easily build on top of it, to create advanced and dynamic web applications with ease.

## Installation

Set your virtual environment and Install requirements: 
<br />
### Backend
```
$ pip install -r requirements/base.txt
$ python manage.py makemigrations
$ python manage.py migrate
$ python manage.py runserver 4001
```
<br />
<br />

### Frontend
In /www 
<br />

```
$ npm install
$ npm run dev
```

<br />
<br />
Create front and backend .env files.

## Features

- JSON Web Token (JWT) authentication and authorization
-  Django server serving as a REST API and JWT issuer/verifier
-  Next.js frontend consuming the API and using JWT for authentication/authorization
-  User registration and login functionality
-  Secure password hashing and storage
-  REST API endpoints for retrieving and updating data
-  Server-side rendering with Next.js
-  Option to use database such as PostgreSQL or MySQL
-  Django Celery and signals to manage sync process after a backend event
-  Functionality to build and deploy the project to production.
-  Option for adding additional libraries, frameworks and technologies for development
-  Able to be used as a starting point for building full-stack web applications with Django and Next.js.

## Technology

- Django 4.1.4
- React v18
- NextJs v13
- Simple JWT
- Global state with React Redux
- TailwindCSS Ready

## Questions

Please send your questions [here](mailto:cristobal@barberis.com?subject=[GitHub]%20python-django-react-nextjs-jwt) or visit [github/brberis](https://github.com/brberis).

## Credits

* Cristobal A Barberis    

