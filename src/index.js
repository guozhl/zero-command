const commander = require('commander');
const { existsSync } = require('fs');
const { resolve } = require('path');
const { version } = require('../package.json');

commander
  .name("zero")
  .usage("[command] [options]")
  .version(version)

commander.on("--help", function () {
  console.log("");
  console.log("Commands:");
  console.log("  init <ProjectName> <Version>  init a new project and download dependencies");
  console.log("  update <ProjectName> <Version> upgrade to the specified version of the project");

  return "";
})

commander.parse(process.argv);

const [todo = ''] = commander.args;

if (existsSync(resolve(__dirname, `command/${todo}.js`))) {
  require(`./command/${todo}.js`);
} else {
  console.log(`You have entered an unknown command【${todo}】, please enter【zero --help】 to view the help`);
  process.exit(-1);
}
