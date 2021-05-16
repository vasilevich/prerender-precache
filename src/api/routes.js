module.exports = (server) => {
    const sendPrerenderHeader = require('@yosefsolutions/prerender/lib/plugins/sendPrerenderHeader');
    const browserForceRestart = require('@yosefsolutions/prerender/lib/plugins/browserForceRestart');
    const httpHeaders = require('@yosefsolutions/prerender/lib/plugins/httpHeaders');

    const memoryCache = require('prerender-memory-cache');
    const extractUrlList = require("./extractUrls");
    const simulateRequest = require("./simulateRequest")(server);
    const Queue = require('js-queue');
    const queue = new Queue;
    const addUrlToQueue = url => queue.add(async function () {
        await simulateRequest(url);
        this.next();
    });
    server.app.get('/clearCache', async (request, response) => {
        const urls = await extractUrlList(request);
        if (urls.length > 0) {
            await memoryCache.cache.del(...urls);
        }
        else
            memoryCache.init();
        response.send({status: 200});
    });

    server.app.get('/preCache', async (request, response) => {
        const urls = await extractUrlList(request);
        await memoryCache.cache.del(...urls);
        for (const url of urls) {
            addUrlToQueue(url);
        }
        response.send({status: 200});
    });

    server.app.startListening();
    server.use(sendPrerenderHeader);
    server.use(browserForceRestart);
    server.use(httpHeaders);
    server.use(memoryCache);

}
