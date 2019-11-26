/*
const SITEASSETS = [
{id:1,name:'University',cost:'-1,2,0',repl:-1,text:''},
{id:2,name:'DeFi Network',cost:'0,2,0',repl:-1,text:''},
{id:3,name:'MegaCorp',cost:'0,2,-1',repl:-1,text:''},
{id:4,name:'Museum',cost:'0,0,2',repl:-1,text:''},
{id:5,name:'Barracks',cost:'2,0,0',repl:-1,text:''},
{id:6,name:'War Academy',cost:'4,-1,-1',repl:-1,text:''},
{id:7,name:'NGO Incubator',cost:'0,-1,2',repl:-1,text:''},
{id:8,name:'Militia Muster',cost:'1,0,0',repl:-1,text:'Two Militia units leap to the location’s defense when needed.'},
{id:9,name:'Organized Militia',cost:'2,-1,0',repl:8,text:'Four Militia units now answer the call of need.'},
{id:10,name:'Veteran Guard',cost:'4,-2,0',repl:9,text:'The defenders are now four Heavy Infantry units.'},
{id:11,name:'Defense Infrastructure',cost:'2,0,0',repl:-1,text:'The location can build Barrier/Tower fortification units.'},
{id:12,name:'Shipyards',cost:'4,-1,-1',repl:-1,text:'The location can build Ship/Citidel/Minefield units.'},
{id:13,name:'Community Aid',cost:'0,0,0',repl:-1,text:'Converts the Wealth of the location to Social benefits.'},
{id:14,name:'Military Spending',cost:'0,0,0',repl:-1,text:'Converts the Wealth of the location to Military advantage.'},
{id:15,name:'United Efforts',cost:'0,0,0',repl:-1,text:'Converts the Social value of the location to Military or Wealth.'},
{id:16,name:'Processing Camp',cost:'0,2,0',repl:-1,text:'When built at a Resource, it turns Wealth into Military or Social.'},
{id:17,name:'Resource Extractor',cost:'0,2,0',repl:-1,text:'When built at a Resource, it improves efficiency.'},
{id:18,name:'Democratic Traditions',cost:'0,2,2',repl:-1,text:'Common voices guide the state, giving +3 to one roll per turn.'},
{id:19,name:'Merchantile',cost:'0,4,0',repl:-1,text:'The people love trade, and all Market asset benefits are doubled.'},
{id:20,name:'Public Welfare',cost:'0,0,4',repl:-1,text:'The people place a high emphasis on the wellfare of others, and all Public asset benefits are doubled.'},
{id:21,name:'Spartan Culture',cost:'4,0,0',repl:-1,text:'The people relish war, and all Barracks assets benefits are doubled.'},
{id:22,name:'Well-educated',cost:'0,2,2',repl:-1,text:'The people respect education, and all School asset benefits double.'},
{id:23,name:'Mechan Forge',cost:'0,4,0',repl:-1,text:''}
]

const UNITS = [
{id:1,name:'Militia',cost:'1,0,0',stats:'1,9,120,6',dmg:'1d6',extras:'Garrison',text:'The locals have been trained and outfitted to defend themselves. Usually traditional terestrial military units that may be supported by a handful of older mecha. They take their job seriously, but they muster only when needed, and cannot be moved out of sector.'},
{id:2,name:'Ranger',cost:'1,1,0',stats:'1,7,120,8',dmg:'1d6',extras:'Ranger,Skirmisher',text:'A mixed group of units trained to be mobile, strike fast, and then disappear.'},
{id:3,name:'Archer',cost:'1,1,0',stats:'1,7,120,8',dmg:'1d4',extras:'Reach',text:''},
{id:4,name:'Light Infantry',cost:'1,1,0',stats:'1,7,120,7',dmg:'1d6',extras:'AntiCharge',text:''},
{id:5,name:'Heavy Infantry',cost:'2,2,0',stats:'2,4,90,9',dmg:'1d8',extras:'',text:''},
{id:6,name:'Light Cavalry',cost:'2,2,0',stats:'2,6,240,8',dmg:'1d8',extras:'Chase',text:'Fast, agile, and ruthlessly effective in chasing down their opponents, light cavalry excel at close strikes.'},
{id:7,name:'Assault Cavalry',cost:'2,2,0',stats:'2,6,240,8',dmg:'1d6',extras:'Reach,Chase',text:''},
{id:8,name:'Heavy Cavalry',cost:'2,3,0',stats:'2,4,120,9',dmg:'1d8',extras:'Charger,Chase',text:'Using better armored equipment makes them harder to hit, but they sacrifice theri speed.'},
{id:9,name:'Infantry Mecha',cost:'3,2,1',stats:'3,4,60,9',dmg:'1d10',extras:'Scarce,Skilled',text:''},
{id:10,name:'Strike Mecha',cost:'3,3,1',stats:'3,3,240,9',dmg:'1d10',extras:'Charger,Scarce,Skilled',text:''},
{id:11,name:'Armored Mecha',cost:'3,4,1',stats:'3,2,120,10',dmg:'1d8',extras:'Reach,Scarce,Skilled',text:''},
{id:12,name:'Longbow Mecha',cost:'3,3,1',stats:'3,4,90,9',dmg:'1d8',extras:'Reach,Scarce,Skilled',text:''},
{id:13,name:'Mechan Warrior',cost:'2,1,1',stats:'1,4,90,9',dmg:'1d8',extras:'',text:''},
{id:14,name:'Mechan Longbow',cost:'2,1,1',stats:'1,4,90,9',dmg:'1d6',extras:'Reach',text:''},
{id:15,name:'Mechan Sapper',cost:'2,1,2',stats:'1,3,60,9',dmg:'1d8',extras:'Wallcrusher',text:''},
{id:16,name:'Mechan Hero',cost:'3,3,2',stats:'3,2,60,10',dmg:'1d10',extras:'Hardened,Scarce,Skilled',text:''},
{id:17,name:'Barrier',cost:'0,2,0',stats:'2,null,null,12',dmg:'1d4',extras:'Fortification,Reach',text:''},
{id:18,name:'Tower',cost:'1,4,0',stats:'4,null,null,12',dmg:'1d8',extras:'Fortification,Reach',text:''},
{id:19,name:'Citadel',cost:'3,6,0',stats:'8,null,null,12',dmg:'3d6',extras:'Fortification,Reach',text:''},
{id:20,name:'Bandit',cost:'0,1,1',stats:'1,7,120,8',dmg:'1d6',extras:'Reach',text:''},
{id:21,name:'Hiveling',cost:'1,0,0',stats:'1/2,7,60,12',dmg:'1d4',extras:'',text:''},
{id:22,name:'Bombardier',cost:'2,1,0',stats:'2,6,120,9',dmg:'1d6',extras:'Reach',text:''},
{id:23,name:'Chameleon',cost:'2,2,0',stats:'2,6,120,8',dmg:'1d8',extras:'Stealth',text:''},
{id:24,name:'Kaiju',cost:'4,4,0',stats:'4,6,150,9',dmg:'2d6',extras:'',text:''},
{id:25,name:'Daikaiju',cost:'9,5,2',stats:'8,4,120,10',dmg:'2d8',extras:'Wallcrusher,Hardened,Diehard',text:''},
{id:26,name:'Seax',cost:'1,0,0',stats:'1,6,90,7',dmg:'1d6',extras:'Stealth',text:''},
{id:27,name:'Spatha',cost:'1,1,0',stats:'1,6,120,8',dmg:'1d8',extras:'',text:''},
{id:28,name:'Falchion',cost:'4,2,1',stats:'3,5,90,9',dmg:'2d4',extras:'Stealth',text:''},
{id:29,name:'Maul',cost:'1,2,4',stats:'4,5,90,10',dmg:'1d10',extras:'',text:''},
{id:30,name:'Sabre',cost:'3,1,0',stats:'2,6,240,9',dmg:'1d6',extras:'Charge,Chase,Reach',text:''},
{id:31,name:'Ebon Strider',cost:'2,1,0',stats:'2,4,120,12',dmg:'1d8',extras:'Diehard',text:''},
{id:32,name:'Night Swarm',cost:'1,1,0',stats:'2,8,90,12',dmg:'1d6',extras:'Diehard, Stupid',text:''},
]

const SUPPORTUNITS = [
{id:1,name:'Assassin',cost:'0,2,0',solve:'',extras:'Assassin'},
{id:2,name:'Bodyguard',cost:'1,1,0',solve:'',extras:'Protector'},
{id:3,name:'Police',cost:'1,1,0',solve:'Disorder,0',extras:''},
{id:4,name:'Guardian Shield',cost:'0,2,0',solve:'Disorder,0',extras:'Countermagic'},
{id:5,name:'Harriers',cost:'2,1,0',solve:'',extras:'Chase'},
{id:6,name:'Healer',cost:'1,1,0',solve:'',extras:'Healing'},
{id:7,name:'Inspector',cost:'0,0,2',solve:'Corruption,0',extras:''},
{id:8,name:'Inspector General',cost:'0,2,2',solve:'Corruption,2',extras:''},
{id:9,name:'Developer',cost:'0,2,0',solve:'Poverty,0',extras:''},
{id:10,name:'Philanthropist',cost:'0,3,1',solve:'Poverty,2',extras:''},
{id:11,name:'Social Worker',cost:'0,0,2',solve:'Despair,0',extras:''},
{id:12,name:'Empath',cost:'0,1,3',solve:'Despair,2',extras:''},
{id:13,name:'Teacher',cost:'0,2,0',solve:'Ignorance,0',extras:''},
{id:14,name:'Expert Teacher',cost:'0,2,2',solve:'Ignorance,2',extras:''},
{id:15,name:'Sapper Crew',cost:'2,0,0',solve:'',extras:'Wallcrusher'},
{id:16,name:'Scout Team',cost:'1,0,0',solve:'',extras:'Keen Senses'},
{id:17,name:'Veteran Sergeant',cost:'1,0,0',solve:'',extras:'Rally'},
{id:18,name:'Guardian Sword',cost:'1,2,1',solve:'Disorder,0',extras:'War Magic'},
{id:19,name:'Hive Node',cost:'0,0,1',solve:'',extras:'Berserk'},
{id:20,name:'Myr Nightlord',cost:'1,2,1',solve:'Ignorance,0',extras:'War Magic,Tamer'},
]
*/

