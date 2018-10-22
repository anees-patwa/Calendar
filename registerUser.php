<?php
header("Content-Type: application/json; charset=utf-8"); // Since we are sending a JSON response here (not an HTMLdocument), set the MIME Type to application/json


//Because you are posting the data via fetch(), php has to retrieve it elsewhere.
$json_str = file_get_contents('php://input');
//This will store the data into an associative array
$json_obj = json_decode($json_str, true);

//var_dump($json_obj);
//Variables can be accessed as such:
$username = $json_obj['username'];
$password = $json_obj['password'];
//This is equivalent to what you previously did with $_POST['username'] and $_POST['password']


//connect to database
//open connection to database
$mysqli = new mysqli('localhost', 'wustl_inst', 'wustl_pass', 'calendar');

if($mysqli->connect_errno) {
printf("Connection Failed: %s\n", $mysqli->connect_error);
exit;
}

//check valid username
if( !preg_match('/^[\w_\-]+$/', $username) ){
echo json_encode(array(
    "error" => "true",
    "eMessage" => "Invalid Username"
));
exit;
}


//hash password
$hash = password_hash($password, PASSWORD_BCRYPT);


//prepare and execute insertion of new user
$insert = $mysqli->prepare("insert into users (username, hash) values (?, ?)");

$insert->bind_param('ss', $username , $hash);

$insert->execute();

$insert->close();

echo json_encode(array(
"error" => "false",
));
exit;
?>