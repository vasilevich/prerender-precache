module.exports = () => {
    process.env.CACHE_TTL = Number.MAX_VALUE;
    process.env.CACHE_MAXSIZE = Number.MAX_VALUE;
    const config = require('config');
    const prerender = require('@yosefsolutions/prerender');
    const routes = require("./routes");
    const server = prerender({
        chromeLocation: config.chromeLocation,
        port: config.port,
        unix: config.unix,
        customListen: true,

        chromeFlags: [
            "--headless",
            "--disable-gpu",
            "--remote-debugging-port=9222",
            "--hide-scrollbars",
            "--blink-settings=imagesEnabled=false",
        ]
    });

    routes(server);
    return server;
}


