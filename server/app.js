const express = require('express');
const app = express();
const PORT = process.env.PORT || 8006;
const cors = require('cors')
const cookieParser = require('cookie-parser')

require('./init_mongo/database');
require('dotenv').config()

app.use(express.json());
app.use(cors())
app.use(cookieParser())

const auth = require('./routes/routes')

app.use(auth );



app.listen(PORT , () =>{
    console.log(`Server is listening on PORT => ${PORT}`)
})