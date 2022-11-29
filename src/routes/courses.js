const { Router } = require('express');
const router = Router();
const {id} = require('./auth')
const cors = require('cors')
const {db} = require('../firebase')
let schedule = []

let idUser = ""
let idCourse = ""

router.options('/', cors())

router.post('/', async (req, res) => {

    idUser = req.body.id

    res.send(req.body.id)
    
})

router.options('/idCourse', cors())

router.post('/idCourse', cors(), async (req, res) => {

    idGroup = req.body.id
    console.log("este es el id del curso actualizado en courses: " + req.body.id)

    res.send(req.body.id)
    
})

router.delete('/', async (req, res) => {

    if (idCourse != null && idCourse != "") {
        if (idUser != null && idUser != "") {

            await db.collection('users').doc(idUser).collection('courses').doc(idCourse).delete()

            res.send(req.body.id)
            
        }
        
    }
    
})

router.get('/', cors(), async (req, res) => {
    //console.log("este es el body " + req.body.id)

    //if(idUser != null && idUser != "") {

        const querySnapshot = await db.collection('users').doc("OVeaMX4KTFd72QH11cSafe0xxs52").collection('courses').get()

        const courses = querySnapshot.docs.map(doc => ({
            id: doc.id,
            name: doc.data().name,
            schedule: doc.data().schedule,
        }))

    //}
    
    res.send(courses)

    
})

module.exports = router;