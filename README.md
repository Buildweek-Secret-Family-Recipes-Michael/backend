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
```$xslt
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
```$xslt
{
    username: "userName",
    password: "password"
};
```

## Endpoints
Baseurl: https://secret-family-recipes-pt16.herokuapp.com/


#### Recipes:
* post recipe: /api/recipes<br/>
This is a restricted route, and a token needs to be given in the authorization header
#####data models that can be passed:
```$xslt
{
    name: "Chicken nuggets",
    category: "dinner",
    ingredients: [
        {amount: "0.5 cups", name: "yumm"},
    ],
    instructions: [
        {stepNum: "1", name: "cook chicken"},
    ]
};


{
    name: "Chicken nuggets",
    category: "dinner",
    instructions: [
        {stepNum: "1", name: "cook chicken"},
    ]
};


{
    name: "Chicken nuggets",
    category: "dinner",
    ingredients: [
        {amount: "0.5 cups", name: "yumm"},
    ],
};


{
    name: "Chicken nuggets",
    category: "dinner",
};

```

#### Users
* post user: /api/users/register
#####data models that can be passed:
```$xslt
{
    username: "User",
    password: "password"
}
```
* login: /api/users
#####data models that can be passed:
```$xslt
{
    username: "User",
    password: "password"
}
```
* update user: /users/:id<br/>
This endpoint can only be used for updating username at the moment, and a token needs to be given in the authorization header
#####data models that can be passed:
```$xslt
{
    username: "User",
    password: "password"
}
```