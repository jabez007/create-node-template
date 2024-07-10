#!/usr/bin/env node

import * as childProcess from 'child_process'
import { promisify } from 'util'

const exec = promisify(childProcess.exec)

async function main() {
    console.log('npm init')
    await exec('npm init --yes')
}

main()
  .catch((err) => console.log('Error', err))
  .then(() => console.log('Done'))