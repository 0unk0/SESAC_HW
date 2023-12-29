const fs = require("fs");

let getOffCountByTime = 305283; // csv 하차 인원 임시
let getOffByTime = JSON.parse(fs.readFileSync("./testData/getOffTrimmed.json"));

// 시간대 별 => 칸 별 혼잡도 => 칸 별 현재 인원
getOffByTime.forEach((time) => {
  const getOffByCar = [];

  // 칸 별로 하차 비율 모으기
  time.getOffCarRate.forEach((arr) => {
    const gefOffRate = arr.split(",");

    gefOffRate.forEach((arr, index) => {
      getOffByCar[index] = getOffByCar[index] || [];
      getOffByCar[index].push(parseInt(arr));
    });
  });

  // 칸 별 하차 비율 평균값
  const avg = getOffByCar.map((arr) => {
    const length = arr.length;
    return (arr.reduce((a, b) => a + b) / length / 100).toFixed(2);
  });

  // 칸 별 하차 인원
  const getOffCount = Math.round(getOffCountByTime / 6 / 2);
  const getOffCarCount = avg.map((percentage) => Math.round(percentage * getOffCount));

  // JSON에 추가
  // time.getOffCarCount = getOffCarCount;
  time.getOffCarRate = getOffCarCount;
});

console.log(getOffByTime);
