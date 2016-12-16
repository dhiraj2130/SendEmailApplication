/**
 * Created by dhiraj.kumar on 16/12/2016.
 */
//const app = require('./src');
const config = require('./config');
const app = require('express')();

const port = config.dev.port || 8000;// it should be configured using process variable. like process.env.port || 8000

function exitOnError(fn){
    return(err,...args) => {
        if(err){
            console.error('Failed to start server',err);
            return process.exit(1);
        }
        return fn(...args);
    };
}

app.listen(port,() => {
    console.log(` Listening on http://localhost:${port}`);
})
// app.listen(port, exitOnError(() => {
//         console.log(` Listening on http://localhost:${port}`);
//     }));

