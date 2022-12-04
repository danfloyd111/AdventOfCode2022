import { mkdir, access, open } from "fs/promises";
import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const rl = readline.createInterface({ input, output, prompt: ">" });

const createDirectoryAndFiles = async (day: number) => {
  const path = `./day${day}`;
  try {
    await access(path);
    console.log("The directory for this day is already in place!");
  } catch (err) {
    try {
      await mkdir(path);
      await open(path + "/input.txt", "w");
      await open(path + "/sample-input.txt", "w");
      await open(path + "/instructions.txt", "w");
      await open(path + "/solution.ts", "w");
      console.log("All the files are in place!");
    } catch (err) {
      console.error(err);
    }
  }
};

rl.question("Please insert the number of the day: ")
  .then((rawDay) => {
    const day = Number(rawDay);
    if (isNaN(day)) {
      throw new Error(`"${rawDay}" is not a valid day`);
    } else {
      createDirectoryAndFiles(day);
    }
  })
  .catch((err) => {
    console.error(err);
  })
  .finally(() => rl.close());
