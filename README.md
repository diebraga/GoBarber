<h1 align="center">
<br>
  <img src="logo.svg" alt="GoBarber" width="90">
<br>
<br>
Gobarber API
</h1>

<p align="center">An barber API generates appointments >

<p align="center">
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square" alt="License MIT">
  </a>
</p>

<hr />

## Features

- [Node.js](https://nodejs.org/en/) 8.0.0 ou >
- [Yarn](https://yarnpkg.com/pt-BR/docs/install)

A Node.js API built with Express and all the latest tools and best practices in development!

- 📗 **Express** — Microframework for Node.js
- 📕 **Sequelize** — SQL dialect ORM for Node.js
- 📙 **MongoDB** — document-based database
- 📒 **Redis** — key-value data model
- 📔 **Yup** - Object schema validation
- 📘 **Sentry** - cross-platform application monitoring
- 📧 **Nodemailer** - Send e-mails with Node.JS
- ✅ **Lint** — ESlint/Prettier/Editor Config

## Get Started

1. Clone this repository.
2. Run `yarn` to add dependencies.<br />
3. Run `yarn start` and `yarn queue` to run the background jobs at your `http://localhost:3000`<br />
4. Replace all environment variables.<br/>

# Create 3 diferents containers using docker for your Database.

- `docker run --name redisbarber -p 6379:6379 -d -t redis:alpine`;
- `docker run --name mongobarber -p 27017:27017 -d -t mongo`;
- `docker run --name some-postgres -e POSTGRES_PASSWORD=docker -p 5433:5432 -d postgres`;

! Rebooting your machine, you'll need start your containers.
💖💖💖💖

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
