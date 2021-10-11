const express = require('express');
const router = express.Router();
const taskBA = require('../classes/taskBA');
const error = require('../classes/errorConstant');

router.use(function(req,res,next){
  console.log('Something is happening in task.');
  next();
})
/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ message: 'App created!' });
});

router.post('/addtask', async function(req, res, next) {
    try {
        req.body.deadline = req.body.deadline?req.body.deadline+" 05:30:00":req.body.deadline;
        let result = await taskBA.addTask(req);
        res.json(result);
    } catch (err) {
        console.log(err)
        res.send(error.getErrorCode(error.errorName.SYNTAX_ERROR))
    }
});

router.post('/tasklist', async function(req, res, next) {
    try {
        let result = await taskBA.getTaskList(req);
        res.json(result);
    } catch (err) {
        console.log(err)
        res.send(error.getErrorCode(error.errorName.SYNTAX_ERROR))
    }
});

router.get('/statuslist', async function(req, res, next) {
    try {
        let result = await taskBA.getStatusList(req);
        res.json(result);
    } catch (err) {
        console.log(err)
        res.send(error.getErrorCode(error.errorName.SYNTAX_ERROR))
    }
});
router.post('/assignedto', async function(req, res, next) {
    try {
        let result = await taskBA.assignedToTask(req);
        res.json(result);
    } catch (err) {
        console.log(err)
        res.send(error.getErrorCode(error.errorName.SYNTAX_ERROR))
    }
});
router.post('/markascomplete', async function(req, res, next) {
    try {
        let result = await taskBA.markAsComplete(req);
        res.json(result);
    } catch (err) {
        console.log(err)
        res.send(error.getErrorCode(error.errorName.SYNTAX_ERROR))
    }
});
router.post('/updatetask', async function(req, res, next) {
    try {
        req.body.deadline = req.body.deadline?req.body.deadline+" 05:30:00":req.body.deadline;
        let result = await taskBA.updateTask(req);
        res.json(result);
    } catch (err) {
        console.log(err)
        res.send(error.getErrorCode(error.errorName.SYNTAX_ERROR))
    }
});
router.post('/deletetask', async function(req, res, next) {
    try {
        let result = await taskBA.deleteTask(req);
        res.json(result);
    } catch (err) {
        console.log(err)
        res.send(error.getErrorCode(error.errorName.SYNTAX_ERROR))
    }
});
module.exports = router;