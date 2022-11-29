const { Router } = require('express');
const router = Router();
const {id} = require('./auth')
const cors = require('cors')
const {db} = require('../firebase')
let schedule = []

let idGroup = ""

router.options('/', cors())

router.post('/', async (req, res) => {

    idGroup = req.body.id

    res.send(req.body.id)
    
})

router.get('/', cors(), async (req, res) => {

    console.log("este es el id actualizado en groupDetails: " + idGroup)

    if (idGroup != null && idGroup != "") {

        const querySnapshot = await db.collection('groups').doc(idGroup).get()

        console.log(querySnapshot.data)

        const myGroups = querySnapshot.data(doc => ({
            id: doc.id,
            creationDate: doc.data().creationDate,
            description: doc.data().description,
            name: doc.data().name,
            schedule: doc.data().schedule,
        }))

        console.log(myGroups)

        res.send(myGroups)
        
    }

    //console.log(myGroups)
})

module.exports = router;