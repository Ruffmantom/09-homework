var inquirer = require("inquirer");
var htmlPage = require("./generateHTML");
const fs = require("fs");

const questions = [
    {
        type: "input",
        name: "name",
        message: "What is your name?"
    },
    {
        type: "input",
        name: "location",
        message: "Where are you from?"
    },
    {
        type: "input",
        name: "hobby",
        message: "What is your favorite hobby?"
    },
    {
        type: "input",
        name: "food",
        message: "What is your favorite food?"
    },
    {
        type: "input",
        name: "github",
        message: "Enter your GitHub Username"
    },
    {
        type: "input",
        name: "linkedin",
        message: "Enter your LinkedIn URL."
    }

];

function promtUser() {
    return inquirer.prompt(questions);


}
promtUser()
    .then(function (data) {
        generateHTML(data)
        const queryUrl = `https://api.github.com/users/${username}/repos?per_page=100`;

        axios.get(queryUrl).then(function (res) {
            const repoNames = res.data.map(function (repo) {
                return repo.name;
            });

            const repoNamesStr = repoNames.join("\n");

            fs.writeFile("repos.txt", repoNamesStr, function (err) {
                if (err) {
                    throw err;
                }

                console.log(`Saved ${repoNames.length} repos`);
            })

            function writeToFile(fileName, data) {

            }

            function init() {

            }
            init();


// from example
