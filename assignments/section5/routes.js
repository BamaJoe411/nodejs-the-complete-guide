const fs = require('fs');

const requestHandler = (req, res) => {
        let htmlResposne = "";
        const url = req.url;
        const method = req.method;
        if (url === '/') {
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
        } else if (url === '/create-user' && method === 'POST') {
                const body = [];
                req.on('data', chunk => {
                        body.push(chunk);
                });
                return req.on('end', () => {
                        const parsedBody = Buffer.concat(body).toString();
                        const message = parsedBody.split('=')[1];
                        fs.appendFile('message.txt', `${message}\n`, err => {
                                res.statusCode = 302;
                                res.setHeader('Location', '/users');
                                return res.end();
                        });
                });
        } else if (url === '/users') {
                console.log("someone went to the /users page!");
                let users = "";
                let data = fs.readFileSync('message.txt', 'utf8', 'r');
                let rawUsers = data.split("\n");
                rawUsers.pop();
                rawUsers.forEach(element => {
                        users += `<li>${element}</li>`;
                });
                console.log(users);
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
        } else {
                htmlResposne = `
                <html>
                <head>
                        <title>NodeJS The Complete Guide</title>
                </head>
                <body>
                        <h1>Error! Page does not exist!</h1>
                </body>
        `;
        }
        res.setHeader('Content-Type', 'text/html');
        res.write(htmlResposne);
        return res.end();
};