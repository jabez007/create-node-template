import * as readline from 'readline'
import { promisify } from 'util'

async function questionLoop (query, preset, validate, resolve) {
  const ui = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  const question = promisify(ui.question.bind(ui))

  let resp
  while (true) {
    resp = (await question(query)) || preset
    const valid = validate(resp)
    if (valid === true) {
      break
    }
    console.log(valid || `Invalid response: ${resp}`)
  }
  ui.close()
  resolve(resp)
}

export default (query, preset = '', validate = () => true) => new Promise(resolve => questionLoop(query, preset, validate, resolve))
