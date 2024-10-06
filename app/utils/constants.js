const ENVIRONMENTS = {
    dev: "local",
    local: "local",
    production: "production"
};

const PORTS = {
    local: 2024,
    production: 5681 
};

const URLS = {
    dev: "http://localhost:2024",
    local: "http://localhost:2024",
    production: ""
};

module.exports = {
    ENVIRONMENTS: ENVIRONMENTS,
    PORTS: PORTS,
    URLS: URLS
};