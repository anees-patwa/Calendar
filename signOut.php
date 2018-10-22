<?php
session_start();
header("content-type: application/json");

session_destroy();
echo json_encode(array(
    "success" => true
));
exit;
?>