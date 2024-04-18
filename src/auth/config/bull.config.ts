module.exports = {
  redis: {
    host:
      process.env.REDIS_HOST ||
      'redis-14835.c263.us-east-1-2.ec2.cloud.redislabs.com:14835',
    port: 14835,
    password: process.env.REDIS_PASSWORD,
  },
};
