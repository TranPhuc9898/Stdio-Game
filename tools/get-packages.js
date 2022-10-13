const fs = require("fs");

const target = process.argv[2] === "dev" ? "devDependencies" : "dependencies";

const packageData = fs.readFileSync("package.json", { encoding: "utf-8" });
const packages = Object.keys(JSON.parse(packageData)[target]);

console.log(packages.join(" "));
