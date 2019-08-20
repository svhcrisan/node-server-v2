// interface, 
class Client {
    read(params) {
        console.log("This is read method.");
        throw new Error("Default read function.");
    }

    findById(id) {
        console.log("This is read method.");
        throw new Error("Default read function.");
    }

    create(item) {
        console.log("This is create method.");
        throw new Error("Default create function.");
    }

    delete(id) {
        console.log("This is delete method.");
        throw new Error("Default delete function.");
    }

    update(id, item) {
        console.log("This is update method.");
        throw new Error("Default update function.");
    }
}

module.exports = Client;