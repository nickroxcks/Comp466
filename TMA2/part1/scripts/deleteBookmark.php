<?php

//$query = "Select * from names";
session_start();
$deleteURL= strval($_GET['deleteURL']);
require_once "../../shared/dbConfig.php";

// Perform query
//if ($result = $mysqli -> query("SELECT * FROM names")) {
  //echo "Returned rows are: " . $result -> num_rows;
$stmt = $mysqli->prepare('DELETE FROM simpledb.bookmark WHERE url = ? AND idusers = ?');
$stmt->bind_param('si', $deleteURL, $_SESSION["idusers"]);

$stmt->execute();
$result = $stmt->get_result();
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