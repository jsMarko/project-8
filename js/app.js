let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`;
const gridContainer = document.querySelector(".grid-container");
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");

// Pass url info to fetch
fetch(urlAPI)
   .then((res) => res.json())
   .then((res) => res.results)
   .then(displayEmployess)
   .catch((err) => console.log(err));

function displayEmployess(employeeData) {
   employees = employeeData;

   //  STORE employee HTML
   let employeeHTML = ``;

   // loop and create employee html markup
   employees.forEach((employee, index) => {
      let name = employee.name;
      let email = employee.email;
      let city = employee.location.city;
      let picture = employee.picture;

      employeeHTML += `

      <div class="card" data-index="${index}">
      <img class="avatar" src="${picture.large}" />
      <div class="text-container">
      <h2 class="name">${name.first} ${name.last}</h2>
      <p class="email">${email}</p>
      <p class="address">${city}</p>
      </div>
      </div>
      `;
   });
   gridContainer.innerHTML = employeeHTML;
}

function displayModal(index) {
   let {
      name,
      dob,
      phone,
      email,
      location: { city, street, state, postcode },
      picture
   } = employees[index];
   let date = new Date(dob.date);
   const modalHTML = `
  <img class="modal-avatar" src="${picture.large}" />
  <div class="text-container">
  <h2 class="modal-name">${name.first} ${name.last}</h2>
  <p class="modal-email">${email}</p>
  <p class="modal-address">${city}</p>
  <hr />
  <p class="modal-phone">${phone}</p>
  <p class="modal-address">${street.number}, ${street.name}, ${state} ${postcode}</p>
  <p class="modal-birthday">Birthday:
  ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
  </div>
  `;
   overlay.classList.remove("hidden");
   modalContainer.innerHTML = modalHTML;
}

gridContainer.addEventListener("click", (e) => {
   if (e.target !== gridContainer) {
      const card = e.target.closest(".card");
      const index = card.getAttribute("data-index");
      displayModal(index);
   }
});

modalClose.addEventListener("click", () => {
   overlay.classList.add("hidden");
});

// ===================================
//           SEARCH FILTER
// ===================================

const searchValue = document.querySelector(".search");

searchValue.addEventListener("keyup", () => {
   let searchName = searchValue.value.toLowerCase();

   // COLLECT ALL CARDS THAT ARE DISPLAYED GIVING US A COLLECTION TO FILTER
   const cards = document.querySelectorAll(".card");

   // LOOP THROUGH COLLECTED CARDS
   cards.forEach((card, idx) => {
      const names = document.querySelectorAll(".name");
      let name = names[idx].textContent.toLowerCase();

      // NAMES ARE COLLECTED ... USING A CONDITIONAL SEE IF THERE IS A MATCH
      if (name.includes(searchName)) {
         cards[idx].style.display = "flex";
      } else {
         cards[idx].style.display = "none";
      }
   });
});

// ===========================================================
//          INCREMENT THROUGH USERS VIA ARROW BUTTONS
// ===========================================================
const left = document.querySelector(".left");
const right = document.querySelector(".right");

left.textContent = "<";
right.textContent = ">";

let modIdx = 0;

left.addEventListener("click", () => {
   if (modIdx > 0) {
      modIdx--;
      displayModal(modIdx);
   }
});
right.addEventListener("click", () => {
   if (modIdx < 11) {
      modIdx++;
      displayModal(modIdx);
   }
});
