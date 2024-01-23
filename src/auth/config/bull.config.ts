module.exports = {
  redis: {
    host:
      process.env.REDIS_HOST ||
      'redis-14163.c322.us-east-1-2.ec2.cloud.redislabs.com',
    port: 14163,
    password: process.env.REDIS_PASSWORD,
  },
};
