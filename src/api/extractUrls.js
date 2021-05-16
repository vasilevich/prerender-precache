const Sitemapper = require('@drorgl/sitemapper').default;
const extractUrlList = async request => {
    const urls = [];
    if (request.query.url) {
        urls.push(request.query.url);
    }
    if (request.query.urls && request.query.urls.length) {
        for (const url of request.query.urls)
            urls.push(url);
    }
    if (request.query.sitemap) {
        const sitemap = new Sitemapper();
        const sm = await sitemap.crawlSite(request.query.sitemap);
        const sortedUrls = [];
        for (const s of sm.sitemaps) {
            for (const url of s.urls) {
                url.priority = parseFloat(url.priority);
                url.lastmod = new Date(url.lastmod);
                sortedUrls.push(url);
            }
        }
        sortedUrls.sort((s1, s2) => s2.priority - s1.priority);
        for (const s of sortedUrls) {
            urls.push(s.loc);
        }
    }

    return urls;
}

module.exports = extractUrlList;
