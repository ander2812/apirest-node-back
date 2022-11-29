const { Router } = require('express');
const router = Router();
const cors = require('cors')
const {db} = require('../firebase')
let schedule = []
let idUser = ""




router.get('/', cors(), async (req, res) => {
    const querySnapshot = await db.collection('groups').get()
    //console.log("este es el body " + req.body.id)
    const groups = querySnapshot.docs.map(doc => ({
        id: doc.id,
        creationDate: doc.data().creationDate,
        description: doc.data().description,
        name: doc.data().name,
        schedule: doc.data().schedule,
    }))
    
    res.send(groups)

    
})

router.options('/', cors())

router.post('/', async (req, res) => {

    await db.collection('groups').doc(req.body.id).set(req.body)
    
    res.send(req.body)
})

router.options('/idUser', cors())

router.post('/idUser', async (req, res) => {

    idUser = req.body.id

    console.log(idUser)

    res.send(req.body.id)
    
})

router.options('/addgroup', cors())

router.post('/addgroup', async (req, res) => {

    if (idUser != null && idUser != "") {

        await db.collection('users').doc(idUser).collection('group').doc(req.body.id).set(req.body)

        res.send(req.body.id)
        
    }
    
})

module.exports = router;