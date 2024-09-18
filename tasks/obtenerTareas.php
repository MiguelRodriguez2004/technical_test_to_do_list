<?php
include '../connection/bd.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    
    try {
        $sql = "SELECT t.id_tarea, t.descripcion, t.fecha_creacion, e.nombre AS estado
                FROM tareas t
                JOIN estados e ON t.id_estado = e.id_estado";
        
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        
        $tareas = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        echo json_encode($tareas);
        
    } catch (PDOException $e) {
        echo json_encode(["success" => false, "error" => $e->getMessage()]);
    }
}

$conn = null;

?>
