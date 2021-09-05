<?php
session_start();
require_once "../../shared/dbConfig.php";

// Perform query
$userId = $_SESSION["idusers"];
$stmt = $mysqli->prepare('SELECT * FROM lessons WHERE lessons.auth_users LIKE ? OR lessons.auth_users LIKE ? OR lessons.auth_users LIKE ? OR lessons.auth_users LIKE ?');
$val2 = $userId . ',%';
$val3 = '%,' . $userId . ',%';
$val4 = '%,' . $userId;
$stmt->bind_param('ssss',$userId, $val2, $val3, $val4);

$stmt->execute();
$result = $stmt->get_result();

if($result){
    while($row = $result -> fetch_array(MYSQLI_ASSOC)){
        echo $row["lesson_id"] . "," . $row["lesson_name"] . "," . $row["author_name"] . "," . $row["author_id"] . ",";
    }
}
else{
  echo "empty";
}
/*
 $result = $stmt->get_result();
 while ($row = $result->fetch_assoc()) {
     // Do something with $row
 }

*/

/*
  while($row = $result -> fetch_array(MYSQLI_ASSOC)){
printf ("%s (%s)\n", $row["name"], $row["age"]);}
  $result -> free_result();
  }
  */


$mysqli -> close();

?>