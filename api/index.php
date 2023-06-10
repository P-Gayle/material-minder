<?php

//to fix the cors issue
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-headers: *");

include 'DbConnect.php';

$objDb = new DbConnect;
$conn = $objDb->connect();

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case "POST":
        $item = json_decode(file_get_contents('php://input'));
        $sql =
        "INSERT INTO supplies(id, name, type, quantity, location, colour, supplier, created_at)
        VALUES(null, :name, :type, :quantity, :location, :colour, :supplier, :created_at)";
        $stmt = $conn->prepare($sql);
        $created_at = date('Y-m-d');
        //the below statements won't work unless json_decode $item above
        $stmt->bindparam(':name', $item->name);
        $stmt->bindparam(':type', $item->type);
        $stmt->bindparam(':quantity', $item->quantity);
        $stmt->bindparam(':location', $item->location);
        $stmt->bindparam(':colour', $item->colour);
        $stmt->bindparam(':supplier', $item->supplier);
        $stmt->bindparam(':created_at', $created_at);

        if($stmt->execute()){
            $response = ['status' => 1, 'message' => 'Record created successfully'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to create record'];
        }
        echo json_encode($response);
        break;
}