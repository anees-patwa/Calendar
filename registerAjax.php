<?php

header("Content-Type: application/json"); // Since we are sending a JSON response here (not an HTML document), set the MIME Type to application/json

//Because you are posting the data via fetch(), php has to retrieve it elsewhere.
$json_str = file_get_contents('php://input');
//This will store the data into an associative array
$json_obj = json_decode($json_str, true);

//Variables can be accessed as such:
$username = $json_obj['username'];
$password = $json_obj['password'];
//This is equivalent to what you previously did with $_POST['username'] and $_POST['password']

//connect to database
require('dataBaseAnees.php');

//check valid username
if( !preg_match('/^[\w_\-]+$/', $username) ){
echo json_encode(array(
    "error" => true,
    "eMessage" => "Invalid Username"
));
exit();
}

//hash password
$hash = password_hash($password, PASSWORD_BCRYPT);

//prepare and execute insertion of new user
$insert = $mysqli->prepare("insert into users (username, hash) values (?, ?)");
if(!$insert){
//printf("Query Prep Failed: %s\n", $mysqli->error);
echo json_encode(array(
"error" => true,
"eMessage" => ($mysqli->error)
));
exit();
}

$insert->bind_param('ss', $username , $hash);

$insert->execute();

$insert->close();

//respond that insertion was successful
echo json_encode(array(
    "error" => false
));
exit();

?>