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
$password = $dData['password'];

$result = "";

if ($name != "" && $password != "") {
    $sql = "INSERT INTO users(name, password) 
    VALUES(:name, :password)";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':name', $name);
    $stmt->bindParam(':password', $password);

    if ($stmt->execute()) {
        $result = "You have registered successfully! Please sign in to continue...";
    } else {
        $result = "";
    }
} else {
    $result = "";
}

$response[] = array("result" => $result);
echo json_encode($response);
?>
