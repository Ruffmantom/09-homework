var inquirer = require("inquirer");
const axios = require("axios");
const htmlPage = require("./generateHTML");
const fs = require("fs");
const util = require("util");
const puppeteer = require('puppeteer')

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
        const reposUrl = `https://api.github.com/users/${username}/starred`;
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
                // const staredRepos = user.starred_url;
                // console.log(staredRepos);
                const following = user.following;
                // api call for the repos
                axios.get(reposUrl)
                    .then(function (starred) {
                        const starredNum = starred.data.length;
                        const responseObj = [userImage, fullName, userName, locUrl, userLoc, gitPage, userBlog, userBio, repoNum, followers, following, starredNum, color]
                        console.log(responseObj);
                        const test = htmlPage(responseObj);
                        (async () => {
                            const browser = await puppeteer.launch();
                            const page = await browser.newPage();
                            await page.setContent(test, { waitUntil: 'networkidle2' });
                            await page.pdf({
                                path: 'resume.pdf',
                                format: 'A4',
                                printBackground: true
                            });

                            await browser.close();
                        })();
                    })
            })



    })



