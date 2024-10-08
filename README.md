# Express Backend RBAC

Demonstrating Role Based Access Control (RBAC) in an Express backend app.

## Setup

1. Clone the repository

```
git clone https://github.com/godofgeeks23/express-backend-RBAC.git
```

2. Run `npm install` to install the dependencies
3. Rename the `sample.env` file to `.env` and update the environment variables

```
mv sample.env .env
```

4. Run `npm run dev` to start the server
5. Run `npm test` to run the tests

## Project structure for reference

```
.
├── controllers
│   └── sample.controller.js
├── models
|   ├── sample.model.js
│   └── user.model.js
├── routes
│   └── sample.route.js
├── tests
│   └── sample.test.js
├── app.js
├── server.js
├── package.json
├── README.md
└── .env
```

- `controllers`: Contains the controllers for the routes
- `models`: Contains the models for the MongoDB collections
- `routes`: Contains the routes for the server
- `tests`: Contains the tests for the server
- `app.js`: Main file for the server
- `server.js`: File to start the server
- `package.json`: Contains the dependencies and scripts
- `package-lock.json`: Contains the dependencies and their versions
- `.env`: Contains the environment variables
- `sample.env`: Sample environment file

## NOTE:

- The server runs on port `3000` by default. This can be changed via the `.env` file
