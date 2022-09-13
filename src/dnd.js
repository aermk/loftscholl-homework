/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');

/*
 Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 Функция НЕ должна добавлять элемент на страницу. На страницу элемент добавляется отдельно
 
 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
 */
function createDiv() {
  const div = document.createElement('div');

  div.classList.add('draggable-div');
  div.setAttribute('draggable', true);
  div.setAttribute('data-item', 1)

  div.style.background = 'red';
  div.style.position = "absolute";
  div.style.top = '10px';
  div.style.left = '10px';
  div.style.width = '100px'
  div.style.height = '100px'

  return homeworkContainer.appendChild(div);
}

/*
 Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop
 
 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
   addListeners(newDiv);
 */


function addListeners(target) {

  function onDrag({ movementX, movementY }) {
    let getStyle = window.getComputedStyle(target);
    console.log(target, 'target')
    let left = parseInt(getStyle.left);
    let top = parseInt(getStyle.top);
    target.style.left = `${left + movementX}px`
    target.style.top = `${top + movementY}px`;
    console.log(target.style.left);
    console.log(target.style.top);
  }


  target.addEventListener('mousedown', () => { // dragstart?
    document.addEventListener('mousemove', onDrag) //dragover?
  })
  target.addEventListener('mouseup', () => { //drop?
    document.removeEventListener('mousemove', onDrag)
  })

  target.ondragstart = function () {
    return false;
  };

}

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function () {
  // создать новый div
  const div = createDiv();

  // добавить на страницу
  homeworkContainer.appendChild(div);
  // назначить обработчики событий мыши для реализации D&D
  addListeners(div);
  // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
  // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export {
  createDiv
};