

const homeworkContainer = document.querySelector('#homework-container');

// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');

// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');

// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');

// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');

// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

let listOfItems = {};

filterNameInput.addEventListener('keyup', function () {
  // здесь можно обработать нажатия на клавиши внутри текстового поля для фильтрации cookie
  updateTable();
});

addButton.addEventListener('click', () => {
  // здесь можно обработать нажатие на кнопку "добавить cookie"

  if (addNameInput.value && addValueInput.value) {

    listOfItems[addNameInput.value] = addValueInput.value;

    setCookie(addNameInput.value, addValueInput.value)

    addNameInput.value = '';
    addValueInput.value = '';

    console.log(listOfItems, 'listOfItems');

    updateTable();
  }
});

const setCookie = (name, value, days = 7) => {
  // do nothing if either no name or value provided
  if (!name || !value) { // если имя и значение не тру - выходим
    return;
  }

  const date = new Date();

  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);

  document.cookie = `${name}=${value};expires=${date.toGMTString()};`; // добавляем куки
};

const getlistOfCookies = () => {
  let list = document.cookie.split('; ').reduce((prev, cur) => {
    const [name, value] = cur.split('=');
    prev[name] = value;
    return prev;
  }, {});
  return list;
};

// проверяем, содержит ли имя кука то, что введено в фильтр
const searchCookies = (fullName) => fullName.toLowerCase().includes(filterNameInput.value.toLowerCase()); // где?.includes(что?)


const updateTable = () => {
  const cookies = getlistOfCookies(); // получаем список куков
  console.log(cookies, 'listOfCookies')

  listTable.innerHTML = ''; // заменяем содержимое элемента КАЖДЫЙ РАЗ когда кликаем,
  // то есть весь список таблицы прорисовывается с нуля каждый раз, иначе при клике
  // список будет отрисовываться с уже существующими строками + новая

  Object.keys(cookies) // получаем массив ключей (имен)
    .forEach(name => { // проходим по массиву имен
      const value = cookies[name]; // присваиваем value значение имени/значение cookies[name]
      const row = createDom(name, value)

      // ФИЛЬТРАЦИЯ
      if (searchCookies(name) || searchCookies(value)) { // если в name есть значение filterNameInput 
        // ИЛИ если в value есть filterNameInput
        listTable.appendChild(row); //аппендим новую строку
      }

      if (!name && !value) { // если значений в списке нет
        listTable.removeChild(row); // удаляем строку, иначе будет висеть undefined с кнопкой  "удалить"
      }
    });
};

const createDom = (name, value) => {
  const row = document.createElement('tr');
  let nameField = document.createElement('th');
  let valueField = document.createElement('th');
  const deleteButton = document.createElement('button');

  row.appendChild(nameField);
  row.appendChild(valueField);
  row.appendChild(deleteButton);

  nameField.innerText = name;
  valueField.innerText = value;
  deleteButton.innerText = 'Удалить';

  deleteButton.addEventListener('click', () => {
    console.log(name, value);
    setCookie(name, value, -1); // удаляем куку с помощью -1
    updateTable(); // прорисовывем таблицу
  });

  return row;
}

updateTable()


