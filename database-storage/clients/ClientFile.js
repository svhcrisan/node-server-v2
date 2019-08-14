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

    async read(params) {
        const items = await this.readFile();
        const paramsKeys = Object.keys(params);
        let ok = true;

        return items.filter(item => {
            paramsKeys.forEach((paramKey, index) => {
                const itemKeyz = Object.keys(item);
                if (!ok) {
                    return;
                }
                if (paramKey !== itemKeyz[index]) {
                    ok = false;
                }
            }); // end forEach
            return ok;
        })

    } // end read
}

module.exports = ClientFile;