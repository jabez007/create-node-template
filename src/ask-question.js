import * as readline from 'readline'
import { promisify } from 'util'

export default async (query, preset = '', validate = () => true) => {
  const ui = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  const question = promisify(ui.question.bind(ui))

  let resp
  while (true) {
    resp = (await question(query)) || preset
    console.log(`resp: ${resp}`)
    const valid = validate(resp)
    console.log(`valid: ${valid}`)
    if (valid === true) {
      break
    }
    console.log(valid || `Invalid response: ${resp}`)
  }
  ui.close()
  return resp
}
