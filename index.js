const express = require('express')
const path = require('path')
const router = require('./routes/api/members.js')
//const logger = require('./middleware/logger.js')
const exphbs  = require('express-handlebars');
const members  = require('./Members');

const app = express()
 

// set a static folder
//app.use(express.static(path.join(__dirname, 'public')))
// body parser middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))
// handlebars middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


// members api routes
app.use('/api/members', router)
// homepage route
app.get('/', (req, res)=>{
    res.render('index',{
        title: 'amar is the best',
        members
    })
})





const PORT = process.env.PORT || 5000;
 
app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}....`);
})