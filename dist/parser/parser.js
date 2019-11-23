"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const file_utils_1 = __importDefault(require("../core/file-utils"));
const utils_1 = require("../utils");
const config_parser_1 = __importDefault(require("./config-parser"));
class Parser {
    constructor(configObject, outDir) {
        this.configObject = configObject;
        this.outDir = outDir;
        // chiamare chi crea package.json
        const packageObject = {
            dependencies: utils_1.packageDepencencies,
            description: configObject.config.description || '',
            name: configObject.config.name || '',
            version: '1.0.0',
        };
        file_utils_1.default.createJSONFile(outDir, 'package.json', packageObject);
        // chiamare chi crea .eslintrc
        // chiamare chi crea .gitignore
        // chiamare chi crea README.md
        const parsersObject = this.getParsers();
        for (const param of Object.keys(parsersObject)) {
            parsersObject[param].parse(this.configObject[param], this.outDir);
        }
    }
    getParsers() {
        return {
            config: config_parser_1.default,
        };
    }
}
exports.default = Parser;
//# sourceMappingURL=parser.js.map