const ASSETS = [
{id:0,name:'Base',stat:'W,0',hp:1,cost:1,type:'Facility',saves:'',atk:'',counter:'',extras:``,text:``},
{id:1,name:'Security Personnel',stat:'F,1',hp:3,cost:2,type:'Military Unit',saves:'Di,1d4,Up,1d4',atk:'F,F,1d3+1',counter:'1d4',extras:``,text:``},
{id:2,name:'Hitmen',stat:'F,1',hp:1,cost:2,type:'Special Forces',saves:'Co,1d4',atk:'F,C,1d6',counter:'',extras:``,text:``},
{id:3,name:'Militia',stat:'F,1',hp:4,cost:4,type:'Military Unit',saves:'Up,1d6,Di,1d4',atk:'F,F,1d6',counter:'1d4+1',extras:``,text:``},
{id:4,name:'Heavy Drop Assets',stat:'F,2',hp:6,cost:4,type:'Facility',saves:'',atk:'',counter:'',extras:`As an action, any one non-Starship asset, including this one, may be moved to an adjacent sector for one Cred.`,text:`Transports assets from one world to another.`},
{id:5,name:'Elite Skirmishers',stat:'F,2',hp:5,cost:5,type:'Military Unit',saves:'Up,1d6',atk:'F,F,2d4',counter:'1d4+1',extras:``,text:``},
{id:6,name:'Hardened Personnel',stat:'F,2',hp:4,cost:4,type:'Special Forces',saves:'Di,1d4,Up,1d4',atk:'',counter:'1d4+1',extras:``,text:``},
{id:7,name:'Guerilla Populace',stat:'F,2',hp:6,cost:4,type:'Military Unit',saves:'Di,1d4,Up,1d4',atk:'F,C,1d4+1',counter:'',extras:``,text:``},
{id:8,name:'Zealots',stat:'F,3',hp:4,cost:6,type:'Special Forces',saves:'Up,1d6',atk:'F,F,2d6',counter:'2d6',extras:`Zealots take 1d4 damage every time they launch a successful attack or perform a counterattack.`,text:``},
{id:9,name:'Cunning Trap',stat:'F,3',hp:2,cost:5,type:'Tactic',saves:'',atk:'',counter:'1d6+3',extras:``,text:``},
{id:10,name:'Counterintel Unit',stat:'F,3',hp:4,cost:6,type:'Special Forces',saves:'Co,1d8,Di,1d4',atk:'C,C,1d4+1',counter:'1d6',extras:``,text:``},
{id:11,name:'Beachhead Landers',stat:'F,4',hp:10,cost:10,type:'Facility',saves:'',atk:'',counter:'',extras:`As an action, the asset may move any number of assets in the sector, including itself, to an adjacent sector at a cost of one Cred per asset moved.`,text:``},
{id:12,name:'Extended Theater',stat:'F,4',hp:10,cost:10,type:'Facility',saves:'',atk:'',counter:'',extras:`As an action, any one non-Starship asset, including itself, can be moved two sectors away from the extended theater, at a cost of 1 Cred.`,text:``},
{id:13,name:'Strike Fleet',stat:'F,4',hp:8,cost:12,type:'Starship',saves:'Up,1d8',atk:'F,F,2d6',counter:'1d8',extras:`As an action, they can move to an adjacent sector.`,text:`Frigate or cruiser-class vessels, space-to-ground weaponry and sophisticated, and light planetary defense weaponry. `},
{id:14,name:'Postech Infantry',stat:'F,4',hp:12,cost:8,type:'Military Unit',saves:'Up,1d8,Di,1d6',atk:'F,F,1d8',counter:'1d8',extras:``,text:``},
{id:15,name:'Blockade Fleet',stat:'F,5',hp:8,cost:10,type:'Starship',saves:'Di,1d8',atk:'F,W,1d6',counter:'',extras:`On a successful hit, they steal 1d4 FacCreds from the target faction as well. This theft can occur to a faction only once per turn, no matter how many blockade fleets attack. As an action, this asset may also move itself to an adjacent sector.`,text:``},
{id:16,name:'Psychic Assassins',stat:'F,5',hp:4,cost:12,type:'Special Forces',saves:'Up,1d6,Co,1d10',atk:'C,C,2d6+2',counter:'',extras:`These assets start Stealthed when purchased.`,text:``},
{id:17,name:'Pretech Infantry',stat:'F,6',hp:16,cost:20,type:'Military Unit',saves:'Up,1d8',atk:'F,F,2d8',counter:'2d8+2',extras:``,text:``},
{id:18,name:'Planetary Defenses',stat:'F,6',hp:20,cost:18,type:'Facility',saves:'',atk:'',counter:'2d6+6',extras:`Planetary Defenses can only defend against attacks by Starship type assets.`,text:``},
{id:19,name:'Gravtank Formation',stat:'F,6',hp:14,cost:25,type:'Military Unit',saves:'Up,1d10',atk:'F,F,2d10+4',counter:'1d10',extras:``,text:``},
{id:20,name:'Deep Strike Landers',stat:'F,7',hp:10,cost:25,type:'Facility',saves:'',atk:'',counter:'',extras:`As an action, any one non-Starship asset, including itself, can be moved up to three sectors away, at a cost of 2 Creds.`,text:``},
{id:21,name:'Integral Protocols',stat:'F,7',hp:10,cost:20,type:'Facility',saves:'Co,1d12',atk:'',counter:'2d8+2',extras:`They can defend only against attacks versus Cunning, but they add an additional die to the defender’s roll.`,text:``},
{id:22,name:'Space Marines',stat:'F,7',hp:16,cost:30,type:'Military Unit',saves:'Up,1d12,Di,1d8',atk:'F,F,2d8+2',counter:'2d8',extras:`As an action, they may move to an adjacent sector.`,text:``},
{id:23,name:'Capital Fleet',stat:'F,8',hp:30,cost:40,type:'Starship',saves:'Up,1d12',atk:'F,F,3d10+4',counter:'3d8',extras:`Upkeep, Capital fleets cost an additional 2 Creds of maintenance each turn. As an action, they may move to an adjacent sector. `,text:``},
{id:24,name:'Smugglers',stat:'C,1',hp:4,cost:2,type:'Starship',saves:'Co,1d4',atk:'C,W,1d4',counter:'',extras:`For one Cred, the smugglers can move itself or any one Special Forces unit up to two sectors away.`,text:``},
{id:25,name:'Informers',stat:'C,1',hp:3,cost:2,type:'Special Forces',saves:'Co,1d6',atk:'',counter:'',extras:`They can choose to Attack any faction, and need not specify a particular asset to target. On a successful Cunning vs. Cunning attack, all Stealthed assets on the planet belonging to that faction are revealed. Informers can target a faction even if none of their assets are visible on a world.`,text:``},
{id:26,name:'False Front',stat:'C,1',hp:2,cost:1,type:'Facility',saves:'',atk:'',counter:'',extras:`If another asset in the sector suffers enough damage to destroy it, the faction can sacrifice the false front instead of the damaged unit.`,text:``},
{id:27,name:'Lobbyists',stat:'C,2',hp:4,cost:4,type:'Special Forces',saves:'De,1d4,Ig,1d6',atk:'',counter:'',extras:`When a rival faction gains permission to build an asset, the Lobbyists can make an immediate Cunning vs. Cunning test against the faction; if successful, the permission is withdrawn and cannot be attempted again until the next turn.`,text:``},
{id:28,name:'Saboteurs',stat:'C,2',hp:6,cost:5,type:'Special Forces',saves:'Co,1d6,Up,1d4',atk:'C,C,2d4',counter:'',extras:`An asset attacked by saboteurs cannot use any Action ability until the start of the attacking faction’s next turn. This lock applies whether or not the saboteurs’ attack was successful.`,text:``},
{id:29,name:'Blackmail',stat:'C,2',hp:4,cost:4,type:'Tactic',saves:'Up,1d4',atk:'C,C,1d4+1',counter:'',extras:`Any attempt to attack or defend against Blackmail loses any bonus dice earned by tags.`,text:``},
{id:30,name:'Seductress',stat:'C,2',hp:4,cost:4,type:'Special Forces',saves:'Co,1d6,Up,1d4',atk:'',counter:'',extras:`As an action, a Seductress can travel to any adjoining sector. As an attack, a Seductress does no damage, but an asset that has been successfully attacked immediately reveals any other Stealthed assets on the planet. Only Special Forces units can attack a Seductress.`,text:``},
{id:31,name:'Cyberninjas',stat:'C,3',hp:4,cost:6,type:'Special Forces',saves:'Up,1d6,Co,1d6',atk:'C,C,2d6',counter:'',extras:``,text:``},
{id:32,name:'Stealth',stat:'C,3',hp:0,cost:3,type:'Tactic',saves:'',atk:'',counter:'',extras:`A special quality that can be purchased for another Special Forces asset in the sector. An asset that has been Stealthed cannot be detected or attacked by other factions. If the unit normally requires the permission of the sector government to be moved into the sector, that permission may be foregone. An asset loses its Stealth if it is used to attack or defend.`,text:``},
{id:33,name:'Covert Shipping',stat:'C,3',hp:4,cost:8,type:'Facility',saves:'',atk:'',counter:'',extras:`Any one Special Forces unit can be moved up to three sectors away from the Covert Shipping at the cost of one Cred.`,text:``},
{id:34,name:'Party Machine',stat:'C,4',hp:10,cost:10,type:'Facility',saves:'Po,1d6,Co,1d6',atk:'C,C,2d6',counter:'1d6',extras:`Each turn, a Party Machine provides 1 Cred to its owning faction.`,text:``},
{id:35,name:'Vanguard Cadres',stat:'C,4',hp:12,cost:8,type:'Military Unit',saves:'Up,1d6,Co,1d8',atk:'C,C,1d6',counter:'1d6',extras:``,text:``},
{id:36,name:'Tripwire Cells',stat:'C,4',hp:8,cost:12,type:'Special Forces',saves:'Co,1d8',atk:'',counter:'1d4',extras:`Whenever a stealthed asset enters the sector or is purchased in a sector with tripwire cells, the Cells make an immediate Cunning vs. Cunning attack against the owning faction. If successful, the asset loses its stealth.`,text:``},
{id:37,name:'Seditionists',stat:'C,4',hp:8,cost:12,type:'Special Forces',saves:'Co,1d8',atk:'',counter:'',extras:`For a cost of 1d4 Cred, the Seditionists can attach themselves to an enemy asset. Until they attach to a different asset or no longer share the same sector, the affected asset cannot perform an attack action.`,text:``},
{id:38,name:'Organization Moles',stat:'C,5',hp:8,cost:10,type:'Tactic',saves:'Co,1d10',atk:'C,C,2d6',counter:'',extras:``,text:``},
{id:39,name:'Cracked Comms',stat:'C,5',hp:6,cost:14,type:'Tactic',saves:'',atk:'',counter:'',extras:`If the Cracked Comms succeeds in defending against an attack, it can immediately cause the attacking asset to attack itself for normal damage and counterattack consequences.`,text:``},
{id:40,name:'Boltholes',stat:'C,5',hp:6,cost:12,type:'Facility',saves:'',atk:'',counter:'2d6',extras:`If a faction Special Forces or Military Unit asset in the same sector as the Boltholes suffers damage sufficient to destroy it, it is instead set at 0 HP and rendered untouchable and unusable until it is repaired to full strength. If the Boltholes are destroyed before this happens, the asset is destroyed with them.`,text:``},
{id:41,name:'Transport Lockdown',stat:'C,6',hp:10,cost:20,type:'Tactic',saves:'Di,1d10',atk:'',counter:'',extras:`On a successful Cunning vs. Cunning attack against a rival faction, the rival faction cannot transport assets into that sector without spending 1d4 Cred and waiting one turn.`,text:``},
{id:42,name:'Covert Transit Net',stat:'C,6',hp:15,cost:18,type:'Facility',saves:'',atk:'',counter:'',extras:`As an action, any Special Forces assets can be moved up to three sectors away from the Covert Transit Net.`,text:``},
{id:43,name:'Demagogue',stat:'C,6',hp:10,cost:20,type:'Special Forces',saves:'Di,1d10,De,1d8,Co,1d6',atk:'C,C,2d8',counter:'1d8',extras:``,text:``},
{id:44,name:'Popular Movement',stat:'C,7',hp:16,cost:25,type:'Tactic',saves:'Ig,1d10,De,1d12',atk:'C,C,2d6',counter:'1d6',extras:``,text:``},
{id:45,name:'Book of Secrets',stat:'C,7',hp:10,cost:20,type:'Tactic',saves:'Ig,1d10,Co,1d12,Di,1d8',atk:'',counter:'2d8',extras:`Once per turn, a Book of Secrets allows the faction to reroll one die for an action taken in that sector or force an enemy faction to reroll one die. This reroll can only be forced once per turn, no matter how many Books of Secrets are owned.`,text:``},
{id:46,name:'Treachery',stat:'C,7',hp:5,cost:10,type:'Tactic',saves:'',atk:'',counter:'',extras:`On a successful attack, the Treachery asset is lost, 5 Cred are gained, and the targeted asset switches sides to join the traitor’s faction, even if the faction does not otherwise have the attributes necessary to purchase it.`,text:``},
{id:47,name:'Panopticon Matrix',stat:'C,8',hp:20,cost:30,type:'Facility',saves:'Co,1d12,Di,1d8',atk:'',counter:'1d6',extras:`Every rival Stealthed asset in the sector must succeed in a Cunning vs. Cunning test at the beginning of every turn or lose their Stealth. The owner also gains an additional die on all Cunning attacks and defenses in that sector.`,text:``},
{id:48,name:'Franchise',stat:'W,1',hp:3,cost:2,type:'Facility',saves:'Po,1d4',atk:'W,W,1d4',counter:'1d4-1',extras:`On a successful attack, the enemy faction loses one Cred (if available), which is gained by the Franchise’s owner. This loss can happen only once a turn, no matter how many Franchises attack.`,text:``},
{id:49,name:'Harvesters',stat:'W,1',hp:4,cost:2,type:'Facility',saves:'Po,1d6',atk:'',counter:'1d4',extras:`As an action, the Harvesters’ owning faction may roll 1d6. On 4+, one Cred is gained.`,text:``},
{id:50,name:'Local Investments',stat:'W,1',hp:2,cost:1,type:'Facility',saves:'Po,1d6',atk:'W,W,1d4-1',counter:'',extras:`Any other faction that tries to buy an asset in that sector must pay one extra Cred. This money is not given to the investments’ owner, but is lost. This penalty is only applied once, no matter how many Local Investments are present`,text:``},
{id:51,name:'Freighter Contract',stat:'W,2',hp:4,cost:5,type:'Starship',saves:'Po,1d6',atk:'W,W,1d4',counter:'',extras:`As an action, the faction may move any one non-Force asset, including this one, up to two sectors away at a cost of one Cred.`,text:``},
{id:52,name:'Lawyers',stat:'W,2',hp:4,cost:6,type:'Special Forces',saves:'Ig,1d4,Co,1d4',atk:'C,W,2d4',counter:'1d6',extras:`Lawyers cannot attack or counterattack Force assets.`,text:``},
{id:53,name:'Union Toughs',stat:'W,2',hp:6,cost:4,type:'Military Unit',saves:'Di,1d6',atk:'W,F,1d4+1',counter:'1d4',extras:``,text:``},
{id:54,name:'Surveyors',stat:'W,2',hp:4,cost:4,type:'Special Forces',saves:'Ig,1d4',atk:'',counter:'1d4',extras:`The presence of a Surveyor crew allows one additional die to be rolled on Expand Influence actions. As an action, a surveyor crew can move up to two sectors away.`,text:``},
{id:55,name:'Postech Industry',stat:'W,3',hp:4,cost:8,type:'Facility',saves:'Po,1d6,Ig,1d4',atk:'',counter:'1d4',extras:`As an action, roll 1d6. On a 1, one Cred is lost, on a 2, no profit is gained, on a 3-5 one Cred is earned, and a 6 returns two Creds. If money is lost and no resources are available to pay it, the Postech Industry is destroyed.`,text:``},
{id:56,name:'University',stat:'W,3',hp:4,cost:6,type:'Facility',saves:'Po,1d4,Ig,1d6',atk:'',counter:'',extras:``,text:``},
{id:57,name:'Mercenaries',stat:'W,3',hp:6,cost:8,type:'Military Unit',saves:'Di,1d4,Up,1d6',atk:'W,F,2d4+2',counter:'1d6',extras:`Mercenaries have a maintenance cost of one Cred per turn. As an action, Mercenaries can move to an adjacent sector. `,text:``},
{id:58,name:'Shipping Combine',stat:'W,4',hp:10,cost:10,type:'Facility',saves:'',atk:'',counter:'1d6',extras:`As an action, the combine may move any number of non-Force assets, including itself, up to two sectors away at a cost of one Cred per asset.`,text:``},
{id:59,name:'Monopoly',stat:'W,4',hp:12,cost:8,type:'Facility',saves:'Po,1d8',atk:'W,W,1d6',counter:'1d6',extras:`As an action, owners of a monopoly may force one other faction with unstealthed assets in that sector to pay them one Cred. If the target faction hasn’t got the money, they lose one asset of their choice on the world.`,text:``},
{id:60,name:'Medical Center',stat:'W,4',hp:8,cost:12,type:'Facility',saves:'Po,1d8',atk:'',counter:'',extras:`Once between turns, if a Special Forces or Military Unit asset in the sector is destroyed, the faction may immediately pay half its purchase cost to restore it with one hit point. Any Repair Asset action taken on that world costs one less Cred for Special Forces and Military Units.`,text:``},
{id:61,name:'Bank',stat:'W,4',hp:8,cost:12,type:'Facility',saves:'Po,1d8',atk:'',counter:'',extras:`Once per turn, the faction can ignore one cost or FacCred loss imposed by another faction, regardless of where it is levied. Multiple banks allow multiple losses to be ignored.`,text:``},
{id:62,name:'Marketers',stat:'W,5',hp:8,cost:10,type:'Tactic',saves:'Po,1d8,Ig,1d4',atk:'C,W,1d6',counter:'',extras:`As an action, the marketers may test Cunning vs. Wealth against a rival faction’s asset. If successful, the target faction must immediately pay half the asset’s purchase cost, rounded down, or have it become disabled and useless until they do pay.`,text:``},
{id:63,name:'Blockade Runners',stat:'W,5',hp:6,cost:12,type:'Starship',saves:'',atk:'',counter:'2d4',extras:`As an action, a blockade runner can transfer itself or any one Military Unit or Special Forces up to three sectors away for a cost of two Creds. Blockade Runners can even move units that would otherwise require planetary government permission to be imported into a world.`,text:``},
{id:64,name:'Venture Capital',stat:'W,6',hp:10,cost:15,type:'Facility',saves:'Po,1d10',atk:'W,W,2d6',counter:'1d6',extras:`As an action, roll 1d8; on a 1, the asset is destroyed, while on a 2-4 one Cred is gained, 5-7 yields two Cred and 8 grants three Cred.`,text:``},
{id:65,name:'R&D Department',stat:'W,6',hp:15,cost:18,type:'Facility',saves:'Po,1d10',atk:'',counter:'',extras:`A faction with an R&D department may treat all planets as having tech level 4 for purposes of buying Wealth assets.`,text:``},
{id:66,name:'Commodities Broker',stat:'W,6',hp:10,cost:20,type:'Special Forces',saves:'Po,1d10',atk:'W,W,2d8',counter:'1d8',extras:`As an action, roll 1d8; that many Cred are subtracted from the cost of their next asset purchase, down to a minimum of half normal price, rounded down.`,text:``},
{id:67,name:'Pretech Manufactory',stat:'W,7',hp:16,cost:25,type:'Facility',saves:'Po,1d12',atk:'',counter:'',extras:`As an action, roll 1d8 and gain half that many Cred, rounded up.`,text:``},
{id:68,name:'Hostile Takeover',stat:'W,7',hp:10,cost:20,type:'Tactic',saves:'',atk:'W,W,2d10',counter:'2d8',extras:`If a Hostile Takeover does enough damage to destroy a faction, the target is instead reduced to 1 hit point and acquired by the Hostile Takeover’s owning faction.`,text:``},
{id:69,name:'Transit Web',stat:'W,7',hp:5,cost:15,type:'Facility',saves:'',atk:'',counter:'',extras:`For one Cred, any number of non-starship Cunning or Wealth assets may be moved up to three sectors away. This may be done freely on the owner’s turn so long as the fee can be paid and doesn’t require the use of an action.`,text:``},
{id:70,name:'Scavenger Fleet',stat:'W,8',hp:20,cost:30,type:'Starship',saves:'Up,1d8,Di,1d6',atk:'W,W,2d10+4',counter:'2d10',extras:`As an action, a Scavenger Fleet can be moved up to three sectors away. Scavenger fleets cost 2 Creds a turn in maintenance.`,text:``}
]

