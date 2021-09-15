# Clearbridge Mobile Engineering: Fun Front to Back

## Prerequisite

In order to build and run the application you need to have the following installed

- MySql with a root user
- Nodejs
- Port `3000` and `8080` are available

## Local Development

The first step is to setup the database and seed it with sample data.

### 1. Migrations

Run the following script

```bash
$ ./db.sh
```

Enter your login root password and the local instance of MySql will be setup with the
necessary tables.

Next to seed the data run

```bash
$ npm run migrations
```

For testing

```bash
$ npm run migrations:test
```

### 2. Installation

Install the local packages by running

```bash
$ npm ci
```

### 3. Build and Start server

First we are going to make the build and start the server. Run the following script

```bash
$ npm run start:server
```

It removes the `./dist` directory and runs the compiled server

Then build and run the client by:

```bash
$ npm run start:client
```

Webpack will make a development build and start a server in watch mode. A new browser window
should open and the app will start.

### 4. Production Deployment

After making any changes you can deploy the app by pushing the code to the remote `production`

```bash
$ git push production main
```

where `main` is the master branch.

This will run la ocal `pre_push` hook to run tests before pushing, the remote will make
a production build and launch the app on the following url:

[http://ec2-18-216-240-53.us-east-2.compute.amazonaws.com/](http://ec2-18-216-240-53.us-east-2.compute.amazonaws.com/)

## Architectural Challenges

### 1. Whether to use a toolchain or build on my own?

There are many toolchains that can setup the front-end app or the deployment chain.
I decided to build from scratch because the app is fairly simple and these tool chains
sometimes come with other packages that would never get used.

They also hide a lot of implementation or deployment details from the developer. That can
make the task of developer easy but I wanted to be able to configure things on my own.

### 2. How to setup the folder structure?

There are numerous approaches to setup the folders and file structure. I decided to setup
my workspace based on how information flows and control is passed. I wanted my folder structure
to layout the actual architecture of the app.

The `client` and `server` folders are separate because these are distinct projects. However, they do share common packages and configurations. These commonalities remain in the root folder and the configurations can be extended and overwritten by the individual app.

These project then have the `src` folder which contains the running application code. The `server` project
has the `routes` folder to contain the routes, whereas the `client` has a similar `pages` folder.

### 3. What is the relationship between Companies and Founders?

Since "Each Founder can only belong to a single company" then we are looking at a 1-to-many
relationship where one Company has many Founders. I decided to have the `companyId` as part of
`founders` table to ensure that each unique founder would have a company. That way 2 founders cannot belong to the same company. I added a `FOREIGN KEY` constraint so that a company cannot be deleted without deleting the corresponding founders, otherwise we will have founders not
belonging to any company.

### 4. What operations the API will support?

Based on the requirements the following operations should be supported:

#### Companies

1. GET for listing of all companies for the main page
2. GET for a particular company for details
3. PUT for editing a particular company
4. POST for adding a new company
5. DELETE for deleting a company

#### Founders

1. GET for listing of all founders by company
2. POST for adding and editing founders.

For founders the POST was used for editing and adding because the client sends a single array
of founders and some of them maybe new and some modified.

### 5. Is editing and creating of companies part of same component or different?

Editing and creating of companies have the same UI so it seems reasonable to use the same component. However, I decided to make them separate to reflect the route since in a user's
mind they are different operations. Though, in future some of the code can be refactored.

## Future Improvements

There are a number of improvements that can be made. Some are listed below:

1. Add more tests especially on the client side
2. Add validation on the backend.
3. Add linting
4. Improve the UI design
5. Add linting and testing to the deployment steps
6. Improve bundling to have chunking
