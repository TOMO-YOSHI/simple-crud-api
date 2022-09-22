<a name="readme-top"></a>
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]


<br />
<div align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="./assets/images/profile-min.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Simple CRUD API by GraphQL</h3>

  <p align="center">
    Demonstrate my skills regarding Back End Development
    <br />
    <a href="#about-the-project"><strong>Explore the docs »</strong></a>
    <br />
    <br />
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<!-- <details> -->
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li>
      <a href="#usage">Usage</a>
      <ul>
        <li>
          <a href="#authentication---rest-api">Authentication - Rest API</a>
          <ul>
            <li><a href="#login">Login</a></li>
            <li><a href="#signup">Signup</a></li>
          </ul>
        </li>
        <li>
          <a href="#graphql">GraphQL</a>
          <ul>
            <li>
              <a href="#query">Query</a>
              <ul>
                <li><a href="#todo">Todo</a></li>
                <li><a href="#todos">Todos</a></li>
              </ul>
            </li>
            <li>
              <a href="#mutation">Mutation</a>
              <ul>
                <li><a href="#createtodo">createTodo</a></li>
                <li><a href="#updatetodo">updateTodo</a></li>
                <li><a href="#deletetodo">deleteTodo</a></li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </li>
    <li><a href="#data-modeling">Data modeling</a></li>
    <li><a href="#a-room-for-improvements">A room for improvement</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
<!-- </details> -->



<!-- ABOUT THE PROJECT -->
## About The Project

<img src="./assets/images/graphql_ss.png" />

This is a simple GraphQL server that has basic CRUD features with Auth. This API demonstrates how Query and Mutation work. Moreover, Auth works with some operations.
The API is connected to DB running in the local environment. Therefore, you will be able to understand how the GraphQL server is working in the real world. This GraphQL server can be connected to any Postgres DB by changing the DB URL in the .env file.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* Node.js
* Express.js
* GraphQL
* Apollo GraphQL
* TypeScript
* Postgres
* Prisma
* Docker
* Json Web Token

and so on...

You can see the list of packages in [package.json]("./package.json") file.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

There are instructions on setting up this project locally.
To get a local copy up and running follow these simple steps.

### Prerequisites

* node >= v16.17.0
  * [npm](https://nodejs.org/en/download/)
  <!-- ```sh
  npm install npm@16.17.0 -g
  ``` -->
* [docker](https://docs.docker.com/get-docker/)

### Installation
 
1. Clone the repo and enter the directory
   ```sh
   git clone https://github.com/TOMO-YOSHI/simple-crud-api.git
   cd simple-crud-api
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Run DB server by docker-compose
   ```sh
   docker-compose up
   ```
4. Set up DB schema
   ```sh
   npx prisma migrate dev --name init
   ```
5. Insert test data into DB
   ```sh
   npx ts-node ./src/prisma/seed.ts
   ```
6. Run prisma studio to see DB on browser
   ```sh
   npx prisma studio
   ```
   Open `http://localhost:5556` on your browser and confirm the DB is running and the test data was successfully inserted.

   <img src="./assets/images/prisma_studio.png" />

   There should be two entities, `Todo` and `User`.
   And the test data has already been inserted.

   <img src="./assets/images/todo_entity_ss.png" />

7. Run GraphQL-Express server in production-mode
   ```sh
   npm run start
   ```
    - If you encounter any build errors, I recommend you to run GraphQL-Express server in **dev-mode**
      ```sh
      npm run dev
      ```
   Open `http://localhost:4000/graphql` and Click the `Query your server` button.


    <img src="./assets/images/graphql_home_ss.png" />

8. Done 🚀🚀🚀

    You can start calling GraphQL query and mutation on the console

    <img src="./assets/images/graphql_console_ss.png" />

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

In this section, you will be able to know how to use this API server.

### Authentication - Rest API
Some mutation operations are limited to an authorized user. Therefore, you will need to issue an accessToken by sending an HTTP request to either /signup/ or /login/ endpoint.

These auth-related endpoints are **Rest API**.

#### Login
- POST - `http://localhost:4000/api/v1/login`
- Example Request

The body of the request should be structured as follows:

***JSON***
```
{
    "name": "user_1",
    "password": "password1"
}
```

- Example Response

***200***
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjZGM1MGM1NS1mM2ExLTQwODMtOWU1ZS1iNGZmMDhlOGQyODgiLCJpYXQiOjE2NjM4MzM4MzV9.eD8fcZ82y2VJOeCfOCvCNvxOLivpCh9UdvgsdwIe1n0"
}
```


The test user data has already been registered to the DB. You can use users&passwords below:

```
[
  {
    name: "user_1",
    password: "password1"
  },
  {
    name: "user_2",
    password: "password2"
  },
  {
    name: "user_3",
    password: "password3"
  },
]
```

*Password in DB is hashed for security reasons. Therefore, you can not see raw data by looking at DB.*

### Signup
- POST - `http://localhost:4000/api/v1/signup`
- Example Request

The body of the request should be structured as follows:

***JSON***
```
{
    "name": "user_4",
    "password": "password4"
}
```

- Example Response

***200***
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjZGM1MGM1NS1mM2ExLTQwODMtOWU1ZS1iNGZmMDhlOGQyODgiLCJpYXQiOjE2NjM4MzM4MzV9.eD8fcZ82y2VJOeCfOCvCNvxOLivpCh9UdvgsdwIe1n0"
}
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### GraphQL
You can fetch data from DB by GraphQL.

