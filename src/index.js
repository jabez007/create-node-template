import app from './server.js'
import dotenv from 'dotenv'

dotenv.config()

const port = process.env.PORT || 8888

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`)
})
