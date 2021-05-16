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
            "--no-first-run",
            "--no-experiments",
            "--no-initial-navigation",
            "-no-managed-user-acknowledgment-check",
            "--no-pings",
            "--no-recovery-component",
            "--no-startup-window",
            "--no-vr-runtime",
            "--no-wifi",
            "--v8-cache-options=code",
            "--v8-cache-strategies-for-cache-storage=aggressive",
            "--app-cache-force-enabled",
            "--disk-cache-size=99999999999999",
        ]
    });

    routes(server);
    return server;
}


