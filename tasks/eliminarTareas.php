<?php
include '../connection/bd.php';

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    try {
        
        parse_str(file_get_contents("php://input"), $_DELETE);
        $id_tarea = $_DELETE['id_tarea'];

        $sql = "DELETE FROM tareas WHERE id_tarea = :id_tarea";
        $stmt = $conn->prepare($sql);

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
