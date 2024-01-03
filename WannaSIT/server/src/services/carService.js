// 랭킹 계산 함수
function calculateRanking(routeDetail) {
  const countByCar = gatherCountByCar(routeDetail);
  const minCountByCar = findMinCountByCar(countByCar);

  // 우선순위 : minCount  > index(역)
  sortArray(minCountByCar);
  console.log(minCountByCar);

  const carRank = transformForResponse(minCountByCar);
  return carRank;
}

// 경로까지 칸 별 예측 인원 모으는 함수
function gatherCountByCar(routeData) {
  return Array.from({ length: routeData[0].length }, (_, index) => routeData.map((station) => station[index].estimated_count));
}

// 칸 별 착석 가능성 높은 역 찾기
function findMinCountByCar(countByCar) {
  const minCountByCar = [];

  countByCar.forEach((car, index) => {
    let carNum = index + 1;
    let minCount = Math.min(...car);
    let stationIndex = car.indexOf(minCount);

    minCountByCar.push({ carNum, stationIndex, minCount });
  });

  return minCountByCar;
}

function sortArray(array) {
  array.sort((a, b) => {
    // 출발역에서 앉을 수 있다면 0순위
    if (a.stationIndex === 0 && a.minCount <= 34) {
      return -1;
    } else {
      if (a.minCount === b.minCount) {
        return a.stationIndex - b.stationIndex;
      }
      return a.minCount - b.minCount;
    }
  });
}

function transformForResponse(minCountByCar) {
  return minCountByCar.map(({ carNum, stationIndex, minCount }) => {
    const isSeatAvailable = minCount <= 34 ? 1 : 0;
    return {
      carNum,
      stationIndex,
      isSeatAvailable,
    };
  });
}
// // 랭킹 계산 함수
// function calculateRanking(routeDetail) {
//   const countByCar = gatherCountByCar(routeDetail);
//   const { canSit, cannotSit } = findMinCountByCar(countByCar);

//   // 앉을 수 있는 경우 우선순위 : index(역) > minCount | 앉을 수 없는 경우 우선순위 : minCount  > index(역)
//   sortArray(canSit, "index", "minCount");
//   sortArray(cannotSit, "minCount", "index");

//   const carRank = [...canSit, ...cannotSit];
//   console.log(carRank);

//   return carRank.map(({ carNum, stationIndex }) => ({ carNum, stationIndex }));
// }

// // 경로까지 칸 별 예측 인원 모으는 함수
// function gatherCountByCar(routeData) {
//   return Array.from({ length: routeData[0].length }, (_, index) => routeData.map((station) => station[index].estimated_count));
// }

// // 분류 방법: 앉을 수 O -> 앉을 수 X
// function findMinCountByCar(countByCar) {
//   const STANDARD_VALUE = 34;

//   const canSit = [];
//   const cannotSit = [];

//   countByCar.forEach((car, index) => {
//     let carNum = index + 1;

//     let stationIndex = car.findIndex((count) => count <= STANDARD_VALUE);
//     let minCount;

//     // 앉을 수 있음
//     if (stationIndex >= 0) {
//       minCount = car[stationIndex];
//       canSit.push({ carNum, stationIndex, minCount });
//     } else {
//       // 앉을 수 없음 => 최소값
//       minCount = Math.min(...car);
//       stationIndex = car.indexOf(minCount);
//       cannotSit.push({ carNum, stationIndex, minCount });
//     }
//   });

//   return { canSit, cannotSit };
// }

// // 우선순위에 따라 정렬
// function sortArray(array, primary, secondary) {
//   array.sort((a, b) => {
//     if (a[primary] === b[primary]) {
//       return a[secondary] - b[secondary];
//     }
//     return a[primary] - b[primary];
//   });
// }

export { calculateRanking };
