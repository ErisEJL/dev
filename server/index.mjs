import http from 'http';
import * as fs from 'fs/promises';
import {find,create,newMessage} from '/home/ejl/Code/modules/database/mongodb/Mongo/index.mjs'

const html = (a) => `
<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" href="/public/style.css">
    </head>
    <body>
        ${a}
    </body>
</html>`

console.log(create.toString());

const parse = obj =>html([obj.name,obj.messages].join(''));
    
const path = (
    u,
    arr = u.split('/').slice(1),
    main = arr[0]


    ) => ({u,arr,main});
const stat = f => fs.readFile(`.${f}`).then(x => x.toString()).catch(home); 
const home = () => stat('/index.html');
const auth = m => find(m).then(parse).catch(home); 

const methods = {
    GET:(u)=>u.main === ''? home() : u.main.length === 24 ? auth(u.main) : stat(u.u),
    POST:(u,req)=>''
}
const listener = async(req,res)=>{
    let re = await methods[req.method](path(req.url),req);
    res.end(typeof re === 'string' ? re : JSON.stringify(re));

}
http.createServer(listener).listen(3030);