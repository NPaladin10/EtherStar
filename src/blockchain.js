const parseHash = (hash,start,stop)=>{
  return parseInt(hash.slice(start, stop), 16)
}

let provider = null
if (typeof web3 !== "undefined")
  provider = new ethers.providers.Web3Provider(web3.currentProvider)
else
  provider = ethers.getDefaultProvider()

const init = (app)=>{
  app.provider = provider
  //set the active blocks 
  app.blocks = {}
  const pullBlock = (i)=>{
    provider.getBlock(i).then(block=>{
      let now = Date.now() / 1000
      let dt = now - block.timestamp
      //check time 
      if (dt < 3 * 3600) {
        let hash = block.hash
        //slice to find how long it exists 
        let r = parseHash(hash, 2, 4) % 12 + parseHash(hash, 4, 6) % 12
        //seconds available
        let bt = 60 * (60 + r * 10 / 3)
        //if still alive - begin the work of pulling data 
        if (dt < bt) {
          //chuck is the collection of blocks - always go back 4 blocks
          app.blocks[i] = {
            i,
            born: block.timestamp,
            alive: block.timestamp + bt,
            tx: []
          }
          //go back n blocks and pull data 
          for (let j = i - 3; j <= i; j++) {
            provider.getBlock(j).then(cBlock=>{
              //set tx 
              app.blocks[i].tx.push(...cBlock.transactions)
              //check for display                                   
            }
            )
          }
        }
      }
    }
    )
  }
  //get the block
  let step = app.interval
  provider.getBlockNumber().then((blockNumber)=>{
    console.log("Current block number: " + blockNumber)
    //go back ~3 hours, estimate 10s per block, 1080 block 
    let start = blockNumber - 1080
    for (let i = start; i < blockNumber; i++) {
      if (i % step == 0) {//ask for that block data 
        pullBlock(i)
      }
    }
  }
  )
  provider.on('block', (blockNumber)=>{
    console.log('New Block: ' + blockNumber);
    if (blockNumber % step == 0){
      console.log("New System!")
      pullBlock(blockNumber)
    }
  }
  )
}

export {init}
