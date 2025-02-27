import redis from 'redis';
import { promisify } from 'util';

const client = redis.createClient();
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

const RATE_LIMIT = 10; // 10 requests per minute
const WINDOW_SIZE = 60 * 1000; // 1 minute

const rateLimiter = async (req, res, next) => {
    const ip = req.ip;
    const currentTime = Date.now();

    let requestLog = await getAsync(ip);
    requestLog = requestLog ? JSON.parse(requestLog) : [];

    requestLog = requestLog.filter(timestamp => currentTime - timestamp < WINDOW_SIZE);
    
    if (requestLog.length >= RATE_LIMIT) {
        return res.status(429).json({ message: 'Too many requests, please try again later.' });
    }

    requestLog.push(currentTime);
    await setAsync(ip, JSON.stringify(requestLog));

    next();
};

export default rateLimiter;
