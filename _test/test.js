var fs = require('fs');
var path = require('path');
var riot = require('../dist/riot/riot');
var tags = fs.readFileSync('../dist/tags.js', 'utf-8');

eval(tags);

// mount せずに関数を取得
var obj = {};
riot.util.templates.blog.fn.call(obj);
console.log('blog', obj);
