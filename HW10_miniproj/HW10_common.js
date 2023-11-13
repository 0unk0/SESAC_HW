import { readFileSync, writeFileSync } from "node:fs";

// export function getRandomNumber(min, max){
//     return  Math.floor(Math.random() * max) + min;
// }

// export function getRandomElement(array){
//     return  array[Math.floor(Math.random() * array.length)];
// }

// 주소(user, store)
export function generateAddress() {
  const cities = ["서울", "대전", "대구", "부산", "인천"];
  const gu_su = ["강남구", "동작구", "송파구"];
  const gu_dj = ["중구"];
  const gu_dg = ["달서구"];
  const gu_bs = ["수영구", "해운대구"];
  const gu_ic = ["연수구", "부평구"];

  let city_num = Math.floor(Math.random() * cities.length);
  let gu = "";
  let road = Math.random() < 0.5 ? "길" : "로";
  let addr1 = Math.floor(Math.random() * 90) + 1;
  let addr2 = Math.floor(Math.random() * 90) + 1;

  switch (city_num) {
    case 0:
      gu = gu_su[Math.floor(Math.random() * gu_su.length)];
      break;
    case 1:
      gu = gu_dj[Math.floor(Math.random() * gu_dj.length)];
      break;
    case 2:
      gu = gu_dg[Math.floor(Math.random() * gu_dg.length)];
      break;
    case 3:
      gu = gu_bs[Math.floor(Math.random() * gu_bs.length)];
      break;
    case 4:
      gu = gu_ic[Math.floor(Math.random() * gu_ic.length)];
      break;
  }
  return `${cities[city_num]} ${gu} ${addr1}${road} ${addr2}`;
}

// 날짜(user, order)
export function generatedate() {
  let month = Math.floor(Math.random() * 12) + 1;
  let day = [1, 3, 5, 7, 8, 10, 12].includes(month)
    ? Math.floor(Math.random() * 31) + 1
    : [4, 6, 9, 11].includes(month)
    ? Math.floor(Math.random() * 30) + 1
    : Math.floor(Math.random() * 28) + 1;

  return `${String(month).padStart(2, 0)}-${String(day).padStart(2, 0)}`;
}

// readCSV -> ID(order, orderItem)
export function readId(csvName) {
  const CSVData = readFileSync(csvName, "utf-8", (err, data) => {
    let fileName = csvName.substring(6);
    if (err) {
      console.log(`${fileName}_ID 읽기 실패`);
    }
  });
  const IdData = CSVData.split("\n");
  IdData.shift();

  const Id = IdData.map((IdData) => IdData.split(",")[0]);
  return Id;
}

export function getId(IdName) {
  return IdName[Math.floor(Math.random() * IdName.length)];
}

export function writeCSV(csvName, data) {
  writeFileSync("./csv/" + csvName, data, "utf-8", (err) => {
    if (err) {
      console.log(`${csvName} 파일 작성 실패`);
    }
  });
}