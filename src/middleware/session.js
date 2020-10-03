const expressSession = require("express-session");
const redis = require("redis");
const RedisStore = require("connect-redis")(expressSession);
const config = require("../../config");

const session = () => {
  const redisStoreOptions = {
    ...config.redisStore,
    client: redis.createClient(config.redis),
  };
  const sessionConfig = {
    ...config.session,
    store: new RedisStore(redisStoreOptions),
  };
  return expressSession(sessionConfig);
};

module.exports = session;
