<?php
session_start();
require_once "../../shared/dbConfig.php";
//$query = "Select * from names";
$username = strval($_GET['username']);
$username = str_replace(' ', '', $username);  //remove spaces in case something funny happens
$userID;
$lessonID = strval($_GET['lessonID']);

//get the userID of the username. If this is not an existing account return "empty"
$stmt = $mysqli->prepare('SELECT * FROM users where users.username = ?');
$stmt->bind_param('s', $username);
$stmt->execute();
$result = $stmt->get_result();
$row = $result->fetch_array(MYSQLI_ASSOC);
if($row){
    $userID = $row["idusers"];
}
else{
    echo "empty";
    exit();
}

//get the existing users in the lesson
$stmt2 = $mysqli->prepare('SELECT * FROM lessons where lessons.lesson_id = ?');
$stmt2->bind_param('i', $lessonID);
$stmt2->execute();
$result2 = $stmt2->get_result();
$allUsers = '';
$row2 = $result2->fetch_array(MYSQLI_ASSOC);
$allUsers = $row2['auth_users'];


//check to see if the username is already an existing user for the lesson
$str_arr = explode (",", $allUsers);
foreach($str_arr as $x){
    if(str_replace(' ', '', $x) == $userID){
        echo "User Exists";
        exit();
    }
}

//if the username is a existing account, and they arent already added to the lesson, add them into the authorized users for the lesson
$allUsers = $allUsers . "," . $userID;
$stmt3 = $mysqli->prepare('UPDATE lessons SET lessons.auth_users = ? where lessons.lesson_id = ?');
$stmt3->bind_param('si', $allUsers, $lessonID);

$stmt3->execute();
$result3 = $stmt3->get_result();
$numrows = $stmt3->affected_rows;
if($numrows != 0){
    echo "success";
    exit();
}
else{
    echo "failed";  //means there was some failure with the DB and updating the lesson
    exit();
}

?>