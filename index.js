import * as cliProgress from "cli-progress"

// create a new progress bar instance and use shades_classic theme
const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

// start the progress bar with a total value of 200 and start value of 0
bar1.start(200, 0);

// update the current value in your application..
bar1.update(50);
setTimeout(() => {
}, 1000)
bar1.update(100);
 setTimeout(() => {}, 1000)
bar1.update(150);
 setTimeout(() => {}, 1000)
bar1.update(200);
 setTimeout(() => {}, 1000)
// stop the progress bar
bar1.stop();