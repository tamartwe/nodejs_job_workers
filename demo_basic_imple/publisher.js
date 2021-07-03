const Queue = require('bull');

const basicImplementationQueue = new Queue('basic-job-worker', {redis: {port: 6379, host: '127.0.0.1'}});

const express = require('express');
const router = express.Router();
const port = process.env.PORT || 3000;

const app = express();

async function publishJobs() {
    const processLargeFile = await basicImplementationQueue.add({
        jobType: 'processLargeFile'
    });
    const fetchDataFromThirdPartyService = await basicImplementationQueue.add({
        jobType: 'fetchDataFromThirdPartyService'
    });
    const performHeavyDbWork = await basicImplementationQueue.add({
        jobType: 'performHeavyDbWork'
    });
}



router.get('/', async (req, res) => {
    await publishJobs();
    return res.json({ 'message': 'all jobs published' });
});


app.use('/api', router);

// Start the server
app.listen(port);
console.log('server is up ' + port);



