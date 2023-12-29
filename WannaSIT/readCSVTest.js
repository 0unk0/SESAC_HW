const fs = require("fs");

const csv = require("csv-parser");

function readCSV(headers) {
  const result = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream("./data/getOffCount.csv")
      .pipe(csv({ headers, skipLines: 1 }))
      .on("data", (data) => result.push(data))
      .on("end", () => {
        resolve(result);
      });
  });
}

async function main() {
  const headers = [
    "stationName",
    "dow",
    "b06",
    "h06",
    "h07",
    "h08",
    "h09",
    "h10",
    "h11",
    "h12",
    "h13",
    "h14",
    "h15",
    "h16",
    "h17",
    "h18",
    "h19",
    "h20",
    "h21",
    "h22",
    "h23",
    "a24",
  ];
  const result = await readCSV(headers);

  // result.forEach((item) => {
  //   console.log(item["'stationName'"]);
  // });
  const getOffCount = result.find((x) => x.stationName == "시청" && x.dow == "MON").h08;
  // console.log(Object.keys(getOffCount));
  console.log(getOffCount);
}

main();
