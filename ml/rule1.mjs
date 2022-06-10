
import * as fs from 'fs/promises';
const toChar=(str)=>str.split('').map(x => x.charCodeAt(0));
let ar = Symbol('ar');
let rule = await fs.readFile('./rule.json').then(JSON.parse)||{};

const curr =(i,o)=> toChar(i).map((x,ind)=>toChar(o)[ind] - x);
const p = ((arr)=> i => o => {
    let _curr = curr(i,o);
    rule[i] = _curr;
    fs.writeFile('./rule.json',JSON.stringify(rule));
  
})([]);
const koe = (i,re = Object.keys(rule)[0])=>{
    Object.keys(rule).forEach((a) => sim(a,i) > sim(re,i) ? re = a : re = re);
    return toChar(i).map((x,ind) => x+rule[re][ind]).map(z => String.fromCharCode(z)).join('') 
   
     
}

const sim = (a,b,c=curr(a,b))=>c.filter(z=>z===0).length / b.length; 
const bac = (i) => rule[i] 
? toChar(i).map((x,ind) => x+rule[i][ind]).map(z => String.fromCharCode(z)).join('')
:koe(i);
    


console.log(bac("zopen"));
