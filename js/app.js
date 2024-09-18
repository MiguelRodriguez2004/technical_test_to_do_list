document.addEventListener('DOMContentLoaded', function () {
    cargarTareas();

    document.getElementById('formCrearTarea').addEventListener('submit', function (e) {
        e.preventDefault();
        const descripcion = document.getElementById('descripcionTarea').value;

        fetch('tasks/crearTareas.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({ descripcion })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                
                Swal.fire({
                    icon: 'success',
                    title: 'Tarea creada exitosamente',
                    showConfirmButton: false,
                    timer: 1500
                });
                
                cargarTareas();
                document.getElementById('descripcionTarea').value = '';
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error al crear la tarea',
                    text: 'Inténtalo nuevamente'
                });
            }
        });
    });
});

function cargarTareas() {
    fetch('tasks/obtenerTareas.php')
        .then(response => response.json())
        .then(tareas => {
            const tabla = document.getElementById('tablaTareas');
            tabla.innerHTML = '';

            tareas.forEach(tarea => {
                const fila = document.createElement('tr');

                fila.innerHTML = `
                    <td>${tarea.id_tarea}</td>
                    <td>${tarea.descripcion}</td>
                    <td>${tarea.fecha_creacion}</td>
                    <td>
                        <select class="form-select" onchange="actualizarEstado(${tarea.id_tarea}, this.value)">
                            <option value="1" ${tarea.estado === 'Pendiente' ? 'selected' : ''}>Pendiente</option>
                            <option value="2" ${tarea.estado === 'Realizada' ? 'selected' : ''}>Realizada</option>
                            <option value="3" ${tarea.estado === 'Cancelada' ? 'selected' : ''}>Cancelada</option>
                        </select>
                    </td>
                    <td>
                        <button class="btn btn-danger" onclick="confirmarEliminarTarea(${tarea.id_tarea})">Eliminar Tarea</button>
                    </td>
                `;
                tabla.appendChild(fila);
            });
        });
}

function actualizarEstado(id_tarea, id_estado) {
    fetch('tasks/actualizarTareas.php', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ id_tarea, id_estado })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            Swal.fire({
                icon: 'success',
                title: 'Estado actualizado con éxito',
                showConfirmButton: false,
                timer: 1500
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error al actualizar el estado',
                text: 'Inténtalo nuevamente'
            });
        }
    });
}

function confirmarEliminarTarea(id_tarea) {
    
    Swal.fire({
        title: '¿Estás seguro?',
        text: "No podrás revertir esta acción",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            eliminarTarea(id_tarea);
        }
    });
}

function eliminarTarea(id_tarea) {
    fetch('tasks/eliminarTareas.php', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ id_tarea })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            Swal.fire({
                icon: 'success',
                title: 'Tarea eliminada con éxito',
                showConfirmButton: false,
                timer: 1500
            });
            cargarTareas();
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error al eliminar la tarea',
                text: 'Inténtalo nuevamente'
            });
        }
    });
}
