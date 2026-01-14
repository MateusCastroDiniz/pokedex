export function statRangeCalc(base, isHP = false){
    if(isHP){
        return{
            min: Math.floor(2 * base + 110),
            max: Math.floor(2 * base + 31 + Math.floor(252 / 4) + 110),
        }
    }else{
        return{
            min: Math.floor((2 * base + 5) * 0.9),
            max: Math.floor((2 * base + 31 + Math.floor(252 / 4) + 5) * 1.1),
        }
    }
}