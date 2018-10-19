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

//check valid username
if( !preg_match('/^[\w_\-]+$/', $username) ){
echo json_encode(array(
"success" => "false",
"eMessage" => "Invalid Username"
));
exit();
}

//open connection to database
$mysqli = new mysqli('localhost', 'wustl_inst', 'wustl_pass', 'calendar');

if($mysqli->connect_errno) {
printf("Connection Failed: %s\n", $mysqli->connect_error);
exit();
}

//prepare and execute query
$stmt = $mysqli->prepare("select id, hash from users where username=?");

$stmt->bind_param('s', $username);
$stmt->execute();

$stmt->bind_result($userID, $dbpass);

$stmt->fetch();


// Check to see if the username and password are valid.  (You learned how to do this in Module 3.)
if(password_verify($password, $dbpass)){
	session_start();
	$_SESSION['userID'] = $userID;
	$_SESSION['token'] = bin2hex(openssl_random_pseudo_bytes(32)); 

	echo json_encode(array(
		"success" => "true"
	));
$stmt.close();
	//exit();
}else{
	echo json_encode(array(
		"success" => "false",
		"message" => "Incorrect Username or Password"
	));
$stmt.close();
	//exit();
}


?>