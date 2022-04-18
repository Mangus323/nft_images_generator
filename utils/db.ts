import sqlite3 from 'sqlite3';

const fs = require('fs');
const basePath = process.cwd();
const buildDir = `${basePath}/build`;

let db = new sqlite3.Database('./images.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the images database.');
});

const createTableQuery = `
CREATE TABLE images (
_id INTEGER,
background TEXT,
fur TEXT,
body TEXT,
mouth TEXT,
eyes TEXT,
face TEXT,
ears TEXT,
eye_wear TEXT,
nose_wear TEXT,
head TEXT);
`;

db.run(createTableQuery, (err) => {
  if (err) {
    return console.log(err.message);
  }

  let rawData = (JSON.parse(fs.readFileSync(`${buildDir}/json/_metadata.json`)));
  for (let i = 0; i < rawData.length; i++) {
    let rd = rawData[i];
    const query = `
    INSERT INTO images (_id, background, fur, body, mouth, eyes, face, ears, eye_wear, nose_wear, head)
    VALUES
(${i + 1},
${ga('Background', rd)},
${ga('Fur', rd)},
${ga('Body', rd)},
${ga('Mouth', rd)},
${ga('Eyes', rd)},
${ga('Face', rd)},
${ga('Ears', rd)},
${ga('Eye Wear', rd)},
${ga('Nose Wear', rd)},
${ga('Head', rd)})
`;

    db.run(query, function(err) {
      if (err) {
        return console.log(err.message);
      }
      // get the last insert id
      console.log(`A row has been inserted with rowid ${this.lastID}`);
    });
  }

});

//getAttribute
const ga = (type: string, rawDataItem: any) => {
  let name = 'N/A';
  rawDataItem.attributes.forEach((attribute: any) => {
    if (attribute.trait_type === type)
      name = attribute.name;
  });
  return `"${name}"`;
};


// db.serialize(() => {
//   db.each(`
// SELECT PlaylistId as id,Name as name
// FROM playlists
// `, (err, row) => {
//     if (err) {
//       console.error(err.message);
//     }
//     console.log(row.id + '\t' + row.name);
//   });
// });

db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Close the database connection.');
});

