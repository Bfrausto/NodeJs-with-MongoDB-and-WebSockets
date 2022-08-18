const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');
const router = express.Router();

router.get('/', (req, res) => {
    controller.listUsers()
        .then(messageList => {
            response.success(req, res, messageList);
        }).catch(err => {
            response.error(req, res, 'Unexpexted error', 500, err);
        }
        );
});

router.post('/', (req, res) => {
    controller.addUser(req.body.name)
        .then(fullMessage => {
            response.success(req, res, fullMessage, 200);
        }).catch(err => {
            response.error(req, res, err, 500, 'Controller error');
        });
});


module.exports = router;


