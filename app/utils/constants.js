const ENVIRONMENTS = {
    dev: "local",
    local: "local",
    production: "production"
};

const PORTS = {
    local: 2024,
    production: 5681 
};

module.exports = {
    ENVIRONMENTS: ENVIRONMENTS,
    PORTS: PORTS
};