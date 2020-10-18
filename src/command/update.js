const commander = require('commander');
const config = require('../config');
const util = require('../util');
const child_process = require('child_process')
const { existsSync } = require('fs');
const ora = require('ora');

commander
  .command("update <projectName> <version>")
  .description("creating project...")
  .action(updateProject)

commander.parse(process.argv);

async function updateProject (projectName, version) {
  try {
    // version number detection
    if (!/^v([1-9]\d|[1-9])(.([1-9]\d|\d)){2}$/.test(version)) {
      console.log("The version number does not meet the specification, please enter the version number of the specification, for example: v1.0.0");
      return;
    }

    // By verifying whether there is a package.json file to determine whether to perform the upgrade command in the project home directory
    if (!existsSync('./package.json')) {
      console.log("Not in the project home directory, please execute this command in the project home directory");
      return;
    }

    // Replace projectName version
    let url = config.projectURL.replace("$projectName", projectName);
    url = url.replace("$version", version);

    // Download the specified versio
    let download = ora("downloading the specified version of the project...").start();
    await util.download(url, '_temp');
    download.succeed("successfully downloaded the specified version of the project");

    // Copy the contents of the _temp directory to the main project
    let update = ora("upgrading the contents of the specified version...").start();
    // child_process.execSync(`cp -r ./_temp/{${config.updateProjectFileList.join(',')}} ./`);
    child_process.execSync(`cp -r ./_temp/ ./`);
    update.succeed("the content of the specified version has been successfully upgraded");

    // delete _temp
    child_process.execSync(`rm -r ./_temp`);

    console.log("update completed");
  } catch (error) {
    console.log("Failed to create the project, the details are as follows: ");
    console.log(error);
  }
}
