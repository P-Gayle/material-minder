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
    $sql = "SELECT * FROM users WHERE name=:name";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':name', $name);
    $stmt->execute();
    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($stmt->rowCount() != 0) {

        //to compare the password entered by the user and the hashed password stored in the database      
        if (!password_verify($password, $row['password'])) {
            $result = "Invalid password!";
        } 
        else {
            $result = array("message" => "Logged in successfully! Redirecting...", "userId" => $row['userId']);
        }
    } else {
        $result = "Invalid username!";
    }
} else {
    $result = "Both fields are required.";
}

$response[] = array("result" => $result);
echo json_encode($response);
?>