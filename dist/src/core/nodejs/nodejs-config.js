"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
const file_utils_1 = __importDefault(require("../file-utils"));
const folder_utils_1 = __importDefault(require("../folder-utils"));
class NodeJSConfig {
    static initializeFiles(db) {
        // Create the 'config' folder
        folder_utils_1.default.createFolder('config');
        // Create the index.ts
        this.createConfigIndex(db);
        // Create .env
        this.createDotEnv(db);
        // Create a tsconfig.json
        this.createTSConfig();
    }
    /**
     * Creates a '.env' file in the root folder of the new project
     * @param db DBconfig elements
     * @param outDir Root directory for the new project
     */
    static createDotEnv(db) {
        file_utils_1.default.createFile('.env', function () {
            for (const key of Object.keys(db)) {
                this.write(`# ${key}\n`);
                this.write(`DB_${key.toUpperCase()}=${db[key]}\n\n`);
            }
            this.end();
        });
    }
    /**
     * Cretaes a tsconfig.json in the root folder of the new project
     * @param outDir Root directory for the new project
     * // TODO spostare il tsconfig object in altra cartella
     */
    static createTSConfig() {
        file_utils_1.default.createJSONFile('tsconfig.json', utils_1.TSConfigObject);
    }
    /**
     * Creates a 'index.ts' file in the 'config' folder
     * @param db DBconfig elements
     * @param outDir Root directory fo the new project
     */
    static createConfigIndex(db) {
        file_utils_1.default.createFile('config/index.ts', function () {
            this.write('import * as dotenv from "dotenv";\n\n');
            this.write('dotenv.config();\n\n');
            this.write('export default {\n');
            for (const key of Object.keys(db)) {
                this.write(`\tdb_${key}: process.env.DB_${key.toUpperCase()},\n`);
            }
            this.write('}');
            this.end();
        });
    }
}
exports.default = NodeJSConfig;
//# sourceMappingURL=nodejs-config.js.map