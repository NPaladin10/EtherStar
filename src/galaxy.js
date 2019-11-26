//asset data 
import {data as DATA} from "./assets.js"

const circlePack = ()=>{
  let rng = new Chance("SilverStarRPG")
  //get data 
  let h = d3.hierarchy({
    //once for each plane 
    "children": d3.range(100).map(_=>{
      return {
        A: rng.pickone([1, 2, 3]) + (rng.d10() - 1) / 10
      }
    }
    )
  })
  h.sum(d=>d.A)

  let pack = d3.pack().size([800, 800])(h)
  //first is always full circle 
  return h.descendants().slice(1)
}

// Spiral Galaxy Simulation
const galaxyGen = () => {
  let rng = new Chance("SilverStarRPG")
  const PI = Math.PI
  const nS = 10000 // only ...
  const Rmax = 425 // galaxy radius
  //initial galaxy rotation 
  const ia = rng.random()*2*PI
  // stars follow elliptic orbits around the center
  let eratio = .875 // ellipse ratio
  let etwist = 8.0 / Rmax // twisting factor (orbit axes depend on radius)
  //each star 
  let stars = []

  // begin in the center
  const cx = 400
  const cy = 400
  // itit stars
  let a, r, x, y, b, s, c;
  for (let i = 0; i < nS; i++) {
    a = ia + rng.random() * 2 * PI 
    r = 1 + rng.random() * Rmax
    x = r * Math.sin(a)
    y = r * eratio * Math.cos(a)
    b = r * etwist
    s = Math.sin(b)
    c = Math.cos(b)
    stars[i] = [cx + s * x + c * y, cy + c * x - s * y] // trigonometry
  }

  return stars
}

const COLONY = {
  origin : ["Ancestral Land","Ancient Industry","Defensible","Ethnocentrists",
  "Innovators","Outcasts","Rebels","Religious Community","Survivors","Trading Hub"],
  originBonus : ["W","W","M","S","W","S","M","S","M","W"],
  activity : ["Councils","Destined Conquerors","Educational Tradition","Expert Artisans",
  "Martial Tradition","Missionary Zeal","Mutual Defense","Production Center","Strong Society",
  "Vigorous Trade"],
  activityBonus : ["S","M","W","W","M","S","M","W","S","W"]
} 

const RUIN = {
  nature : ["Abandoned Colony","Ancient Colony","Broken Temple","Abandoned Fortress",
  "Mechan Forge World","Empty Tower","Failed Colony","Forsaken Outpost","Lost Mine",
  "Plundered Colony","Cosmic Ruins","Shattered School"],
  natureBonus : ["W","W","S","M","W","M","W","M","W","W","W","W"],
  trait : ["Ancient Armory","Buried Treasure","Commanding Location","Forgotten Cosmic Methods",
  "Beneficient Cosmic AI","Great Art","Lost Techniques","Pre-Hive Relics","Rich Resources",
  "Scattered Heirs","Seat of Legitimacy","Willing Recruits"],
  traitBonus : ["M","W","M","W","M","S","W","S","W","S","S","M"]
}  

const RESOURCE = {
  nature :["Garden World","Rock World","Asteroid Belt","Gas Giant","Medicinal Chemicals","Old Industry",
"Cosmic"],
  p : [3,3,3,3,1,1,0.1]
}

