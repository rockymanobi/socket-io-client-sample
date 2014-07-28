(function () {

  // Environment Settings
  var env = process.env.NODE_ENV;

  var CONFIG = require('./config')(env);
  var SERVER_URL = CONFIG.hostUrl;

  var EventEmitter = require('events').EventEmitter;
  var ev = new EventEmitter();

  var uuid = require('node-uuid');
  var uuidV4 = uuid.v4();

  connect();


  /*********** Socket ***********/
  function connect(){
    console.log('connecting to ' + SERVER_URL);
    var socket = require('socket.io-client')( SERVER_URL);
    socket.on('connect', function(){
      console.log("connected");

      socket.on('chat message', function(data){
        var ext = require('path').extname(data.name);
        var filename = 'test' + ext;
        var maxSize = data.maxSize || 300;
        var imageBuffer = new Buffer(data.file, 'base64'); //console = <Buffer 75 ab 5a 8a ...
        show(filename, maxSize);
      });
      socket.on('disconnect', function(){
        console.log('disconnected');
      });
    });
  }

  function show(filename, maxLength){

    console.log("rcv : " + uuidV4 + " : " + filename);
    return;
    /*
    var fs = require('fs');
    var ECT = require('ect');

    var _maxLength = maxLength || 400; // 何も入力がなければ400pxサイズにする
    var uploadDirPath = __dirname + '/upload';

    var renderer = ECT({ root : __dirname + '/photoshop_scripts' });
    var data = { fname : filename, maxLength: _maxLength, uploadDirPath: uploadDirPath };
    var html = renderer.render('template.ect', data);

    _generator.evaluateJSXString(html);

    return;
    */
  }
  


}());
