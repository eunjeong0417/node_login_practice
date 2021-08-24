const express = require('express');
const app = express();
//express로 app만들기
const PORT = process.env.PORT || 5000;
//default port 5000으로 설정
const connectDB = require('./config/db');

//database 연결하기
connectDB();

//body-parser
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('server running'));

//router
app.use('/api/users', require('./routes/api/users'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/auth', require('./routes/api/auth'));

app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`)
})