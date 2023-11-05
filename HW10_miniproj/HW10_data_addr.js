const cities = ['서울', '대전', '대구', '부산', '인천'];
const gu_su = ['강남구', '동작구', '송파구'];
const gu_dj = ['중구'];
const gu_dg = ['달서구'];
const gu_bs = ['수영구' , '해운대구'];
const gu_ic = ['연수구', '부평구']

export function generateAddress(){
    let city_num = Math.floor(Math.random() * cities.length);
    let gu="";
    let road = Math.random() < 0.5 ? "길" : "로";
    let addr1 = Math.floor(Math.random() * 90)+1;
    let addr2 = Math.floor(Math.random() * 90)+1;

    switch(city_num){
        case 0:
            gu = gu_su[Math.floor(Math.random()*gu_su.length)];
            break;
        case 1:
            gu = gu_dj[Math.floor(Math.random()*gu_dj.length)];
            break;
        case 2:
            gu = gu_dg[Math.floor(Math.random()*gu_dg.length)];
            break;
        case 3:
            gu = gu_bs[Math.floor(Math.random()*gu_bs.length)];
            break;
        case 4:
            gu = gu_ic[Math.floor(Math.random()*gu_ic.length)];
            break;
    }
    return `${cities[city_num]} ${gu} ${addr1}${road} ${addr2}`;
}