
require('dotenv').config();
const express = require("express")
const app = express()
const PORT = process.env.port || 3000

const connectDB = require('./config/db');
connectDB();

app.use(express.json());

// setting ejs templating engine
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');



app.listen(PORT, () =>{
    console.log(`Listening on port ${PORT}`);
})