# Introduction

This project was built with Express (Node) on the backend, React was used for the front end. PostgreSQL was used for the database. This app has been hosted on Vercel including the front-end and the back-end. Supabase has been used to host the PostgreSQL database.
You can see the front end in action here: https://companies-client.vercel.app/
and the backend can be viewed here: https://server-sage-one.vercel.app/


# Folder Structure
The backend and the front end are added in a single repository. The backend code is under the **server** folder while the front-end code is under the **client/companies** folder


# Run Backend on your local


## Prerequisites

- Node.js (version 14 or later)
- PostgreSQL installed on your local machine

## Setup

1. Clone the repository:  https://github.com/austindias16/full-stack-coding-challenge
2. In your Postgres, create a database of your choice
3. Edit the seedingScript.js with details of your choice and run the script. the file is located under the server folder and run `npm install`.
4. Run it with the command `node seedingScript.js`. Your Database should be seeded with the basic data
5. Run `npm start` from the server folder and the backend should be up and running on your local

# Run frontend on your local


## Prerequisites

- Node.js (version 14 or later)

## Setup

1. Assuming the repository is already cloned.
2. Go to your client/companies folder
3. run `npm install` and then `npm run dev` and your code should be up and running
