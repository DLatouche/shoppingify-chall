import app from "."

require("dotenv").config()

const port = process.env.PORT
const mode = process.env.MODE

app.listen(port, () => {
  console.log(`Mode: ${mode}`)
  console.log(`Port: ${port}`)
})
