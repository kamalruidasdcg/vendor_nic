

const apiLog = async (req, res, next) => {
    console.log(`Req for -> ${req.method} ${req.url}`);
    console.log(`Req from ${req.ip}`);
    console.log(`Req path ${req.path}`);
    if (req.method === 'POST' || req.method === 'PUT') {
        console.log('Req Body: ', req.body);
    }
    next();
}

module.exports = { apiLog }