import * as fs from 'fs/promises';
import { pathToFileURL } from 'url';
export const log = async(path)=>{
    await (fs.writeFile(`/media/ejl/Data/Logs/${Date.now()}`,await fs.readFile(`./${path}`).then(c => c.toString())))
    .then(async(x)=>await fs.rm(`./${path}`));
}


console.log(pathToFileURL('./cache.mjs'))