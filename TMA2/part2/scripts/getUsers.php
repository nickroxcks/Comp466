<?php
session_start();
require_once "../../shared/dbConfig.php";
//$query = "Select * from names";
$lessonID = strval($_GET['lessonID']);

$stmt = $mysqli->prepare('SELECT * FROM lessons where lessons.lesson_id = ?');
$stmt->bind_param('i', $lessonID);

$stmt->execute();
$result = $stmt->get_result();

if($result){
  //get all user id's that have access to the lesson
  $row = $result -> fetch_array(MYSQLI_ASSOC);
  $allUsers = $row["auth_users"];
  $str_arr = explode (",", $allUsers);

  //for each user id that has access to the lesson, get thier username
  foreach($str_arr as $x){
    $stmt2 = $mysqli->prepare('SELECT * FROM users where users.idusers = ?');
    $stmt2->bind_param('i', $x);
  
    $stmt2->execute();
    $result2 = $stmt2->get_result();
    $row2 = $result2 -> fetch_array(MYSQLI_ASSOC);
    echo $row2['username'] . ',';  //output username
  }
}
else{
  echo "empty";
}

?>