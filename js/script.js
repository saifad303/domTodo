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
  if (title) {
    const data = {
      id: Date.now(),
      title: title,
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
  } else {
    alert("write something as title.");
  }
}

function showList() {
  const list = getItem("todo");

  cardsSection.innerHTML = "";

  if (list) {
    list.forEach((v, indx) => {
      console.log(v);
      const card = `
      <div class='list-item item-${indx}'>
        <div class="card card-${indx}">
          <input type="checkbox" />
          <p class='title title-${indx}'>${v.title}</p>
          <input type='text' class='edit-input edit-input-${indx}' id='e-${indx}'/>
          <button onclick="toggleSideOptions(${indx})" class='side-button' id='side-button-${indx}'>. . .</button>
          <button class='cancel-btn cancel-btn-${indx}' onclick='editCancel(${indx})'>X</button>
        </div>
        <div class='ed ed-${indx}'>
          <div class='edit-delete'>
            <button class='edit' onclick='editItem(${indx})'>Edit</button>
            <button class='delete' onclick='deleteItem()'>Delete</button>
          </div>
        </div>
        <div class='edit-submit edit-submit-${indx}'>
          <div class='done-section done-${indx}'>
            <button class='done-btn done-btn-${indx}' onclick='editDone(${indx},${v.id})'>Done</button>
          </div>
        </div>
      </div>
    `;
      cardsSection.innerHTML += card;
    });
  }
}

/* <p>${v.title}</p> */

function toggleSideOptions(indx) {
  document.querySelector(`.ed-${indx}`).classList.toggle("ed");
}

// Delete Item

function deleteItem(indx) {
  console.log("Delete item");
  const allData = getItem("todo");
  console.log(allData);
  allData.splice(indx, 1);
  // console.log(allData);
  setItem("todo", allData);
  showList();
}

// Edit item

function editItem(indx) {
  const title = document.querySelector(`.title-${indx}`).innerText;
  document.querySelector(`.title-${indx}`).classList.add("dNone");
  document.querySelector(`.edit-input-${indx}`).removeAttribute("class");
  document.getElementById(`e-${indx}`).value = title;
  document.getElementById(`side-button-${indx}`).style.display = "none";
  document.querySelector(`.cancel-btn-${indx}`).style.display = "inline-block";
  document.querySelector(`.ed-${indx}`).classList.add(`dNone`);
  document.querySelector(`.edit-submit-${indx}`).style.display = "block";
}

function editCancel(indx) {
  // document.querySelector(`.edit-submit-${indx}`).style.display = "none";
  // document.querySelector(`.cancel-btn-${indx}`).style.display = "none";
  // document.getElementById(`side-button-${indx}`).style.display = "inline-block";
  // document
  //   .getElementById(`e-${indx}`)
  //   .setAttribute("class", `edit-input edit-input-${indx}`);
  // document.querySelector(`.ed-${indx}`).classList.replace("dBlock", `dNone`);
  // document.querySelector(`.title-${indx}`).classList.replace("dBlock", "dNone");

  showList();
}

function editDone(indx, id) {
  const editedValue = document.getElementById(`e-${indx}`).value;
  document.getElementById(`e-${indx}`).setAttribute("class", "dNone");
  document.querySelector(`.title-${indx}`).classList.replace("dNone", "dBlock");
  document.querySelector(`.title-${indx}`).innerText = editedValue;

  console.log("id = ", id);

  const data = {
    id: id,
    title: editedValue,
  };

  editData("todo", data);

  document.getElementById(`side-button-${indx}`).style.display = "inline-block";
  document.querySelector(`.ed-${indx}`).classList.replace(`dNone`, "ed");
  document
    .getElementById(`e-${indx}`)
    .setAttribute("class", `edit-input edit-input-${indx}`);
  document.querySelector(`.cancel-btn-${indx}`).style.display = "none";
  document.querySelector(`.edit-submit-${indx}`).style.display = "none";
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

function editData(key, data) {
  const allData = getItem(key);
  const newData = allData.map((item) => {
    if (item.id === data.id) {
      return {
        id: data.id,
        title: data.title,
      };
    }
    return item;
  });

  setItem("todo", newData);
}

// localStorage functionalities end
