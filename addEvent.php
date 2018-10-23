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
$tags = $json_obj['tags'];
array_push($tags, "default");

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



//check valid title
if( !preg_match('/(\w*\ *)+/', $title) ){
echo json_encode(array(
"error" => true,
"eMessage" => "Invalid Username"
));
exit;
}

//check valid date
if( !preg_match('/\d{4}-\d{2}-\d{2}/', $date) ){
echo json_encode(array(
"error" => true,
"eMessage" => "Invalid Username"
));
exit;
}

//check valid time
if( !preg_match('/\d{2}:\d{2}/', $start) ){
echo json_encode(array(
"error" => true,
"eMessage" => "Invalid Username"
));
exit;
}

//connect to database
require("dataBaseAnees.php");

//prepare and execute query
$stmt = $mysqli->prepare("insert into events (title, date, start, owner_id) values (?, ?, ?, ?)");


$stmt->bind_param('sssd', $title, $date, $start, $userID);
$stmt->execute();

$stmt->close();

$insertedEventID = $mysqli->insert_id;

//get tag ids from tags table
$stmt = $mysqli->prepare("select id from tags where name=? AND owner_id=?");
$tag_ids = [];
//insert into tag_ids array
foreach($tags as $tag_id) {
    $stmt->bind_param('sd', $tag_id, $userID);
    $stmt->execute();
    $stmt->bind_result($tid);
    $tag_ids[] = $tid;
}
$stmt->close();

//insert tag and event ids into tags_events table
//tags_events keeps track of many to many relationship between events and tags
$stmt = $mysqli->prepare("insert into tags_events (tag_id, event_id) values (?,?)");
foreach($tag_ids as $tagid){
    $stmt->bind_param('dd', $tagid, $userID);
    $stmt->execute();
}

echo json_encode(array(
    "error" => false,
));

?>