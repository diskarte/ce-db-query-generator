const fs = require('fs');
const { parse } = require('csv');

// Get CSV Filename
let csvPath = `./csv/researchers/${process.env.npm_config_csvfile}`;

let query = [];

fs.createReadStream(csvPath).pipe(parse({ delimiters: ',' , from_line: 2})).on('data', function (row) {
  const cruiseCode = row[0];
  const cruiseVesselCode = row[0].slice(0, 2);
  const name = row[5];
  const affiliation = row[6];
  const careerLevel = row[7];
  const universityEn = row[9];
  const universityJp = row[10];

  const researcherSqlQuery = `INSERT INTO researcher (cruise_id, vessel_id, researcher_name, affiliation, career_level,
                                                      university_name_en, university_name_jp)
                              VALUES ((SELECT id from cruise WHERE code = '${cruiseCode}'),
                                      (SELECT id FROM vessel WHERE code = '${cruiseVesselCode}'), '${name}',
                                      '${affiliation}', '${careerLevel}', '${universityEn}', '${universityJp}');`;

  query.push(researcherSqlQuery);
}).on('end', function () {
  const content = query.join(' ');

  // Generate Output Filename
  const dateIdentifier = new Date().toISOString();
  const outputFile = `./output/researchers/researcher-query-${dateIdentifier}.sql`;

  fs.writeFile(outputFile, content, (err) => {
    if (err) {
      console.log(err);
    }
  });

  console.log('finished');
}).on('error', function (error) {
  console.log(error.message);
});