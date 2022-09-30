const addBtn = document.querySelector(".add-btn");
const cardsSection = document.getElementById("cards-section");
const listInput = document.getElementById("list-input");
const error = document.querySelector(".error");
const localDatabase = window.localStorage;

showList();

// all listeners start.

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  // console.log(listInput.value);
  add(listInput.value);
});

// all listeners end.

// program functionalities start.

function add(title) {
  const data = {
    id: Date.now(),
    title: title,
    flag: false,
  };

  const allData = getItem("todo");
  // console.log([...allData, data]);
  if (allData) {
    setItem("todo", [data, ...allData]);
  } else {
    setItem("todo", [data]);
  }
  listInput.value = "";
  error.innerText = "";
  showList();
}

function showList() {
  const list = getItem("todo");

  cardsSection.innerHTML = "";

  if (list) {
    list.forEach((v, indx) => {
      console.log(v);
      const card = `
      <div class="card card-${indx}">
          <input type="checkbox" />
          <p>${v.title}</p>
          <button onclick="showSideList(${indx})">. . .</button>
          <div class='side-options side-options-${indx} '>
              <p>Edit</p>
              <p>Delete</p>
          </div>
      </div>
    `;
      cardsSection.innerHTML += card;
    });
  }
}

function showSideList(indx) {
  console.log(indx);
}

// program functionalities end.

// localStorage functionalities start

function setItem(key, data) {
  localDatabase.setItem(key, JSON.stringify(data));
}
function getItem(key) {
  const allData = JSON.parse(localDatabase.getItem(key));

  return allData;
}

// localStorage functionalities end