const LAIRS = [
{id:1,name:'Free Lord',roll:5,unit:5,guard:'3,Light Infantry,2,Archer,2,Barrier,1,Tower,1,Veteran Sergeant'},
{id:2,name:'Warlord',roll:5,unit:5,guard:'3,Light Cavalry,1,Assault Cavalry,1,Heavy Cavalry,1,Pike'},
{id:3,name:'Bandits',roll:4,unit:24,guard:'3,Bandit,1,Archer,1,Scout Team,1,Assassin'},
{id:4,name:'Mechan Warlord',roll:5,unit:14,guard:'5,Mechan Warrior,1,Veteran Sergeant'},
{id:5,name:'Hive Nest',roll:6,unit:14,guard:'2,Kaiju'},
{id:6,name:'Renegades',roll:5,unit:3,guard:'2,Light Infantry,1,Archer,1,Heavy Infantry,1,Pike'},
{id:7,name:'Renegade Imperial',roll:4,unit:5,guard:'5,Spatha,2,Barrier,1,Veteran Sergeant,1,War Mage'},
{id:8,name:'Bandit Stronghold',roll:5,unit:31,guard:'2,Bandit,2,Ranger,2,Assassin'},
{id:9,name:'Rogue Hive',roll:5,unit:8,guard:'5,Hiveling,1,Chameleon,1,Kaiju,1,Hive Node'},
{id:10,name:'Hostile Xenos',roll:5,unit:13,guard:'1,Maul,4,Light Infantry'},
{id:11,name:'Myr Blight',roll:6,unit:5,guard:'5,Light Infantry,2,Ranger,3,War Mage,1,Myr Nightlord'},
{id:12,name:'Ancient Evil',roll:6,unit:28,guard:'3,Ebon Strider,1,Night Swarm,1,Infantry Mecha,1,Myr Nightlord'},
]

