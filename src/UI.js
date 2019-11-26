/* 
UI 
*/
const UI = (app)=>{
  //Handle System display
  const displaySystem = () => {
    let block = app.UI.main.system
    let svg = d3.select("svg")
    svg.html("")
    //check width
    let iW = window.innerWidth
    let iH = window.innerHeight
    let D = iH < iW ? "W" : "H"
    //now add planets 
    let g = svg.append("g").attr("class","planets")
    let N = block.planets.length
    let step = D=="W" ? iW/N : iH/N
    step = step < 200 ? 200 : step
    let knowns = app.data.knowns[block.i]
    //show  
    g.selectAll("circle").data(block.planets).enter().append("circle")
      .attr("cx", (d,i)=> D=="W" ? (i==0 ? -100 : step*(i+1)) : iW/2)
      .attr("cy", (d,i)=> D=="W" ? iH/2 : (i==0 ? -100 : step*(i+1)))
      .attr("r", d=> {
        return [350,80,20][d.type]
      }) 
      .attr("class",d=> ["sun","gasGiant","rocky"][d.type])
      .on("click",(d,i)=> {
        if(i==0 || app.UI.main.time > 0) return
        app.UI.main.options = []
        app.UI.main.pid = i 
        if(knowns[i-1][0] == 0) app.UI.main.options.push("Surface Scan")
        app.UI.main.options.push("Point Scan")     
        if(knowns[i-1].length>1) app.UI.main.options.push("Harvest")    
      })
    
    //add data 
    g = svg.append("g").attr("class","data")
    //mid-text position 
    let mTP = D=="W" ? iH/2 : iW/2
    g.selectAll("text").data(block.planets).enter().append("text")
      .attr("x", (d,i)=> D=="W" ? (i==0 ? -100 : (knowns[i-1][0]>0 ? step*(i+1)-20 : step*(i+1)-5 )) : (d.type == 1 ? mTP+100 : mTP+30))
      .attr("y", (d,i)=> D=="W" ? (d.type == 1 ? mTP-100 : mTP-30) : step*(i+1))
      .html((d,i)=> {
        if(i==0) return ""
        let k = knowns[i-1]
        let n = k.length-1
        return k[0]>0 ? d.tx.length + "/" + (n) : n
      })    

    resize()
  }

  const resize = ()=>{
    //set svg to window 
    let iW = window.innerWidth
    let iH = window.innerHeight
    let D = iH < iW ? "W" : "H"
    //set size
    let svg = d3.select("#map svg").attr("height", iH).attr("width", iW)
    //get bbox 
    let gS = d3.select("svg").node().getBBox()
    let w = gS.width //gS.width < 800 ? 800 : gS.width
    let h = gS.height //gS.height < 600 ? 600 : gS.height
    let vB = D=="W" ? [gS.x+450, gS.y - 25, w + 25, h + 25] : [gS.x, gS.y+350, w, h]
    //viewBox="0 0 100 100"
    d3.select("svg").attr("viewBox", vB.join(" "))
  }

  window.addEventListener("resize", resize )

  //creates the VUE js instance
  app.UI.main = new Vue({
    el: '#ui-main',
    data: {
      now: 0,
      id : 0,
      pid: -1,
      eid: -1,
      E : 0,
      e : 0,
      ship : null,
      statNames : ["Hyperspace Drive","Gravitic Drive","Sensors","Harvesters"],
      blocks : [],
      system : null,
      knowns : [],
      options: [],
      action: "",
      time : 0,
      tStep : 0,
      show : ""
    },
    mounted() {
      this.now = Date.now() / 1000
    },
    computed: {
      aB () {
        return this.blocks.find(b => b.i == this.id)
      },
      //planetary knowns 
      pKnown () {
        return this.knowns[this.pid-1].slice(1).map(k=> Number(k[0])-k[1])
      },
      upgradeCosts () {
        return this.ship.stats.map(val => Math.pow(2,val)/2)
      }
    },
    methods: {
      act(what){
        let k = app.knowns[this.id][this.pid-1]
        this.action = what
        if(what == "Surface Scan"){
          this.time = app.times.surfaceScan
        }
        if(what == "Point Scan"){
          this.time = app.times.pointScan
          //pull from block chain
          let p = this.system.planets[this.pid]
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
          this.time = app.times.extract*er 
        }
        if(what == "Enter System"){
          this.time = app.times.enterSystem
        }
        if(what == "Exit System"){
          this.time = app.times.exitSystem
        }
        if(what != "Harvest") this.options = []
      },
      cancelAct () {
        let k = app.knowns[this.id][this.pid-1]
        let what = this.action
        let ship = app.activeShip
        //check for method
        if(what == "Harvest Ether"){
          //get time 
          let dt = this.tStep
          //convert to E : 100 s = 1 E
          let e = dt / app.times.extract 
          this.e = ship.e += e 
          //reduce
          k[this.eid][1] += e 
        } 
        //cancel 
        this.time = 0
        this.tStep = 0
        this.action = ""
      },
      complete () {
        let k = app.knowns[this.id][this.pid-1]
        let what = this.action
        if(what == "Surface Scan"){
          //adjust pid, because 0 is sun 
          let p = this.system.planets[this.pid]
          k[0] = p.tx.length
        }
        if(what == "Point Scan"){

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
          this.system = app.blocks[this.id]
          app.shipSystem = this.id
        }
        if(what == "Exit System"){
          this.exitSystem()
          //add ether 
          let e = app.activeShip.e
          app.activeShip.e = 0 
          app.ether.add(e)
        }
        if(this.system) {
          displaySystem()
          this.knowns = app.knowns[this.id]
        }
        this.action = ""
      },
      exitSystem() {
        this.id = 0  
        this.system = null
        let svg = d3.select("svg")
        svg.html("")
        app.shipSystem = 0
      },
      displaySystem() { displaySystem() },
      setSystem (bn) {
        this.id = bn
        this.system = app.blocks[this.id]
        this.knowns = app.knowns[this.id]
        this.e = app.activeShip.e
        displaySystem()
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
      reset() {
        app.reset()
      }
    }
  })
}

export {UI}
