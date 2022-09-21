# simple-crud-api

## Set up
npx prisma migrate dev --name init

npx ts-node ./src/prisma/seed.ts

## How to use
Three users are automatically generated. User name and password are as follows:

**Password in DB is hashed.**

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

You can use the username and password for login.