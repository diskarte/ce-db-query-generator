const fs = require('fs');
const { parse } = require('csv');

// Get CSV Filename
let csvPath = `./csv/cruises/${process.env.npm_config_csvfile}`;

const query = [];

fs.createReadStream(csvPath)
  .pipe(parse({ delimiter: ',', from_line: 2}))
  .on('data', function (row) {
    const cruiseCode = row[0];
    const startDate = row[1];
    const endDate = row[2];
    const cruiseVesselCode = row[0].slice(0, 2);
    const proposalCode = row[3].split(' ');

    const cruiseSqlQuery = `INSERT INTO cruise (code, start_date, end_date, vessel_id) VALUES ('${cruiseCode}','${startDate}', '${endDate}', (SELECT id FROM vessel WHERE code = '${cruiseVesselCode}'));`;

    const proposalQueries = proposalCode.filter((code) => code !== '').map((code) => {
      return `INSERT INTO proposal (code, cruise_id)
              VALUES ('${code}', (SELECT id FROM cruise WHERE code = '${cruiseCode}' ORDER BY id DESC LIMIT 1));`;
    });

    query.push(cruiseSqlQuery);
    query.push(proposalQueries.join(' '));

  })
  .on('end', function () {
    const content = query.join(' ');

    // Generate Output Filename
    const dateIdentifier = new Date().toISOString();
    const outputFile = `./output/cruises/cruise-query-${dateIdentifier}.sql`;

    fs.writeFile(outputFile, content, err => {
      if (err) {
        console.error(err);
      }
    });

    console.log('finished');
  })
  .on('error', function (error) {
    console.log(error.message);
  });