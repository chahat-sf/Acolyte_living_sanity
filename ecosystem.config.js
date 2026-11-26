module.exports = {
  apps: [{
    name: "acolyteliving-sanity",
    cwd: "/home/acolyteliving-sanity/htdocs/sanity.acolyteliving.com",
    script: "npx",
    args: "serve -s ./dist -l 3034",
    env: { NODE_ENV: "production" }
  }]
};
