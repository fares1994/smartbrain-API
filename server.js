const express = require('express');
const app = express();
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const signin = require('./controlers/signin');
const register = require('./controlers/register');
const profileid = require('./controlers/profileid')
const image = require('./controlers/image')
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
const db = knex({
    client: 'postgres',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: false
    }
})
const port = process.env.PORT
app.use(express.json())
app.use(cors())
app.post('/signin', (req,res)=>{signin.signinhandler(req,res,db,bcrypt)})
app.post('/register', (req, res) =>{register.registerhandler(req,res,db,bcrypt)})
app.get('/profile/:id', (req, res) =>{profileid.profileidhandler(req,res,db)})
app.put('/image', (req, res) =>image.imagehandler(req,res,db))
app.post('/imageurl',(req,res)=>image.facedetect(req,res))
app.get('/', (req, res) =>res.send('it is working'))
app.listen(port||3001)
