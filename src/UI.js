/* 
UI 
*/
const UI = (app)=>{
  //creates the VUE js instance
  app.UI.main = new Vue({
    el: '#ui-main',
    data: {
      now: 0,
      style: "W",
      screen:[0,0],
      id : 0,
      pid: -1,
      eid: -1,
      E : 0,
      e : 0,
      ship : null,
      statNames : ["Hyperspace Drive","Gravitic Drive","Sensors","Harvesters"],
      blocks : [],
      knowns : [],
      options: [],
      action: "",
      time : 0,
      tStep : 0,
      show : "",
      showSystem : false,
      notify:[]
    },
    mounted() {
      this.now = Date.now() / 1000
    },
    computed: {
      records () {
        return {
          ships : app.ships.length,
          E : app.data.e
        }
      },
      //planetary knowns 
      pKnown () {
        return this.knowns[this.pid-1].slice(1).map(k=> Number(k[0])-k[1])
      },
      //ship upgrades 
      upgradeCosts () {
        return this.ship.stats.map(val => Math.pow(2,val)/2)
      },
      //determine new speeds based upon upgrades 
      shipRates () {
        return this.ship.stats.map(val => 1/(1+(val/10)))
      },
      //current selected system
      block () { return app.blocks[this.id] },
      planets () { return this.block.planets },
      //Styling for CSS maps 
      orbitStyle() {
        if(this.style =="W"){
          let np = this.planets.length
          return this.planets.map((p,i) => {
            if(i==0) return {
              width : "6em"
            }
          })
        }
        else {
          return this.planets.map((p,i) => {
            if(i==0) return {
              height : "1em"
            }
          })
        }        
      },
      planetStyle() {
        return this.planets.map((p,i) => {
          let pS = {
            height : p.d+"em",
            width : p.d+"em"
          }
          if(i==0) {
            if(this.style =="W") pS.left="-35em"
            else {
              pS.top = "-40em"
              pS.left=-this.screen[0]/2.5+"px"
            }
          }
          if(p.type==1) pS['background-image'] = p.color
          else if(p.type==2) pS['background-color'] = p.color

          return pS
        })
      }
    },
    methods: {
      //PERFORM AN ACTION
      act(what){
        let k = app.knowns[this.id][this.pid-1]
        this.action = what
        if(what == "Surface Scan"){
          this.time = app.times.surfaceScan*this.shipRates[2]
        }
        if(what == "Point Scan"){
          this.time = app.times.pointScan*this.shipRates[2]
          //pull from block chain
          let p = this.planets[this.pid]
          let ti = k.length-1 
          let txid = p.tx[ti]
          //now get the tx data 
          app.provider.getTransaction(txid).then(tx => {
            let ev = ethers.utils.formatEther(tx.value.toString()) 
            k.push([ev,0])
          })
        }
        if(what == "Harvest Ether"){
          let e = k[this.eid].map(Number)
          let er = e[0]-e[1]
          //time per ether 
          this.time = app.times.extract*er*this.shipRates[3] 
        }
        if(what == "Enter System"){
          this.time = app.times.enterSystem*this.shipRates[0]
        }
        if(what == "Exit System"){
          this.time = app.times.exitSystem*this.shipRates[0]
        }
        if(what != "Harvest") this.options = []
      },
      //CANCEL AN ACTION
      cancelAct () {
        let k = app.knowns[this.id][this.pid-1]
        let what = this.action
        let ship = app.activeShip
        //check for method
        if(what == "Harvest Ether"){
          //get time 
          let dt = this.tStep
          //convert to E : 100 s = 1 E
          let e = dt / (app.times.extract*this.shipRates[3])
          this.e = ship.e += e 
          //reduce
          k[this.eid][1] += e 
        } 
        //cancel 
        this.time = 0
        this.tStep = 0
        this.action = ""
        //update knowns
        this.knowns = app.knowns[this.id].slice()
      },
      complete () {
        let k = app.knowns[this.id][this.pid-1]
        let what = this.action
        if(what == "Surface Scan"){
          k[0] = this.planets[this.pid].tx.length
          //update knowns
          this.knowns = app.knowns[this.id].slice()
        }
        if(what == "Point Scan"){
          //update knowns
          this.knowns = app.knowns[this.id].slice()
        }
        if(what == "Harvest Ether"){
          let e = k[this.eid].map(Number)
          let er = e[0]-e[1]
          let ship = app.activeShip
          //add E 
          this.e = ship.e += er
          //reduce
          k[this.eid][1] = e[0]
        }
        if(what == "Enter System"){
          app.shipSystem = this.id
          this.knowns = app.knowns[this.id].slice()
          this.showSystem = true
        }
        if(what == "Exit System"){
          this.exitSystem()
          //add ether 
          let e = app.activeShip.e
          app.activeShip.e = 0 
          app.ether.add(e)
        }
        this.action = ""
      },
      exitSystem() {
        app.shipSystem = this.id = 0  
        this.showSystem = false
      },
      displaySystem() {  },
      setSystem (bn) {
        this.id = bn
        this.showSystem = true
        this.knowns = app.knowns[this.id].slice()
        this.e = app.activeShip.e
      },
      buyUpgrade(i) {
        let ship = app.activeShip
        let cost = this.upgradeCosts[i]
        //reduce E 
        app.ether.spend(cost)
        //upgrade 
        ship.stats[i]++
        //update
        this.ship.stats = ship.stats.slice()
      },
      planetOptions (i) {
        if(i==0 || app.UI.main.time > 0) return
        this.action = ''
        this.options = []
        this.pid = i 
        if(this.knowns[i-1][0] == 0) this.options.push("Surface Scan")
        app.UI.main.options.push("Point Scan")     
        if(this.knowns[i-1].length>1) app.UI.main.options.push("Harvest") 
      },
      reset() {
        app.reset()
      }
    }
  })

  const resize = ()=>{
    //set svg to window 
    let iW = window.innerWidth
    let iH = window.innerHeight
    //set map style 
    app.UI.main.style = iW > iH ? "W" : "H"
    app.UI.main.screen = [iW,iH]
  }
  resize()

  window.addEventListener("resize", resize )
  window.addEventListener("orientationchange", resize )
}

export {UI}
