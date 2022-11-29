const { Router } = require('express');
const router = Router();
const {id} = require('./auth')
const cors = require('cors')
const {db} = require('../firebase')
let schedule = []

let idUser = ""

router.options('/', cors())

router.post('/', async (req, res) => {

    idUser = req.body.id

    res.send(req.body.id)
    
})

router.get('/', cors(), async (req, res) => {


    if (idUser != null && idUser != "") {

        const querySnapshot = await db.collection('users').doc(idUser).get()


        const User = querySnapshot.data(doc => ({
            email: doc.data().email,
            id: doc.id,
            name: doc.data().name,
            username: doc.data().username,
        }))

        res.send(User)
        
    }

    //console.log(myGroups)
})

module.exports = router;