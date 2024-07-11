#!/usr/bin/env node
import { promisify } from 'util'
import { join } from 'path'
import * as childProcess from 'child_process'
import * as fs from 'fs'

const exec = promisify(childProcess.exec)
const mkdir = promisify(fs.mkdir)

/*
 * make a new directory and move into it
 */
const defaultFolderName = "my-node-app";
const initWorkingDirectory = process.cwd();

let folderName = defaultFolderName;
if (process.argv.slice(2).length > 0) {
  folderName = process.argv.slice(2)[0];
}
console.log(`creating directory ${folderName}`);
fs.mkdirSync(join(initWorkingDirectory, folderName));

process.chdir(join(initWorkingDirectory, folderName));
/* END */

async function main() {
    console.log('npm init');
    await exec('npm init --yes');
}

main()
  .catch((err) => console.log('Error', err))
  .then(() => console.log('Done'))