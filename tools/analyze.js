const path = require("path");

const profile = require("./profile.json");
const modules = profile.chunks[0].modules;

const isModuleRegex = /node_modules\/(.*)$/;
const moduleNameRegex = /node_modules\/(.*)\/.*$/;

const moduleFiles = {};
const items = {};
const size = {module: 0, nonModule: 0};


Object.keys(profile.chunks[0].modules).forEach(i => {
    const mod = modules[i];

    const file = (mod.identifier.indexOf("!") === -1) ? mod.identifier : mod.identifier.split('!')[1];

    //console.log(mod.identifier, file);

    let m;
    const isModule = (m = isModuleRegex.exec(file)) !== null;
    
    if (isModule) {
        const matchedModule = m[1];
        if (!items.hasOwnProperty(matchedModule)) {
            items[matchedModule] ={
                module: matchedModule,
                size: mod.size,
                count: 0
            };
        }

        items[matchedModule].count += 1;

        const m2 = moduleNameRegex.exec(file);
        if (!moduleFiles.hasOwnProperty(m2[1])) {
            moduleFiles[m2[1]] = 0;
        }

        moduleFiles[m2[1]] += mod.size;

        //console.log(matchedModule)
    }

    size[isModule? 'module' : 'nonModule'] += mod.size;
})

let wasted = 0;
for (let i in items) {
    const item = items[i];
    if (item.count > 1) {
        console.log(item.module, "included", item.count, "times")
        wasted += (item.count - 1) * item.size;
    }
}

const total = modules.map(module => module.size).reduce((a, b) => a + b, 0)

console.log(moduleFiles);

console.log("");
console.log("in modules: ", size.module, "bytes");
console.log("outside modules: ", size.nonModule, "bytes");
console.log("total: ", modules.length, "modules, ", total, "bytes");
console.log("wasted: ", wasted, "bytes, ~", Math.round(wasted * 100 / total), "% wasted");



