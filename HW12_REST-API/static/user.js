document.addEventListener("DOMContentLoaded", async () => {
  const form = document.getElementById("form");
  const username = document.getElementById("username");

  // 최초 로딩시 백엔드에 사용자 데이터 요청
  await updateTable();

  form.addEventListener("submit", async (ev) => {
    ev.preventDefault();

    const name = username.value;
    if (!name) {
      alert("이름을 입력하세요");
      return;
    }

    await POST(username, name);
  });
});

async function updateTable() {
  await fetch("/user")
    .then((response) => response.json())
    .then((users) => displayUsers(users))
    .catch((error) => console.log("사용자 정보 불러오기 실패: ", error));
}

function displayUsers(users) {
  const userTable = document.getElementById("userTable");
  userTable.innerHTML = "";

  if (Object.keys(users).length === 0) {
    const messageRow = document.createElement("div");
    messageRow.textContent = "등록된 사용자가 없습니다";
    userTable.appendChild(messageRow);
  } else {
    for (const key in users) {
      const row = document.createElement("div");
      row.innerHTML = `ID: ${key}, Name: ${users[key]}
                      <button onclick="modifyUser(${key})">수정</button>
                      <button onclick="removeUser(${key})">삭제</button>`;
      userTable.appendChild(row);
    }
  }
}

async function modifyUser(key) {
  const newname = prompt("수정할 이름을 입력하세요.");
  if (newname) {
    const response = await fetch(`/user/${key}`, {
      method: "PUT",
      header: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newname }),
    });
    if (response.ok) {
      await updateTable();
    } else {
      const errorMessage = await response.text();
      alert(`수정 실패: ${errorMessage}`);
    }
  }
}

async function removeUser(key) {
  const result = confirm("정말로 삭제하시겠습니까?");
  if (result) {
    const response = await fetch(`/user/${key}`, {
      method: "DELETE",
    });
    if (response.ok) {
      await updateTable();
    } else {
      const errorMessage = await response.text();
      alert(`삭제 실패: ${errorMessage}`);
    }
  }
}

async function POST(username, name) {
  try {
    const response = await fetch("/user", {
      method: "POST",
      header: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    if (response.ok) {
      alert("등록 성공");
      username.value = "";
      await updateTable();
    } else {
      const errorMessage = await response.text();
      alert(`등록 실패: ${errorMessage}`);
    }
  } catch (error) {
    console.error("등록 중 오류 발생: ", error);
    alert("등록 중 오류 발생");
  }
}
