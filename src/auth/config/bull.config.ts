module.exports = {
  redis: {
    host:
      process.env.REDIS_HOST ||
      'redis-14163.c322.us-east-1-2.ec2.cloud.redislabs.com',
    port: 14163,
    password: process.env.REDIS_PASSWORD,
  },
};
// export const   bullConfig = {
//   redis: {
//     host: 'generous-puma-34925.upstash.io',
//     port: 34925,
//     password: '6dcede1fe9794c49ac5db91e311d726f',
//   },
// };
