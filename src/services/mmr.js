// Base
const pointsPerTier = 100
const tiersPerRank = 4
const pointsPerRank = pointsPerTier * tiersPerRank

const tiers = [
  'IV',
  'III',
  'II',
  'I'
]

const ranks = [
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
  const rankIndex = parseInt(mmr / pointsPerRank)
  const tierPoints = mmr - (rankIndex * pointsPerRank)
  let tierIndex = parseInt(tierPoints / pointsPerTier)
  let points = tierPoints % pointsPerTier

  // Response
  let rank = rankIndex >= ranks.length ? ranks[ranks.length - 1] : ranks[rankIndex]
  let tier = tiers[tierIndex]

  if (rankIndex >= ranks.length) {
    rank = ranks[ranks.length - 1]
    tierIndex += (rankIndex - (ranks.length - 1)) * tiersPerRank
  }

  if (typeof rank === 'object') {
    if (!rank.tiers) {
      tier = null
      points += tierIndex * pointsPerTier
    }
    rank = rank.name
  }

  return {
    rank,
    tier,
    points
  }
}

function leagueToMmr (rank, tier, points) {
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
