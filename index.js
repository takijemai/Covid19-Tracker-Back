const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors') 
const cookies = require('cookie-parser')
const app = express()
const corsOptions ={
  origin:'http://localhost:4200', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}

app.use(cors(corsOptions))



const auth = require('./routes/authroute')
const covid= require('./routes/operationsroutes')



app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({limit: '50mb',extended:true}))
app.use(cookies())


mongoose.Promise= global.Promise
mongoose.connect('mongodb+srv://cluster0.ciybmqk.mongodb.net/covidapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  user: 'chatapp',
  pass: 'Ta50356686'
})
.then(() => {
  console.log('Connected to the MongoDB Atlas cluster covidapp');
})
.catch((error) => {
  console.error('Error connecting to the MongoDB Atlas cluster covidapp', error);
});



app.use('/api/covidapp', auth)
app.use('/api/covidapp',covid)


app.listen(3000, ()=>{
    console.log('Covid app work perfectly')
})