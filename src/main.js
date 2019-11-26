//chance
import "../lib/chance.min.js"
//localforage 
import "../lib/localforage.1.7.1.min.js";
//Save db for Indexed DB - localforage
const DB = localforage.createInstance({
  name: "EtherStarDB",
  storeName: "EtherStarDB"
})
import {init} from "./blockchain.js"
import {gen} from "./generate.js"
//UI 
import {UI} from "./UI.js"

//ship 
const SHIP = {
  loc : [0,0,0], //block, planet, alive
  stats : [0,0,0,0], //in/out engine, in sys engine, sensors, harvester
  e : 0
}

//generic application 
const app = {
  DB,
  gen,
  interval: 128,
  times: {
    enterSystem: 10,
    exitSystem: 5,
    surfaceScan: 10,
    pointScan: 10,
    extract: 100,
  },
  data: {
    e : [0,0],
    ships: [],
    knowns: {},
  },
  get knowns() {
    return this.data.knowns
  },
  //ether 
  get ether () {
    let e = this.data.e 
    return {
      amt : e[0]-e[1],
      add(val) { e[0]+= val },
      spend(val) { e[1] += val }
    }
  },
  //ships 
  get ships () { return this.data.ships },
  get shipsAlive () { return this.ships.filter(s => s.loc[0] != -1) },
  addShip () {
    this.data.ships.push(JSON.parse(JSON.stringify(SHIP)))
    return this.activeShip 
  },
  get activeShip() {
    return this.shipsAlive[0]
  },
  set shipSystem(bn) {
    let ship = this.activeShip
    let alive = [0,-1].includes(bn) ? 0 : this.blocks[bn].alive
    ship.loc = [bn,0,alive]
  },
  shipsByBlock(bn) {
    return this.ships.filter(s => s.loc[0] == bn)
  },
  UI: {},
  games: {},
  save() {
    DB.setItem('games', this.games)
    let id = this.games.current
    DB.setItem(id + '.data', this.data)
  },
  newGame(id) {
    app.games.current = id
    app.games.all = [id]
    app.addShip()
  },
  load() {
    let id = this.games.current
    DB.getItem(id + ".data").then(val=>{
      if (val) {
        app.data = val
      }
      //loop through ships checking for alive
      let now = Date.now() / 1000
      this.ships.forEach(s=> {
        if(s.loc[0] == -1) return
        //kill
        if(s.loc[0] != 0 && s.loc[2] < now) s.loc=[-1,0,0]
      })
      //check for alive 
      if(this.shipsAlive.length==0) this.addShip()
    }
    )
  },
  reset() {
    let id = this.games.current
    let i = this.games.all.indexOf(id)
    this.games.all.splice(i, 1)
    this.games.current = null
    DB.setItem('games', this.games)
    DB.removeItem(id+".data").then(()=>{
      window.location = ""
    })
  }
}
init(app)
UI(app)

//games 
DB.getItem('games').then(val=>{
  //create
  if (!val) {
    let id = chance.hash()
    app.newGame(id)
    app.UI.main.show = "about"
  }//load the game 
  else {
    app.games = val
    if (!app.games.current) {
      //no current game - try to load 
      if (app.games.all.length > 0) {
        app.games.current = app.games.all[0]
      } else {
        let id = chance.hash()
        app.games.current = id
        app.games.all = [id]
      }
    }
    app.load()
  }
}
)

//Timer
let step = 0
setInterval(()=>{
  let UI = app.UI.main
  let now = UI.now = Date.now() / 1000
  //update E in ui 
  UI.E = app.ether.amt
  //step 
  step++
  //check blocks
  UI.blocks = []
  for (let bn in app.blocks) {
    let block = app.blocks[bn]
    //generate - always update incase of blockchain update  
    app.gen(block)
    //check alive 
    if (block.alive > now) {
      block.dt = now - block.born
      //check for knowns 
      if (!app.knowns[bn]) {
        app.knowns[bn] = block.planets.slice(1).map(p=>[0])
      }
      UI.blocks.push(block)
      //show map 
      if (app.activeShip.loc[0] == bn && UI.id != bn) {
        UI.setSystem(bn)
      }
    } else {
      delete app.blocks[bn]
      //check if ships are lost  
      let ships = app.shipsByBlock(bn)
      //set to destroy
      ships.forEach(s => s.loc[0] = -1)
      //add new 
      if(app.shipsAlive.length==0) app.addShip()
    }     
  }
  //update time 
  if (UI.time > 0) {
    UI.tStep += 0.2
    if (UI.tStep >= UI.time) {
      UI.time = 0
      UI.tStep = 0
      //check the complete action
      UI.complete()
    }
  }
  //save every second
  if(step%5==0) {
    UI.ship = app.activeShip
    app.save()
  }
  //every 3 sec update screen
  if(step%15==0 && UI.system) UI.displaySystem()
}
, 200)
