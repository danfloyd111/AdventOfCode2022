"use strict";
exports.__esModule = true;
var promises_1 = require("node:fs/promises");
//const inputPath = "./sample-input.txt";
var inputPath = "./input.txt";
var printError = console.error;
var solve = function (contents) {
    var tokens = contents.split("\n");
    var partialSum = 0;
    var loads = [];
    tokens.forEach(function (val) {
        if (val === "") {
            loads.push(partialSum);
            partialSum = 0;
        }
        else {
            partialSum += Number(val);
        }
    });
    if (partialSum > 0) {
        loads.push(partialSum);
    }
    loads.sort(function (a, b) { return b - a; });
    return [loads.at(0), loads.slice(0, 3).reduce(function (a, b) { return a + b; })];
};
var printSolution = function (contents) {
    var _a = solve(contents), biggestLoad = _a[0], topThreeLoadsSum = _a[1];
    console.log("Biggest calories load", biggestLoad);
    console.log("Top three loads sum", topThreeLoadsSum);
};
(0, promises_1.readFile)(inputPath, { encoding: "utf8" }).then(printSolution)["catch"](printError);
