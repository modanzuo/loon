'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const mySql = require("mysql2");
const dbConfig = require('../config/db');
const pool = mySql.createPool({
    connectionLimit: dbConfig.LIMIT,
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASS,
    database: dbConfig.NAME,
    multipleStatements: dbConfig.multipleStatements //是否允许执行多条sql语句
});
//将结果已对象数组返回
const row = (sql, ...params) => {
    return new Promise(function (resolve, reject) {
        pool.getConnection(function (err, connection) {
            if (err) {
                reject(err);
                return;
            }
            connection.query(sql, params, function (error, res) {
                connection.release();
                if (error) {
                    reject(error);
                    return;
                }
                resolve(res);
            });
        });
    });
};
//返回一个对象
const first = (sql, ...params) => {
    return new Promise(function (resolve, reject) {
        pool.getConnection(function (err, connection) {
            if (err) {
                reject(err);
                return;
            }
            connection.query(sql, params, function (error, res) {
                connection.release();
                if (error) {
                    reject(error);
                    return;
                }
                resolve(res[0] || null);
            });
        });
    });
};
//返回单个查询结果
const single = (sql, ...params) => {
    return new Promise(function (resolve, reject) {
        pool.getConnection(function (err, connection) {
            if (err) {
                reject(err);
                return;
            }
            connection.query(sql, params, function (error, res) {
                connection.release();
                if (error) {
                    reject(error);
                    return;
                }
                for (let i in res[0]) {
                    resolve(res[0][i] || null);
                    return;
                }
                resolve(null);
            });
        });
    });
};
//执行代码，返回执行结果
const execute = (sql, ...params) => {
    return new Promise(function (resolve, reject) {
        pool.getConnection(function (err, connection) {
            if (err) {
                reject(err);
                return;
            }
            connection.query(sql, params, function (error, res) {
                connection.release();
                if (error) {
                    reject(error);
                    return;
                }
                resolve(res);
            });
        });
    });
};
//模块导出
module.exports = {
    ROW: row,
    FIRST: first,
    SINGLE: single,
    EXECUTE: execute
};
//# sourceMappingURL=mySql.js.map