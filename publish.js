const ghpages = require('gh-pages');

ghpages.publish("build", {
    branch: "deploy",
    repo: "git@github.com:cloud-computation/frontend.git"
}, (msg) => console.log(msg));
