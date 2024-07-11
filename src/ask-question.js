import * as readline from 'readline'

export default (query) => new Promise(resolve => {
  const ui = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  ui.question(query, (resp) => {
    resolve(resp)
    ui.close()
  })
})
