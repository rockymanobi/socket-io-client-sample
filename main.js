(function () {

  // Environment Settings
  var env = process.env.NODE_ENV;

  var CONFIG = require('./config')(env);
  var SERVER_URL = CONFIG.hostUrl;

  var EventEmitter = require('events').EventEmitter;
  var ev = new EventEmitter();

  var uuid = require('node-uuid');
  var uuidV4 = uuid.v4();

  setTimeout(input, 3000 );



  // ################################################
  // Socket IO
  // ################################################
  var socket;
  connect();
  function connect(){
    console.log('connecting to ' + SERVER_URL);
    socket = require('socket.io-client')( SERVER_URL);
    socket.on('connect', function(){
      console.log("connected");
    });
    socket.on('disconnect', function(){
      console.log('disconnected');
    });

    // テレビから現在情報を受信したとき
    // コネクト時にも受信するので、この情報を元に、「何を見ているのか」はハンドルできるはず。
    socket.on('info rcv', function(data){
      showEvent( "recieved information from TV" );
      console.log( data );
    });

    // 番組見終わったとき
    // このイベントを見て、画面遷移をすると良いと思います。
    socket.on('finish watching rcv', function(data){
      showEvent("見終わったよ!" );
    });
  }

  // ################################################
  // イベントキック
  // ################################################
  /**
   * ふれふれしたらこうなります
   */
  function furifuri(){
    var d = {
      movieId: "mov0",
      userId:"user0",
      userName: "光ぼっくす",
    };
    socket.emit( 'furifuri send', d );
  }


  // ################################################
  // 以下、コマンドラインによる開発用なので不要
  // ################################################
  function showEvent( txt ){
    console.log( "######" + txt);
  }


  function toEnd(){
    console.log("to END");
    socket.emit("go to end command send", {});
  };
  function input(){
    var readline = require('readline');
    var rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    var msg = "#### コマンドラインで操作できます。\n"
                + "1: フリフリを送る\n";

    rl.question(msg, function(answer) {

      console.log("Thank you for your valuable feedback:", answer);

      if( answer === "1" ){
        furifuri();
      }else if( answer === "2" ){
        toEnd();
      }
      rl.close();
      setTimeout(input, 1000);
    });
  }
  


}());
