<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

//to fix the cors issue-when making requests from different domains
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-headers: *");
header("Access-Control-Allow-Methods: *");

include 'DbConnect.php';

$objDb = new DbConnect;
$conn = $objDb->connect();

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {

    case "GET":
        $sql = "SELECT * FROM supplies";
        // explode splits the path at /
        $path= explode('/', $_SERVER['REQUEST_URI']); 
        // print_r($path);
        // $path[4] is id
        if (isset($path[4]) && is_numeric($path[4])){
            $sql .= " WHERE id = :id";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $path[4]);
            $stmt->execute();
            $supplies = $stmt->fetch(PDO::FETCH_ASSOC);
        } else {  
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $supplies = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
        echo json_encode($supplies);
        break;

    case "POST":
        $item = json_decode(file_get_contents('php://input'));
        $sql =
        "INSERT INTO supplies(id, name, price, type, location, colour, supplier, total_purchased, created_at)
        VALUES(null, :name, :price, :type, :location, :colour, :supplier, :total_purchased, :created_at)";
        $stmt = $conn->prepare($sql);
        $created_at = date('Y-m-d');
        //the below statements won't work unless json_decode $item above
        $stmt->bindParam(':name', $item->name);
        $stmt->bindParam(':price', $item->price);
        $stmt->bindParam(':type', $item->type);
        $stmt->bindParam(':location', $item->location);
        $stmt->bindParam(':colour', $item->colour);
        $stmt->bindParam(':supplier', $item->supplier);
        $stmt->bindParam(':total_purchased', $item->total_purchased);
        $stmt->bindParam(':created_at', $created_at);

        if($stmt->execute()){
            $response = ['status' => 1, 'message' => 'Record created successfully'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to create record'];
        }
        echo json_encode($response);
        break;

    case "PUT":
        $item = json_decode(file_get_contents('php://input'));
        $sql =
        "UPDATE supplies SET name=:name, price=:price, type=:type, location=:location, colour=:colour, supplier=:supplier, updated_at=:updated_at WHERE id = :id";
        $stmt = $conn->prepare($sql);
        $updated_at = date('Y-m-d');

        $stmt->bindParam(':id', $item->id);
        $stmt->bindParam(':name', $item->name);
        $stmt->bindParam(':price', $item->price);
        $stmt->bindParam(':type', $item->type);
        $stmt->bindParam(':location', $item->location);
        $stmt->bindParam(':colour', $item->colour);
        $stmt->bindParam(':supplier', $item->supplier);
        $stmt->bindParam(':updated_at', $updated_at);

        if ($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record updated successfully'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to update record'];
        }

        // Accumulate the total_purchased and total_used fields
        if ($response['status'] == 1) {
            $selectSql = "SELECT total_purchased, total_used FROM supplies WHERE id = :id";
            $selectStmt = $conn->prepare($selectSql);
            $selectStmt->bindParam(':id', $item->id);
            $selectStmt->execute();
            $supplyData = $selectStmt->fetch(PDO::FETCH_ASSOC);

            $totalPurchased = $supplyData['total_purchased'];
            $totalUsed = $supplyData['total_used'];

            $totalPurchased += $item->total_purchased;
            $totalUsed += $item->total_used;

            $updateAccumulatedSql = "UPDATE supplies SET total_purchased = :total_purchased, total_used = :total_used WHERE id = :id";
            $updateAccumulatedStmt = $conn->prepare($updateAccumulatedSql);
            $updateAccumulatedStmt->bindParam(':total_purchased', $totalPurchased);
            $updateAccumulatedStmt->bindParam(':total_used', $totalUsed);
            $updateAccumulatedStmt->bindParam(':id', $item->id);

            if ($updateAccumulatedStmt->execute()) {
                $response = ['status' => 1, 'message' => 'Record updated successfully'];
            } else {
                $response = ['status' => 0, 'message' => 'Failed to update record'];
            }
        }

        echo json_encode($response);
        break;

        case "DELETE":
        $sql = "DELETE FROM supplies WHERE id = :id";
        $path = explode('/', $_SERVER['REQUEST_URI']);
       
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $path[4]);

    if ($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record deleted successfully'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to delete record'];
        }
        echo json_encode($response);
        break;
    }