let TROUBLESAVES = {
  "Bad Reputation": `Corruption`,
  "Barren Surroundings": `Poverty`,
  "Class Hatred": `Despair`,
  "Conquering Heirs": `Uprising`,
  "Contaminated Land": `Poverty`,
  "Corrupt Leadership": `Corruption`,
  "Covetous Polity": `Disorder`,
  "Crushed Spirits": `Despair`,
  "Dark Wizards": `Uprising`,
  "Demagogue": `Despair`,
  "Destructive Customs": `Ignorance`,
  "Disputed Possession": `Disorder`,
  "Disunity": `Despair`,
  "Ethnic Feuding": `Despair`,
  "Exceptional Poverty": `Poverty`,
  "Exiled Lord": `Uprising`,
  "Failed Settlement": `Poverty`,
  "Harsh Conditions": `Poverty`,
  "Hazardous Resource": `Ignorance`,
  "Inaccessible": `Poverty`,
  "Infested": `Uprising`,
  "Mercenary Populace": `Corruption`,
  "Monsters": `Disorder`,
  "Murderous Heirs": `Disorder`,
  "Natrual Poverty": `Poverty`,
  "No Workers": `Poverty`,
  "Outsider Cult/Sinister Cult": `Corruption`,
  "Pervasive Hunger": `Poverty`,
  "Raiders": `Uprising`,
  "Recalcitrant Locals": `Disorder`,
  "Recurrent Sickness": `Poverty`,
  "Ancient Cosmic Defenses": `Ignorance`,
  "Riotous Thugs": `Disorder`,
  "Sealed Evil": `Disorder`,
  "Secret Society": `Corruption`,
  "Severe Damage": `Poverty`,
  "Taboo Land": `Ignorance`,
  "Toxic Process": `Ignorance`,
  "Undeveloped": `Poverty`,
  "Wasted Production": `Ignorance`,
  "Xenophobia": `Disorder`,
}

