const store = require('./store');
const socket = require('../../socket').socket;

function addMessage(chat, user, message, file) {
    return new Promise((resolve, reject) => {
        if (!chat || !user || !message) {
            console.error('[messageController] No user or message');
            reject('Invalid data');
            return false;
        }

        let fileurl = '';
        if (file) {
            fileurl = 'http://localhost:3000/app/files/' + file.filename;
        }

        const fullMessage = {
            chat: chat,
            user: user,
            message: message,
            date: new Date(),
            file: fileurl
        }
        store.add(fullMessage);

        socket.io.emit('message', fullMessage);

        resolve(fullMessage);
    })
}

function getMessages(filterUser) {
    return new Promise((resolve, reject) => {
        resolve(store.list(filterUser));
    })
}

function updateMessage(id, message) {
    return new Promise(async (resolve, reject) => {
        if (!id || !message) {
            console.error('[messageController] No id or message');
            reject('Invalid data');
            return false;
        }

        const result = await store.updateText(id, message);
        resolve(result);
    })
}

function deleteMessage(id) {
    return new Promise(async (resolve, reject) => {
        if (!id) {
            console.error('[messageController] Invalid id ');
            reject('Invalid data');
            return false;
        }

        store.remove(id)
            .then(() => {
                resolve();
            })
            .catch((err) => {
                reject(err);
            });
    })

}

module.exports = {
    addMessage,
    getMessages,
    updateMessage,
    deleteMessage
}
