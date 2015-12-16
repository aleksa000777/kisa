var lessMiddleware = require('less-middleware');
var express = require('express');
var jade = require('jade');

var app = express();

var public = __dirname.replace(/\\/g, '/') + '/public';
app.use(lessMiddleware(public + '/less', {
	force: true
}));
app.use(express.static(public + '/img'));
app.use(express.static(public + '/js'));
app.use(express.static(public + '/less'));

app.set('views', './views');
app.set('view engine', 'jade');

var bodyParser = require('body-parser')
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
	extended: true
}));

var routes = {
	"/": {template: "team"},
	"/team": {template: "team"},
	"/contact": {template: "contact"},
	"404" : {template: "404"}
}

app.get("*", function(req, res){
	if (routes[req.path]) {
		return res.render(routes[req.path].template, {});
	}

	return res.render(routes["404"].template, {}); 
})

// app.get ('/', function(req, res){
// 	res.render('team', {});
// })
// app.get ('/team', function(req, res){
// 	res.render('team', {});
// })
// app.get ('/contact', function(req, res){
// 	res.render('contact', {});
// })

app.get('/signup', function(req,res) {
	console.log("req.body", req.body);
	console.log("req.params", req.params);
	console.log("req.query", req.query);
})  //opyat je ni4ego ne pojmu
// zapisat description v basu dannih suda kak eto, i poraqbotat so slidami
app.post('/fetch', function(req, res){
	res.send({
		result: [
			"http://malsup.github.io/images/p1.jpg",
			"http://malsup.github.io/images/p2.jpg",
			"http://malsup.github.io/images/p3.jpg",
			"http://malsup.github.io/images/p4.jpg"
		]
	})
})

app.post('/contact/user', function(req, res) {
	// dannie... chego-to eshe vse tut
	console.log("req.body", req.body);
	console.log("req.params", req.params);
	console.log("req.query", req.query);
	res.send({
		status: "failure",
		submitted: req.body
	});
})


var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});