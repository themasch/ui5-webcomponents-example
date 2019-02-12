import '@ui5/webcomponents/dist/Button'
import '@ui5/webcomponents/dist/TabContainer'
import '@ui5/webcomponents/dist/Tab'
import '@ui5/webcomponents/dist/Label'
import '@ui5/webcomponents/dist/Table'
import '@ui5/webcomponents/dist/TableRow'
import '@ui5/webcomponents/dist/TableCell'
import '@ui5/webcomponents/dist/TableColumn'
import '@ui5/webcomponents/dist/Input'
import '@ui5/webcomponents/dist/Toolbar'

const createInput = document.getElementById('create-task-input')
const createButton = document.getElementById('create-task-button')
const todoTable = document.getElementById('todo-table')
const doneTable = document.getElementById('done-table')
let maxId = 3

// register event handlers
createInput.addEventListener('submit', addTaskHandler, false)
createButton.addEventListener('press', addTaskHandler, false)
/// register this event handler on the table and check for buttons in the handler so we do not have to add a listener for every button
todoTable.addEventListener('press', globalTodoButtonHandler, false)

/**
 * event handler that adds a new task to the "to do" list
 */
function addTaskHandler () {
  const task = createInput.value
  const id = ++maxId
  insertTask(id, task)
  createInput.value = ''
}

/**
 * adds an entry to the list of "to do" entries
 * @param id
 * @param text
 */
function insertTask (id, text) {
  const html = `<ui5-table-row data-ui5-slot="rows" id="todo-item-row-${id}">
      <ui5-table-cell data-ui5-slot="cells">
          <span class="item-text">${text}</span>
      </ui5-table-cell>

      <ui5-table-cell data-ui5-slot="cells">
          <span>
              <ui5-button data-item-id="${id}" icon="sap-icon://delete" class="remove-button" type="Transparent"></ui5-button>
              <ui5-button data-item-id="${id}" icon="sap-icon://accept" class="done-button" type="Transparent"></ui5-button>
          </span>
      </ui5-table-cell>
  </ui5-table-row>`

  todoTable.insertAdjacentHTML('beforeend', html)
}

/**
 * adds an entry to the list of "done" entries
 * @param id
 * @param text
 */
function insertDoneTask (id, text) {
  const html = `<ui5-table-row data-ui5-slot="rows" id="todo-item-row-${id}">
      <ui5-table-cell data-ui5-slot="cells">
          <span class="item-text">${text}</span>
      </ui5-table-cell>
  </ui5-table-row>`

  doneTable.insertAdjacentHTML('beforeend', html)
}

/**
 * removes a task completely
 * @param id
 */
function deleteTaskItem (id) {
  const item = document.getElementById(`todo-item-row-${id}`)
  item.remove()
}

/**
 * moves a task from the "to do" list to the "done" list
 * @param id
 */
function moveTaskItemToDone (id) {
  const item = document.getElementById(`todo-item-row-${id}`)
  const text = item.querySelector('.item-text').innerText
  item.remove()
  insertDoneTask(id, text)
}

/**
 * Event handler that gets called for every press event on the "to do" tabel. It checks whether a "remove" or "done"
 * button was clicked and calls the relevant handler
 * @param event
 */
function globalTodoButtonHandler (event) {
  if (event.target.dataset.itemId === undefined) {
    return
  }

  const itemId = event.target.dataset.itemId
  if (event.target.classList.contains('remove-button')) {
    return deleteTaskItem(itemId)
  }
  if (event.target.classList.contains('done-button')) {
    return moveTaskItemToDone(itemId)
  }
}
