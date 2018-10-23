<?php
session_start();
header("Content-Type: application/json"); // Since we are sending a JSON response here (not an HTML document), set theMIME Type to application/json

//Because you are posting the data via fetch(), php has to retrieve it elsewhere.
$json_str = file_get_contents('php://input');
//This will store the data into an associative array
$json_obj = json_decode($json_str, true);

//Variables can be accessed as such:
$tags = $json_obj['tags'];
//array_push($tags, "default");
$firstDay = $json_obj['firstDay'];
$lastDay = $json_obj['lastDay'];
//This is equivalent to what you previously did with $_POST['username'] and $_POST['password']

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

//make tag ids arrray
//and prepare query to get tag ids based on name
$tag_ids = [];
$stmt = $mysqli->prepare("select id from tags where name=?");

//
foreach($tags as $tag_name){
    $stmt->bind_param('s', $tag_name);
    $stmt->execute();
    $stmt->bind_result($tag_id);
    $stmt->fetch();
    $tag_ids[] = $tag_id;


}

$stmt->close();

//make array for event ids
//and prepare select query
$event_ids = [];
$stmt = $mysqli->prepare("select event_id from tags_events where tag_id=?");

//execute query and place event ids in array
foreach($tag_ids as $tag_id){
$stmt->bind_param('d', $tag_id);
$stmt->execute();
$stmt->bind_result($event_id);
while($stmt->fetch()){
$event_ids[] = $event_id;
}
}


$stmt->close();
//remove duplicates from array
$event_ids = array_unique($event_ids);

//select events from db
$events = [];
$stmt = $mysqli->prepare("select id, title, date, start from events where owner_id=? and id=? and (date between ? and ?)");
// echo json_encode(array(
//     "error" => true,
//     "eMessage" => $stmt
//     ));
//     exit;

foreach($event_ids as $event_id){
    $stmt->bind_param('ddss', $userID, $event_id, $firstDay, $lastDay);
    $stmt->execute();
    $stmt->bind_result($eventid, $title, $date, $time);
    $stmt->fetch();
    $events[] = array(
        "id" => $eventid,
        "title" => $title,
        "date" => $date,
        "time" => $time
    );
}

$stmt->close();

echo json_encode($events);
exit;

?>