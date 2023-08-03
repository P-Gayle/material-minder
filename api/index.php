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
     
        // $path[4] is id
        if (isset($path[4]) && is_numeric($path[4])){
            $sql .= " WHERE id = :id";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $path[4]);
            $stmt->execute();
            $supplies = $stmt->fetch(PDO::FETCH_ASSOC);
        } elseif (isset($_GET['userId'])) {
        $userId = $_GET['userId'];
        $sql .= " WHERE userId = :userId";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':userId', $userId);
        $stmt->execute();
        $supplies = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
        echo json_encode($supplies);
        break;

    case "POST":
      
        //to handle the PUT and DELETE requests that were changed to POST
        
        $operation = $_GET['operation'] ?? '';

        switch ($operation) {
            case 'edit':
                $item = json_decode(file_get_contents('php://input'));
                $sql = "UPDATE supplies SET name=:name, price=:price, size=:size, type=:type, location=:location, colour=:colour, supplier=:supplier, notes=:notes, updated_at=:updated_at WHERE id = :id";
                $stmt = $conn->prepare($sql);
                $updated_at = date('Y-m-d');

                $stmt->bindParam(':id', $item->id);
                $stmt->bindParam(':name', $item->name);
                $stmt->bindParam(':price', $item->price);
                $stmt->bindParam(':size', $item->size);
                $stmt->bindParam(':type', $item->type);
                $stmt->bindParam(':location', $item->location);
                $stmt->bindParam(':colour', $item->colour);
                $stmt->bindParam(':supplier', $item->supplier);
                $stmt->bindParam(':notes', $item->notes);
                $stmt->bindParam(':updated_at', $updated_at);

                if ($stmt->execute()) {
                    $response = ['status' => 1, 'message' => 'Record updated successfully'];
                } else {
                    $response = ['status' => 0, 'message' => 'Failed to update record'];
                }
                echo json_encode($response);
                break;

            case 'quantity':
                $item = json_decode(file_get_contents('php://input'));
                $sql = "UPDATE supplies SET total_purchased = total_purchased + :purchased, total_used = total_used + :used WHERE id = :id";
                $stmt = $conn->prepare($sql);

                $stmt->bindParam(':id', $item->id);
                $stmt->bindParam(':purchased', $item->total_purchased);
                $stmt->bindParam(':used', $item->total_used);

                if ($stmt->execute()) {
                    $response = ['status' => 1, 'message' => 'Quantity updated successfully'];
                } else {
                    $response = ['status' => 0, 'message' => 'Failed to update quantity'];
                }
                echo json_encode($response);
                break;

            case 'delete':
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

            default:
                // Existing "POST" code 
                if (isset($_FILES['image'])) {
                    $file = $_FILES['image'];
                    $fileName = $file['name'];
                    $fileTmpName = $file['tmp_name'];
                    $fileSize = $file['size'];
                    $fileError = $file['error'];
                    $fileType = $file['type'];

                    $fileExt = explode('.', $fileName);
                    $fileActualExt = strtolower(end($fileExt));

                    $allowed = array('jpg', 'jpeg', 'png');

                    if (in_array($fileActualExt, $allowed)) {
                        if ($fileError === 0) {
                            if ($fileSize < 5000000) { // 5 MB
                                $fileNameNew = uniqid('', true) . "." . $fileActualExt;
                                $fileDestination = 'uploads/' . $fileNameNew;
                                move_uploaded_file($fileTmpName, $fileDestination);
                            } else {
                                // echo "Your file is too big!";
                                $response = ['status' => 0, 'message' => 'Your file is too big!'];
                                echo json_encode($response);
                                exit();
                            }
                        } else {
                            // echo "There was an error uploading your file!";
                            $response = ['status' => 0, 'message' => 'There was an error uploading your file!'];
                            echo json_encode($response);
                            exit();
                        }
                    } else {
                        // echo "You cannot upload files of this type!";
                        $response = ['status' => 0, 'message' => 'You cannot upload files of this type!'];
                        echo json_encode($response);
                        exit();
                    }
                }

                $sql =
                    "INSERT INTO supplies(id, userId, name, price, size, type, location, colour, supplier, total_purchased, created_at, image, notes)
                    VALUES(null, :userId, :name, :price, :size, :type, :location, :colour, :supplier, :total_purchased, :created_at, :image, :notes)";
                $stmt = $conn->prepare($sql);
                $created_at = date('Y-m-d');

                $stmt->bindParam(':userId', $_POST['userId']);
                $stmt->bindParam(':name', $_POST['name']);
                $stmt->bindParam(':price', $_POST['price']);
                $stmt->bindParam(':size', $_POST['size']);
                $stmt->bindParam(':type', $_POST['type']);
                $stmt->bindParam(':location', $_POST['location']);
                $stmt->bindParam(':colour', $_POST['colour']);
                $stmt->bindParam(':supplier', $_POST['supplier']);
                $stmt->bindParam(':total_purchased', $_POST['total_purchased']);
                $stmt->bindParam(':created_at', $created_at);
                $stmt->bindParam(':image', $fileDestination);
                $stmt->bindParam(':notes', $_POST['notes']);

                if ($stmt->execute()) {
                    $response = ['status' => 1, 'message' => 'Record created successfully'];
                } else {
                    $response = ['status' => 0, 'message' => 'Failed to create record'];
                }
                echo json_encode($response);

                break;
        }
        break;  

    
    //------------original code-----------------
        // case "POST":
    //     if (isset($_FILES['image'])) {
    //         $file = $_FILES['image'];
    //         $fileName = $file['name'];
    //         $fileTmpName = $file['tmp_name'];
    //         $fileSize = $file['size'];
    //         $fileError = $file['error'];
    //         $fileType = $file['type'];

    //         $fileExt = explode('.', $fileName);
    //         $fileActualExt = strtolower(end($fileExt));

    //         $allowed = array('jpg', 'jpeg', 'png');

    //         if (in_array($fileActualExt, $allowed)) {
    //             if ($fileError === 0) {
    //                 if ($fileSize < 5000000) { // 5 MB
    //                     $fileNameNew = uniqid('', true) . "." . $fileActualExt;
    //                     $fileDestination = 'uploads/' . $fileNameNew;
    //                     move_uploaded_file($fileTmpName, $fileDestination);
    //                 } else {
    //                     // echo "Your file is too big!";
    //                     $response = ['status' => 0, 'message' => 'Your file is too big!'];
    //                     echo json_encode($response);
    //                     exit();
    //                 }
    //             } else {
    //                 // echo "There was an error uploading your file!";
    //                 $response = ['status' => 0, 'message' => 'There was an error uploading your file!'];
    //                 echo json_encode($response);
    //                 exit();
    //             }
    //         } else {
    //             // echo "You cannot upload files of this type!";
    //             $response = ['status' => 0, 'message' => 'You cannot upload files of this type!'];
    //             echo json_encode($response);
    //             exit();
    //         }
    //     }

    //     $sql =
    //     "INSERT INTO supplies(id, userId, name, price, size, type, location, colour, supplier, total_purchased, created_at, image, notes)
    //     VALUES(null, :userId, :name, :price, :size, :type, :location, :colour, :supplier, :total_purchased, :created_at, :image, :notes)";
    //     $stmt = $conn->prepare($sql);
    //     $created_at = date('Y-m-d');

    //     $stmt->bindParam(':userId', $_POST['userId']);
    //     $stmt->bindParam(':name', $_POST['name']);
    //     $stmt->bindParam(':price', $_POST['price']);
    //     $stmt->bindParam(':size', $_POST['size']);
    //     $stmt->bindParam(':type', $_POST['type']);
    //     $stmt->bindParam(':location', $_POST['location']);
    //     $stmt->bindParam(':colour', $_POST['colour']);
    //     $stmt->bindParam(':supplier', $_POST['supplier']);
    //     $stmt->bindParam(':total_purchased', $_POST['total_purchased']);
    //     $stmt->bindParam(':created_at', $created_at);
    //     $stmt->bindParam(':image', $fileDestination);
    //     $stmt->bindParam(':notes', $_POST['notes']);

    //     if($stmt->execute()){
    //         $response = ['status' => 1, 'message' => 'Record created successfully'];
    //     } else {
    //         $response = ['status' => 0, 'message' => 'Failed to create record'];
    //     }
    //     echo json_encode($response);
    //     break;

    // case "PUT":
    //     $item = json_decode(file_get_contents('php://input'));
    //     $sql =
    //     "UPDATE supplies SET name=:name, price=:price, size=:size, type=:type, location=:location, colour=:colour, supplier=:supplier, notes=:notes, updated_at=:updated_at WHERE id = :id";
    //     $stmt = $conn->prepare($sql);
    //     $updated_at = date('Y-m-d');

    //     $stmt->bindParam(':id', $item->id);
    //     $stmt->bindParam(':name', $item->name);
    //     $stmt->bindParam(':price', $item->price);
    //     $stmt->bindParam(':size', $item->size);
    //     $stmt->bindParam(':type', $item->type);
    //     $stmt->bindParam(':location', $item->location);
    //     $stmt->bindParam(':colour', $item->colour);
    //     $stmt->bindParam(':supplier', $item->supplier);
    //     $stmt->bindParam(':notes', $item->notes);
    //     $stmt->bindParam(':updated_at', $updated_at);

    //     if ($stmt->execute()) {
    //         $response = ['status' => 1, 'message' => 'Record updated successfully'];
    //     } else {
    //         $response = ['status' => 0, 'message' => 'Failed to update record'];
    //     }

    //     // Accumulate the total_purchased and total_used fields
    //     if ($response['status'] == 1 && isset($item->total_purchased) && isset($item->total_used)) {
    //         $selectSql = "SELECT total_purchased, total_used FROM supplies WHERE id = :id";
    //         $selectStmt = $conn->prepare($selectSql);
    //         $selectStmt->bindParam(':id', $item->id);
    //         $selectStmt->execute();
    //         $supplyData = $selectStmt->fetch(PDO::FETCH_ASSOC);

    //         $totalPurchased = $supplyData['total_purchased'];
    //         $totalUsed = $supplyData['total_used'];

    //         $totalPurchased += $item->total_purchased;
    //         $totalUsed += $item->total_used;

    //         $updateAccumulatedSql = "UPDATE supplies SET total_purchased = :total_purchased, total_used = :total_used WHERE id = :id";
    //         $updateAccumulatedStmt = $conn->prepare($updateAccumulatedSql);
    //         $updateAccumulatedStmt->bindParam(':total_purchased', $totalPurchased);
    //         $updateAccumulatedStmt->bindParam(':total_used', $totalUsed);
    //         $updateAccumulatedStmt->bindParam(':id', $item->id);

    //         if ($updateAccumulatedStmt->execute()) {
    //             $response = ['status' => 1, 'message' => 'Record updated successfully'];
    //         } else {
    //             $response = ['status' => 0, 'message' => 'Failed to update record'];
    //         }
    //     }

    //     echo json_encode($response);
    //     break;

    //     case "DELETE":
    //     $sql = "DELETE FROM supplies WHERE id = :id";
    //     $path = explode('/', $_SERVER['REQUEST_URI']);
       
    //         $stmt = $conn->prepare($sql);
    //         $stmt->bindParam(':id', $path[4]);

    // if ($stmt->execute()) {
    //         $response = ['status' => 1, 'message' => 'Record deleted successfully'];
    //     } else {
    //         $response = ['status' => 0, 'message' => 'Failed to delete record'];
    //     }
    //     echo json_encode($response);
    //     break;

    
   }