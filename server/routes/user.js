const express = require('express');
const router = express.Router();
const taskBA = require('../classes/taskBA');
const error = require('../classes/errorConstant');
const userBA = require('../classes/userBA');
const middleware = require('../classes/middleware');
const jwt = require('jsonwebtoken');

router.use(function (req, res, next) {
    console.log('Something is happening in user.');
    next();
})
/* GET home page. */
router.get('/', function (req, res, next) {
    res.json({
        message: 'App created!'
    });
});

router.post('/createuser', async function (req, res, next) {
    try {
        let result = await userBA.addUser(req);
        res.json(result);
    } catch (err) {
        console.log(err)
        res.send(error.getErrorCode(error.errorName.SYNTAX_ERROR))
    }
});
router.get('/userlist', async function (req, res, next) {
    try {
        let result = await userBA.getUserList(req);
        res.json(result);
    } catch (err) {
        console.log(err)
        res.send(error.getErrorCode(error.errorName.SYNTAX_ERROR))
    }
});

router.post('/checklogin', middleware.checkUserInDB, (req, res, next) => {
    try {
        let cred = {};
        cred.loginname = req.body.email;
        cred.password = req.body.password;
        let token = jwt.sign(cred, process.env.SECRET_KEY, {
            expiresIn: '1800s'
        });
        res.send({
            auth: true,
            token: token
        });
    } catch (err) {
        console.log(err)
        res.send({
            auth: false,
            token: null,
            message: 'Invalid email or password.'
        })
    }
})

module.exports = router;