const Client = require("./Client");
const fs = require("fs");

class ClientFile extends Client {
    constructor(filePath) {
        super();
        this.filePath = filePath;
    } // end constructor

    readFile() {
        return new Promise((resolve, reject) => {
            fs.readFile(this.filePath, async (error, data) => {
                if (error) {
                    return reject(error);
                }
                const items = await JSON.parse(data.toString());
                return resolve(items);
            })
        })
    }

    writeFile(data) {
        return new Promise((resolve, reject) => {
            const stringifiedData = JSON.stringify(data);
            fs.writeFile(this.filePath, stringifiedData, async (error) => {
                if (error) {
                    return reject(error);
                }

                return resolve();
            })
        })
    }

    async read(params) {
        const items = await this.readFile();
        const paramsKeys = Object.keys(params);

        return items.filter(item => {
            let ok = true;
            paramsKeys.forEach((paramKey) => {
                if (!ok) {
                    return;
                }

                if (params[paramKey] !== item[paramKey]) {
                    ok = false;
                }
            }); // end forEach
            return ok;
        })
    } // end read

    async create(item) {
        const items = await this.readFile();

        items.push(item);
        await this.writeFile(items);

        return item;
    }

    async delete(id) {
        let deletedItem = null;
        const items = await this.readFile();
        const newItems = items.filter(item => {
            if (item.id !== id) {
                return true;
            }

            deletedItem = item;
            return false;
        });

        await this.writeFile(newItems);
        return deletedItem;
    }

    async update(id, item) {
        const items = await this.readFile();

        let updatedElement = null;

        const updatedItems = items.map(element => {
            if (element.id === id) {
                const itemKeys = Object.keys(item);

                itemKeys.forEach((key) => {
                    element[key] = item[key];
                });

                updatedElement = element;
            }

            return element;
        }) // end map
        await this.writeFile(updatedItems);
        return updatedElement;
    }
}

module.exports = ClientFile;