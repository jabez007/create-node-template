import readline from 'readline'

function question (inquiry) {
  return new Promise(resolve => {
    const ui = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })

    ui.question(inquiry, input => {
      ui.close()
      resolve(input)
    })
  })
}

export default async (query, preset = '', validate = () => true) => {
  let resp
  while (true) {
    resp = (await question(query)) || preset
    const valid = validate(resp)
    if (valid === true) {
      break
    }
    console.log(valid || `Invalid response: ${resp}`)
  }
  return resp
}
