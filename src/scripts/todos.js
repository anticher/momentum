export const todosButton = document.querySelector('.todos-button')
export const todosInputElement = document.querySelector('.todos-input')
export const todosOutputElement = document.querySelector('.todos-output')
const todosWindowElement = document.querySelector('.todos-window')
export const todosOverlayElement = document.querySelector('.todos-overlay')


export let todosCounter = 1

export function translateTodo(lang) {

    if (lang === 'russian') {
        todosInputElement.placeholder = 'Новое дело'
        todosButton.textContent = 'Задачи'
    } else {
        todosInputElement.placeholder = 'New Todo'
        todosButton.textContent = 'Todo'
    }
    
}

export function onTodosButtonClick() {
    todosWindowElement.classList.toggle('active')
    todosOverlayElement.classList.toggle('active')
}

export function createTodoItem(text, status) {
    const div = document.createElement('div')
    div.classList.add('todos-item')
    div.id = `todosItem${todosCounter}`
    const input = document.createElement('input')
    input.type = 'checkbox'
    input.classList.add('todos-checkbox')
    input.id = `todosCheckbox${todosCounter}`
    input.name = 'checkTodo'
    if (status === 'true') {
        input.checked = true
    } else {
        input.checked = false
    }
    input.addEventListener('click', onTodoCheckboxClick)
    const label = document.createElement('label')
    label.classList.add('todos-label')
    label.htmlFor = `todosCheckbox${todosCounter}`
    label.textContent = text
    const button = document.createElement('button')
    button.textContent = 'delete'
    button.classList.add('todos-delete')
    button.id = `todosDelete${todosCounter}`
    button.type = 'button'
    let deleteTodo = deleteTodoItem(todosCounter)
    button.addEventListener('click', () => {
        deleteTodo()
    })
    div.append(input)
    div.append(label)
    div.append(button)
    todosOutputElement.append(div)
    setTodoItemToLocalStorage(todosCounter, text)
    if (status === 'true') {
        setTodoItemStatusToLocalStorage(todosCounter, true)
    } else {
        setTodoItemStatusToLocalStorage(todosCounter, false)
    }
    todosCounter++
}


function onTodoCheckboxClick() {
    let id = this.id.split('')
        .splice(13)
        .join('')
    if (this.checked === true) {
        setTodoItemStatusToLocalStorage(id, true)
    } else {
        setTodoItemStatusToLocalStorage(id, false)
    }
}


function deleteTodoItem(id) {
    return function () {
        const item = document.querySelector(`#todosItem${id}`)
        item.remove()
        removeTodoItemFromLocalStorage(id)
    }

}



function setTodoItemToLocalStorage(id, text) {
    localStorage.setItem(`todoItem${id}`, text)
}

function setTodoItemStatusToLocalStorage(id, status) {
    localStorage.setItem(`todoItemStatus${id}`, status)
}

function removeTodoItemFromLocalStorage(id) {
    localStorage.removeItem(`todoItem${id}`)
    localStorage.removeItem(`todoItemStatus${id}`)
}