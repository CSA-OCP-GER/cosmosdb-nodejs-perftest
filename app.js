const CosmosClient = require("@azure/cosmos").CosmosClient;
let currentEnv = process.env.environment || "PROD";
if (currentEnv !== 'PROD') {
    const dotenv = require("dotenv");
    dotenv.config();
}

let count = process.env.COUNT || 1000;

let cosmos,
    dbResponse;

const testitem = require('./test.json');
const partions = [
    'CORPULSE',
    'MSFT',
    'GOOGLE',
    'AMAZON',
    'FACEBOOK',
    'TWITTER',
    'INSTA',
    'PINTEREST',
    'XYZ',
    'HALO'
];

async function run() {
    cosmos = new CosmosClient({
        endpoint: process.env.HOST,
        auth: {
            masterKey: process.env.AUTHKEY
        }
    });

    dbResponse = await cosmos
        .databases
        .createIfNotExists({id: process.env.DATABASE});

    let coResponse = await dbResponse
        .database
        .containers
        .createIfNotExists({id: process.env.COLLECTION});

    let collection = coResponse.container;

    console.time("InsertCosmos");
    for (let index = 0; index < count; index++) {
        try {
            // generate ID
            testitem.id = Math.floor(Math.random() * 10000000000000).toString();
            // pick random partion ID
            let i = Math.floor(Math.random() * Math.floor(10));
            testitem.company = partions[i];

            await collection
                .items
                .create(testitem);
        } catch (error) {
            console.error(error);
        }
    }
    console.timeEnd("InsertCosmos");
}
console.log("Starting...");
console.log(new Date().toUTCString());
run().then(() => {
    console.log("Done. Inserted: " + count);
    console.log(new Date().toUTCString());
});