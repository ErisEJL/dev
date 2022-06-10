import * as fs from 'fs/promises';
import * as child from 'child_process';

export const init = async(fns,name) =>{
    await fs.mkdir(`./${name}`);
    Object.keys(fns).forEach(async(fn) => await fs.writeFile(`./${name}/${fn}.mjs`,fns[fn].toString()))
}
init(fs,'fs');