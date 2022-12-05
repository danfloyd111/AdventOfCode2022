import { readFile } from "node:fs/promises";

//const inputPath = "./sample-input.txt";
const inputPath = "./input.txt";

const printError = console.error;

const printSolution = (contents: string) => {
  const [score, revisedScore] = calculateScore(contents);
  console.log("Total score:", score);
  console.log("Revised score:", revisedScore);
};

const getChoiceScore = (letter: string): number => {
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

const getGamePlayerScore = (
  opponentScore: number,
  playerScore: number
): number => {
  if (opponentScore === playerScore) {
    // draw: 3pts
    return 3;
  } else if (opponentScore === 1 && playerScore === 3) {
    // rock vs scissors, loss
    return 0;
  } else if (opponentScore === 3 && playerScore === 1) {
    // scissors vs rock, win
    return 6;
  } else if (playerScore > opponentScore) {
    return 6;
  } else {
    return 0;
  }
};

const getChoiceScoreToWin = (opponentChoiceScore: number) => {
  if (opponentChoiceScore === 3) {
    return 1;
  } else {
    return opponentChoiceScore + 1;
  }
};

const getChoiceScoreToLose = (opponentChoiceScore: number) => {
  if (opponentChoiceScore === 1) {
    return 3;
  } else {
    return opponentChoiceScore - 1;
  }
};

const calculateScore = (contents: string): number[] => {
  const lines = contents.split("\n");
  let score = 0;
  let revisedScore = 0;
  lines.forEach((line) => {
    const [opponentChoice, playerChoice] = line.split(" ");
    const opponentChoiceScore = getChoiceScore(opponentChoice);
    const playerChoiceScore = getChoiceScore(playerChoice);
    const gameScore = getGamePlayerScore(
      opponentChoiceScore,
      playerChoiceScore
    );
    score += gameScore + playerChoiceScore;
    // revised part, playerChoice is the strategy
    if (playerChoice === "Y") {
      // player needs a draw
      revisedScore += 3 + opponentChoiceScore;
    } else if (playerChoice === "X") {
      // player needs to lose
      revisedScore += getChoiceScoreToLose(opponentChoiceScore);
    } else {
      // player needs to win
      revisedScore += 6 + getChoiceScoreToWin(opponentChoiceScore);
    }
  });
  return [score, revisedScore];
};

readFile(inputPath, { encoding: "utf8" }).then(printSolution).catch(printError);
