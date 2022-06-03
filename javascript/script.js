let tasksList = [];
let task = document.getElementById("task_discription");
let date = document.getElementById("task_date");
let time = document.getElementById("task_time");


function validationFunction() {
    var isText = task.value;
    var isDate = date.value;
    var isTime = time.value;

    if (isText == "" || isText == null) {
        alert("Task discription is missing");
        isText = false;
    } else {
        isText = true;
    }

    if (isDate == "" || isDate == null || isNaN(Date.parse(isDate))) {
        alert("Invaled Date format / Data is missing");
        isDate = false;
    } else {
        isDate = true;
    }
    var isTimeVal = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(isTime);
    if (isTime == "" || isTime == null || isTimeVal == false) {
        alert("Invaled Time format / Time is missing");
        isTime = false;
    } else
        isTime = true;

    if (isText == true && isDate == true && isTime == true) {
        inputFunction(task.value, date.value, time.value);
    }
}

function inputFunction(task, date, time) {
    let newtTask = {
        task_dis: task,
        task_date: date,
        task_time: time,
        task_status: "On Bording",
    };
    tasksList.push(newtTask);
    createtable(newtTask, tasksList.length);
    set_local_storage();
}

function createtable(task, idx) {

    let table = document.getElementById("datadisplay");
    let commontr = document.createElement("tr");
    commontr.setAttribute("id", idx);

    let task_dis_td = document.createElement("td");
    let task_dis_label = document.createElement("label");

    let task_date_td = document.createElement("td");
    let task_date_date = document.createElement("label");

    let task_time_td = document.createElement("td");
    let task_time_time = document.createElement("label");

    let select_td = document.createElement("td")
    let task_status_select = document.createElement("select");
    let task_status1_option = document.createElement("option");
    let task_status2_option = document.createElement("option");
    task_status_select.setAttribute("index", idx)

    task_dis_label.textContent = task.task_dis;
    task_dis_td.appendChild(task_dis_label);
    commontr.appendChild(task_dis_td);
    table.appendChild(commontr);

    task_date_date.textContent = task.task_date;
    task_date_td.appendChild(task_date_date);
    commontr.appendChild(task_date_td);
    table.appendChild(commontr);

    task_time_time.textContent = task.task_time;
    task_time_td.appendChild(task_time_time);
    commontr.appendChild(task_time_td);
    table.appendChild(commontr);

    task_status1_option.textContent = ("On Bording");
    task_status2_option.textContent = ("Done");
    task_status_select.appendChild(task_status1_option);
    task_status_select.appendChild(task_status2_option);
    select_td.appendChild(task_status_select);
    commontr.appendChild(select_td);
    table.appendChild(commontr);

    if (task.task_status == "Done") {
        task_status2_option.setAttribute("selected", "selected");
        commontr.setAttribute("class", 'done')
    }

    task_status_select.addEventListener('change', function () {
        let val = task_status_select.value;
        let selectIndex = task_status_select.getAttribute("index");
        let isDone = val == "Done";
        setDoneStyle(selectIndex, isDone);
        tasksList[selectIndex].task_status = val;
        set_local_storage();
    })
}
function setDoneStyle(rowID, isDone) {
    let raw = document.getElementById(rowID);
    if (isDone) {
        raw.className = "done";
    }
    else {
        raw.className = "onbording";
    }
}

function set_local_storage() {    // uplode to local storage ;
    localStorage.setItem("taskData", JSON.stringify(tasksList));
}

function initialData() {
    getLocalData();
    for (let i = 0; i < tasksList.length; i++) {
        createtable(tasksList[i], i);
    }
}
function getLocalData() { // check if there is a data in local storage and downlode it;
    tasksList = [];
    if (localStorage.getItem("taskData")) {
        tasksList = JSON.parse(localStorage.getItem("taskData"));
    }
    return tasksList;
}

document.getElementById("cleardata").addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});

document.getElementById("Resetdate").addEventListener("click", function () {
    date.value = "";
});
document.getElementById("Resettime").addEventListener("click", function () {
    time.value = "";
});
document.getElementById("cleartext").addEventListener("click", function () {
    task.value = "";
});

initialData();







