
require('dotenv').config();
const express = require("express")
const app = express()
const PORT = process.env.port || 3000
const path = require("path")


app.use('/public',express.static(path.join(__dirname,"public")));


const connectDB = require('./config/db');
connectDB();

app.use(express.json());

// setting ejs templating engine
app.set('views', path.join(__dirname, "views"));
app.set('view engine', 'ejs');


// Routes

app.get('/',(req,res) =>{
    res.render("Welcome to backend of Share to me.")
})

app.use('/api/files', require('./routes/files'))
app.use('/files',require('./routes/show'))
app.use('/files/download',require('./routes/download'))


app.listen(PORT, () =>{
    console.log(`Listening on port ${PORT}`);
})