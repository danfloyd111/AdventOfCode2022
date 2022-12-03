import { readFile } from "node:fs/promises";

//const inputPath = "./sample-input.txt";
const inputPath = "./input.txt";

const solve = (contents: String) => {
  const tokens = contents.split("\n");
  let partialSum = 0;
  const loads: number[] = [];
  tokens.forEach((val) => {
    if (val === "") {
      loads.push(partialSum);
      partialSum = 0;
    } else {
      partialSum += Number(val);
    }
  });
  if (partialSum > 0) {
    loads.push(partialSum);
  }
  loads.sort((a, b) => b - a);
  return [loads.at(0), loads.slice(0, 3).reduce((a, b) => a + b)];
};

const printError = console.error;

const printSolution = (contents: string) => {
  const [biggestLoad, topThreeLoadsSum] = solve(contents);
  console.log("Biggest calories load", biggestLoad);
  console.log("Top three loads sum", topThreeLoadsSum);
};

readFile(inputPath, { encoding: "utf8" }).then(printSolution).catch(printError);
