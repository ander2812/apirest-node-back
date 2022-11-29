const { Router } = require('express');
const router = Router();
const {id} = require('./auth')
const cors = require('cors')
const {db} = require('../firebase')
let schedule = []

let idUser = ""
let idGroup = ""
let ownerId= ""

router.options('/', cors())

router.post('/', async (req, res) => {

    idUser = req.body.id
    
    console.log("este es el id actualizado en mygroups: " + req.body.id)

    res.send(req.body.id)
    
})

router.options('/idGroup', cors())

router.post('/idGroup', cors(), async (req, res) => {

    

    idGroup = req.body.id
    ownerId = req.body.owner_id

    console.log("Este es el owner id" + ownerId)

    console.log("este es el id del group actualizado en mygroups: " + req.body.id)

    res.send(req.body.id)
    
})

router.delete('/', async (req, res) => {

    if (idGroup != null && idGroup != "") {
        if (idUser != null && idGroup != "") {

            if(idUser == ownerId){

                await db.collection('groups').doc(idGroup).delete()

            }

            await db.collection('users').doc(idUser).collection('group').doc(idGroup).delete()

            res.send(req.body.id)
            
        }
        
    }
    
})

router.get('/', cors(), async (req, res) => {

    if (idUser != null && idUser != "") {

        const querySnapshot = await db.collection('users').doc(idUser).collection('group').get()

        const myGroups = querySnapshot.docs.map(doc => ({
            id: doc.id,
            creationDate: doc.data().creationDate,
            owner_id: doc.data().owner_id,
            description: doc.data().description,
            name: doc.data().name,
            schedule: doc.data().schedule,
        }))

    res.send(myGroups)
        
    }

    //console.log(myGroups)
})

module.exports = router;