#!/usr/bin/env node
import { promisify } from 'util'
import { stripIndent } from 'common-tags'
import { join } from 'path'
import * as childProcess from 'child_process'
import * as fs from 'fs'

const exec = promisify(childProcess.exec);
const mkdir = promisify(fs.mkdir);
const writeFile = promisify(fs.writeFile);

/*
 * calculate project directory name
 */
const defaultFolderName = "my-node-app";
const initWorkingDirectory = process.cwd();

let folderName = defaultFolderName;
if (process.argv.slice(2).length > 0) {
  folderName = process.argv.slice(2)[0];
}
const projectWorkingDirectory = join(initWorkingDirectory, folderName);
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
  await mkdir(join(projectWorkingDirectory, 'src'));

  console.log('creating index.js file');
  fs.closeSync(fs.openSync(join(projectWorkingDirectory, 'src', 'index.js'), 'w'));

  console.log('updating main in package.json');
  await exec("npm pkg set main=./src/index.js");
  /* END */

  /*
   * set up ESLint
   */
  //console.log('installing ESLint (this may take a while)');
  //await exec("npm install --save-dev eslint @eslint/js");
  console.log('installing Standard ESLint config (this may take a while)');
  await exec("npm install --save-dev eslint-config-standard eslint-plugin-promise eslint-plugin-import eslint-plugin-n");

  console.log('writing .eslintrc file');
  await writeFile(join(projectWorkingDirectory, '.eslintrc'), stripIndent`
    {
      "extends": "standard"
    }
  `)

  console.log('adding lint to scripts in package.json');
  await exec('npm pkg set scripts.lint="eslint --fix ./src/**/*.{js,jsx,ts}"');
  /* END */
}

main()
  .catch((err) => console.log('Error', err))
  .then(() => console.log('Done'))