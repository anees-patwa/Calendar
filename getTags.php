<?php
session_start();
header("Content-Type: application/json"); // Since we are sending a JSON response here (not an HTML document), set theMIME Type to application/json

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