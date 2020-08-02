const signinhandler = (req, res, db, bcrypt) => {
    const { email, password } = req.body
    if(!email||!password){return res.status(400).json('empty input')}
    db.select('email', 'hash')
    .from('login')
    .where({email})
        .then(data => {
              const isvalid = bcrypt.compareSync(password, data[0].hash)
            if (isvalid) {
                return db.select('*').from('users')
                    .where({ email })
                    .then(
                        user => {
                            res.json(user[0])
                        })
                    .catch(err => res.status(400).json('unable to get user'))
            } else{
                 res.status(400).json('wrong credentials')
                }
        })

    // .catch(res.status(400).json('wrong credentials'))}
    //the problem is here everytime you do a post request with whatever password, the isvalid value is always true
    //if you enter a wrong email it will not respond to front end
    module.exports = {
        signinhandler: signinhandler
    }
