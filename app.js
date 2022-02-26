//selectors
const todoInput= document.querySelector('.todo-input');
const todoButton= document.querySelector('.todo-button');
const todoList= document.querySelector('.todo-list');
const filterOption=document.querySelector(".filter-todo");

//event listeners
document.addEventListener('DOMContentLoaded',getTodos);
todoButton.addEventListener('click',addTask);
todoList.addEventListener('click',deleteCheck);
filterOption.addEventListener('click',filterTodo);

//functions
function addTask(event)
{
    //prevent form from submitting
    event.preventDefault();
    //TodoDiv
    const todoDiv=document.createElement("div");
    todoDiv.classList.add("todo");
    //Create List
    const newTodo=document.createElement('li');
    newTodo.innerText=todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    //save todo to local storage
    saveLocalTodos(todoInput.value);
    //complete button
    const completedButton=document.createElement('button');
    completedButton.innerHTML='<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //delete button
    const trashButton=document.createElement('button');
    trashButton.innerHTML='<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //append to list
    todoList.appendChild(todoDiv);
    //delete
    todoInput.value="";
}

function deleteCheck(e)
{
    const item=e.target;
    //delete todo
    if(item.classList[0]==="trash-btn")
    {
        const todo=item.parentElement;
        removeTodos(todo);
        todo.remove();

    }
    //check if task is done
    if(item.classList[0]==="complete-btn")
    {
        const todo=item.parentElement;
        todo.classList.toggle("completed");
    }
}

function filterTodo(e){
    const todos=todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display="flex";
                break;
            case "completed":
                if(todo.classList.contains("completed"))
                {
                    todo.style.display="flex";
                }
                else{
                    todo.style.display="none";
                }
                break;
            case "notcompleted":
                if(!todo.classList.contains("completed"))
                {
                    todo.style.display="flex";
                }
                else{
                    todo.style.display="none";
                }
                break;
        }
    });
}

function saveLocalTodos(todo){
    //did i already mention the task??
    let todos;
    if(localStorage.getItem("todos")===null){
        todos=[];
    }
    else{
        todos=JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos",JSON.stringify(todos));
    
}

function getTodos(){
    console.log("works perfectly");
    let todos;
    if(localStorage.getItem("todos")===null){
        todos=[];
    }
    else{
        todos=JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo){
    const todoDiv=document.createElement("div");
    todoDiv.classList.add("todo");
    //Create List
    const newTodo=document.createElement('li');
    newTodo.innerText=todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

  
    //complete button
    const completedButton=document.createElement('button');
    completedButton.innerHTML='<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //delete button
    const trashButton=document.createElement('button');
    trashButton.innerHTML='<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //append to list
    todoList.appendChild(todoDiv);
    });
}

function removeTodos(todo){
let todos;
if(localStorage.getItem("todos")===null){
    todos=[];
}
else{
    todos=JSON.parse(localStorage.getItem("todos"));
}
const todoIndex=todo.children[0].innerText;
todos.splice(todos.indexOf(todoIndex),1);
localStorage.setItem("todos",JSON.stringify(todos));
}
//const todos=["applepie","banoffe pie","donut","caramel cake"];
//const donutIndex=todos.indexOf("donut");
//todos.splice(donutIndex,1);
//console.log(todos);
