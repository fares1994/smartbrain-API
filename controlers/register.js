const registerhandler = (req,res,db,bcrypt)=>{
    const { name, email, password } = req.body
    if(!name||!email||!password){return res.status(400).json('empty input')}
    const hash = bcrypt.hashSync(password)
    /* db.transaction(trx => {//there is a problem inserting into login
        //nothing wrong with the database
        //check knex.js syntax
        trx.insert({
            hash: hash,
            email: email
        })
            .into('login')
            .returning('email')
            .then(loginemail => {console.log(loginemail)})
               return trx('users')
                    .returning('*')
                    .insert(
                        {
                            name: name,
                            email: loginemail[0],
                            joinedtime: new Date()
                        })
                    .then(user => { res.json(user[0]) })
            })
            .then(trx.commit)
            .catch(trx.rollback)
    })
        .catch(err => res.status(400).json('unable to register haha'))*/
        db('fares').insert({name:'fares'}).returning('name').then(data=>console.log(data))
}
module.exports={registerhandler:registerhandler}