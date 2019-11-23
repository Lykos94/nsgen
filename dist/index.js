"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const fs_1 = __importDefault(require("fs"));
const yamljs_1 = __importDefault(require("yamljs"));
const yargs_1 = __importDefault(require("yargs"));
const parser_1 = __importDefault(require("./parser/parser"));
const utils_1 = require("./utils");
// Get args from command line
const argv = yargs_1.default
    .usage('Usage: $0 <command> [options]')
    // .command('config', 'Count the lines in a file')
    // .example('$0 count -f foo.js', 'count the lines in the given file')
    // .alias('c', 'config')
    .nargs('config', 1)
    .describe('config', 'Load a configuration file')
    // .demandOption(['config'])
    .help('h')
    .alias('h', 'help')
    .epilog('Check the full documentation at https://adasd.com').argv;
if (argv.v) {
    console.log(chalk_1.default.bold('nsgen') + ' version ' + utils_1.APP_VERSION);
    process.exit(1);
}
const outDir = argv.path ? argv.path : process.cwd();
if (argv.config) {
    try {
        const filename = argv.config;
        if (fs_1.default.existsSync(filename)) {
            const configFile = yamljs_1.default.load(filename);
            console.log(configFile);
            const parser = new parser_1.default(configFile, outDir);
        }
    }
    catch (err) {
        console.error(err);
    }
}
else {
    console.log(chalk_1.default.bold.red('Missing configuration file!'));
}
// const m_file = new Parser('documentation/nsgen/mkdocs.yml');
//# sourceMappingURL=index.js.map