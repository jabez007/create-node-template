#!/usr/bin/env node
import { promisify } from 'util'
import { join } from 'path'
import * as childProcess from 'child_process'
import * as fs from 'fs'

const exec = promisify(childProcess.exec);
const mkdir = promisify(fs.mkdir);

/*
 * calculate project directory name
 */
const defaultFolderName = "my-node-app";
const initWorkingDirectory = process.cwd();

let folderName = defaultFolderName;
if (process.argv.slice(2).length > 0) {
  folderName = process.argv.slice(2)[0];
}
const projectWorkingDirectory = join(initWorkingDirectory, folderName)
/* END */

async function main() {
  /*
   * make new directory and move into it
   */
  console.log(`creating directory ${folderName}`);
  await mkdir(projectWorkingDirectory);
  process.chdir(projectWorkingDirectory);
  /* END */

  /* 
   * initialize npm in new project directory
   */
  console.log('npm init');
  await exec('npm init --yes');
  /* END */

  /*
   * create and set package main
   */
  console.log('creating src directory');
  await mkdir(join(projectWorkingDirectory, 'src'))

  console.log('creating index.js file');
  fs.closeSync(fs.openSync(join(projectWorkingDirectory, 'src', 'index.js'), 'w'));

  console.log('updating main in package.json');
  await exec("npm pkg set main=./src/index.js");
  /* END */

  /*
   * set up ESLint
   */
  console.log('initializing ESLint (this may take a while)');
  childProcess.spawnSync("npm", [
    "init",
    "@eslint/config@latest",
    "--",
    "--config",
    "eslint-config-standard"
  ],
  {
    stdio: [process.stdin, process.stdout, process.stderr],
    encoding : 'utf8'
  });
  /* END */
}

main()
  .catch((err) => console.log('Error', err))
  .then(() => console.log('Done'))