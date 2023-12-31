class Person {
    constructor(name, age, gender) {
        this.name = name;
        this.age = age;
        this.gender = gender;
    }

    greet() {
        console.log(`안녕, 나는 ${this.name}이고, ${this.age}살이야.`)
    }

    walk() {
        console.log(`${this.name}이(가) 걷고 있습니다.`);
    }

    eat() {
        console.log(`${this.name}이(가) 식사 중입니다.`);
    }
}

const person1 = new Person("철수", 25, "남성");
person1.greet();
person1.walk();
person1.eat();


class Manager extends Person{
    constructor(name, age, gender, jobtitle, salary, department ){
        super(name, age, gender);
        this.jobtitle = jobtitle;
        this.salary = salary;
        this.department = department;
    }

    assignTasks(){
        console.log(`${this.name} ${this.jobtitle}가 팀에 업무를 배분하고 있습니다.`);
    }
}

class Student extends Person{
    constructor(name, age, gender, id, major ){
        super(name, age, gender);
        this.id = id;
        this.major = major;
    }

    study(){
        console.log(`${this.name} 학생이 ${this.major}을 공부하고 있습니다.`);
    }
}

class Customer extends Person{
    constructor(name, age, gender, order_id, order){
        super(name, age, gender);
        this.order_id = order_id;
        this.order = order;
    }

    placeOrder(){
        console.log(`${this.name} 고객이 주문을 완료했습니다`);
    }
}

// Manager 객체 생성 및 활용
const manager1 = new Manager("영민", 35, "남성", "팀장", 60000, "개발팀");
manager1.assignTasks(); // ""영민 매니저가 팀에 업무를 배분하고 있습니다."" 출력

// Student 객체 생성 및 활용
const student1 = new Student("지연", 20, "여성", "2023001", "컴퓨터 공학");
student1.study(); // ""지연 학생이 컴퓨터 공학을 공부하고 있습니다."" 출력

// Customer 객체 생성 및 활용
const customer1 = new Customer("태식", 30, "남성", "C1001", ["주문1", "주문2"]);
customer1.placeOrder(); // ""태식 고객이 주문을 완료했습니다."" 출력
