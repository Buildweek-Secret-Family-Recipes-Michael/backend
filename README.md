## .env config
DB_HOST=""<br/>
DB_DATABASE=""<br/>
DB_USER=""<br/>
DB_PORT=""<br/>
DB_PASSWORD=""<br/>
PORT="4000"<br/>

JWT_SECRET=""<br/>


## Data models
#### Recipe Model:
```sh
{
    name: "Chicken nuggets",
    userId: "33e86908-5ec6-47ca-b1bf-ed1bf3bcb1e7",
    category: "dinner",
    ingredients: [
        {amount: "0.5 cups", name: "yumm"},
        {amount: "1 cup", name: "chicken"},
        {amount: "2 cups", name: "nuggets"},
    ],
    instructions: [
        {stepNum: "1", name: "cook chicken"},
        {stepNum: "2", name: "cook nuggets"},
        {stepNum: "3", name: "eat, yumm!"}
    ]
};
```

#### User Model:
```sh
{
    username: "userName",
    password: "password"
};
```

## Endpoints
Baseurl: https://secret-family-recipes-pt16.herokuapp.com/


#### Recipes:
* post recipe: /api/recipes


#### Users
note: The update endpoint is NOT currently secure by way of reset password email or anything like that.
* post user: /api/user/register
* login: /api/user
* update user: /user/:id 