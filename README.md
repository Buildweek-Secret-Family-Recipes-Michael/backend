## .env config
DB_HOST=""<br/>
DB_DATABASE=""<br/>
DB_USER=""<br/>
DB_PORT=""<br/>
DB_PASSWORD=""<br/>
PORT="4000"<br/>

JWT_SECRET=""<br/>


## Data models
Recipe Model:
```sh
{<br/>
    name: "Chicken nuggets",<br/>
    userId: "33e86908-5ec6-47ca-b1bf-ed1bf3bcb1e7",<br/>
    category: "dinner",<br/>
    ingredients: [<br/>
        {amount: "0.5 cups", name: "yumm"},<br/>
        {amount: "1 cup", name: "chicken"},<br/>
        {amount: "2 cups", name: "nuggets"},<br/>
    ],<br/>
    instructions: [<br/>
        {stepNum: "1", name: "cook chicken"},<br/>
        {stepNum: "2", name: "cook nuggets"},<br/>
        {stepNum: "3", name: "eat, yumm!"}<br/>
    ]<br/>
};
```

User Model:
```sh
{
    username: "userName",
    password: "password"
};
```

## Endpoints