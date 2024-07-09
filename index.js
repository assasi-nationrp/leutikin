import * as cliProgress from "cli-progress";
import { program } from "commander";
import { version } from "./package.json";
import { Glob } from "bun";

const glob = new Glob("*");

program
  .name("leutikin")
  .description("CLI to minify fiveM resources before deployment")
  .version(version);

program
  .command("minify")
  .description("Minify resources recursively")
  .argument("<string>", "path to working directory")
  .option("--path", "display just the first substring")
  .action((str, options) => {
    console.log({ str, options });

    for (const file of glob.scanSync(".")) {
      console.log(file);
    }
  });

program.parse();

// create a new progress bar instance and use shades_classic theme
// const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

// // start the progress bar with a total value of 200 and start value of 0
// bar1.start(200, 0);

// // update the current value in your application..
// bar1.update(50);
// setTimeout(() => {
// }, 1000)
// bar1.update(100);
//  setTimeout(() => {}, 1000)
// bar1.update(150);
//  setTimeout(() => {}, 1000)
// bar1.update(200);
//  setTimeout(() => {}, 1000)
// // stop the progress bar
// bar1.stop();
