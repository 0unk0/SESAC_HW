const fs = require("fs");

let congestionByTime = JSON.parse(fs.readFileSync("./testData/congestionTrimmed.json"));

// 시간대 별 => 칸 별 혼잡도 => 칸 별 현재 인원
congestionByTime.forEach((time) => {
  const congestionByCar = [];

  // 칸 별로 혼잡도 모으기
  time.congestionCar.forEach((arr) => {
    const congestion = arr.split(",");

    congestion.forEach((arr, index) => {
      congestionByCar[index] = congestionByCar[index] || [];
      congestionByCar[index].push(parseInt(arr));
    });
  });

  // 칸 별 혼잡도 중앙값
  const medians = congestionByCar.map((arr) => {
    const sortedCongestion = arr.sort((a, b) => a - b);

    const length = sortedCongestion.length;
    const middleIndex = Math.floor(length / 2);

    if (length % 2 === 0) {
      return (sortedCongestion[middleIndex - 1] + sortedCongestion[middleIndex]) / 2;
    } else {
      return sortedCongestion[middleIndex];
    }
  });

  // 칸 별 인원
  const multiplier = 1.6;
  const currentCount = medians.map((percentage) => Math.round(percentage * multiplier));

  // JSON에 추가s
  time.currentCount = currentCount;
});

console.log(congestionByTime);
