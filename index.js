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


function addTask() {
    let task = taskElement.value;    
    if (task.trim() !== "") {   
        // добавляем разметку для добавления задачи в список
        pNotTask.classList.add('inactive');
        const  divTaskItem = document.createElement("div");
        divTaskItem.className = "task__item";
        const  pTaskText = document.createElement("p");
        pTaskText.className = "task__text";
        pTaskText.textContent = task;
        const  inputTaskCheckbox = document.createElement("input");
        inputTaskCheckbox.className = "task__checkbox";
        inputTaskCheckbox.type = "checkbox";
        divTaskItem.append(pTaskText);
        divTaskItem.append(inputTaskCheckbox);
        taskList.append(divTaskItem);

        document.querySelector(".task__form").reset(); // очистка формы после отправки
        buttonClean.disabled = false; // делаем кнопку активной
        buttonClean.className = "button__clean active";

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
            pNotTask.classList.add('inactive');
            const  divTaskItem = document.createElement("div");
            divTaskItem.className = "task__item";
            const  pTaskText = document.createElement("p");
            pTaskText.className = "task__text";
            pTaskText.textContent = task;
            const  inputTaskCheckbox = document.createElement("input");
            inputTaskCheckbox.className = "task__checkbox";
            inputTaskCheckbox.type = "checkbox";
            divTaskItem.append(pTaskText);
            divTaskItem.append(inputTaskCheckbox);
            taskList.append(divTaskItem);

            document.querySelector(".task__form").reset(); // очистка формы после отправки
            buttonClean.disabled = false; // делаем кнопку активной
            buttonClean.className = "button__clean active";
        });
    }
}

function cleanTasks() {
    taskList.innerHTML = "";
    pNotTask.classList.remove('inactive');    
    buttonClean.disabled = true;
    buttonClean.className = "button__clean";

    //очистка local storage при нажатии кнопки Очистить
    window.localStorage.clear();
}

buttonAdd.addEventListener ('click', addTask);
window.addEventListener("load", loadTasks);
buttonClean.addEventListener ('click', cleanTasks);

