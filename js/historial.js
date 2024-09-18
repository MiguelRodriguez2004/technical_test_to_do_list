$(document).ready(function () {
    $('#formHistorial').on('submit', function (e) {
        e.preventDefault();

        const fechaInicio = $('#fechaInicio').val();
        const fechaFin = $('#fechaFin').val();

        if (fechaInicio && fechaFin) {
            fetch(`tasks/descargarHistorial.php?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`)
                .then(response => response.json())
                .then(data => {
                    if (data.length === 0) {
                        Swal.fire({
                            icon: 'error',
                            title: 'No se encontraron tareas en el rango de fechas seleccionado.',
                            showConfirmButton: false,
                            timer: 1500
                        });
                    } else {
                        const headers = ["ID Tarea", "Descripción", "Fecha de Creación", "Estado"];

                        const formattedData = data.map(item => ({
                            "ID Tarea": item.id_tarea,
                            "Descripción": item.descripcion,
                            "Fecha de Creación": item.fecha_creacion,
                            "Estado": item.estado
                        }));

                        const ws = XLSX.utils.json_to_sheet(formattedData, { header: headers });
                        const wb = XLSX.utils.book_new();
                        XLSX.utils.book_append_sheet(wb, ws, "Historial");

                        XLSX.writeFile(wb, 'historial_tareas.xlsx');
                    }
                })
                .catch(error => {
                    console.error('Error al obtener datos:', error);
                });
        } else {
            alert('Por favor selecciona ambas fechas.');
        }
    });
});
