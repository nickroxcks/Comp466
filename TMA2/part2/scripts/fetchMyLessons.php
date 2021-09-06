<?php
session_start();
require_once "../../shared/dbConfig.php";

// Perform query
$userId = $_SESSION["idusers"];
$stmt = $mysqli->prepare('SELECT * FROM lessons WHERE author_id = ?');
$stmt->bind_param('i',$userId);

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