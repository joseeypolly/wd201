const http = require("http");
const fs = require("fs");
const arg = require("minimist")(process.argv.slice(2));

let homeContent = "";
let projectContent = "";
let registrationContent = "";

fs.readFile("home.html", (err,home) => {
    if (err){
        throw err;
    }
    homeContent = home;
});

fs.readFile("project.html",(err,project)=>{
    if (err){
        throw err;
    }
    projectContent = project;
});

fs.readFile("registration.html",(err,registration)=>{
    if (err){
        throw err;
    }
    registrationContent = registration;
});

const server = http.createServer((req,res)=>{
    let url = req.url;
    res.writeHeader(200, {"Content-type": "text/html"});
    switch(url){
        case "/project":
            res.write(projectContent);
            res.end();
            break;
        case "/registration":
            res.write(registrationContent);
            res.end();
            break;
        default:
            res.write(homeContent);
            res.end();
            break;
    }
});
const port = arg.port;
server.listen(port);
