<?php
session_start();
header("Content-Type: application/json"); // Since we are sending a JSON response here (not an HTML document), set theMIME Type to application/json

//Because you are posting the data via fetch(), php has to retrieve it elsewhere.
$json_str = file_get_contents('php://input');
//This will store the data into an associative array
$json_obj = json_decode($json_str, true);

//get data
$token = $json_obj['token'];

if(strcmp($token, $_SESSION['token']) != 0){
echo json_encode(array(
"error" => true,
"eMessage" => "Request Forgery detected",

));
exit;
}
//check log-in status
if(!isset($_SESSION['userID'])){
echo json_encode(array(
"error" => true,
"eMessage" => "Not Logged In"
));
exit;
}
$userID = $_SESSION['userID'];

//connect to database
require("dataBaseAnees.php");

//prepare select statement to get tag names
$stmt = $mysqli->prepare("select name from tags where owner_id=?");
$stmt->bind_param('d', $userID);
$stmt->execute();
$stmt->bind_result($name);

//put tag names into array
$tags = array();
while($stmt->fetch()){
array_push($tags, $name);
}

echo json_encode($tags);
exit;
?>