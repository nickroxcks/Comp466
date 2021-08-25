<?php

//$query = "Select * from names";
session_start();
$oldURL = strval($_GET['oldURL']);
$newURL= strval($_GET['newURL']);

require_once "../../shared/dbConfig.php";

// Perform query
//if ($result = $mysqli -> query("SELECT * FROM names")) {
  //echo "Returned rows are: " . $result -> num_rows;
$stmt = $mysqli->prepare('UPDATE simpledb.bookmark
SET url = ?
WHERE url = ? AND idusers = ?');
$stmt->bind_param('ssi', $newURL, $oldURL,$_SESSION["idusers"]);

$stmt->execute();
$result = $stmt->get_result();

//TODO: ERROR CHECKING
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