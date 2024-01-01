#!/usr/bin/env node


import {program} from "commander";
import {execSync} from 'child_process'
import chalk from 'chalk'
import {existsSync} from 'fs'

program
  .version('0.8.7')
  .argument('<folder>', 'folder to create app')
  .action(async (folder,) => {
    console.log(chalk.bgCyan.black('create interaqt app'))
    if (await existsSync(folder)) {
      console.log(chalk.red(`folder ${folder} already exists`))
      return
    }
    console.log(chalk.green(`cloning template from https://github.com/InteraqtDev/interaqt-app-boilerplate.git`))
    await execSync(`git clone https://github.com/InteraqtDev/interaqt-app-boilerplate.git ${folder}`, {stdio: 'inherit'})
    await process.chdir(`${folder}`)
    await execSync('rm -rf .git', {stdio: 'inherit'})
    console.log(chalk.green('running install script'))
    await execSync('npm install', {stdio: 'inherit'})

    await process.chdir(`dashboard`)
    console.log(chalk.green('running dashboard install script'))
    await execSync('npm install', {stdio: 'inherit'})
    console.log(chalk.bgCyan.black('create interaqt app succeed!'))
  });

program.parse(process.argv)