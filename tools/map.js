var rollup = require('rollup');

function cleanup(path) {
  return path
    .replace("commonjs-proxy:", "")
    .replace(/node_modules/g, "~")
    .replace(__dirname + "/packages/", "")
    .replace("\u0000", "");
}

const withHelpers = false;

rollup.rollup(require("./rollup.config.js")).then(bundle => {

  const relations = [];

  let graph = "";

  bundle.modules.forEach(({ id, dependencies }) => {
    dependencies.forEach(dependency => {
      const cleanId = cleanup(id);
      const cleanDep = cleanup(dependency);

      const key = `${cleanId} -> ${cleanDep}`;
      if (cleanId == cleanDep || relations.indexOf(key) > -1) {
        return;
      }

      if ((cleanDep == "babelHelpers" || cleanDep == "commonjsHelpers")) {
        return;
      }

      // Mark this relation as already seen
      relations.push(key);

      graph += `    "${cleanId}" -> "${cleanDep}"\n`;
    })
  });

  console.log("=> Relations");
  relations.sort().forEach(item => console.log(item));

  require("fs").writeFileSync("graphviz.dot", "digraph { \n" + graph + "\n}");
});