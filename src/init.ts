import app from './app'
import {consumeMessages} from './common/services/rabbitMQconsumer.service'
import * as http from 'http'
import debug from 'debug'

const server: http.Server = http.createServer(app);
const port = 11000;
const debugLog: debug.IDebugger = debug('init');

consumeMessages();

server.listen(port, () => {
    debugLog(`Server running at http://localhost:${port}`);
});
