const express = require('express');
const app = express();
//express로 app만들기
const PORT = process.env.PORT || 5000;
//default port 5000으로 설정
const connectDB = require('./config/db');

//database 연결하기
connectDB();


app.get('/',(req,res)=> res.send('server running'))

app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`)
})