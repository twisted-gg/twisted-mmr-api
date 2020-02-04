// Base
const pointsPerRank = 100
const tiersPerRank = 4
const pointsPerTier = pointsPerRank * tiersPerRank

const ranks = [
  'IV',
  'III',
  'II',
  'I'
]

const tiers = [
  { name: 'IRON', ranks: true },
  { name: 'BRONZE', ranks: true },
  { name: 'SILVER', ranks: true },
  { name: 'GOLD', ranks: true },
  { name: 'PLATINUM', ranks: true },
  { name: 'DIAMOND', ranks: true },
  { name: 'MASTER', ranks: false },
  { name: 'GRANDMASTER', ranks: false },
  { name: 'CHALLENGER', ranks: false }
]

// Algorithms
function mmrToLeague (mmr) {
  if (typeof mmr !== 'number' || mmr < 0) {
    return {
      tier: 'UNRANKED',
      rank: null,
      points: null
    }
  }

  // Calc
  const rankIndex = parseInt(mmr / pointsPerTier)
  const tierPoints = mmr - (rankIndex * pointsPerTier)
  let tierIndex = parseInt(tierPoints / pointsPerRank)
  let points = tierPoints % pointsPerRank

  // Response
  let tier = rankIndex >= tiers.length ? tiers[tiers.length - 1] : tiers[rankIndex]
  let rank = ranks[tierIndex]

  if (rankIndex >= tiers.length) {
    tier = tiers[tiers.length - 1]
    tierIndex += (rankIndex - (tiers.length - 1)) * tiersPerRank
  }

  if (!tier.ranks) {
    rank = null
    points += tierIndex * pointsPerRank
  }
  tier = tier.name

  return {
    rank,
    tier,
    points
  }
}

function leagueToMmr (tier, rank, points) {
  if (!tier || typeof points !== 'number') {
    return {
      mmr: -1
    }
  }
  const tierIndex = tiers.findIndex(t => t.name === tier)
  let rankIndex
  if (!rank) {
    rankIndex = 0
  } else {
    rankIndex = ranks.findIndex(r => r === rank)
  }
  const mmr = (rankIndex * pointsPerRank) + (tierIndex * pointsPerTier) + points
  return {
    mmr
  }
}

// Export
module.exports = {
  mmrToLeague,
  leagueToMmr
}
