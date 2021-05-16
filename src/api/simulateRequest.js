const simulateRequest = (server) => url => new Promise(resolve => {
    let resolved = false;
    const resolveCallback = () => {
        if (!resolved) {
            resolved = true;
            resolve();
        }
    };
    server.onRequest({
            url: url,
            method: 'GET',
        },
        {
            setHeader: () => {
            },
            removeHeader: () => {
            },
            status: () => {
            },
            json: resolveCallback,
            send: resolveCallback,
            end: resolveCallback,
        }
    )
});

module.exports = simulateRequest;