const STATS = ["Cunning","Force","Wealth"]

const SAVESTAT = {
  "Disorder" : 1,
  "Uprising" : 1,
  "Poverty" : 2,
  "Ignorance" : 2,
  "Despair" : 3,
  "Corruption" : 3
}
const SAVENAME = {
  "Di": "Disorder",
  "Up":"Uprising",
  "Po":"Poverty",
  "Ig":"Ignorance",
  "De":"Despair" ,
  "Co":"Corruption" ,
}

/*
let data = {
  siteAssets : SITEASSETS.map(a=> {
    a.cost = a.cost.split(",").map(Number)
    return a
  }),
  units : UNITS.map(u=> {
    //stats 
    let stats = u.stats.split(",")
    u.HD = Number(stats[0])
    u.AC = Number(stats[1])
    u.move = Number(stats[2])
    u.morale = Number(stats[3])
    u.cost = u.cost.split(",").map(Number)
    u.extras = u.extras.split(",")
    u.solve = [0,"Uprising",u.HD]
    return u 
  }),
  unitNames : UNITS.map(u=>u.name),
  supportUnits : SUPPORTUNITS.map(u=> {
    u.cost = u.cost.split(",").map(Number)
    u.extras = u.extras.split(",")
    
    if(u.solve.length>0) {
      u.solve = u.solve.split(",") 
      u.solve[1] = Number(u.solve[1])
      u.solve.unshift(SAVESTAT[u.solve[0]])
    }
    else delete u.solve

    return u
  }),
  supportNames : SUPPORTUNITS.map(u=>u.name),
  lairs : LAIRS,
  unitByName (name) {
    let ui = this.unitNames.indexOf(name)
    if(ui > -1) return UNITS[ui]
    ui = this.supportNames.indexOf(name)
    if(ui > -1) return SUPPORTUNITS[ui]
    return null
  },
  troubleSaves : TROUBLESAVES,
  saveStat : SAVESTAT
}
*/

let data = {
  assets : ASSETS.map(a=> {
    let stat = a.stat.split(",")
    //stat and lv 
    a.stat = ["C","F","W"].indexOf(stat[0])
    a.lv = Number(stat[1])
    //saves
    let saves = a.saves.length >0 ? a.saves.split(",") : []
    a.saves = d3.range(saves.length/2).map(i => [SAVENAME[saves[2*i]],saves[2*i+1]])
    let svt = a.saves.join(", ")
    //attack
    a.atk = a.atk.length > 0 ? a.atk.split(",") : []
    //text
    a.text = a.name + " (C:"+a.cost+")"
    a.extras = a.extras || ''
    //info 
    a.info = a.name+": "+svt
    return a
  }),
  lairs : LAIRS,
  troubleSaves : TROUBLESAVES,
  saveStat : SAVESTAT
}

export {data}