'use strict';

var peoplecoChallengeNodejs = require('../lib/peopleco-challenge-nodejs.js'),
    _und = require("../node_modules/underscore/underscore-min");

var baseUrl = "student.people.co",
    yourUserHash = "437d7e05912a",
    yourBaseUrl = "/api/challenge/battleship/"+yourUserHash+"/boards",
    topAxis = ["A","B","C","D","E","F","G","H","I","J"],
    leftAxis = ["1", "2","3","4","5","6","7","8","9","10"];

function chooseRandom() {
  var x = Math.round(Math.random() * 10)
  var y = Math.round(Math.random() * 10)
  return [x, y]
}

peoplecoChallengeNodejs.retrieveBoards(baseUrl, yourBaseUrl, function( boards ){
  var boardsObjects = JSON.parse(boards);
  var retBoard = boardsObjects[process.argv[2]];
  peoplecoChallengeNodejs.retrieveBoard(retBoard, baseUrl, yourBaseUrl, function(board) {
    var done = { done : false }
    while (!done.done) {
      var random = chooseRandom();
      var coord = topAxis[random[0]] + leftAxis[random[1]];
      var coord = topAxis[random[0]] + leftAxis[random[1]];
      var moves = {};
      console.log(coord);
      while (moves[coord]) {
        random = chooseRandom();
        coord = topAxis[random[0]] + leftAxis[random[1]];
      }
      moves[coord] = true;
      peoplecoChallengeNodejs.makeMove(board, coord, baseUrl, yourBaseUrl, function( result ) {
        moves[coord] = true;
        var parsed = JSON.parse(result);
        if (parsed["is_finished"]) {
          break;
        }
      });
    }
  });
});
