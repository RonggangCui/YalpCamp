# Yelp Camp RC

Welcome to the **Yelp Camp RC** repository! This repo is a product remake of the web app I developed in summer 2022. I've updated many features and implemented a robust 3-tier deployment. Visit the app at [Yelp Camp RC](https://www.yelp-camp-rc.com/) and become an active user today! This guide will walk you through the project structure and the usage of each package.

## Table of Contents
- [Introduction](#introduction)
- [App Structure](#app-structure)
- [Package Usage](#package-usage)

## Introduction

**Yelp Camp RC** is a modern web application where outdoor enthusiasts can discover, share, and review campgrounds. Whether you're planning your next adventure or just browsing for inspiration, our platform offers a user-friendly interface and extensive features to make your experience seamless.

## App Structure

The application is meticulously organized into various directories and files to ensure clarity and maintainability:

- **`.ebextensions`**: Configuration files for AWS Elastic Beanstalk, streamlining deployment.
- **`.platform`**: Custom platform hooks for specific configurations.
- **`AWS`**: AWS-specific scripts and settings.
- **`controllers`**: Handles the core logic for managing HTTP requests and interacting with models.
- **`models`**: Defines the data structure and schema for MongoDB.
- **`public`**: Contains static assets like images, CSS, and client-side JavaScript.
- **`routes`**: Manages the routing logic, defining the endpoints.
- **`seeds`**: Scripts to seed the database with initial data for testing and development.
- **`utils`**: Utility functions and helpers for various tasks.
- **`views`**: HTML templates rendered by the server, providing a dynamic user interface.

Key files include:
- **`app.js`**: The main entry point of the application, initializing the Express server.
- **`middleware.js`**: Custom middleware for processing requests and responses.
- **`schemas.js`**: Defines validation schemas to ensure data integrity.
- **`package-lock.json`**: Details the exact dependency tree for consistent installs.
- **`package.json`**: Lists the project dependencies and scripts.
- **`LICENSE`**: Contains licensing information for the project.

## Package Usage

### Core Packages

- **Express**: A minimal and flexible Node.js web application framework for building robust APIs.
- **Mongoose**: Elegant MongoDB object modeling for Node.js, providing schema-based solutions.
- **dotenv**: Module that loads environment variables from a `.env` file into `process.env`, keeping sensitive data secure.
- **bcrypt**: Library for hashing passwords, enhancing security measures.
- **jsonwebtoken**: Implementation of JSON Web Tokens (JWT) for secure user authentication.
- **cors**: Middleware for enabling CORS (Cross-Origin Resource Sharing) in Express apps.
- **morgan**: HTTP request logger middleware for Node.js, providing detailed request logs.
- **body-parser**: Middleware to parse incoming request bodies in a middleware before your handlers, available under `req.body`.

---

By following this README, you should have a clear understanding of how to get started with the project, how the application is structured, and how each package is used. Dive into the code, contribute, or simply enjoy using Yelp Camp RC. Feel free to reach out if you have any questions or need further assistance.
