document.addEventListener('DOMContentLoaded',()=>{
  const todoInput = document.getElementById("todo-input");
  const addTaskButton = document.getElementById("add-task-btn");
  const AddtoList = document.getElementById("todo-list");

  let tasks =JSON.parse(localStorage.getItem("tasks")) || []

  tasks.forEach(task => Render(task));

  addTaskButton.addEventListener('click',()=>{
    const inputTask = todoInput.value.trim();
    if(inputTask==="") return;

    const newTask = {
      id:Date.now(),
      text:inputTask,
      completed:false,
    }

    tasks.push(newTask);
    saveTasks();
    Render(newTask);
    todoInput.value=""; //clear input
    console.log(tasks);
  })

  function Render(task){
    const li=document.createElement('li');
    li.setAttribute('data-id',task.id)
    if(task.completed==true) li.classList.add('completed');
    li.innerHTML=`<span>${task.text}</span>
    <button>delete</button>
    `;
    li.addEventListener('click',(event)=>{
      if(event.target.tagName==='BUTTON') return;
      task.completed=!task.completed;
      li.classList.toggle('completed');
      saveTasks();
    })

    li.querySelector('button').addEventListener('click',(event)=>{
      event.stopPropagation();
      tasks=tasks.filter(t=>t.id!=task.id);
      li.remove();
      saveTasks();
    })

    AddtoList.appendChild(li);
  }

  function saveTasks(){
    localStorage.setItem('tasks',JSON.stringify(tasks));
  }
})