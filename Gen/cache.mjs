import { add } from './convert.mjs';




export const cache =start=>a=>obj=>pl=>{
    if(pl){
        obj = a(obj,pl)
    }   else {
        setImmediate(()=>obj = start);
        return obj;
    }
}
