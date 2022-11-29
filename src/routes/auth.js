const { Router } = require('express');
const router = Router();
const cors = require('cors')
const {db} = require('../firebase')
let schedule = []


let getId = "";

router.options('/', cors())

router.post('/', async (req, res) => {

    const {name, username, email, id} = req.body

    await db.collection('users').doc(id).set(req.body)
    
    res.send(req.body)

    console.log(name, username, email,)
})
 

module.exports = router
