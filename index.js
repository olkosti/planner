const taskElement = document.querySelector(".task");
const buttonAdd = document.querySelector(".button__add");
const buttonClean = document.querySelector(".button__clean");
const taskList = document.querySelector(".task__list");
const notTask = document.querySelector(".not-task");
const nottaskContainer = document.querySelector(".nottask__container");

const pNotTask = document.createElement("p");
pNotTask.className = "not-task";
pNotTask.textContent = "Нет задач";
nottaskContainer.appendChild(pNotTask);

//Добавляем задачу в список задач при клике на кнопку
buttonAdd.addEventListener ('click', () => {
    let task = taskElement.value;    
    if (task.trim() !== "") {   
// добавляем разметку для добавления задачи в список
taskList
    pNotTask.classList.add('inactive');
    const  divTaskItem = document.createElement("div");
    divTaskItem.className = "task__item";
    const  pTaskText = document.createElement("p");
    pTaskText.className = "task__text";
    pTaskText.textContent = `${task}`;
    const  inputTaskCheckbox = document.createElement("input");
    inputTaskCheckbox.className = "task__checkbox";
    inputTaskCheckbox.type = "checkbox";
    divTaskItem.append(pTaskText);
    divTaskItem.append(inputTaskCheckbox);
    taskList.append(divTaskItem);

    document.querySelector(".task__form").reset(); // очистка формы после отправки
    buttonClean.disabled = false; // делаем кнопку активной
    buttonClean.className = "button__clean active";
    } 
});

buttonClean.addEventListener ('click', () => {
    taskList.innerHTML = "";
    pNotTask.classList.remove('inactive');    
    buttonClean.disabled = true;
    buttonClean.className = "button__clean";
});

