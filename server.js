const express = require('express');
const app = express();
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const signin = require('./controlers/signin');
const register = require('./controlers/register');
const profileid = require('./controlers/profileid')
const image = require('./controlers/image')
const db = knex({
    client: 'postgres',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'zain1994',
        database: 'smartbrain'
    }
})

app.use(express.json())
app.use(cors())
app.post('/signin', (req,res)=>{signin.signinhandler(req,res,db,bcrypt)})
app.post('/register', (req, res) =>{register.registerhandler(req,res,db,bcrypt)})
app.get('/profile/:id', (req, res) =>{profileid.profileidhandler(req,res,db)})
app.put('/image', (req, res) =>image.imagehandler(req,res,db))
app.post('/imageurl',(req,res)=>image.facedetect(req,res))
app.get('/', (req, res) =>
    res.send(database.users))

app.listen(3001)
