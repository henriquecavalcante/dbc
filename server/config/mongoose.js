const mongoose = require('mongoose');
const util = require('util');
// eslint-disable-next-line import/no-extraneous-dependencies
const debug = require('debug')('express-mongoose-es6-rest-api:index');

const config = require('./config');

// connect to mongo db
const mongoUri = config.mongo.host;
const mongoOptions = {
  useUnifiedTopology: true,
  keepAlive: 1,
  useNewUrlParser: true
}

mongoose.connect(mongoUri, mongoOptions);
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${mongoUri}`);
});

// print mongoose logs in dev env
if (config.MONGOOSE_DEBUG) {
  mongoose.set('debug', (collectionName, method, query, doc) => {
    debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc);
  });
}
