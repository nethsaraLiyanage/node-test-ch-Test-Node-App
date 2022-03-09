const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8000;


//Import Routes
const UserAuth = require('./routes/Authentications')
const ItemRoutes = require('./routes/ItemRoutes')

//Middleware
app.use(express.json())

//routes
app.use('/user-auth',UserAuth)
app.use('/item',ItemRoutes)


app.get('/', (req, res) => {
  res.send('Test Node Project (node-test-ch) is up and running...');  
});

//connecting to the database
mongoose.connect(
  process.env.MONGODB_URI,
  {useNewUrlParser: true , useUnifiedTopology:true},
  () =>{
      console.log("connected to the database")
  }
)


app.listen(PORT, () => {
  console.log(`node-test-ch app listening at http://localhost:${PORT}`);
});