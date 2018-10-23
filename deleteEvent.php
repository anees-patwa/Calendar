<?php
header("Content-Type: application/json; charset=utf-8");
 // Since we are sending a JSON response here (not an HTML document), set the MIME Type to application/json

//Because you are posting the data via fetch(), php has to retrieve it elsewhere.
$json_str = file_get_contents('php://input');
//This will store the data into an associative array
$json_obj = json_decode($json_str, true);

//Variables can be accessed as such:
$id = $json_obj['id'];
//This is equivalent to what you previously did with $_POST['username'] and $_POST['password']

//open connection to database
$mysqli = new mysqli('localhost', 'wustl_inst', 'wustl_pass', 'calendar');

if($mysqli->connect_errno) {
echo json_encode(array(
	"success" => "false",
));
exit();
}

session_start();

if(!isset($_SESSION['userID'])){
    echo json_encode(array(
        "error" => true,
        "eMessage" => "not logged in"
    ));
    exit;
}

$userID = $_SESSION['userID'];

//prepare and execute query to delete from events
$stmt = $mysqli->prepare("delete from events where id=? and owner_id=?");

$stmt->bind_param('dd', $id, $userID);
$stmt->execute();
$stmt->close();

//prepare and execute query to delete from tags_events
$stmt = $mysqli->prepare("delete from tags_events where event_id=?");
$stmt->bind_param('d', $id);
$stmt->execute();
$stmt->close();

echo json_encode(array(
    "success" => true
))
?>