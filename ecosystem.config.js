module.exports = {
  apps: [{
    cwd: "/home/startupflora-sanity/htdocs/sanity.startupflora.com",
    script: "npx",
    args: "serve -s ./dist -l 3034",
    env: { NODE_ENV: "production" }
  }]
};
