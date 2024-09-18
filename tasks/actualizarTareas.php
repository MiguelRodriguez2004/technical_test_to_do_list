<?php
include '../connection/bd.php';

if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    try {
        
        parse_str(file_get_contents("php://input"), $_PUT);
        $id_tarea = $_PUT['id_tarea'];
        $id_estado = $_PUT['id_estado'];

        $sql = "UPDATE tareas SET id_estado = :id_estado WHERE id_tarea = :id_tarea";
        $stmt = $conn->prepare($sql);

        $stmt->bindParam(':id_estado', $id_estado, PDO::PARAM_INT);
        $stmt->bindParam(':id_tarea', $id_tarea, PDO::PARAM_INT);

        if ($stmt->execute()) {
            echo json_encode(["success" => true]);
        } else {
            echo json_encode(["success" => false]);
        }
        
    } catch (PDOException $e) {
        echo json_encode(["success" => false, "error" => $e->getMessage()]);
    }
}

$conn = null;

?>
