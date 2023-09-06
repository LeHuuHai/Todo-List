// ------------------------------------------------------------------------
function showTaskList(){
    const localStorageData = localStorage.getItem("taskList");
    const taskList = JSON.parse(localStorageData) || [];
    let content = '';
    taskList.forEach((element, index) => {
        let classdiv = "";
        // state == "checked" (task completed), add class "checked"
        if(element.state == "checked"){
            classdiv = "task checked";
        // state == "" (task incomplete)
        }else{
            classdiv ="task";
        }
        content += `<li class="task_box" id="${index}">
                        <div class="${classdiv}" onclick="setState(this, ${index})">
                            <i class="fa-solid fa-check"></i>
                            <p>${element.content}</p>
                        </div>
                        <button class="remove_btn btn" onclick="removeATask(${index})">
                            <i class="fa-solid fa-xmark"></i>
                        </button>
                    </li>`
    });
    document.getElementById("list_task").innerHTML = content;
}
// create a task when click "add button"
function addTask(s){
    if(s!=""){
        const localStorageData = localStorage.getItem("taskList");
        const taskList = JSON.parse(localStorageData) || [];
        taskList.push({content: s, state: ""});
        localStorage.setItem("taskList", JSON.stringify(taskList));
        showTaskList();
    } 
}
// clear task list when click "remove all task"
function removeAllTask(){
    localStorage.clear();
    showTaskList();
}
// remove task when click "remove completed tasks button"
function removeCompletedTask(){
    const localStorageData = localStorage.getItem("taskList");
    const taskList = JSON.parse(localStorageData);
    const taskListTmp = []
    taskList.forEach((element,index) =>{
        if(element.state != "checked"){
            taskListTmp.push(element)
        }
    })
    localStorage.setItem("taskList", JSON.stringify(taskListTmp));
    showTaskList();
}
// remove a task when click "X button"
function removeATask(index){
    const localStorageData = localStorage.getItem("taskList");
    const taskList = JSON.parse(localStorageData);
    taskList.splice(index,1);
    localStorage.setItem("taskList", JSON.stringify(taskList));
    showTaskList();
}
// change class, set state for taskList's element
function setState(element, index){
    element.classList.toggle("checked");
    const localStorageData = localStorage.getItem("taskList");
    const taskList = JSON.parse(localStorageData);
    if(taskList[index].state == ""){
        taskList[index].state = "checked";
    }else if(taskList[index].state == "checked"){
        taskList[index].state = "";
    }
    localStorage.setItem("taskList", JSON.stringify(taskList));
}

// ------------------------------------------------------------------------
// show task when reload
document.addEventListener("DOMContentLoaded", function(){
    showTaskList();
})
// create a task when click "add button"
document.getElementById("add_btn").addEventListener("click", function(){
    let value = document.getElementById("input_task").value;
    addTask(value);
    document.getElementById("input_task").value = "";
})
// clear task list when click "remove all task"
document.getElementById("clear").addEventListener("click", function(){
    removeAllTask();
})
// remove task when click "remove completed tasks button"
document.getElementById("completed").addEventListener("click", function(){
    removeCompletedTask();
})
