const Queue = require('bull');

const basicImplementationQueue = new Queue('basic-job-worker', {redis: {port: 6379, host: '127.0.0.1'}});

async function processJob(jobData) {
    if (jobData.jobType === 'processLargeFile') {
        console.log('Processing large file');
    } else if (jobData.jobType === 'fetchDataFromThirdPartyService') {
        console.log('Fetching data from third party service');
    } else if (jobData.jobType === 'performHeavyDbWork') {
        console.log('Perform heavy DB work');
    }
}


basicImplementationQueue.process(async (job) => {
    return processJob(job.data);
});
