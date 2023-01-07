const { Client } = require("pg");

//const client = new Client(process.env.PG_URL);

const client = new Client({
    connectionString: process.env.PG_URL,
    ssl: { 
        require: true,
        rejectUnauthorized: false }
  });

client.connect((error) => {
    if (error) {
        console.log("DB connection issue: " + error.message);
    } else {
        console.log("DB has been connected;")
    }
});

module.exports = client;