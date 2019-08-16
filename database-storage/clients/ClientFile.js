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
        const items = await this.readFile();
        const newItems = items.filter(item => {
            return item.id !== id;
        })
        await this.writeFile(newItems);
    }

    async update(id, item) {
        const items = await this.readFile();

        items.map(element => {
            if (element.id === id) {
                const elementKeys = Object.keys(element);
                const itemKeys = Object.keys(item);

                elementKeys.forEach((ekey) => {
                    itemKeys.forEach((ikey) => {
                        if (ekey === ikey) {
                            element[ekey] = item[ikey];
                        }
                    })
                })
            }
        }) // end map
        await this.writeFile(items);
        return item;
    }
}

module.exports = ClientFile;