// select dom elements
const input = document.getElementById('todo-input')
const addbtn = document.getElementById('add-btn')
const list = document.getElementById('todo-list')

// try to load todo from saved storage
const saved = localStorage.getItem('todos');
const todos = saved? JSON.parse(saved): [];

function saveTodos(){
    //save current todos array to local storage 
    localStorage.setItem('todos',JSON.stringify(todos));

}

//creating a dom node for todo object and appending that node to the list.
function createTodoNode(todo, index){
    const li = document.createElement('li');

    //checkbox to toggle completion of an item in list
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = !!todo.completed;
    checkbox.addEventListener("change", ()=>{
        todo.completed = checkbox.checked;

        // adding a visual feedback: strike-through text decoration
        textspan.style.textDecoration = todo.completed? 'line-through' : "";
        saveTodos();
    })

    //Text of the Todo
    const textSpan = document.createElement("span");
    textSpan.textContent = todo.text;
    textSpan.style.margin = ' 2px 10px';
    if(todo.completed){
        textSpan.style.textDecoration = 'line-through';
    }

    //ADD: when double clicked on text span, prompt user to edit the text
    textSpan.addEventListener('dblclick', ()=>{
        const newText = prompt('Edit todo', todo.next);
        if(newText !== null){
            todo.text = newText.trim();
            textSpan.textConent = todo.text;
            saveTodos();
        }
    })
    



}
//adding a delete button to list

const delBtn = document.createElement('button')
delBtn.textContent = "Delete";
delBtn.addEventListener('click',()=>{
    todos.splice(index,1);
    render();
    saveTodos();
})

//render the whole todo list from todos array
function render(){
    list.innerHtml = '';

    //Recreating each item
    
}
