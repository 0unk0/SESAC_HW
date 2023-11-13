import { v4 as uuid } from "uuid";
import { generateAddress, generatedate } from "./HW10_common.js";

const today = new Date();
const surnameList = [
  "김",
  "이",
  "박",
  "최",
  "정",
  "강",
  "조",
  "윤",
  "장",
  "임",
  "한",
  "오",
  "서",
  "신",
  "권",
];
const firstnameListM = [
  "민준",
  "서준",
  "도윤",
  "예준",
  "시우",
  "하준",
  "지호",
  "주원",
  "지후",
  "준우",
  "준서",
  "도현",
  "건우",
  "현우",
  "우진",
  "지훈",
  "선우",
  "유준",
  "서진",
  "연우",
];
const firstnameListW = [
  "서윤",
  "서연",
  "지우",
  "서현",
  "하윤",
  "하은",
  "민서",
  "지유",
  "윤서",
  "채원",
  "수아",
  "지민",
  "지아",
  "지윤",
  "다은",
  "은서",
  "예은",
  "지안",
  "소율",
  "서아",
];

export class User {
  getUserTypeCSV() {
    return `${this.Id},${this.Name},${this.Gender},${this.Age},${this.Birthdate},${this.Address}`;
  }
  setUser() {
    this.Id = this.generateUserId();
    this.Name = this.generateUserName(this.Gender);
    this.Gender = this.generateUserGender();
    this.Age = this.generateUserAge();
    this.Birthdate = this.generateUserBirthdate(this.Age);
    this.Address = generateAddress();
  }

  generateUserId() {
    return uuid();
  }
  generateUserName(gender) {
    let surname = surnameList[Math.floor(Math.random() * surnameList.length)];
    let firstname = (gender === "Male")
        ? firstnameListM[Math.floor(Math.random() * firstnameListM.length)]
        : firstnameListW[Math.floor(Math.random() * firstnameListW.length)];
    return surname + firstname;
  }
  generateUserAge() {
    const minAge = 10;
    const maxAge = 45;
    return Math.floor(Math.random() * maxAge) + minAge;
  }
  generateUserBirthdate(age) {
    let year = today.getFullYear() - age + 1;
    let date = generatedate();
    return `${year}-${date}`;
  }
  generateUserGender() {
    return `${Math.random() < 0.5 ? "Male" : "Female"}`;
  }
}
