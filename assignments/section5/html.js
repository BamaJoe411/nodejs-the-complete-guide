const fs = require('fs');

const root = () => {
    htmlResposne = `
        <html>
        <head>
            <title>NodeJS The Complete Guide</title>
        </head>
        <body>
            <h1>Hello!</h1>
            <h1>Plese enter a username.</h1>
            <form action="/create-user" method="POST">
                    <input type="text" name="message">
                    <button type="submit">Send</button>
            </form>
        </body>
    `;
    return htmlResposne;
}

const users = () => {
    let users = "";
    const data = fs.readFileSync('message.txt', 'utf8', 'r');
    let rawUsers = data.split("\n");
    rawUsers.pop();
    rawUsers.forEach(element => {
            users += `<li>${element}</li>`;
    });
    htmlResposne = `
            <html>
            <head>
                    <title>NodeJS The Complete Guide</title>
            </head>
            <body>
                    <ul>
                            ${users}
                    </ul>
            </body>
    `;
    return htmlResposne;
}

module.exports = {root, users}