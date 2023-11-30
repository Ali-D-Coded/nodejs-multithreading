import cluster from "cluster";
import os from "os";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const cpuCount = os.cpus().length / 2;

console.log(`total number of cpus is ${cpuCount}`);
console.log(`primary pid=${process.pid}`);

cluster.setupPrimary({
  exec: __dirname + "/index.js",
});

for (let i = 0; cpuCount; i++) {
  cluster.fork();
}

cluster.on("exit", (worker, code, signal) => {
  console.log(`woker ${worker.process.pid} has been killed`);
  console.log("Starting another worker");
  cluster.fork();
});
