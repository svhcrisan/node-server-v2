// interface, 
class Client {
    read(params) {
        console.log("This is read method.");
        throw new Error("Default read function.");
    }

    create() {
        console.log("This is create method.");
        throw new Error("Default create function.");
    }
}

module.exports = Client;