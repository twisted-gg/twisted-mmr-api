const express = require('express')
const app = express()
const mmrRoutes = require('./routes/mmr')

app.use(mmrRoutes)

app.listen(3000, () => {
  console.log('Service running')
})
