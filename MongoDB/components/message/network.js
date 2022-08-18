const express = require('express');
const multer = require('multer');

const response = require('../../network/response');
const controller = require('./controller');
const router = express.Router();

const upload = multer({
    dest: 'public/files/',
});

router.get('/', (req, res) => {
    const filterMessages = req.query.chat || null;
    controller.getMessages(filterMessages)
        .then(messageList => {
            response.success(req, res, messageList);
        }).catch(err => {
            response.error(req, res, 'Unexpexted error', 500, err);
        }
        );
});

router.post('/', upload.single('file'), (req, res) => {
    controller.addMessage(req.body.chat, req.body.user, req.body.message, req.file)
        .then(fullMessage => {
            response.success(req, res, fullMessage, 200);
        }).catch(err => {
            response.error(req, res, err, 500, 'Controller error');
        });
});

router.patch('/:id', (req, res) => {
    controller.updateMessage(req.params.id, req.body.message)
        .then(data => {
            response.success(req, res, data, 200);
        }).catch(err => {
            response.error(req, res, 'Server error', 500, err);
        });
});

router.delete('/:id', (req, res) => {
    controller.deleteMessage(req.params.id)
        .then(() => {
            response.success(req, res, `Usuario ${req.params.id} eliminado`, 200);
        }).catch(err => {
            response.error(req, res, 'Server error', 500, err);
        });
});

module.exports = router;


