const Model = require('./model');

function addMessage(message) {
    const myMessage = new Model(message);
    return myMessage.save();
}

async function getMessages(filterChat) {
    console.log(filterChat);
    return new Promise((resolve, reject) => {
        let filter = {};
        if (filterChat) {
            filter = { chat: filterChat };
        }

        Model.find(filter)
            .populate('user')
            .exec((err, populated) => {
                if (err) {
                    reject(err);
                    // return false;
                }
                resolve(populated);
            });
    });
}

async function updateText(id, message) {
    const updatedMessage = await Model.findOneAndUpdate(
        { _id: id },
        { message },
        { new: true }
    );

    return updatedMessage;
}

function removeMessage(id) {
    return Model.findOneAndDelete({ _id: id });
}

module.exports = {
    add: addMessage,
    list: getMessages,
    updateText: updateText,
    remove: removeMessage
};