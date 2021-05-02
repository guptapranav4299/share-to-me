const router = require('express').Router()
const File = require('../models/fileSchema')

router.get('/:uuid', async (req,res) =>{
    
    try{
        const file = await File.findOne({ uuid: req.params.uuid })
        if(!file){
            res.json('download',{ error: 'Link has expired'})            
        }

        return res.render('download',{
            uuid: file.uuid,
            fileName: file.filename,
            fileSize: file.size,
            downloadLink: `${process.env.APP_BASE_URL}/files/download/${file.uuid}`
        })
    }
    catch(err){
        res.json('download',{ error: 'Something went wrong'})
    }


})

module.exports = router