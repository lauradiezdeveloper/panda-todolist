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

// FUNCIONALIDAD CLIMA
// Obtener el elemento del DOM para mostrar el clima
const climaSection = document.getElementById("clima-section");

// Función asincrónica para mostrar el clima actual
async function mostrarClimaActual() {
    const apiKey = "eafa208347d7481f912104854230806";
    const location = "Spain";
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=no&lang=es`;

    const response = await fetch(url);
    const data = await response.json();

    // Obtener los valores relevantes del clima
    const tempC = data.current.temp_c;
    const conditionText = data.current.condition.text;
    const conditionIcon = data.current.condition.icon;

    // Actualizar el contenido en el DOM 
    climaSection.innerHTML = `<p>Clima actual: ${tempC}°C, ${conditionText} en ${location}</p> <img src="https:${conditionIcon}" alt="Icono de clima">`;
}



// Eventos que se ejecuta cuando el DOM se ha cargado completamente
document.addEventListener("DOMContentLoaded", () => {
    // Mostrar las tareas en el DOM al cargar la página
    mostrarTareasEnDOM();
    mostrarClimaActual();
});



// FUNCIONALIDAD BORRAR TAREAS
// Función para borrar una tarea
function borrarTarea(e) {
    const tareaId = parseInt(e.target.dataset.id);

    Swal.fire({
        title: '¿Estás seguro?',
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#283618',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar tarea'
    }).then((result) => {
        if (result.isConfirmed) {
            todasTareas = todasTareas.filter((tarea) => tarea.id !== tareaId);
            localStorage.setItem("todasTareas", JSON.stringify(todasTareas));
            mostrarTareasEnDOM();
            Toastify({
                text: "La tarea ha sido eliminada",
                className: "success",
                style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)"
                }
            }).showToast();
        }
    });
}

// Evento para borrar todas las tareas
const borrarTodasBtn = document.getElementById("borrarTodasBtn");
borrarTodasBtn.addEventListener("click", () => {
    if (todasTareas.length === 0) {
        Toastify({
            text: "No hay tareas para eliminar",
            className: "info",
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)"
            }
        }).showToast();
    } else {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#283618',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar todas las tareas'
        }).then((result) => {
            if (result.isConfirmed) {
                todasTareas = [];
                localStorage.clear();
                mostrarTareasEnDOM();
                Toastify({
                    text: "Todas las tareas han sido eliminadas",
                    className: "success",
                    style: {
                        background: "linear-gradient(to right, #00b09b, #96c93d)"
                    }
                }).showToast();
            }
        });
    }
});