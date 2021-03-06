var config = require('./config');
var pg     = require('pg');
var pool   = new pg.Pool({
    host     : config.analysisdb.host,
    port     : config.analysisdb.port,
    database : config.analysisdb.database,
    user     : config.analysisdb.user,
    password : config.analysisdb.password
});
var logger = require('./logger');

function pquery(sql, params) {
    var that = this;

    return new Promise(function (resolve, reject) {
        that.connect(function (err, conn, done) {
            if (err) {
                return reject(err);
            }
            logger.info('PgSQL: %s', sql, params);
            conn.query(sql, params, function (err, result) {
                done();
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    });
}

pool.on('error', function (err) {
    // if an error is encountered by a client while it sits idle in the pool
    // the pool itself will emit an error event with both the error and
    // the client which emitted the original error
    // this is a rare occurrence but can happen if there is a network partition
    // between your application and the database, the database restarts, etc.
    // and so you might want to handle it and at least log it out
    logger.error('idle client error', err.message, err.stack);
});

pool.pquery    = pquery.bind(pool);
module.exports = pool;
