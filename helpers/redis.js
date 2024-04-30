const Redis = require('ioredis')
const redisCon = new Redis({ keyPrefix: "redis_renaultdzaky_betest:" });

module.exports = redisCon