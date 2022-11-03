const main = document.querySelector('.main');
const doubleBtn = document.querySelector('.double');
const addUserBtn = document.querySelector('.add-user');
const showMillionBtn = document.querySelector('.show-millionaires');
const sortBtn = document.querySelector('.sort');
const calculateBtn = document.querySelector('.calculate-wealth');

let persons = [];

// Update DOM
const formatMoney = (num) => num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

const updateDOM = (datas = persons) => {
  // reset main div
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';
  datas.forEach((data) => {
    const div = document.createElement('div');
    div.classList.add('person');
    div.innerHTML = `<strong>${data.name}</strong> $${formatMoney(data.money)}`;
    main.appendChild(div);
  });
};

const addData = (user) => {
  persons.push(user);
  updateDOM();
};

// double everyone's money
const doubleMoney = () => {
  persons = persons.map((person) => {
    person.money *= 2;
    return person;
  });
  updateDOM();
};

// sort by richest
const sortByRichest = () => {
  // descending order
  persons.sort((a, b) => b.money - a.money);

  updateDOM();
};

// calculate total money
const calculateWealth = () => {
  const wealth = formatMoney(persons.reduce((acc, user) => (acc += user.money), 0));

  const wealthEl = document.createElement('div');
  wealthEl.innerHTML = `<h3>Total Wealth : <strong>$${wealth}</strong></h3>`;
  main.appendChild(wealthEl);
};

// filter only millionaires
const showMillionaires = () => {
  const oneMillion = 1000000;
  persons = persons.filter((person) => person.money > oneMillion);
  updateDOM();
};
// fetch random user and add money
const getRandomUser = async () => {
  const res = await fetch('https://randomuser.me/api');
  const data = await res.json();

  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };

  addData(newUser);
};

getRandomUser();
getRandomUser();
getRandomUser();

// Listeners
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionBtn.addEventListener('click', showMillionaires);
calculateBtn.addEventListener('click', calculateWealth);
