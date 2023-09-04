/*TIPS: *No olvides utilizar el almacenamiento local (localStorage)
 para que las tareas queden guardadas en caso
 de que la aplicación se cierre.*/ //!
let itemsArray = localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")): []

 function crearTarea(nombreTarea){
  const objetoTarea = {
    thing:nombreTarea,
    checked: false,
    priority: "Alta",
    category: "Casa",
    
  }

     itemsArray.push(objetoTarea)
     localStorage.setItem("items", JSON.stringify(itemsArray))
     location.reload()
     
  }
 



function displayFooter() {
  let page = `      
     
      <footer class="footer">
       
        <span class="todo-count"><strong>${countPend()}</strong> pendiente(s)</span>
        
        <ul class="filters">
          <li>
            <a onclick="showAll() "class="selected filtro" href="#/">Todos</a>
          </li>
          <li>
            <a onclick="showPend()" class="filtro" href="#/active">Pendientes</a>
          </li>
          <li>
            <a onclick="showComp()" class="filtro" href="#/completed">Completados</a>
          </li>
        </ul>
        <button onclick="borrarCompletados()" id="clear-completed" class="clear-completed">Borrar completados</button>
      </footer>
    `
  document.querySelector('.footer').innerHTML = page
}

// Codigo DOM #1
document.querySelector('.new-todo').addEventListener('keyup', (event) => {
  if (
    event.keyCode === 13 &&
    document.querySelector('.new-todo').value.length > 0
  ) {
    const item = document.querySelector('.new-todo')
    //Llamar la función que crea la tarea.**
    crearTarea(item.value)
  }
});




// Codigo DOM #2
// este fragmento permite conservar el estado del checkbox (true o false) en el localStorage

function activateCheckboxListeners() {
  const checkboxes = document.querySelectorAll('.toggle')
  checkboxes.forEach((ch, i) => {
    ch.addEventListener('click', () => {
      itemsArray[i].checked = ch.checked
      localStorage.setItem('items', JSON.stringify(itemsArray))
      location.reload()
    })
  })
}



function displayItems() {
  let items = ''
  for (let i = 0; i < itemsArray.length; i++) {
    items += `    <div class="item">
                    <div class="input-controller">
                      <input class="toggle" type="checkbox" id="check_${i}" ${
      itemsArray[i].checked ? 'checked' : ''
    } />
                      <textarea disabled>${itemsArray[i].thing}</textarea>
                      <div class="edit-controller">
                        <div>
                          Prioridad
                          <select id="priority">
                            <option ${
                              itemsArray[i].priority === 'Alta'
                                ? 'selected'
                                : ''
                            }>Alta</option>
                            <option ${
                              itemsArray[i].priority === 'Media'
                                ? 'selected'
                                : ''
                            }>Media</option> 
                            <option ${
                              itemsArray[i].priority === 'Baja'
                                ? 'selected'
                                : ''
                            }>Baja</option> 
                          </select>
                        </div>
                        <div>
                          Categorías
                          <select id="category">
                              <option ${
                                itemsArray[i].category === 'Casa'
                                  ? 'selected'
                                  : ''
                              }>Casa</option> 
                              <option ${
                                itemsArray[i].category === 'Trabajo'
                                  ? 'selected'
                                  : ''
                              }>Trabajo</option> 
                              <option ${
                                itemsArray[i].category === 'Emprendimiento'
                                  ? 'selected'
                                  : ''
                              }>Emprendimiento</option> 
                            </select>
                        </div>
                        <i class="fa-solid fa-pen-to-square editBtn"></i>
                        <i class="fa-solid fa-x deleteBtn"></i>
                      </div>
                    </div>
                    <div class="update-controller">
                    <button class="saveBtn">Save</button>
                     <button class="cancelBtn">Cancel</button>
                    </div>
                  </div>`
  }
  document.querySelector('.todo-list').innerHTML = items
  activateCheckboxListeners()
  activateDeleteListeners()
  activateEditListeners()
  activateSaveListeners()
  activateCancelListeners()
}
//El sistema debe permitir EDITAR o MODIFICAR una tarea.

//El sistema debe permitir ELIMINAR una tarea.

//El sistema debe permitir AGREGAR una o varias tareas tarea.

//El sistema deber permitir MARCAR una tarea como completada

//El sistema debe permitir dar diferentes PRIORIDADES a las tareas
//EJEMPLO:

//Sacar la basura - Prioridad: media

//El sistema debe permitir visualizar tareas por CATEGORÍAS o ETIQUETAS
//EJEMPLO:

/*Categorías disponibles: PENDIENTE, COMPLETADO o TODASE.T.C */

//Recordar llamar las funciones displayItems() y displayFooter() para mostrar
//las tareas en pantalla

displayItems()
displayFooter()
