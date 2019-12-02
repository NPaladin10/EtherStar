//colors
const gasGiants = [
    "linear-gradient(#B2927B, #b6512f, #B2927B, rgba(255, 255, 255, 0.8), #B2927B, #B2927B)",
    "linear-gradient(#F4C494, #e09c85, #F5D9A9, #998b66, #9B897B)",
    "linear-gradient(#99E8EC, #19BDBA, #99E8EC, #19BDBA, #99E8EC)",
    "linear-gradient(#384EC7, #2F3893, #384EC7, #2F3893, #384EC7)"
]
const planetColors  = ["blue","brown","tan","gray"]

const sizing = (id,planets) => {
    let rng = new Chance(id)
    planets.forEach(p => {
        if(p.type == 0) {
            p.d = 40
        }
        else if(p.type == 1) {
            p.d = 2+rng.d12()
            p.color = rng.pickone(gasGiants)
        }
        else if(p.type == 2) {
            p.d = rng.rpg("3d6",{sum:true})/5
            p.color = rng.pickone(planetColors)
        }
    })
}

//starts with the block id - every 128
const gen = (block) => {
    let rng = new Chance(block.i)
    //what type of system
    //Hot Jupiter / Gas Giants / Standard System
    let type = rng.weighted([0,1,2],[10,20,70])
    block.type = type
    //number of planets
    let nG = 1, nP = 0;
    if(type == 0) nG += rng.pickone([1,1,2])
    else if (type == 1) nG += rng.d4()
    else if (type == 2) {
        nP += rng.rpg("2d3",{sum:true})
        nG = rng.d6()
    }
    //possible sites 
    //let ns = 6 + rng.rpg("3d6",{sum:true})
    let N = nG+nP
    //now split up the txs between planets - 50% even 
    let nTx = block.tx.length * 0.5 / N
    let rTx = block.tx.length * 0.5
    let stx = rng.shuffle(block.tx)    
    block.planets = d3.range(N).map(i => {
        //now split transactions 
        let start = i*nTx
        let stop = start+nTx
        //add extras
        let nExtra = i==N-1 ? rTx : rTx * rng.d100()/100 
        let rStart = block.tx.length - rTx 
        let tExtra = stx.slice(rStart,rStart+nExtra)
        //now reduce 
        rTx += nExtra
        //type 
        let type = nP > 0 && i < nP ? 2 : 1
        return {
            type,
            tx : stx.slice(start,stop).concat(tExtra),
            class : "planet"
        }
    })
    //add sun
    block.planets.unshift({
        type : 0,
        class : "sun"
    })
    //do sizing
    sizing(block.i,block.planets)
}

export {gen}