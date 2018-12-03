/**
 * author modanzuo@sina.com
 */
const log4js = require('log4js');
const config = require('config');
log4js.configure({
	replaceConsole: true,
	appenders: {
		stdout: {
			type: 'stdout'
		},
		req: config.get('log.debug'), //请求日志
		err: config.get('log.error'),  //错误日志
		oth: config.get('log.info')		 //其他日志
	},
	categories: {
		default: {appenders: ['stdout', 'req'], level: config.get('log.debug.level')},//appenders:采用的appender,取appenders项,level:设置级别
		err: {appenders: ['stdout', 'err'], level: config.get('log.error.level')},
		oth: {appenders: ['stdout', 'oth'], level: config.get('log.info.level')}
	}
});
const logger = log4js.getLogger();
const error_logger = log4js.getLogger('err');
const oth_logger = log4js.getLogger('oth');

//重新写了info方法
function req_info(message) {
	logger.info(message)
}

//重新写了info方法
function info(message) {
	oth_logger.info(message)
}

//重新写了info方法
function error(message) {
	error_logger.error(message)
}
//重新写了info方法
function log(message) {
	oth_logger.log(message)
}

exports.logger = logger
exports.log4js = log4js
exports.req_info = info
exports.info = info
exports.log = log
exports.error = error