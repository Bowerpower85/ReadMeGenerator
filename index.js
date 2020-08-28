const inquirer = require('inquirer');
const axios = require('axios');
const fs = require('fs');
const generateMarkdown = require('./utils/generateMarkdown.js');
// array of questions for user
const questions = [
    {
        type: 'input',
        name: 'username',
        message: 'What is your GitHub username?'
    },
    {
        type: 'input',
        name: 'title',
        message: 'What is the projects Title?'
    },
    {
        type: 'input',
        name: 'repo',
        message: 'What is the name of your Github repo?'
    },
    {
        type: 'input',
        name: 'desc',
        message: 'How would you describe the Project?.'
    },
    {
        type: 'input',
        name: 'install',
        message: 'What are the steps required to install your project?'
    },
    {
        type: 'input',
        name: 'usage',
        message: 'Write instructions for using your project.'
    },
    {
        type: 'input',
        name: 'contributors',
        message: 'Enter contributor names if any.'
    },
    {
        type: 'input',
        name: 'test',
        message: 'Are there any tests to run on the Project?'
    },
];

// function to write README file
const writeToFile = (fileName, data) => {
    fs.writeFile(fileName + '.md', data, error => error ? console.error(error) : console.log(`${fileName + '.md'} generated!`))
}
// function to initialize program
const init = () => {
    inquirer.prompt(questions).then(answers => {
        console.log(answers);
        axios
          .get('https://api.github.com/users/' + answers.username)
          .then(response => {
            console.log(response);
            const imageURL = response.data.avatar_url;
            answers.image = imageURL;
            console.log(imageURL);
            fs.writeFile('README.md', generateMarkdown(answers), (err) => {
              if (err) {
                throw err;
              }
            });
          });
      });
}
// function call to initialize program
init();
// console.log(questions);
