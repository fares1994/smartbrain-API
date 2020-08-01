const registerhandler = (req,res,db,bcrypt)=>{
    const { name, email, password } = req.body
    if(!name||!email||!password){return res.status(400).json('empty input')}
    const hash = bcrypt.hashSync(password)
    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
            .into('login')
            .returning('email')
            .then(loginemail => {
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
    })//the problem is here it keeps catching an error FIND IT!!!
        .catch(err => res.status(400).json('unable to register'))
}
module.exports={registerhandler:registerhandler}