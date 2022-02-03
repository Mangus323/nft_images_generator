const basePath = process.cwd();
const fs = require("fs");
const separator = ";"
const totalCount = 1000;

const getRawData = () => {
  for (let i = 1; i <= 10000; i++) {
    try {
      rawData.push(JSON.parse(fs.readFileSync(`${basePath}/build/json/${i}.json`)));
    } catch (e) {
      return;
    }
  }
}

const getScore = (trait_type, name) => {
  let traitCount = 0;
  for (let i = 0; i < rawData.length; i++) {
    for (let j = 0; j < rawData[i].attributes.length; j++) {
      if (rawData[i].attributes[j].trait_type === trait_type && rawData[i].attributes[j].name === name) {
        traitCount++;
      }
    }
  }
  return (totalCount / traitCount).toFixed(2);
}

const getTraitsCountScore = (count) => {
  let traitsCount = 0;
  for (let i = 0; i < rawData.length; i++) {
    let traitCount = 0
    rawData[i].attributes.forEach((item, index) => {
      if (index < 3) return;
      if (item.value) {
        traitCount++;
      }
    })
    if (traitCount === count) {
      traitsCount++;
    }
  }
  return (totalCount / traitsCount).toFixed(2);
}

let rawData = [];
getRawData();

let csv = `Monkey #${separator}No. of traits${separator}Points${separator}`;

rawData[0].attributes.forEach((item) => {
  csv += `${item.trait_type}${separator}Points${separator}`;
})
csv += 'Total Score \n'

let sumTrait = 0

let rows = rawData.map((row, count) => {
  let returnString = `${count + 1}${separator}`;
  let traitCount = 0;
  let totalScore = 0;
  row.attributes.forEach((item, index) => {
    if (index < 3) return;
    if (item.value) {
      traitCount++;
    }
  })

  let traitsCountScore = getTraitsCountScore(traitCount);
  totalScore += +traitsCountScore;
  returnString += `${traitCount}${separator}${traitsCountScore}${separator}`

  row.attributes.forEach((item, index, array) => {
    let score = getScore(item.trait_type, item.name);
    totalScore += +score
    returnString += `${item.name}${separator}${score}${separator}`
  })
  sumTrait += traitCount
  returnString += totalScore.toFixed(2);
  return returnString;
}).join("\n")
csv += rows;

console.log("sum traits: " + sumTrait);

fs.writeFileSync("./csv/list.csv", csv);

