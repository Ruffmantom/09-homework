var inquirer = require("inquirer");
const axios = require("axios");
// var pdf = require('html-pdf');
var htmlPage = require("./generateHTML");
const fs = require("fs");

const questions = [
    {
        type: "input",
        name: "username",
        message: "What is your GitHub username?"
    },
    {
        type: "input",
        name: "color",
        message: "What is your favorite color?"
    }

];

function promtUser() {
    return inquirer.prompt(questions);
};
promtUser()
    .then(function (data) {
        const username = data.username;
        const color = data.color;

        const userUrl = `https://api.github.com/users/${username}`;
        const reposUrl = `https://api.github.com/users/${username}/repos?per_page=100`;
        //api call for the user info
        axios.get(userUrl)
            .then(function (res) {
                const user = res.data;
                // console.log(user);
                // got users image below
                const userImage = user.avatar_url;
                // got user name
                const fullName = user.name;
                const userName = user.login;
                // ---------------- links for pdf nav ------------------
                // need location
                const userLoc = user.location;
                const locUrl = `https://www.google.com/maps/place/${userLoc}`;
                // console.log(locUrl)
                // need github account url
                const gitPage = user.html_url;
                // get users blog/ website
                const userBlog = user.blog;
                // ---------------- user bio ---------------------
                const userBio = user.bio;
                const repoNum = user.public_repos;
                const followers = user.followers;
                const staredRepos = user.starred_url.starred.length;
                console.log(staredRepos);
                const following = user.following;
            })

    })

// function writeToFile('resume.pdf', data) {
// need to figure out how to run the function from the other file
        // htmlPage.generateHTML(data);
// }

// function init() {

// }
// init();
 // api call for the repos
//  axios.get(reposUrl)
//  .then(function (repos) {
     //fill in
//  })
