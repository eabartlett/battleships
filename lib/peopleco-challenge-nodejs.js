/*
 * peopleco-challenge-nodejs
 * https://github.com/neosavvyinc/peopleco-challenge-nodejs
 *
 * Copyright (c) 2014 Adam Parrish
 * Licensed under the MIT license.
 */

'use strict';

var https = require("https")

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

exports.retrieveBoards = function (host, apiEndpoint, callback) {

    console.log("Retrieving boards", host, apiEndpoint);
    https.get(
            {
                host: host,
                port: 443,
                path: apiEndpoint
            },
            function (res) {
                res.on('data', function (boards) {
                    callback(boards)
                });
            }
        ).on('error',
            function (e) {
                console.log("Got error: " + e.message);
            }
        );



}

exports.retrieveBoard = function (board, host, apiEndpoint, callback) {

    console.log("Retrieving board");
    console.log("Retrieving board", host, apiEndpoint + "/" + board["board_id"]);
    https.get(
        {
            host: host,
            port: 443,
            path: apiEndpoint + "/" + board["board_id"]
        },
        function (res) {
            res.on('data', function (boardRes) {
                console.log("boardRes: " + JSON.parse(boardRes))
                var result = JSON.parse(boardRes);
                callback(result)
            });
        }
    ).on('error',
        function (e) {
            console.log("Got error: " + e.message);
        }
    );

}

exports.makeMove = function (board, coordinate, host, apiEndpoint, callback) {

    console.log("Making move for: " + coordinate)

    https.get(
        {
            host: host,
            port: 443,
            path: apiEndpoint + "/" + board["board_id"] + "/" + coordinate
        },
        function (res) {
            res.on('data', function (result) {
                console.log("Move for " + coordinate + " was " + result);
                callback(result)
            });
        }
    ).on('error',
        function (e) {
            console.log("Got error: " + e.message);
        }
    );

}
