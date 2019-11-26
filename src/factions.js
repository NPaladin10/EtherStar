const FACTIONS = [
  {id:0, name:"Neutral",stats: [3,3,3],color:"black"},
  {id:1, name:"Player", stats: [1,1,2], cred: 4, color:"royalblue"},
  {id:2, name:"Xiphir Empire", stats: [5,3,6], cred: 12, color: "darkred"},
  {id:3, name:"Star Hive", stats: [3,6,5], cred: 10, color:"limegreen"},
]

const factionManager = (app) => {
  let actions = [0,0,0]

  app.factions = {
    get all () {
      return FACTIONS.map(f => this.byId(f.id))
    },
    byId(id) {
      let F = Object.assign({},FACTIONS.find(f => f.id==id))
      if(id > 0) F.availableAssets = app.data.assets.filter(a => {
        return a.lv <= F.stats[a.stat] && a.cost <= F.cred 
      }).map(a => {
        return {id:a.id,text:a.text}
      })

      return F
    },
    sectorsByOwner (i) {
      return app.Galaxy.sectors.filter(s => s._owner == i)
    },
  }
}

export {factionManager}