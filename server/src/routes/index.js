/**
 * Created by dhiraj.kumar on 16/12/2016.
 */
const express = require('express');

const router = express.Router();

router.get('/',(req,res) => {
    res.status(200).send('OK');
})

module.exports = router;