const menu = {
  a: ["b", "c", "d", "e", "f"],
  b: ["a", "c", "d", "e", "f"],
  c: ["a", "b", "d", "e", "f"],
  d: ["a", "b", "c", "e", "f"],
};
const machine = {
    initState : 'home',
    menus: {
        'home': ["job", "settings", "calibration", "offsetUp", "offsetDown"],
        'job': ["new", "meta", "oldList", "none", "home"],
        'settings': ["deviceSet", "outputSet", "userSet", "home"],
        'calibration': ["deviceCal", "outputCal", "userCal", "home"],
        'deviceSet': ["back", "home"],
        'deviceCal': ["back", "home"],
        'outputSet': ["back", "home"],
        'outputCal': ["back", "home"],
        'userSet': ["back", "home"],
        'userCal': ["back", "home"],
    },
};

function menuMan(mach) {
    let currentState = mach.initState;
    let hist = ["any"];
    
  console.log(mach.menus[currentState]);

  return {
    doThing(next){
        const curSt = currentState;
        hist.push(curSt)
        const nexSt = curSt.menus[next]
        console.log(nexSt)
    }
  }

}

const mm = menuMan(machine)
console.log(mm.hist)
// mm.doThing('settings')