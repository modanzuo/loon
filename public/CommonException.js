/**
 * author modanzuo@sina.com
 */

function MyError(message, code) {
	this.name = 'MyError';
	this.message = message || 'Default Message';
	this.code = code
	this.stack = (new Error()).stack;
}

MyError.prototype = Object.create(Error.prototype);
MyError.prototype.constructor = MyError;
module.exports = {
	MyError
};