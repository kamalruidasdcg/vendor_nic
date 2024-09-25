function getCorsOptions() {
    const env = process.env.NODE_ENV || 'dev';

    const corsConfigs = {
        dev: {
            origin: ['http://10.18.1.242:3000', 'http://localhost:3000'],
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            credentials: true,
        },
        qa: {
            origin: ['http://10.18.7.123:3000', 'http://10.18.1.242:3000', ],
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            credentials: false,
        },
        prod: {
            origin: ['http://10.18.1.242:3000', 'https://obps.grse.co.in', 'https://obps.grse.in', 'http://obps.grse.co.in'],
            credentials: false,
        },
    };

    return corsConfigs[env] || corsConfigs['dev']; // Default to development if env is not matched
}

module.exports = getCorsOptions;
