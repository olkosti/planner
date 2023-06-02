const taskElement = document.querySelector(".task");
const buttonAdd = document.querySelector(".button__add");
const buttonClean = document.querySelector(".button__clean");
const taskList = document.querySelector(".task__list");
const notTask = document.querySelector(".not-task");


//Добавляем задачу в список задач при клике на кнопку
buttonAdd.addEventListener ('click', () => {
    let task = taskElement.value;
    if (task !== "") {   
// добавляем разметку для добавления задачи в список
    notTask.remove();
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
    taskList.innerHTML = `<p class="not-task">Нет задач</p>`;
    buttonClean.disabled = true;
    buttonClean.className = "button__clean";
});