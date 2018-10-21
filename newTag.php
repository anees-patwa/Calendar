<?php
session_start();
header("Content-Type: application/json"); // Since we are sending a JSON response here (not an HTML document), set theMIME Type to application/json

//Because you are posting the data via fetch(), php has to retrieve it elsewhere.
$json_str = file_get_contents('php://input');
//This will store the data into an associative array
$json_obj = json_decode($json_str, true);

//get data
$tag = $json_obj['tag'];

//check log-in status
if(!isset($_SESSION['userID'])){
echo json_encode(array(
"error" => true,
"eMessage" => "Not Logged In"
));
exit;
}

$userID = $_SESSION['userID'];

//check CSRF token
$token = $json_obj['token'];
if(strcmp($token, $_SESSION['token']) != 0){
echo json_encode(array(
"error" => true,
"eMessage" => "Request Forgery detected",
));
exit;
}

//check valid tag name
if(!preg_match('/^[\w_\-]+$/', $tag)){
    echo json_encode(array(
        "error" => true,
        "eMessage" => "invalid tag name"
    ));
    exit;
}

//make connection to database
require("dataBaseAnees.php");

//insert into new tag into table
$stmt->prepare("insert into tags (owner_id, name) values (?,?)");
$stmt->bind_param('ds', $userID, $tag);
$stmt->execute();
$stmt->close();

echo json_encode(array(
    "error" => false
));
exit;
?>