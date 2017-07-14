var express = require('express');
var port= process.env.PORT || 8080;
var app = express();
var favicon = require('serve-favicon');

// view engine setup
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static('./public'));

app.use(favicon(__dirname + '/public/favicon.ico'));

/* GET home page. */
app.get('/', function(req, res) {
  res.render('index', {title: "HTML entities || Find HTML entities "});
});

app.get('*', function(req, res) {
  res.render('index', {title: "HTML entities || Find HTML entities "});
});

/// catch 500 error handler
app.use(function(err, req, res, next) {
    res.status(500).render('500', { title: 'Server Maintenance' });
});



var server = app.listen(port, function() {

  console.log('Express server listening on port ' + port);
  if(process.env.NODE_ENV){
    console.log("Your server is in %s mode.",process.env.NODE_ENV); //logs server environment
  }else{
    console.log("***Set your server environment before production.***");
  }
});


//catch eaddrinuse error
process.on('uncaughtException', function(err) {
    if(err.errno === 'EADDRINUSE'){
        console.log(err);
      }
    //stop accepting req
    server.close(function () {
      process.exit(1); //clean up
    });
});

process.on('SIGTERM', function() {
    //stop accepting req
      server.close(function () {
        process.exit(); //clean up
      });

});

//catch ctrl+c event (for development)
process.on('SIGINT', function() {
        server.close(function () {
          console.log("Server is Stopped!!! :)");
          process.exit(); //clean up
        });
});
