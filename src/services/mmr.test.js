const service = require('./mmr')

describe('Mmr service', () => {
  // MMR to league test
  describe('Mmr to league', () => {
    it('should return IRON IV (last league)', () => {
      expect(service.mmrToLeague(0)).toEqual({
        tier: 'IRON',
        rank: 'IV',
        points: 0
      })      
    })
    it('should return IRON IV with 99 points(last league)', () => {
      expect(service.mmrToLeague(99)).toEqual({
        tier: 'IRON',
        rank: 'IV',
        points: 99
      })      
    })
    it('should return challenger', () => {
      expect(service.mmrToLeague(5000).tier).toEqual('CHALLENGER')      
    })
    it('should return BEONZE (last league)', () => {
      expect(service.mmrToLeague(400)).toEqual({
        tier: 'BRONZE',
        rank: 'IV',
        points: 0
      })      
    })
  })
  // League to mmr
  describe('League to mmr', () => {
    it ('should return -1 when rank, tier or points are undefined', () => {
      expect(service.leagueToMmr()).toEqual({ mmr: -1 })
      expect(service.leagueToMmr('test')).toEqual({ mmr: -1 })
      expect(service.leagueToMmr('test', 'test')).toEqual({ mmr: -1 })
      expect(service.leagueToMmr()).toEqual({ mmr: -1 })
    })
    it ('should return 400 to BRONZE IV', () => {
      expect(service.leagueToMmr('BRONZE', 'IV', 0)).toEqual({ mmr: 400 })
    })
  })
  describe('Combine league <=> mmr', () => {
    it('should return the same first league', () => {
      const data = {
        tier: 'GOLD',
        rank: 'I',
        points: 99
      }
      const { mmr } = service.leagueToMmr(data.tier, data.rank, data.points)
      const league = service.mmrToLeague(mmr)
      expect(league).toEqual(data)
    })
  })
})
