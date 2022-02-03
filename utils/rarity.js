const basePath = process.cwd();
const fs = require("fs");
const separator = ";"

const getRawData = () => {
  for (let i = 1; i <= 10000; i++) {
    try {
      rawData.push(JSON.parse(fs.readFileSync(`${basePath}/build/json/${i}.json`)));
    } catch (e) {
      return;
    }
  }
}

let rawData = [];
getRawData();

let traitList = {}
let csv = '';

rawData.forEach((row) => {
  row.attributes.forEach((item) => {
    if (!traitList[item.trait_type]) traitList[item.trait_type] = {}
    if (!traitList[item.trait_type][item.name]) traitList[item.trait_type][item.name] = 0

    traitList[item.trait_type][item.name]++;
  })
})

for (const traitType in traitList) {
  csv += `${traitType}\n`

  for (const traitTypeKey in traitList[traitType]) {
    csv += `${traitTypeKey}${separator}${traitList[traitType][traitTypeKey]}\n`
  }
  csv += '\n';
}

fs.writeFileSync("./csv/rarity.csv", csv)
//fs.writeFileSync("./rarity.json", JSON.stringify(traitList, null, ' '))

