#!/usr/bin/env node
import {program} from "commander";
import {execSync} from 'child_process'
import chalk from 'chalk'
import { existsSync } from 'fs'

program
    .version('0.8.0')
    .argument('<foler>', 'folder to create app')
    .action(async (folder,) => {
        console.log(chalk.bgCyan.black('create interaqt app'))
        if (await existsSync(folder)) {
            console.log(chalk.red(`folder ${folder} already exists`))
            return
        }
        console.log(chalk.green(`cloning template from git@github.com:InteraqtDev/interaqt-app-boilerplate.git`))
        await execSync(`git clone git@github.com:InteraqtDev/interaqt-app-boilerplate.git ${folder}`, {stdio: 'inherit'})
        await process.chdir(`${folder}`)
        console.log(chalk.green('running install script'))
        await execSync('npm install', {stdio: 'inherit'})
        console.log(chalk.bgCyan.black('create interaqt app succeed!'))
    });

program.parse(process.argv)