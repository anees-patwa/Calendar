<?php
session_start();
header("Content-Type: application/json"); // Since we are sending a JSON response here (not an HTML document), set the MIME Type to application/json

//Because you are posting the data via fetch(), php has to retrieve it elsewhere.
$json_str = file_get_contents('php://input');
//This will store the data into an associative array
$json_obj = json_decode($json_str, true);

//get data
$title = $json_obj['title'];
$date = $json_obj['date'];
$start = $json_obj['start'];
if(!isset($_SESSION['userID'])){
    echo json_encode(array(
    "error" => true,
    "eMessage" => "Not Logged In"
    ));
}
$userID = $_SESSION['userID'];

require("dataBaseAnees.php");

$stmt = $mysqli->prepare("insert into events (title, date, time, owner_id) values (?, ?, ?, ?)");

$stmt->bind_param('sssd', $title, $date, $time, $userID);
$stmt->execute();

$stmt->close();

echo json_encode(array(
    "error" => false,
));

?>