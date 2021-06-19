#!/usr/bin/env node

const inquirer = require('inquirer');
const { spawnSync } = require('child_process');
const { resolve } = require('path');
const {userInfo} = require('os');

const PROJECT_ROOT = resolve(process.cwd(), '..');

(async () => {
  const {postName, openEditor} = await promptUser();
  const postPath = createNewPost(postName);
  if (openEditor) {
    editPost(resolve(PROJECT_ROOT, postPath));
  }
})();

async function promptUser() {
  return new Promise((resolve, reject) => {
    inquirer.prompt(
      [
        {
          type: 'input',
          name: 'postName',
          message: 'What is the name of the new post?',
        },
        {
          type: 'confirm',
          name: 'openEditor',
          message: 'Open editor to start editing?',
          default: true,
        }
      ]
    ).then((answers) => {
      return resolve(answers);
    }).catch(err => reject(err));
  });
}

function createNewPost(postName) {
  const postPath = `blog/${replaceWhitespaces(postName)}/index.md`;
  try {
    spawnSync('npm', ['run', 'create', postPath], {
      cwd: PROJECT_ROOT,
      uid: userInfo().uid,
      gid: userInfo().gid,
    });

    return `content/${postPath}`;
  } catch (err) {
    throw err;
  }
}

function editPost(postPath) {
  try {
    const finished = spawnSync(process.env.EDITOR, [postPath], {
      uid: userInfo().uid,
      gid: userInfo().gid,
      stdio: 'inherit'
    });

    if (finished.error) {
      throw finished.error;
    }

    console.log('Finished with code', finished.status);
  } catch (err) {
    throw err;
  }
}

function replaceWhitespaces(str) {
  return str.replace(/\ /g, '-');
}
