
const users = [];

const requestHandler = (req, res) => {
    const  url = req.url;
    const method = req.method;

    if (url === '/' ) {

        res.setHeader('Content-Type', 'text/html');
        res.write('<html>')
        res.write('<head><title>Welcome</title></head>');
        res.write('<body>');
        res.write('<h1>Hello Enter Your Username</h1>');
        res.write('<form action="/create-user" method="POST">');
        res.write('<input type="text" name="username"><button type="submit">Send</button>');
        res.write('</form>');
        res.write('</body>');
        res.write('</html>');

        return res.end();

    }
    
    if(url === '/users'){
            res.setHeader('Content-Type', 'text/html');
            res.write('<html>');
            res.write('<head><title>Users</title></head>');
            res.write('<body>');
            res.write('<ul>');
            users.forEach(user => {
                res.write(`<li>${user}</li>`);
            });  
            res.write('</ul>');
            res.write('</body>');
            res.write('</html>');
            return res.end();
        }
        
        if(url ==='/create-user' && method=== 'POST'){
            const body =[];
            req.on('data', chunk =>{
                body.push(chunk);
            });

            req.on('end', ()=>{
                const parsedBody = Buffer.concat(body).toString();
                const username = parsedBody.split('=')[1];
                console.log('Username: ', username);
                users.push(username);
                res.statusCode = 302;
                res.setHeader('Location', '/users');
                return res.end();
            });
        }
        
        
    };

    exports.handler = requestHandler;