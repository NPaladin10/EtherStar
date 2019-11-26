//starts with the block id - every 128
const gen = (block) => {
    let rng = new Chance(block.i)
    //what type of system
    //Hot Jupiter / Gas Giants / Standard System
    let type = rng.weighted([0,1,2],[30,30,40])
    block.type = type
    //number of planets
    let nG = 1, nP = 0;
    if(type == 0) nG += rng.pickone([1,1,2])
    else if (type == 1) nG += rng.d4()
    else if (type == 2) {
        nP += 1 + rng.d4()
        nG += rng.d4()
    }
    //possible sites 
    //let ns = 6 + rng.rpg("3d6",{sum:true})
    let N = nG+nP
    //now split up the txs between planets - 50% even 
    let nTx = block.tx.length * 0.5 / N
    let rTx = block.tx.length * 0.5
    let stx = rng.shuffle(block.tx)    
    block.planets = d3.range(N).map(i => {
        let start = i*nTx
        let stop = start+nTx
        //add extras
        let nExtra = i==N-1 ? rTx : rTx * rng.d100()/100 
        let rStart = block.tx.length - rTx 
        let tExtra = stx.slice(rStart,rStart+nExtra)
        //now reduce 
        rTx += nExtra
        return {
            type : nP > 0 && i < nP ? 2 : 1,
            tx : stx.slice(start,stop).concat(tExtra),
        }
    })
    //add sun
    block.planets.unshift({
        type : 0
    })
}

export {gen}