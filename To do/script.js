// select dom elements
const input = document.getElementById('todo-input')
const addBtn = document.getElementById('add-btn')
const list = document.getElementById('todo-list')

// try to load todo from saved storage
const saved = localStorage.getItem('todos');
const todos = saved ? JSON.parse(saved) : [];

function saveTodos() {
    //save current todos array to local storage 
    localStorage.setItem('todos', JSON.stringify(todos));

}

//creating a dom node for todo object and appending that node to the list.
function createTodoNode(todo, index) {
    const li = document.createElement('li');

    //checkbox to toggle completion of an item in list
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = !!todo.completed;
    checkbox.addEventListener("change", () => {
        todo.completed = checkbox.checked;

        // adding a visual feedback: strike-through text decoration
        textSpan.style.textDecoration = todo.completed ? 'line-through' : "";
        saveTodos();
    })

    //Text of the Todo
    const textSpan = document.createElement("span");
    textSpan.textContent = todo.text;
    textSpan.style.margin = ' 2px 10px';
    if (todo.completed) {
        textSpan.style.textDecoration = 'line-through';
    }

    //ADD: when double clicked on text span, prompt user to edit the text
    textSpan.addEventListener('dblclick', () => {
        const newText = prompt('Edit todo', todo.text);
        if (newText !== null) {
            todo.text = newText.trim();
            textSpan.textContent = todo.text;
            saveTodos();
            // render();
        }
    })

    //adding a delete button to list

    const delBtn = document.createElement('button');
    delBtn.className = "delete-btn";
    delBtn.textContent = "Delete";
    delBtn.addEventListener('click', () => {
        todos.splice(index, 1);
        render();
        saveTodos();

    })

    li.appendChild(checkbox);
    li.appendChild(textSpan);
    li.appendChild(delBtn);
    return li;

}


//render the whole todo list from todos array
function render() {
    list.innerHTML = '';

    //Recreating each item
    todos.forEach((todo, index) => {
        const node = createTodoNode(todo, index);
        list.appendChild(node);
    });

}

// ADD: add button to add a task into todo list
function addTodo(){
    const text = input.value.trim();
    if(!text){
        // alert("Please enter a valid todo item.");
        return;
    }
    
    //push a new todo object
    todos.push({text: text, completed: false});
    input.value = '';
    render()
    saveTodos()
}

addBtn.addEventListener("click", addTodo)
input.addEventListener('keydown', (e)=>{
    if(e.key == 'Enter'){
        addTodo();
    }
})
render();
