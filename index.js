const express = require('express'); // This bring in express
const path = require('path'); // Path module node js module
const exphbs = require('express-handlebars');
const logger = require('./middleware/logger.js');
const members = require('./Members'); // Access to the array

const app = express(); // Init a value with express
//To Create a route, 'app'. The type of request you want to handle
//When you go to webpage that is a get request. Request and respounce
//res.send sends to the browser

// Handlebars Middleware 
app.engine('handlebars', exphbs({defaultLayout: 'main'}));  
app.set('view engine', 'handlebars');

//Body Parser Middleware, spends back responce json in postman
app.use(express.json());
app.use(express.urlencoded({ extended: false })); //Handle urlencoded data

// Home page router and passing a variable. Note: using <!-- --> for commenting give me an error if up in inext.handlebars

app.get('/', (req, res) => 
{
        res.render('indexx', 
        {
                title: 'Member Appppp',
                members
        });
});


/*-
app.get('/', (req, res) => res.render('index', {
        title: 'Member App',
        members   // Same as members: members
        })
);
*/
//Init middleware, really cool. "Hello from logger" prints in cmd.
//We can run anythin inside middleware i.e 'const logger = (...).
//app.use(logger);
    /*
    //More res function exist.
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
    */

//Static folder.Note: if you order stack folder first than app.get than you'll static page
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/members', require('./routes/api/members')); // Looks like you point to the function in 'require()='
//app.use('/JunkMembers', require('./routes/api/members')); // Looks like hitting url 'http://localhost:5000/Junkmembers/3'

const PORT = process.env.PORT || 5000 // Check's the enviroment's port, when server runs online. port enviroment

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

/*
Note:   To have automatic reload we can use 'npm i -D nodemon'.
        Constant watches server. 'D' for development.
        Also include "dev": "nodemon index" in json. And then
        "npm run dev" in cmd.
        
        Looks like in package.json, it looks like scripts only run js files only

        keyword: JSON api, render templates with dynamic data, middle ware funcation

*/