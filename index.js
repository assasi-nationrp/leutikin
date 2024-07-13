#! /usr/bin/env bun

import * as cliProgress from "cli-progress";
import directoryTree from "directory-tree";
import { program } from "commander";
import { version } from "./package.json";
import { Glob } from "bun";
import { mkdir } from "node:fs/promises";

const glob = new Glob("*");

const directoryChecking = () => {};

program
  .name("leutikin")
  .description("CLI to minify fiveM resources before deployment")
  .version(version);

program
  .command("minify")
  .description("Minify resources recursively")
  .argument("<string>", "path to working directory")
  .action((str) => {
    const fileTree = directoryTree(str, {
      attributes: ["size", "type", "extension"],
    });
    const sizedBefore = fileTree.size;
    mkdir(`.output/${fileTree.name}`, { recursive: true });
  });

program.parse();
