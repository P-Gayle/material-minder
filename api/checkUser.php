<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type");

include 'DbConnect.php';

$objDb = new DbConnect;
$conn = $objDb->connect();

$eData = file_get_contents("php://input");
$dData = json_decode($eData, true);

$name = $dData['name'];

$result = "";

if ($name != "") {
    $sql = "SELECT * FROM users WHERE name = :name";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':name', $name);
    $stmt->execute();

    if ($stmt->rowCount() != 0) {
        $result = "Username is already taken!";
    } else {
        $result = "";
    }
} else {
    $result = "";
}

$response[] = array("result" => $result);
echo json_encode($response);
