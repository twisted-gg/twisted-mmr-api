const express = require('express')
const router = express.Router()

const service = require('../services/mmr')

router.get('/mmr-to-league', (req, res) => {
  let { mmr } = req.query
  if (mmr) {
    mmr = +mmr
  }
  const response = service.mmrToLeague(mmr)
  res.json(response)
})

router.get('/leage-to-mmr', (req, res) => {
  const { rank, tier, points } = req.query
  const response = service.leagueToMmr(rank, tier, +points)
  res.json(response)
})

module.exports = router
