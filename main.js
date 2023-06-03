// FUNCIONALIDAD: CREAR TAREA
// Declarando el array global que contiene los objetos
let todasTareas = [];

// Obteniendo las referencias de los elementos del HTML
const formulario = document.getElementById("form");
const todoList = document.getElementById("allTask")

// Añadir un evento y obtener valores al ejecutar el formulario
formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    // Obteniendo los valores del formulario
    const nombreTarea = document.getElementById("nombreTarea").value;
    const prioridad = document.getElementById("prioridad").value;

    // Crear una nueva tarea
    const nuevaTarea = {
        id: todasTareas.length + 1,
        nombreTarea: nombreTarea,
        prioridad: prioridad
    }

    // Guardar la nueva tarea en el array
    todasTareas.push(nuevaTarea);

    // Guardar el array actualizado en el localStorage
    localStorage.setItem("todasTareas", JSON.stringify(todasTareas));

    // Mostrar todas las tareas en el DOM
    mostrarTareasEnDOM();

    // Limpiar campos del formulario
    document.getElementById("nombreTarea").value = "";
    document.getElementById("prioridad").value = "";
});

// Función para mostrar todas las tareas en el DOM
function mostrarTareasEnDOM() {
    // Obtener las tareas del localStorage
    const tareasStorage = localStorage.getItem("todasTareas");

    if (tareasStorage) {
        todasTareas = JSON.parse(tareasStorage)
    } else {
        todasTareas = [];
    }

    // Crear uns tabla en HTML con todas las tareas
    const tablaHTML = `
    <table>
        <thead>
            <tr>
                <th>Tarea</th>
                <th>Prioridad</th>
            </tr>
        </thead>
        <tbody>
            ${todasTareas.map((tarea) =>
                `<tr>
                    <td>${tarea.nombreTarea}</td>
                    <td>${tarea.prioridad}</td>
                    <td>
                        <button class="borrar" data-id="${tarea.id}">Borrar</button>
                    </td>
                </tr>`
            ).join("")}
        </tbody>
    </table>
    `;

    // Mostrar la tabla en el DOM
    document.getElementById("contenedor").innerHTML = tablaHTML;

    // Agregar evento borrar tarea a los botones de borrado
    const botonesBorrar = document.getElementsByClassName("borrar");
    for (const boton of botonesBorrar) {
        boton.addEventListener("click", borrarTarea);
    }
};

// Evento que se ejecuta cuando el DOM se ha cargado completamente
document.addEventListener("DOMContentLoaded", () => {
    // Mostrar las tareas en el DOM al cargar la página
    mostrarTareasEnDOM();
});



// FUNCIONALIDAD BORRAR TAREAS
// Función para borrar una tarea
function borrarTarea(e) {
    const tareaId = parseInt(e.target.dataset.id);
    todasTareas = todasTareas.filter((tarea) => tarea.id !== tareaId);
    localStorage.setItem("todasTareas", JSON.stringify(todasTareas));
    mostrarTareasEnDOM();
}

// Evento para borrar todas las tareas
const borrarTodasBtn = document.getElementById("borrarTodasBtn");
borrarTodasBtn.addEventListener("click", () => {
    todasTareas = [];
    localStorage.clear();
    mostrarTareasEnDOM();
});

