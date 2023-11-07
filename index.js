const taskElement = document.querySelector(".task");
const buttonAdd = document.querySelector(".button__add");
const buttonClean = document.querySelector(".button__clean");
const taskList = document.querySelector(".task__list");
const notTask = document.querySelector(".not-task");
const nottaskContainer = document.querySelector(".nottask__container");

//Функция создания элемента для задачи
function createTaskElement(task) {
    const  divTaskItem = document.createElement("div");
    divTaskItem.className = "task__item";

    const  pTaskText = document.createElement("p");
    pTaskText.className = "task__text";
    pTaskText.textContent = task.text;

    const  inputTaskCheckbox = document.createElement("input");
    inputTaskCheckbox.className = "task__checkbox";
    inputTaskCheckbox.type = "checkbox";
    inputTaskCheckbox.id = task.text;
    inputTaskCheckbox.checked = task.checked;
    divTaskItem.append(pTaskText);
    inputTaskCheckbox.addEventListener("change", toggleTaskState);

    divTaskItem.append(pTaskText);
    divTaskItem.append(inputTaskCheckbox);
    taskList.append(divTaskItem);
    return divTaskItem;
}

function toggleTaskState(event) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    const foundTaskIndex = tasks.findIndex(
        (task) => task.text === event.target.id
    );
    if (foundTaskIndex !== -1) {
        tasks[foundTaskIndex].checked = event.target.checked;
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
}

function addTask() {
    let taskText = taskElement.value;    
    if (taskText.trim() !== "") {
        
         // создаем объект задачи
        const task = {
            text: taskText,
            checked: false
        };   
        // добавляем задачу
        createTaskElement(task);

        document.querySelector(".task__form").reset(); // очистка формы после отправки
        buttonClean.disabled = false; // делаем кнопку активной
        buttonClean.classList.add('active');

        //сохраняем задачу в local storage
        let tasks = localStorage.getItem('tasks');
        if (tasks) {
            // если в Local Storage уже есть сохраненные задачи, добавляем новую задачу в массив
            tasks = JSON.parse(tasks);
            tasks.push(task);
        } else {
            // если в Local Storage еще нет сохраненных задач, создаем новый массив с задачей
            tasks = [task];
        }
        localStorage.setItem('tasks', JSON.stringify(tasks));
    } 
}

function loadTasks() {
    let tasks = localStorage.getItem("tasks");
    if (tasks) {
        // если есть сохраненные задачи, восстанавливаем список задач
        tasks = JSON.parse(tasks);
        tasks.forEach(task => {
            createTaskElement(task);

            document.querySelector(".task__form").reset(); // очистка формы после отправки
            buttonClean.disabled = false; // делаем кнопку активной
            buttonClean.classList.add('active');
        });
    }
}

function cleanTasks() {
    taskList.innerHTML = "";  
    buttonClean.disabled = true;
    buttonClean.classList.remove('active');

    //очистка local storage при нажатии кнопки Очистить
    window.localStorage.clear();
}

buttonAdd.addEventListener ('click', addTask);
window.addEventListener("load", loadTasks);
buttonClean.addEventListener ('click', cleanTasks);

