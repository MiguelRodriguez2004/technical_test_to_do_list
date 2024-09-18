<?php
require '../connection/bd.php';

if (isset($_GET['fechaInicio']) && isset($_GET['fechaFin'])) {
    $fechaInicio = $_GET['fechaInicio'];
    $fechaFin = $_GET['fechaFin'];

    $stmt = $conn->prepare(
        "SELECT t.id_tarea, t.descripcion, t.fecha_creacion, e.nombre AS estado
        FROM tareas t
        JOIN estados e ON t.id_estado = e.id_estado
        WHERE DATE(t.fecha_creacion) BETWEEN :fechaInicio AND :fechaFin"
    );

    $stmt->bindParam(':fechaInicio', $fechaInicio);
    $stmt->bindParam(':fechaFin', $fechaFin);
    $stmt->execute();
    $tareas = $stmt->fetchAll(PDO::FETCH_ASSOC);

    header('Content-Type: application/json');
    echo json_encode($tareas);
} else {
    echo json_encode([]);
}

$conn = null;
?>