const init = (app) => {
  Object.assign(app.data,DATA)

  class Sector {
    constructor (i,what) {
      let rng = new Chance("SilverSector-"+i)
      this.i = i
      this._owner = 0
      this._inWork = []
      this._assets = []

      let data = null
      if(what == "colony") {
        let a = d3.range(COLONY.origin.length).map(i=>i)
        let b = d3.range(COLONY.activity.length).map(i=>i)
        data = 1
      }
      else if(what == "ruin") {
        let a = d3.range(RUIN.nature.length).map(i=>i)
        let b = d3.range(RUIN.trait.length).map(i=>i)
        data = {type:[rng.pickone(a),rng.pickone(b)]}
      }
      else if(what == "resource") {
        let ids = d3.range(RESOURCE.nature.length).map(i=>i)
        data = {type:rng.weighted(ids,RESOURCE.p)}
      }
      else if (what == "lair") {
        let lair = rng.pickone(DATA.lairs)
        data = {type:lair.id}
      }

      if(what) this["_"+what] = data
      //colony improvements
      this._ci = rng.shuffle([0,0,0,0,0,1,1,1,1,1,2,2,2,2,2]).slice(0,10)

      this.genTrouble()
    }
    get neighbors () {
      return [...app.Galaxy.voronoi.delaunay.neighbors(this.i)]
    }
    get poiSVGClass () {
      if(this.colony) return "colony"
      else if(this.lair) return "lair"
      else if(this.ruin) return "ruin"
      else if(this.resource) return "resource"
      return ""
    }
    get svgClass () {
      if(this._owner == 1) return "pc"
      else if(this._owner == 2) return "empire"
      else if(this._owner == 3) return "hive"
      return ""
    }
    set owner (id) { this._owner = id }
    get owner () {
      return app.factions.byId(this._owner)
    }
    get mayBuild () {
      return app.factions.all.map(F=> {
        let assets = this._assets.filter(a=>a.o == F.id)
        let base = assets.filter(a=>a.id==0)        
        let buildBase = assets.length > 0 ? [{id:0,text:"Base"}] : []
        return F.id == 0 ? [] : base.length>0 ? F.availableAssets : buildBase
      })
    }
    get colony () {
      if(!this._colony) return null
      let ci = this._ci.slice(0,this._colony)
      let b = ci.reduce((r,v)=> {
        r[v]++
        return r 
      },[0,0,0])
      let d = ["","1d4","1d6","1d8","1d10","1d12"]
      let stat = this._trouble ? b[this.trouble.stat] : 0
      let save = stat > 0 ? d[stat] : null

      return {
        r : this._colony,
        text : b.join("/"),
        save
      }
    }
    get inWork () {
      let iw = this._inWork.map(w => {
        if(w[0] == "u") return DATA.units.find(u=>u.id==w[1]).name
        else if(w[0] == "a") return DATA.siteAssets.find(u=>u.id==w[1]).name
        else if(w[0] == "s") return DATA.supportUnits.find(u=>u.id==w[1]).name
        return ""
      })
      return iw
    }
    //local assets
    get assets () { 
      let T = this._trouble
      //return the asset  
      return this._assets.map((a,i) => {
        //foes 
        let foes = this._assets.reduce((all,_a,i) => {
          if(_a.o==a.o) return all 
          all.push([i,DATA.assets.find(A=>_a.id==A.id).name]) 
          return all 
        },[])
        //data 
        let _a = DATA.assets.find(_a=>_a.id==a.id)
        return {
          raw : a ,
          get mhp () {return this.raw.mhp || this.data.hp },
          get hp () {return this.raw.hp }, 
          set hp (hp) { this.raw.hp = hp },
          data : _a,
          name : _a.name,
          get F () {
            let fid = this.raw.o
            return  app.factions.byId(fid)
          },
          get mayMove() {
            return _a.id != 0
          },
          get mayAttack() {
            return _a.atk.length >0 ? foes : []  
          },
          get maySave() {
            return T && _a.saves.map(s=>s[0]).includes(T[0])
          },
          //give action options
          get act () {
            return []
          }
        }
      })
    }
    get hasUnits () {
      return this._assets.reduce((has,a)=> has || a.o != 0 ,false)
    }
    get hasFoes () {
      return this._assets.reduce((has,a)=> has || a.o == 0 ,false)
    }
    moveAsset (i,to) {
      let a = Object.assign({},this._assets[i])
      //remove
      this._assets.splice(i,1)
      //push to new 
      app.Galaxy.sectors[to]._assets.push(a)
    }
    addAsset(fid,id) {
      let A = app.data.assets.find(a=>a.id==id)
      //check for base 
      if(id==0) {
        let base = this._assets.find(a => a.id==0 && a.o==fid)
        if(base) return base 
      }
      //asset
      let a = {
        id,
        o : fid,
        hp : A.hp, 
        d: 0 //disorder
      } 
      //add to assets 
      let i = this._assets.length
      this._assets.push(a)
      return this._assets[i]
    }
    get lair () {
      //let unit = l ? DATA.units.find(u=>u.id == l.unit) : null
      return this._lair ? DATA.lairs.find(l=> l.id == this._lair.type) : null 
    }
    get resource () {
      if(!this._resource) return null
      let id = this._resource.type
      return {
        id,
        text : RESOURCE.nature[id]
      }
    }
    get ruin () {
      if(!this._ruin) return null
      let t = this._ruin.type
      return {
        type : t,
        text : RUIN.nature[t[0]]+", "+RUIN.trait[t[1]],
        bonus : [RUIN.natureBonus[t[0]],RUIN.traitBonus[t[1]]]
      }
    }
    get trouble () {
      if(!this._trouble) return null
      let t = this._trouble
      let save = DATA.troubleSaves[t[0]]
      return {
        t,
        text : t[0],
        save,
        stat : DATA.saveStat[save],
        get lv () {return this.t[1]}
      }
    }
    genTrouble (rng = chance) {
      //check for the basis to generate trouble 
      let basis = this._colony ? ["colony"] : []
      if(this._ruin) basis.push("ruin")
      if(this._resource) basis.push("resource")
      if(basis.length == 0) {
        this._trouble = null
        return
      }

      let trouble = {
        "colony" : [`Bad Reputation`,`Barren Surroundings`,`Class Hatred`,`Contaminated Land`,`Corrupt Leadership`,`Crushed Spirits`,`Demagogue`,`Destructive Customs`,`Disunity`,`Ethnic Feuding`,`Exceptional Poverty`,`Exiled Lord`,`Mercenary Populace`,`Monsters`,`Natrual Destruction`,`Outsider Cult/Sinister Cult`,`Pervasive Hunger`,`Raiders`,`Recurrent Sickness`,`Riotous Thugs`,`Secret Society`,`Toxic Process`,`Xenophobia`],
        "ruin" : [`Barren Surroundings`,`Conquering Heirs`,`Contaminated Land`,`Dark Wizards`,`Disputed Possession`,`Exiled Lord`,`Harsh Conditions`,`Hazardous Resource`,`Inaccessible`,`Infested`,`Monsters`,`Murderous Heirs`,`Outsider Cult/Sinister Cult`,`Raiders`,`Ancient Cosmic Defenses`,`Sealed Evil`,`Severe Damage`,`Taboo Land`],
        "resource" : [`Bad Reputation`,`Barren Surroundings`,`Conquering Heirs`,`Contaminated Land`,`Covetous Polity`,`Disputed Possession`,`Failed Settlement`,`Harsh Conditions`,`Hazardous Resource`,`Inaccessible`,`Infested`,`Monsters`,`Natrual Destruction`,`No Workers`,`Raiders`,`Recalcitrant Locals`,`Recurrent Sickness`,`Ancient Cosmic Defenses`,`Sealed Evil`,`Taboo Land`,`Toxic Process`,`Undeveloped`,`Wasted Production`],
      }
      let base = rng.pickone(basis)
      let what = rng.pickone(trouble[base]) 
      let lv = 2+rng.d6()

      this._trouble = [what,lv]
    }
    get save () {
      let what = ["owner","inWork","assets","trouble"]
      let data = {}
      what.forEach(id => {
        data[id] = this["_"+id] 
      })
      return data
    }
    load (data) {
      let what = ["owner","inWork","assets","trouble"]
      what.forEach(id => {
        this["_"+id] = data[id] 
      })
    }
  } 

  const generate = () => {
    const allIds = d3.range(100).map(i=> i)
    //pack everything
    let pack = circlePack()
    //delaunay
    const points = pack.map(p => [p.x,p.y])
    const delaunay = d3.Delaunay.from(points)
    const voronoi = delaunay.voronoi([0, 0, 800, 800])
    const polys = [...voronoi.cellPolygons()]
    //stars
    const stars = galaxyGen()
    //rng setup 
    let rng = new Chance("abc")
    //15 random polys for flux
    let flux = rng.shuffle(allIds).slice(0,15)
    //starting positions for the hive, empire and player 
    let start = rng.shuffle([[200,200],[600,200],[600,600],[200,600]]).slice(0,3)
    //4 polys for Hive 
    let hive = [delaunay.find(...start[0])]
    hive.push(...[...delaunay.neighbors(hive[0])].slice(0,3))
    //3 polys for the "Empire"
    let empire = [delaunay.find(...start[1])]
    empire.push(...[...delaunay.neighbors(empire[0])].slice(0,2))
    //one for the player 
    let player = [delaunay.find(...start[2])]

    //neutral demographics 
    //2 cities, 8 towns, 10 ruins, 8 resources, 12 lairs
    let available = new Set(allIds)
    let used = hive.concat(empire,player)
    used.forEach(id => available.delete(id))
    let sites = rng.shuffle([...available.values()]).slice(0,40)
    let what = ["c2","c2"].concat(d3.range(8).map(_=>"c1"),d3.range(10).map(_=>"ruin"))
    what = what.concat(d3.range(8).map(_=>"resource"),d3.range(12).map(_=>"lair"))
    what = rng.shuffle(what)
    //create sectors 
    let sectors = d3.range(100).map(i=> {
      let s = null
      let ti = sites.indexOf(i)
      let tag = ti > -1 ? what[ti] : ""
      //set up object
      if(tag == "c2") {
        s = new Sector(i,"colony")
        s._colony = rng.pickone([3,4])
      }
      else if(tag == "c1") {
        s = new Sector(i,"colony")
        s._colony = rng.pickone([1,2])
      }
      else if(tag.length>0) s = new Sector(i,tag)
      else s = new Sector(i)
      //set path 
      s.svgPath = voronoi.renderCell(i)

      return s 
    })
    //add hive sites
    let hiveSites = ["colony","colony","colony","resource"]
    hiveSites.forEach((w,i)=> {
      let id = hive[i]
      let s = sectors[id] = new Sector(id,w)
      s.owner = 3
      //add base to each 
      let a = s.addAsset(3,0)
      a.hp = a.mhp = 5
      s.svgPath = voronoi.renderCell(id)
    })
    //first is r 2 colony
    sectors[hive[0]]._colony = rng.pickone([3,4])
    //add empire sites 
    let empireSites = ["colony","colony","resource"]
    empireSites.forEach((w,i)=> {
      let id = empire[i]
      let s = sectors[id] = new Sector(id,w)
      s.owner = 2
      //add base to each 
      let a = s.addAsset(2,0)
      a.hp = a.mhp = 5
      s.svgPath = voronoi.renderCell(id)
    })
    //first is r 2 colony
    sectors[empire[0]]._colony = rng.pickone([3,4])
    //add player site
    let pid = player[0]
    let ps = sectors[pid] = new Sector(pid,"colony")
    ps.owner = 1
    //give assets  
    let a = ps.addAsset(1,0)
    a.hp = a.mhp = 5
    ps.addAsset(1,3)
    ps.addAsset(1,49)
    ps.svgPath = voronoi.renderCell(pid)

    return {points,voronoi,polys,stars,flux,sectors}
  }

  app.Galaxy = generate()
  app.Galaxy.drawSectors = function () {
    let gs = d3.select("g.sectors")
    let gf = d3.select("g.flux")
    gs.html("")
    gf.html("")
    //now display sectors 
    gs.selectAll("path").data(this.sectors).enter()
      .append("path").attr("d", d=> d.svgPath)
      .attr("class",d => d.svgClass)
      .on("click", (d,i)=>{//update UI 
        //console.log(d)
        app.UI.main.sector = d
        d3.select("g.move-text").html("")
        app.UI.main.toMove = [-1,0]
      })
    //now display flux 
    gf.selectAll("path").data(this.flux).enter()
      .append("path").attr("d", d=> this.voronoi.renderCell(d))
      .attr("class","flux")
  }
  app.Galaxy.drawPOI = function () {
    let g = d3.select("g.poi")
    g.html("")
    //show poi  
    g.selectAll("circle").data(this.sectors).enter().append("circle")
      .attr("cx", d=> this.points[d.i][0])
      .attr("cy", d=> this.points[d.i][1])
      .attr("r", d=> {
        return d.colony ? d.colony.r : d.poiSVGClass.length>0 ? 4 : 0 
      }) 
      .attr("class",d=> d.poiSVGClass)
  }
  app.Galaxy.drawUnits = function () {
    let g = d3.select("g.units")
    g.html("")
    //show units  
    let uS = this.sectors.filter(s => s.hasUnits)
    g.selectAll("circle").data(uS).enter().append("circle")
      .attr("cx", d=> this.points[d.i][0]+6)
      .attr("cy", d=> this.points[d.i][1]-6)
      .attr("r", 2) 
    let uF = this.sectors.filter(s => s.hasFoes)
    g.selectAll("rect").data(uF).enter().append("rect")
      .attr("class","foe")
      .attr("x", d=> this.points[d.i][0]+5)
      .attr("y", d=> this.points[d.i][1]+5)
      .attr("width", 4) 
      .attr("height", 4) 
  }
  app.Galaxy.drawMoveText = function (ids){
    let g = d3.select("g.move-text")
    g.html("")
    g.selectAll("text").data(ids).enter().append("text")
      .attr("x", d=> this.points[d][0])
      .attr("y", d=> this.points[d][1])
      .html(d=>d)
  }
  //re draw everything
  app.Galaxy.reDraw = function() {
    const fC = 2 * Math.PI
    let iW = window.innerWidth
    let iH = window.innerHeight
    let D = iH < iW ? iH : iW
    //set size
    let svg = d3.select("#map svg").attr("height", iH).attr("width", iW)
    svg.html("")
    //add defs
    svg.append("defs").append("clipPath").attr("id","clip-circle")
      .append("circle").attr("cx",400).attr("cy",400).attr("r",400)
    //galaxy circle
    svg.append("circle").attr("id", "galaxy")
      .attr("cx",400).attr("cy",400).attr("r",400)
    //all sectors 
    let gS = svg.append("g").attr("class", "sectors").attr("clip-path","url(#clip-circle)")
    let gF = svg.append("g").attr("class", "flux").attr("clip-path","url(#clip-circle)")
    //stars
    let gStars = svg.append("g").attr("class", "stars").attr("clip-path","url(#clip-circle)")
    //poi 
    let gC = svg.append("g").attr("class", "poi")
    //units
    let gU = svg.append("g").attr("class", "units")
    //move text
    svg.append("g").attr("class", "move-text")

    this.drawSectors()    

    //show stars 
    gStars.selectAll("circle").data(this.stars).enter()
      .append("circle").attr("cx", d=> d[0]).attr("cy", d=> d[1]).attr("r", 1) 

    this.drawPOI()
    this.drawUnits()

    resize()
  }
  //save state
  app.Galaxy.save = function () {
    //poll sectors
    let data = this.sectors.map(s => s.save)
    //set db 
    let id = app.games.current
    app.DB.setItem(id+".sectors",data)
  }
  app.Galaxy.load = function () {
    let id = app.games.current
    app.DB.getItem(id+".sectors").then(val=> {
      val = val || []
      val.forEach((v,i)=>this.sectors[i].load(v))
      this.reDraw()
    })
  }

}

const resize = ()=>{
  //set svg to window 
  let iW = window.innerWidth
  let iH = window.innerHeight
  //set size
  let svg = d3.select("#map svg").attr("height", iH).attr("width", iW)
  //get bbox 
  let gS = d3.select("g.sectors").node().getBBox()
  let w = gS.width < 800 ? 800 : gS.width
  let h = gS.height < 600 ? 600 : gS.height
  let vB = [gS.x - 25, gS.y - 25, w + 25, h + 25]
  //viewBox="0 0 100 100"
  d3.select("svg").attr("viewBox", vB.join(" "))
}

window.addEventListener("resize", resize )

export {init}