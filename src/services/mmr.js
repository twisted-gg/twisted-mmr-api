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
  'IRON',
  'BRONZE',
  'SILVER',
  'GOLD',
  'PLATINUM',
  'DIAMOND',
  { name: 'MASTER', tiers: false },
  { name: 'GRANDMASTER', tiers: false },
  { name: 'CHALLENGER', tiers: false }
]

// Algorithms
function mmrToLeague (mmr) {
  if (typeof mmr !== 'number' || mmr < 0) {
    return {
      rank: 'UNRANKED',
      tier: null,
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

  if (typeof tier === 'object') {
    if (!tier.tiers) {
      rank = null
      points += tierIndex * pointsPerRank
    }
    tier = tier.name
  }

  return {
    rank,
    tier,
    points
  }
}

function leagueToMmr (tier, rank, points) {
  if (!rank || !ranks || typeof points !== 'number') {
    return {
      mmr: -1
    }
  }
  const rankIndex = ranks.findIndex(r => r === rank)
  const tierIndex = tiers.findIndex(t => t === tier)

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
