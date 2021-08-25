<?php

//$query = "Select * from names";
session_start();
$newURL= strval($_GET['newURL']);
require_once "../../shared/dbConfig.php";

// Perform query
//if ($result = $mysqli -> query("SELECT * FROM names")) {
  //echo "Returned rows are: " . $result -> num_rows;
$stmt = $mysqli->prepare('INSERT INTO bookmark (url,idusers) VALUES (?,?)');
$stmt->bind_param('si', $newURL, $_SESSION["idusers"]);

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