const http = require('http');

let conter = 0;

const server = http.createServer((req, res) => {

    let client = conter++;

    if (req.url.contains('favicon')) {
        res.end('Bad request');
    }

    if (req.method === 'GET') {
        if (req.url === '/') {

            let result = '';
            const end = () => {
                res.end(result);
            }

            let step = 0;
            const interval = setInterval(() => {
                const date = new Date();
                result = `${date.getUTCDate()}.${date.getUTCMonth() + 1}.${date.getUTCFullYear()} ${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()}`;

                console.log("result: ", client, result);
                res.write(result + '\r\n');

                step++;
                if (step >= 10) {
                    clearInterval(interval);
                    end();
                }

            }, process.env.INTERVAL || 1000);

        }
        else {
            res.end('Bad request');
        }
    }
    else {
        res.end('Bad request');
    }

});

server.listen(3000, () => {
    console.log('Server started on port 3000');
});
