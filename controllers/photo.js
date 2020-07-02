const express = require('express');
const router = express.Router();
const Photo = require('../Models/photo');
const imageMimeTypes = ['image/jpeg' , 'image/png' , 'image/gif']

// Index Route
router.get('/' , (req , res) => {
    res.render('index')
})


// photo saving post route
router.post('/photo' , async ( req , res ) => {
    const photo = new Photo({
        name: req.body.name,
    })
    savePhoto(photo , req.body.file);

    try {
        const newPhoto = await photo.save();
        res.redirect('/photo')
    } catch(e) {
        console.log(`error occured ${e}`);
    }
})

// All Photos index page
router.get('/photo' , async (req ,res ) => {
    try {
        const photos = await Photo.find({});
        
        if(photos) {
            res.render('photo' , {photos: photos} );
        }
    } catch(e) {
        console.log(`error occured ${e}`)
    }
})


// Photo Saving Function
function  savePhoto(photo , photoEncoded) {

    if (photoEncoded == null) {
        console.log("yes");
        return res.redirect('/');
    }
    const photoCover = JSON.parse(photoEncoded);
    if(photoCover != null && imageMimeTypes.includes(photoCover.type)) {
        photo.file = new Buffer.from(photoCover.data , 'base64');
        photo.fileImageType = photoCover.type;
    }
} 

module.exports = router;