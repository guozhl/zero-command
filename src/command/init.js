const commander = require('commander');
const util = require('../util');
const child_process = require('child_process');
const ora = require('ora');
const config = require('../config');

commander
  .command("init <projectName> <version>")
  .description("creating project...")
  .action(initProject)

commander.parse(process.argv);

async function initProject (projectName, version) {
  try {
    // Get the latest version
    // let getLastestVersion = ora("Pulling the latest version information...").start();
    // let lastestVersion = await util.getLastestVersion(config.projectTagListURL);
    // getLastestVersion.succeed("Successfully get the latest version information");

    // Replace projectName version
    let url = config.projectURL.replace("$projectName", projectName);
    url = url.replace("$version", version);

    // Download project
    let download = ora("Downloading project...").start();
    await util.download(url, projectName);
    download.succeed("successfully downloaded the project");

    let install = ora("Installing dependencies...").start();
    child_process.execSync(`cd ./${projectName} && npm ci`);
    install.succeed("Dependencies have been successfully installed");

    console.log("Successfully created the project! ");
  } catch (error) {
    console.log("Failed to create the project, the details are as follows: ");
    console.log(error)
  }
}
