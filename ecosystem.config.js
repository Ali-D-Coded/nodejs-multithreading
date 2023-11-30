module.exports = {
  apps: [
    {
      name: "multithred",
      script: "npm",
      args: "run multi",
      instances: "max",
      exec_mode: "cluster",
    },
  ],
};
