#! /usr/bin/env bun

import chalk from "chalk";
import * as luamin from "luamin";
import directoryTree from "directory-tree";
import { program } from "commander";
import { version } from "./package.json";
import { mkdir } from "node:fs/promises";

let numberFile = 0;

const recursiveCompression = async (tree) => {
  for (const node of tree) {
    try {
      if (node.extension === ".lua") {
        try {
          const file = Bun.file(node.path);
          const content = await file.text();
          const outputFile = Bun.file(`.output/${node.path}`);
          await Bun.write(outputFile, luamin.minify(content));
          numberFile += 1;
        } catch (err) {
          console.error(`Error processing file: ${node.path}`, err);
        }
      } else if (node.children) {
        createDirectory(`.output/${node.path}`);
        await recursiveCompression(node.children);
      } else {
        // Handle non-Lua files (optional: copy or ignore)
        const sourceFile = Bun.file(node.path);
        const outputFile = Bun.file(`.output/${node.path}`);
        await Bun.write(outputFile, sourceFile); // Assuming copy for non-Lua files
      }
    } catch (error) {
      console.error(`Error processing file: ${node.path}`, error);
    }
  }
};

const createDirectory = (path) => {
  mkdir(path, { recursive: true });
};

program
  .name("leutikin")
  .description("CLI to minify fiveM resources before deployment")
  .version(version);

program
  .command("minify")
  .description("Minify resources recursively")
  .argument("<string>", "path to working directory")
  .action(async (str) => {
    const fileTree = directoryTree(str, {
      attributes: ["size", "type", "extension"],
    });
    const sizedBefore = fileTree.size;
    createDirectory(`.output/${fileTree.name}`);
    await recursiveCompression(fileTree.children);
    const fileTreeCompressed = directoryTree(`.output/${str}`, {
      attributes: ["size", "type", "extension"],
    });

    console.log(chalk.bold.green("Compression process is done"));
    console.log(chalk.bold.green("Number of file compressed: " + numberFile));
    console.log(chalk.bold.green("Size before: " + sizedBefore));
    console.log(chalk.bold.green("Size after: " + fileTreeCompressed.size));
    console.log(
      chalk.bold.green(
        "Amount compress: " + (sizedBefore - fileTreeCompressed.size),
      ),
    );
    console.log(
      chalk.bold.green(
        "Amount compress (%): " +
          ((sizedBefore - fileTreeCompressed.size) / fileTreeCompressed.size) *
            100,
      ),
    );
  });

program.parse();
