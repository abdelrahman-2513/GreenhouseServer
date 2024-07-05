module.exports = {
  redis: {
    host:
      process.env.REDIS_HOST ||
      'redis-14749.c245.us-east-1-3.ec2.redns.redis-cloud.com:14749',
    port: 14749,
    password: process.env.REDIS_PASSWORD,
  },
};
