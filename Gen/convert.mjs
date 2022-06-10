const types = {
    [Array]:{
        add:(a,b)=>[...a,...b]
    },
    [Object]:{
        add:(a,b)=>({...a,...b})
    },
    [String]:{
        add:(a,b)=>a + b
    }
}
export const typeOf = pl => pl.constructor;
export const convert = (obj,k) => key => (...args) => obj[key(args[0])][k](...args);
export const add = convert(types,'add')(typeOf);
