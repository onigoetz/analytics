const path = require("path");

const modules = require("./sourcemap.json");

const isModuleRegex = /node_modules\/(.*)$/;
const moduleNameRegex = /node_modules\/([-a-z0-9]*|@[-a-z0-9\.]*\/[-a-z0-9\.]*)\/.*$/;
const internalModuleNameRegex = /\/\/([-a-z\.0-9]*)\/.*$/

const total = Object.keys(modules).map(i => modules[i]).reduce((a, b) => a + b, 0);

const moduleFiles = {};
const inclusions = {};
const internals = {};
const allSize = {module: 0, boilerplate: 0, managed: 0};

Object.keys(modules).forEach(i => {
    const size = modules[i];

    const file = i.replace("//.-core", "//analytics.js-core");

    let m;
    const isModule = (m = isModuleRegex.exec(file)) !== null;
    
    if (isModule) {
        const matchedModule = m[1];
        if (!inclusions.hasOwnProperty(matchedModule)) {
            inclusions[matchedModule] ={
                module: matchedModule,
                size: size,
                count: 0
            };
        }

        inclusions[matchedModule].count += 1;

        const m2 = moduleNameRegex.exec(file);
        if (!moduleFiles.hasOwnProperty(m2[1])) {
            moduleFiles[m2[1]] = 0;
        }

        moduleFiles[m2[1]] += size;

        allSize['module'] += size;
    } else if ((m = internalModuleNameRegex.exec(file)) !== null) {
        //console.log("internal", file, m[1]);

        if (!internals.hasOwnProperty(m[1])) {
            internals[m[1]] = 0;
        }

        internals[m[1]] += size;

        allSize['managed'] += size;
    } else {
        console.log("boilerplate", file, size);

        allSize['boilerplate'] += size;
    }
});

console.log("=== Inclusion count");
let wasted = 0;
Object.keys(inclusions).filter(k => inclusions[k].count > 1).forEach(k => {
    const item = inclusions[k];
    console.log(item.module, "included", item.count, "times")
    wasted += (item.count - 1) * item.size;
});

console.log("");
console.log("=== External module size");
Object.keys(moduleFiles).sort((a,b) =>  moduleFiles[a]-moduleFiles[b]).forEach(k => {
    console.log(k, ":", moduleFiles[k], "bytes");
});

console.log("");
console.log("=== Internal module size");
Object.keys(internals).sort((a,b) =>  internals[a]-internals[b]).forEach(k => {
    console.log(k, ":", internals[k], "bytes");
});

console.log("");
console.log("Total:", Object.keys(modules).length, "modules, ", total, "bytes");
console.log(`Boilerplate modules: ${allSize.boilerplate} bytes (${Math.round(allSize.boilerplate * 100 / total)}%)`);
console.log(`Managed modules: ${allSize.managed} bytes (${Math.round(allSize.managed * 100 / total)}%)`);
console.log(`Outside modules: ${allSize.module} bytes (${Math.round(allSize.module * 100 / total)}%)`);
console.log("Wasted:", wasted, "bytes, ~", Math.round(wasted * 100 / total), "% wasted");



