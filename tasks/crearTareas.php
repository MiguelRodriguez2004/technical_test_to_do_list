<?php
include '../connection/bd.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    $descripcion = $_POST['descripcion'];

    try {
        
        $sql = "INSERT INTO tareas (descripcion, id_estado) VALUES (:descripcion, 1)";
        $stmt = $conn->prepare($sql);
        
        $stmt->bindParam(':descripcion', $descripcion);
        
        $stmt->execute();
        
        echo json_encode(["success" => true]);
        
    } catch (PDOException $e) {
        echo json_encode(["success" => false, "error" => $e->getMessage()]);
    }
}

$conn = null;
?>
