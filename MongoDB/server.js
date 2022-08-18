const express = require('express');
const app = express();
const server = require('http').Server(app);

const cors = require('cors');
const socket = require('./socket')
const db = require('./db');
const router = require('./network/routes');

// db('mongodb://db_user_node:2PKSVuuySTpZLYBp@ac-vyw82vu-shard-00-00.dqulm0f.mongodb.net:27017,ac-vyw82vu-shard-00-01.dqulm0f.mongodb.net:27017,ac-vyw82vu-shard-00-02.dqulm0f.mongodb.net:27017/test?ssl=true&replicaSet=atlas-tzukkn-shard-0&authSource=admin&retryWrites=true&w=majority')
db('mongodb+srv://db_user_node:2PKSVuuySTpZLYBp@cluster0.dqulm0f.mongodb.net/test?retryWrites=true&w=majority');

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

socket.connect(server);
router(app);

app.use('/app', express.static('public'));

server.listen(3000, () => {
    console.log('Server is running on port 3000');
}).on('error', (err) => {
    console.log(err);
});