#### Query
#### Todo
- Authorization - NO
- Example Query

***Operation***
```
uery Todo($todoId: Int!) {
  todo(id: $todoId) {
    id
    title
    description
    category
    status
    priority
    userId
  }
}
```
***Variables***

`todoId` variable is required.

```
{
  "todoId": 1
}
```
- Example Response

***200***
```
{
  "data": {
    "todo": {
      "id": 1,
      "title": "user_1_todo_2_title",
      "description": "user_1_todo_2_description",
      "category": "work",
      "status": "pending",
      "priority": 2,
      "userId": "cdc50c55-f3a1-4083-9e5e-b4ff08e8d288"
    }
  }
}
```

#### Todos
- Authorization - NO
- Example Query

***Operation***
```
query Todos($priority: Int, $status: TodoStatus, $category: Category) {
  todos(priority: $priority, status: $status, category: $category) {
    id
    title
    category
  }
}
```
***Variables***

These variables are optional. Please use these variables to filter results.

```
{
  "priority": 1, 
  "status": "pending",
  "category": "other"
}
```
- Acceptable values for "status" and "category" are as follows:
```
enum Category {
  hobby
  work
  study
  other
}

enum TodoStatus {
  done
  pending
}
```

- Example Response

***200***
```
{
  "data": {
    "todos": [
      {
        "id": 2,
        "title": "user_1_todo_3_title",
        "category": "other"
      },
      {
        "id": 5,
        "title": "user_2_todo_4_title",
        "category": "other"
      },
      {
        "id": 9,
        "title": "user_3_todo_2_title",
        "category": "other"
      }
    ]
  }
}
```

#### Mutation

#### createTodo
- Authorization - **YES**
  - AccessToken should be set to Header.
- Example Query

***Operation***
```
mutation Mutation($input: CreateTodoInput!) {
  createTodo(input: $input) {
    id
    title
    description
    category
    status
    priority
    userId
  }
}
```
***Variables***

`title` is required. Others are optional.

```
{
  "input": {
    "title": "Watch movie",
    "description": "Just for a fan",
    "category": "hobby",
    "priority": 3
  }
}
```
- Acceptable values for "status" and "category" are as follows:
```
enum Category {
  hobby
  work
  study
  other
}

enum TodoStatus {
  done
  pending
}
```

***Headers***

