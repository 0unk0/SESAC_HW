import { v4 as uuid } from "uuid";
import { generateAddress } from "./HW10_common.js";

const typeList = ["스타벅스", "투썸플레이스", "이디야", "커피빈"];
const nameList = {
  강남구: "강남",
  동작구: "상도",
  송파구: "잠실",
  중구: "중앙로",
  달서구: "이월드",
  수영구: "광안리",
  해운대구: "해운대",
  연수구: "송도",
  부평구: "부평",
};

export class Store {
  getStoreTypeCSV() {
    return `${this.Id},${this.Name},${this.Type},${this.Address}`;
  }
  setStore() {
    this.Id = this.generateStoreId();
    this.Address = this.generateStoreAddress();
    this.Type = this.generateType(typeList);
    this.Name = this.Type + this.generateStoreName(this.Address);
  }

  generateStoreId() {
    return uuid();
  }
  generateStoreAddress() {
    return generateAddress();
  }
  generateType(typeList) {
    return typeList[Math.floor(Math.random() * typeList.length)];
  }
  generateStoreName(addr) {
    let gu = addr.split(" ")[1];
    let name = nameList[gu];
    let num = Math.floor(Math.random() * 10) + 1;
    return `${name} ${num}호점`;
  }
}
