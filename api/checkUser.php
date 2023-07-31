<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type, X-Requested-With, Origin");
header("Access-Control-Allow-Credentials: true");

include 'DbConnect.php';

$objDb = new DbConnect;
$conn = $objDb->connect();

$eData = file_get_contents("php://input");
if (!$eData) {
    die('No input data provided');
}
$dData = json_decode($eData, true);
if (!$dData) {
    die('Could not decode input data');
}

$name = $dData['name'];
if (!$name) {
    die('Name not provided');
}

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