`Authorization` is required. Please set AccessToke issued by [login](#login) or [signup](#signup) endpoint.

```
Key:   Authorization
Value: Bearer <YourToken>
```

- Example Response

***200***
```
{
  "data": {
    "createTodo": {
      "id": 14,
      "title": "Watch movie",
      "description": "Just for a fan",
      "category": "hobby",
      "status": "pending",
      "priority": 3,
      "userId": "36254c13-72be-438a-89b9-ce666edc20f9"
    }
  }
}
```

#### updateTodo
- Authorization - **YES**
  - AccessToken should be set to Header.
  - Only an owner of the todo can update it.
- Example Query

***Operation***
```
mutation UpdateTodo($updateTodoId: Int!, $input: UpdateTodoInput!) {
  updateTodo(id: $updateTodoId, input: $input) {
    id
    title
    description
    category
    status
    priority
    userId
  }
}
```
***Variables***

`updateTodoId` is required. Others are optional.

```
{
  "updateTodoId": 14,
  "input": {
    "title": "Walking",
    "description": "For my health",
    "category": "other",
    "status": "pending",
    "priority": 3
  }
}
```
- Acceptable values for "status" and "category" are as follows:
```
enum Category {
  hobby
  work
  study
  other
}

enum TodoStatus {
  done
  pending
}
```

***Headers***

`Authorization` is required. Please set AccessToke issued by [login](#login) or [signup](#signup) endpoint.

```
Key:   Authorization
Value: Bearer <YourToken>
```

- Example Response

***200***
```
{
  "data": {
    "updateTodo": {
      "id": 14,
      "title": "Walking",
      "description": "For my health",
      "category": "other",
      "status": "pending",
      "priority": 3,
      "userId": "36254c13-72be-438a-89b9-ce666edc20f9"
    }
  }
}
```

#### deleteTodo
- Authorization - **YES**
  - AccessToken should be set to Header.
  - Only an owner of the todo can delete it.
- Example Query

***Operation***
```
mutation DeleteTodo($deleteTodoId: Int!) {
  deleteTodo(id: $deleteTodoId) {
    id
    title
    description
    category
    status
    priority
    userId
  }
}
```
***Variables***

`updateTodoId` is required.

```
{
  "deleteTodoId": 14
}
```

***Headers***

`Authorization` is required. Please set AccessToke issued by [login](#login) or [signup](#signup) endpoint.

```
Key:   Authorization
Value: Bearer <YourToken>
```

- Example Response

***200***
```
{
  "data": {
    "deleteTodo": {
      "id": 14,
      "title": "Walking",
      "description": "For my health",
      "category": "other",
      "status": "pending",
      "priority": 3,
      "userId": "36254c13-72be-438a-89b9-ce666edc20f9"
    }
  }
}
```


<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Data modeling

**ER Diagram**

<img src="./assets/images/erd.png" />

There are only two tables in the database since the scale of this project is small enough. The "userId" field in the Todo entity is a foreign key that is the primary key of the User.

The schema is defined in [src/prisma/schema.prisma](src/prisma/schema.prisma).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## A room for improvements

- Problem: AccessToken issued by this server will never expire. However, it should have an expiration time if this project is used in the real world for security reasons.
  - Potential Solution: Use a third-party auth service or set expiration time(+ refreshToken).
- The `.env` file should not be pushed to the GitHub repo if this is a real-world project.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- CONTACT -->
## Contact

Tomohiro Yoshida - tomohiroyoshida10@gmail.com

Portfolio: [https://tomohirodev.com/](https://tomohirodev.com/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/TOMO-YOSHI/simple-crud-api.svg?style=for-the-badge
[contributors-url]: https://github.com/TOMO-YOSHI/simple-crud-api/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/TOMO-YOSHI/simple-crud-api.svg?style=for-the-badge
[forks-url]: https://github.com/TOMO-YOSHI/simple-crud-api/network/members
[stars-shield]: https://img.shields.io/github/stars/TOMO-YOSHI/simple-crud-api.svg?style=for-the-badge
[stars-url]: https://github.com/TOMO-YOSHI/simple-crud-api/stargazers
[issues-shield]: https://img.shields.io/github/issues/TOMO-YOSHI/simple-crud-api.svg?style=for-the-badge
[issues-url]: https://github.com/TOMO-YOSHI/simple-crud-api/issues
[license-shield]: https://img.shields.io/github/license/TOMO-YOSHI/simple-crud-api.svg?style=for-the-badge
[license-url]: https://github.com/TOMO-YOSHI/simple-crud-api/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/tomohiro/
[product-screenshot]: assets/images/graphql_ss.png