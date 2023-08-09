const fs = require('fs');
const { parse } = require('csv');

// Get CSV Filename
let csvPath = `./csv/responses/${process.env.npm_config_csvfile}`;

let query = [];

fs.createReadStream(csvPath).pipe(parse({ delimiter: ',', from_line: 2})).on('data', function (row) {
  const cruiseCode = row[0];
  const startDate = row[1];
  const submissionDate = row[2];
  const nameJp = row[7];
  const nameEn = row[8];
  const email = row[9];
  const careerLevel = row[10];
  const affiliation = row[11];
  const gender = row[12];
  const age = row[13];
  const nationality = row[14];
  const jamstecExperience = row[15];
  const otherExperience = row[16];

  let responderQuery = `INSERT INTO responder (cruise_id, submission_date, name_jp, name_en, email, career_level_id,
                                                 affiliation, gender_id, age_group_id, nationality, jamstec_experience,
                                                 other_experience)
                          VALUES ((SELECT id
                                   FROM cruise
                                   WHERE code = '${cruiseCode}'
                                     AND start_date = '${startDate}'
                                   ORDER BY id DESC LIMIT 1), '${submissionDate}', '${nameJp}', '${nameEn}', '${email}',
                                 (SELECT id from career_level WHERE name_jp = '${careerLevel}'), '${affiliation}',
                                 (SELECT id from gender WHERE name_jp = '${gender}'),
                                 (SELECT id FROM age_group WHERE name_jp = '${age}'), '${nationality}', ${jamstecExperience === 'Yes'}, ${otherExperience === 'Yes'});`;


  let responseQuery = 'INSERT INTO responses (responder_id, question_id, rating_id, response_comment, cruise_id) VALUES';

  responseQuery += `((SELECT id from responder where name_jp = '${nameJp}' ORDER BY id DESC LIMIT 1), 1, (SELECT id FROM rating WHERE name_jp = '${row[17] === '' ? '非該当' : row[17]}'), '',(SELECT id FROM cruise WHERE code = '${cruiseCode}' AND start_date = '${startDate}' ORDER BY id DESC LIMIT 1)),`;

  responseQuery += `((SELECT id from responder where name_jp = '${nameJp}' ORDER BY id DESC LIMIT 1), 2, (SELECT id FROM rating WHERE name_jp = '${row[18] === '' ? '非該当' : row[18]}'), '',(SELECT id FROM cruise WHERE code = '${cruiseCode}' AND start_date = '${startDate}' ORDER BY id DESC LIMIT 1)),`;

  responseQuery += `((SELECT id from responder where name_jp = '${nameJp}' ORDER BY id DESC LIMIT 1), 3, (SELECT id FROM rating WHERE name_jp = '${row[19] === '' ? '非該当' : row[19]}'), '',(SELECT id FROM cruise WHERE code = '${cruiseCode}' AND start_date = '${startDate}' ORDER BY id DESC LIMIT 1)),`;

  responseQuery += `((SELECT id from responder where name_jp = '${nameJp}' ORDER BY id DESC LIMIT 1), 5, (SELECT id FROM rating WHERE name_jp = '${row[20] === '' ? '非該当' : row[20]}'), '',(SELECT id FROM cruise WHERE code = '${cruiseCode}' AND start_date = '${startDate}' ORDER BY id DESC LIMIT 1)),`;

  responseQuery += `((SELECT id from responder where name_jp = '${nameJp}' ORDER BY id DESC LIMIT 1), 6, (SELECT id FROM rating WHERE name_jp = '${row[21] === '' ? '非該当' : row[21]}'), '',(SELECT id FROM cruise WHERE code = '${cruiseCode}' AND start_date = '${startDate}' ORDER BY id DESC LIMIT 1)),`;

  responseQuery += `((SELECT id from responder where name_jp = '${nameJp}' ORDER BY id DESC LIMIT 1), 7, (SELECT id FROM rating WHERE name_jp = '${row[22] === '' ? '非該当' : row[22]}'), '',(SELECT id FROM cruise WHERE code = '${cruiseCode}' AND start_date = '${startDate}' ORDER BY id DESC LIMIT 1)),`;

  responseQuery += `((SELECT id from responder where name_jp = '${nameJp}' ORDER BY id DESC LIMIT 1), 8, '', '${row[23]}',(SELECT id FROM cruise WHERE code = '${cruiseCode}' AND start_date = '${startDate}' ORDER BY id DESC LIMIT 1)),`;

  responseQuery += `((SELECT id from responder where name_jp = '${nameJp}' ORDER BY id DESC LIMIT 1), 10, (SELECT id FROM rating WHERE name_jp = '${row[24] === '' ? '非該当' : row[24]}'), '',(SELECT id FROM cruise WHERE code = '${cruiseCode}' AND start_date = '${startDate}' ORDER BY id DESC LIMIT 1)),`;

  responseQuery += `((SELECT id from responder where name_jp = '${nameJp}' ORDER BY id DESC LIMIT 1), 11, (SELECT id FROM rating WHERE name_jp = '${row[25] === '' ? '非該当' : row[25]}'), '',(SELECT id FROM cruise WHERE code = '${cruiseCode}' AND start_date = '${startDate}' ORDER BY id DESC LIMIT 1)),`;

  responseQuery += `((SELECT id from responder where name_jp = '${nameJp}' ORDER BY id DESC LIMIT 1), 12, (SELECT id FROM rating WHERE name_jp = '${row[26] === '' ? '非該当' : row[26]}'), '',(SELECT id FROM cruise WHERE code = '${cruiseCode}' AND start_date = '${startDate}' ORDER BY id DESC LIMIT 1)),`;

  responseQuery += `((SELECT id from responder where name_jp = '${nameJp}' ORDER BY id DESC LIMIT 1), 13, (SELECT id FROM rating WHERE name_jp = '${row[27] === '' ? '非該当' : row[27]}'), '',(SELECT id FROM cruise WHERE code = '${cruiseCode}' AND start_date = '${startDate}' ORDER BY id DESC LIMIT 1)),`;

  responseQuery += `((SELECT id from responder where name_jp = '${nameJp}' ORDER BY id DESC LIMIT 1), 14, (SELECT id FROM rating WHERE name_jp = '${row[28] === '' ? '非該当' : row[28]}'), '',(SELECT id FROM cruise WHERE code = '${cruiseCode}' AND start_date = '${startDate}' ORDER BY id DESC LIMIT 1)),`;

  responseQuery += `((SELECT id from responder where name_jp = '${nameJp}' ORDER BY id DESC LIMIT 1), 15, (SELECT id FROM rating WHERE name_jp = '${row[29] === '' ? '非該当' : row[29]}'), '',(SELECT id FROM cruise WHERE code = '${cruiseCode}' AND start_date = '${startDate}' ORDER BY id DESC LIMIT 1)),`;

  responseQuery += `((SELECT id from responder where name_jp = '${nameJp}' ORDER BY id DESC LIMIT 1), 16, (SELECT id FROM rating WHERE name_jp = '${row[30] === '' ? '非該当' : row[30]}'), '',(SELECT id FROM cruise WHERE code = '${cruiseCode}' AND start_date = '${startDate}' ORDER BY id DESC LIMIT 1)),`;

  responseQuery += `((SELECT id from responder where name_jp = '${nameJp}' ORDER BY id DESC LIMIT 1), 17, (SELECT id FROM rating WHERE name_jp = '${row[31] === '' ? '非該当' : row[31]}'), '',(SELECT id FROM cruise WHERE code = '${cruiseCode}' AND start_date = '${startDate}' ORDER BY id DESC LIMIT 1)),`;

  responseQuery += `((SELECT id from responder where name_jp = '${nameJp}' ORDER BY id DESC LIMIT 1), 18, (SELECT id FROM rating WHERE name_jp = '${row[32] === '' ? '非該当' : row[32]}'), '',(SELECT id FROM cruise WHERE code = '${cruiseCode}' AND start_date = '${startDate}' ORDER BY id DESC LIMIT 1)),`;

  responseQuery += `((SELECT id from responder where name_jp = '${nameJp}' ORDER BY id DESC LIMIT 1), 19, (SELECT id FROM rating WHERE name_jp = '${row[33] === '' ? '非該当' : row[33]}'), '',(SELECT id FROM cruise WHERE code = '${cruiseCode}' AND start_date = '${startDate}' ORDER BY id DESC LIMIT 1)),`;

  responseQuery += `((SELECT id from responder where name_jp = '${nameJp}' ORDER BY id DESC LIMIT 1), 21, (SELECT id FROM rating WHERE name_jp = '${row[34] === '' ? '非該当' : row[34]}'), '',(SELECT id FROM cruise WHERE code = '${cruiseCode}' AND start_date = '${startDate}' ORDER BY id DESC LIMIT 1)),`;

  responseQuery += `((SELECT id from responder where name_jp = '${nameJp}' ORDER BY id DESC LIMIT 1), 22, (SELECT id FROM rating WHERE name_jp = '${row[35] === '' ? '非該当' : row[35]}'), '',(SELECT id FROM cruise WHERE code = '${cruiseCode}' AND start_date = '${startDate}' ORDER BY id DESC LIMIT 1)),`;

  responseQuery += `((SELECT id from responder where name_jp = '${nameJp}' ORDER BY id DESC LIMIT 1), 23, (SELECT id FROM rating WHERE name_jp = '${row[36] === '' ? '非該当' : row[36]}'), '',(SELECT id FROM cruise WHERE code = '${cruiseCode}' AND start_date = '${startDate}' ORDER BY id DESC LIMIT 1)),`;

  responseQuery += `((SELECT id from responder where name_jp = '${nameJp}' ORDER BY id DESC LIMIT 1), 24, (SELECT id FROM rating WHERE name_jp = '${row[37] === '' ? '非該当' : row[37]}'), '',(SELECT id FROM cruise WHERE code = '${cruiseCode}' AND start_date = '${startDate}' ORDER BY id DESC LIMIT 1)),`;

  responseQuery += `((SELECT id from responder where name_jp = '${nameJp}' ORDER BY id DESC LIMIT 1), 25, (SELECT id FROM rating WHERE name_jp = '${row[38] === '' ? '非該当' : row[38]}'), '',(SELECT id FROM cruise WHERE code = '${cruiseCode}' AND start_date = '${startDate}' ORDER BY id DESC LIMIT 1)),`;

  responseQuery += `((SELECT id from responder where name_jp = '${nameJp}' ORDER BY id DESC LIMIT 1), 26, (SELECT id FROM rating WHERE name_jp = '${row[39] === '' ? '非該当' : row[39]}'), '',(SELECT id FROM cruise WHERE code = '${cruiseCode}' AND start_date = '${startDate}' ORDER BY id DESC LIMIT 1)),`;

  responseQuery += `((SELECT id from responder where name_jp = '${nameJp}' ORDER BY id DESC LIMIT 1), 27, (SELECT id FROM rating WHERE name_jp = '${row[40] === '' ? '非該当' : row[40]}'), '',(SELECT id FROM cruise WHERE code = '${cruiseCode}' AND start_date = '${startDate}' ORDER BY id DESC LIMIT 1)),`;

  responseQuery += `((SELECT id from responder where name_jp = '${nameJp}' ORDER BY id DESC LIMIT 1), 30, (SELECT id FROM rating WHERE name_jp = '${row[41] === '' ? '非該当' : row[41]}'), '',(SELECT id FROM cruise WHERE code = '${cruiseCode}' AND start_date = '${startDate}' ORDER BY id DESC LIMIT 1)),`;

  responseQuery += `((SELECT id from responder where name_jp = '${nameJp}' ORDER BY id DESC LIMIT 1), 31, (SELECT id FROM rating WHERE name_jp = '${row[42] === '' ? '非該当' : row[42]}'), '',(SELECT id FROM cruise WHERE code = '${cruiseCode}' AND start_date = '${startDate}' ORDER BY id DESC LIMIT 1)),`;

  responseQuery += `((SELECT id from responder where name_jp = '${nameJp}' ORDER BY id DESC LIMIT 1), 32, (SELECT id FROM rating WHERE name_jp = '${row[43] === '' ? '非該当' : row[43]}'), '',(SELECT id FROM cruise WHERE code = '${cruiseCode}' AND start_date = '${startDate}' ORDER BY id DESC LIMIT 1)),`;

  responseQuery += `((SELECT id from responder where name_jp = '${nameJp}' ORDER BY id DESC LIMIT 1), 33, (SELECT id FROM rating WHERE name_jp = '${row[44] === '' ? '非該当' : row[44]}'), '',(SELECT id FROM cruise WHERE code = '${cruiseCode}' AND start_date = '${startDate}' ORDER BY id DESC LIMIT 1)),`;

  responseQuery += `((SELECT id from responder where name_jp = '${nameJp}' ORDER BY id DESC LIMIT 1), 34, (SELECT id FROM rating WHERE name_jp = '${row[45] === '' ? '非該当' : row[45]}'), '',(SELECT id FROM cruise WHERE code = '${cruiseCode}' AND start_date = '${startDate}' ORDER BY id DESC LIMIT 1)),`;

  responseQuery += `((SELECT id from responder where name_jp = '${nameJp}' ORDER BY id DESC LIMIT 1), 35, (SELECT id FROM rating WHERE name_jp = '${row[46] === '' ? '非該当' : row[46]}'), '',(SELECT id FROM cruise WHERE code = '${cruiseCode}' AND start_date = '${startDate}' ORDER BY id DESC LIMIT 1)),`;

  responseQuery += `((SELECT id from responder where name_jp = '${nameJp}' ORDER BY id DESC LIMIT 1), 36, (SELECT id FROM rating WHERE name_jp = '${row[47] === '' ? '非該当' : row[47]}'), '',(SELECT id FROM cruise WHERE code = '${cruiseCode}' AND start_date = '${startDate}' ORDER BY id DESC LIMIT 1)),`;

  responseQuery += `((SELECT id from responder where name_jp = '${nameJp}' ORDER BY id DESC LIMIT 1), 37, (SELECT id FROM rating WHERE name_jp = '${row[48] === '' ? '非該当' : row[48]}'), '',(SELECT id FROM cruise WHERE code = '${cruiseCode}' AND start_date = '${startDate}' ORDER BY id DESC LIMIT 1)),`;

  responseQuery += `((SELECT id from responder where name_jp = '${nameJp}' ORDER BY id DESC LIMIT 1), 38, (SELECT id FROM rating WHERE name_jp = '${row[49] === '' ? '非該当' : row[49]}'), '',(SELECT id FROM cruise WHERE code = '${cruiseCode}' AND start_date = '${startDate}' ORDER BY id DESC LIMIT 1)),`;

  responseQuery += `((SELECT id from responder where name_jp = '${nameJp}' ORDER BY id DESC LIMIT 1), 39, (SELECT id FROM rating WHERE name_jp = '${row[50] === '' ? '非該当' : row[50]}'), '',(SELECT id FROM cruise WHERE code = '${cruiseCode}' AND start_date = '${startDate}' ORDER BY id DESC LIMIT 1)),`;

  responseQuery += `((SELECT id from responder where name_jp = '${nameJp}' ORDER BY id DESC LIMIT 1), 40, (SELECT id FROM rating WHERE name_jp = '${row[51] === '' ? '非該当' : row[51]}'), '',(SELECT id FROM cruise WHERE code = '${cruiseCode}' AND start_date = '${startDate}' ORDER BY id DESC LIMIT 1)),`;

  responseQuery += `((SELECT id from responder where name_jp = '${nameJp}' ORDER BY id DESC LIMIT 1), 41, (SELECT id FROM rating WHERE name_jp = '${row[52] === '' ? '非該当' : row[52]}'), '',(SELECT id FROM cruise WHERE code = '${cruiseCode}' AND start_date = '${startDate}' ORDER BY id DESC LIMIT 1)),`;

  responseQuery += `((SELECT id from responder where name_jp = '${nameJp}' ORDER BY id DESC LIMIT 1), 42, (SELECT id FROM rating WHERE name_jp = '${row[53] === '' ? '非該当' : row[53]}'), '',(SELECT id FROM cruise WHERE code = '${cruiseCode}' AND start_date = '${startDate}' ORDER BY id DESC LIMIT 1)),`;

  responseQuery += `((SELECT id from responder where name_jp = '${nameJp}' ORDER BY id DESC LIMIT 1), 43, (SELECT id FROM rating WHERE name_jp = '${row[54] === '' ? '非該当' : row[54]}'), '',(SELECT id FROM cruise WHERE code = '${cruiseCode}' AND start_date = '${startDate}' ORDER BY id DESC LIMIT 1)),`;

  responseQuery += `((SELECT id from responder where name_jp = '${nameJp}' ORDER BY id DESC LIMIT 1), 44, (SELECT id FROM rating WHERE name_jp = '${row[55] === '' ? '非該当' : row[55]}'), '',(SELECT id FROM cruise WHERE code = '${cruiseCode}' AND start_date = '${startDate}' ORDER BY id DESC LIMIT 1)),`;

  responseQuery += `((SELECT id from responder where name_jp = '${nameJp}' ORDER BY id DESC LIMIT 1), 45, (SELECT id FROM rating WHERE name_jp = '${row[56] === '' ? '非該当' : row[56]}'), '',(SELECT id FROM cruise WHERE code = '${cruiseCode}' AND start_date = '${startDate}' ORDER BY id DESC LIMIT 1)),`;

  responseQuery += `((SELECT id from responder where name_jp = '${nameJp}' ORDER BY id DESC LIMIT 1), 46, (SELECT id FROM rating WHERE name_jp = '${row[57] === '' ? '非該当' : row[57]}'), '',(SELECT id FROM cruise WHERE code = '${cruiseCode}' AND start_date = '${startDate}' ORDER BY id DESC LIMIT 1)),`;

  responseQuery += `((SELECT id from responder where name_jp = '${nameJp}' ORDER BY id DESC LIMIT 1), 47, (SELECT id FROM rating WHERE name_jp = '${row[58] === '' ? '非該当' : row[58]}'), '',(SELECT id FROM cruise WHERE code = '${cruiseCode}' AND start_date = '${startDate}' ORDER BY id DESC LIMIT 1)),`;

  responseQuery += `((SELECT id from responder where name_jp = '${nameJp}' ORDER BY id DESC LIMIT 1), 48, (SELECT id FROM rating WHERE name_jp = '${row[59] === '' ? '非該当' : row[59]}'), '',(SELECT id FROM cruise WHERE code = '${cruiseCode}' AND start_date = '${startDate}' ORDER BY id DESC LIMIT 1)),`;

  responseQuery += `((SELECT id from responder where name_jp = '${nameJp}' ORDER BY id DESC LIMIT 1), 49, (SELECT id FROM rating WHERE name_jp = '${row[60] === '' ? '非該当' : row[60]}'), '',(SELECT id FROM cruise WHERE code = '${cruiseCode}' AND start_date = '${startDate}' ORDER BY id DESC LIMIT 1)),`;

  responseQuery += `((SELECT id from responder where name_jp = '${nameJp}' ORDER BY id DESC LIMIT 1), 50, (SELECT id FROM rating WHERE name_jp = '${row[61] === '' ? '非該当' : row[61]}'), '',(SELECT id FROM cruise WHERE code = '${cruiseCode}' AND start_date = '${startDate}' ORDER BY id DESC LIMIT 1)),`;

  responseQuery += `((SELECT id from responder where name_jp = '${nameJp}' ORDER BY id DESC LIMIT 1), 51, (SELECT id FROM rating WHERE name_jp = '${row[62] === '' ? '非該当' : row[62]}'), '',(SELECT id FROM cruise WHERE code = '${cruiseCode}' AND start_date = '${startDate}' ORDER BY id DESC LIMIT 1)),`;

  responseQuery += `((SELECT id from responder where name_jp = '${nameJp}' ORDER BY id DESC LIMIT 1), 52, (SELECT id FROM rating WHERE name_jp = '${row[63] === '' ? '非該当' : row[63]}'), '',(SELECT id FROM cruise WHERE code = '${cruiseCode}' AND start_date = '${startDate}' ORDER BY id DESC LIMIT 1)),`;

  responseQuery += `((SELECT id from responder where name_jp = '${nameJp}' ORDER BY id DESC LIMIT 1), 53, (SELECT id FROM rating WHERE name_jp = '${row[64] === '' ? '非該当' : row[64]}'), '',(SELECT id FROM cruise WHERE code = '${cruiseCode}' AND start_date = '${startDate}' ORDER BY id DESC LIMIT 1)),`;

  responseQuery += `((SELECT id from responder where name_jp = '${nameJp}' ORDER BY id DESC LIMIT 1), 54, (SELECT id FROM rating WHERE name_jp = '${row[65] === '' ? '非該当' : row[65]}'), '',(SELECT id FROM cruise WHERE code = '${cruiseCode}' AND start_date = '${startDate}' ORDER BY id DESC LIMIT 1)),`;

  responseQuery += `((SELECT id from responder where name_jp = '${nameJp}' ORDER BY id DESC LIMIT 1), 55, (SELECT id FROM rating WHERE name_jp = '${row[66] === '' ? '非該当' : row[66]}'), '',(SELECT id FROM cruise WHERE code = '${cruiseCode}' AND start_date = '${startDate}' ORDER BY id DESC LIMIT 1)),`;

  responseQuery += `((SELECT id from responder where name_jp = '${nameJp}' ORDER BY id DESC LIMIT 1), 56, (SELECT id FROM rating WHERE name_jp = '${row[67] === '' ? '非該当' : row[67]}'), '',(SELECT id FROM cruise WHERE code = '${cruiseCode}' AND start_date = '${startDate}' ORDER BY id DESC LIMIT 1)),`;

  responseQuery += `((SELECT id from responder where name_jp = '${nameJp}' ORDER BY id DESC LIMIT 1), 57, (SELECT id FROM rating WHERE name_jp = '${row[68] === '' ? '非該当' : row[68]}'), '',(SELECT id FROM cruise WHERE code = '${cruiseCode}' AND start_date = '${startDate}' ORDER BY id DESC LIMIT 1)),`;

  responseQuery += `((SELECT id from responder where name_jp = '${nameJp}' ORDER BY id DESC LIMIT 1), 58, (SELECT id FROM rating WHERE name_jp = '${row[69] === '' ? '非該当' : row[69]}'), '',(SELECT id FROM cruise WHERE code = '${cruiseCode}' AND start_date = '${startDate}' ORDER BY id DESC LIMIT 1)),`;

  responseQuery += `((SELECT id from responder where name_jp = '${nameJp}' ORDER BY id DESC LIMIT 1), 59, (SELECT id FROM rating WHERE name_jp = '${row[70] === '' ? '非該当' : row[70]}'), '',(SELECT id FROM cruise WHERE code = '${cruiseCode}' AND start_date = '${startDate}' ORDER BY id DESC LIMIT 1)),`;

  responseQuery += `((SELECT id from responder where name_jp = '${nameJp}' ORDER BY id DESC LIMIT 1), 60, (SELECT id FROM rating WHERE name_jp = '${row[71] === '' ? '非該当' : row[71]}'), '',(SELECT id FROM cruise WHERE code = '${cruiseCode}' AND start_date = '${startDate}' ORDER BY id DESC LIMIT 1)),`;

  responseQuery += `((SELECT id from responder where name_jp = '${nameJp}' ORDER BY id DESC LIMIT 1), 62, (SELECT id FROM rating WHERE name_jp = '${row[72] === '' ? '非該当' : row[72]}'), '',(SELECT id FROM cruise WHERE code = '${cruiseCode}' AND start_date = '${startDate}' ORDER BY id DESC LIMIT 1)),`;

  responseQuery += `((SELECT id from responder where name_jp = '${nameJp}' ORDER BY id DESC LIMIT 1), 63, (SELECT id FROM rating WHERE name_jp = '${row[73] === '' ? '非該当' : row[73]}'), '',(SELECT id FROM cruise WHERE code = '${cruiseCode}' AND start_date = '${startDate}' ORDER BY id DESC LIMIT 1)),`;

  responseQuery += `((SELECT id from responder where name_jp = '${nameJp}' ORDER BY id DESC LIMIT 1), 64, (SELECT id FROM rating WHERE name_jp = '${row[74] === '' ? '非該当' : row[74]}'), '',(SELECT id FROM cruise WHERE code = '${cruiseCode}' AND start_date = '${startDate}' ORDER BY id DESC LIMIT 1)),`;

  responseQuery += `((SELECT id from responder where name_jp = '${nameJp}' ORDER BY id DESC LIMIT 1), 65, (SELECT id FROM rating WHERE name_jp = '${row[75] === '' ? '非該当' : row[75]}'), '',(SELECT id FROM cruise WHERE code = '${cruiseCode}' AND start_date = '${startDate}' ORDER BY id DESC LIMIT 1)),`;

  responseQuery += `((SELECT id from responder where name_jp = '${nameJp}' ORDER BY id DESC LIMIT 1), 66, (SELECT id FROM rating WHERE name_jp = '${row[76] === '' ? '非該当' : row[76]}'), '',(SELECT id FROM cruise WHERE code = '${cruiseCode}' AND start_date = '${startDate}' ORDER BY id DESC LIMIT 1)),`;

  responseQuery += `((SELECT id from responder where name_jp = '${nameJp}' ORDER BY id DESC LIMIT 1), 67, (SELECT id FROM rating WHERE name_jp = '${row[77] === '' ? '非該当' : row[77]}'), '',(SELECT id FROM cruise WHERE code = '${cruiseCode}' AND start_date = '${startDate}' ORDER BY id DESC LIMIT 1)),`;

  responseQuery += `((SELECT id from responder where name_jp = '${nameJp}' ORDER BY id DESC LIMIT 1), 68, (SELECT id FROM rating WHERE name_jp = '${row[78] === '' ? '非該当' : row[78]}'), '',(SELECT id FROM cruise WHERE code = '${cruiseCode}' AND start_date = '${startDate}' ORDER BY id DESC LIMIT 1)),`;

  responseQuery += `((SELECT id from responder where name_jp = '${nameJp}' ORDER BY id DESC LIMIT 1), 69, (SELECT id FROM rating WHERE name_jp = '${row[79] === '' ? '非該当' : row[79]}'), '',(SELECT id FROM cruise WHERE code = '${cruiseCode}' AND start_date = '${startDate}' ORDER BY id DESC LIMIT 1)),`;

  responseQuery += `((SELECT id from responder where name_jp = '${nameJp}' ORDER BY id DESC LIMIT 1), 70, (SELECT id FROM rating WHERE name_jp = '${row[80] === '' ? '非該当' : row[80]}'), '',(SELECT id FROM cruise WHERE code = '${cruiseCode}' AND start_date = '${startDate}' ORDER BY id DESC LIMIT 1)),`;

  responseQuery += `((SELECT id from responder where name_jp = '${nameJp}' ORDER BY id DESC LIMIT 1), 71, (SELECT id FROM rating WHERE name_jp = '${row[81] === '' ? '非該当' : row[81]}'), '',(SELECT id FROM cruise WHERE code = '${cruiseCode}' AND start_date = '${startDate}' ORDER BY id DESC LIMIT 1)),`;

  responseQuery += `((SELECT id from responder where name_jp = '${nameJp}' ORDER BY id DESC LIMIT 1), 72, (SELECT id FROM rating WHERE name_jp = '${row[82] === '' ? '非該当' : row[82]}'), '',(SELECT id FROM cruise WHERE code = '${cruiseCode}' AND start_date = '${startDate}' ORDER BY id DESC LIMIT 1)),`;

  responseQuery += `((SELECT id from responder where name_jp = '${nameJp}' ORDER BY id DESC LIMIT 1), 74, (SELECT id FROM rating WHERE name_jp = '${row[83] === '' ? '非該当' : row[83]}'), '',(SELECT id FROM cruise WHERE code = '${cruiseCode}' AND start_date = '${startDate}' ORDER BY id DESC LIMIT 1)),`;

  responseQuery += `((SELECT id from responder where name_jp = '${nameJp}' ORDER BY id DESC LIMIT 1), 75, (SELECT id FROM rating WHERE name_jp = '${row[84] === '' ? '非該当' : row[84]}'), '',(SELECT id FROM cruise WHERE code = '${cruiseCode}' AND start_date = '${startDate}' ORDER BY id DESC LIMIT 1)),`;

  responseQuery += `((SELECT id from responder where name_jp = '${nameJp}' ORDER BY id DESC LIMIT 1), 76, (SELECT id FROM rating WHERE name_jp = '${row[85] === '' ? '非該当' : row[85]}'), '',(SELECT id FROM cruise WHERE code = '${cruiseCode}' AND start_date = '${startDate}' ORDER BY id DESC LIMIT 1)),`;

  responseQuery += `((SELECT id from responder where name_jp = '${nameJp}' ORDER BY id DESC LIMIT 1), 77, (SELECT id FROM rating WHERE name_jp = '${row[86] === '' ? '非該当' : row[86]}'), '',(SELECT id FROM cruise WHERE code = '${cruiseCode}' AND start_date = '${startDate}' ORDER BY id DESC LIMIT 1)),`;

  responseQuery += `((SELECT id from responder where name_jp = '${nameJp}' ORDER BY id DESC LIMIT 1), 78, (SELECT id FROM rating WHERE name_jp = '${row[87] === '' ? '非該当' : row[87]}'), '',(SELECT id FROM cruise WHERE code = '${cruiseCode}' AND start_date = '${startDate}' ORDER BY id DESC LIMIT 1)),`;

  responseQuery += `((SELECT id from responder where name_jp = '${nameJp}' ORDER BY id DESC LIMIT 1), 80, (SELECT id FROM rating WHERE name_jp = '${row[88] === '' ? '非該当' : row[88]}'), '',(SELECT id FROM cruise WHERE code = '${cruiseCode}' AND start_date = '${startDate}' ORDER BY id DESC LIMIT 1)),`;

  responseQuery += `((SELECT id from responder where name_jp = '${nameJp}' ORDER BY id DESC LIMIT 1), 81, (SELECT id FROM rating WHERE name_jp = '${row[89] === '' ? '非該当' : row[89]}'), '',(SELECT id FROM cruise WHERE code = '${cruiseCode}' AND start_date = '${startDate}' ORDER BY id DESC LIMIT 1)),`;

  responseQuery += `((SELECT id from responder where name_jp = '${nameJp}' ORDER BY id DESC LIMIT 1), 82, (SELECT id FROM rating WHERE name_jp = '${row[90] === '' ? '非該当' : row[90]}'), '',(SELECT id FROM cruise WHERE code = '${cruiseCode}' AND start_date = '${startDate}' ORDER BY id DESC LIMIT 1)),`;

  responseQuery += `((SELECT id from responder where name_jp = '${nameJp}' ORDER BY id DESC LIMIT 1), 83, (SELECT id FROM rating WHERE name_jp = '${row[35] === '' ? '非該当' : row[91]}'), '',(SELECT id FROM cruise WHERE code = '${cruiseCode}' AND start_date = '${startDate}' ORDER BY id DESC LIMIT 1))`;

  responseQuery += ';';

  query.push(responderQuery + responseQuery);
})
  .on('end', function () {
    const content = query.join(' ');

    // Generate Output Filename
    const dateIdentifier = new Date().toISOString();
    const outputFile = `./output/responses/response-query-${dateIdentifier}.sql`;

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