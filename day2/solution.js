"use strict";
exports.__esModule = true;
var promises_1 = require("node:fs/promises");
//const inputPath = "./sample-input.txt";
var inputPath = "./input.txt";
var printError = console.error;
var printSolution = function (contents) {
    var _a = calculateScore(contents), score = _a[0], revisedScore = _a[1];
    console.log("Total score:", score);
    console.log("Revised score:", revisedScore);
};
var getChoiceScore = function (letter) {
    switch (letter) {
        case "X":
        case "A":
            // rock
            return 1;
        case "Y":
        case "B":
            // paper
            return 2;
        case "Z":
        case "C":
            // scissors
            return 3;
        default:
            return 0;
    }
};
var getGamePlayerScore = function (opponentScore, playerScore) {
    if (opponentScore === playerScore) {
        // draw: 3pts
        return 3;
    }
    else if (opponentScore === 1 && playerScore === 3) {
        // rock vs scissors, loss
        return 0;
    }
    else if (opponentScore === 3 && playerScore === 1) {
        // scissors vs rock, win
        return 6;
    }
    else if (playerScore > opponentScore) {
        return 6;
    }
    else {
        return 0;
    }
};
var getChoiceScoreToWin = function (opponentChoiceScore) {
    if (opponentChoiceScore === 3) {
        return 1;
    }
    else {
        return opponentChoiceScore + 1;
    }
};
var getChoiceScoreToLose = function (opponentChoiceScore) {
    if (opponentChoiceScore === 1) {
        return 3;
    }
    else {
        return opponentChoiceScore - 1;
    }
};
var calculateScore = function (contents) {
    var lines = contents.split("\n");
    var score = 0;
    var revisedScore = 0;
    lines.forEach(function (line) {
        var _a = line.split(" "), opponentChoice = _a[0], playerChoice = _a[1];
        var opponentChoiceScore = getChoiceScore(opponentChoice);
        var playerChoiceScore = getChoiceScore(playerChoice);
        var gameScore = getGamePlayerScore(opponentChoiceScore, playerChoiceScore);
        score += gameScore + playerChoiceScore;
        // revised part, playerChoice is the strategy
        if (playerChoice === "Y") {
            // player needs a draw
            revisedScore += 3 + opponentChoiceScore;
        }
        else if (playerChoice === "X") {
            // player needs to lose
            revisedScore += getChoiceScoreToLose(opponentChoiceScore);
        }
        else {
            // player needs to win
            revisedScore += 6 + getChoiceScoreToWin(opponentChoiceScore);
        }
    });
    return [score, revisedScore];
};
(0, promises_1.readFile)(inputPath, { encoding: "utf8" }).then(printSolution)["catch"](printError);
