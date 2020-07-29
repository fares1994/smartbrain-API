const Clarifai = require('clarifai');
const app = new Clarifai.App({
    apiKey: '817a81afe0e94181b3562b0da1300093'
  });   
const facedetect =(req,res) =>{
        app.models.predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
        .then(data=>res.json(data))
}

const imagehandler =(req,res,db)=>{
    const { id } = req.body;
    db('users').increment('entries').where({ id })
        .returning('entries')
        .then(entries => res.json(entries[0]))
}
module.exports={
    imagehandler:imagehandler,
    facedetect:facedetect
}