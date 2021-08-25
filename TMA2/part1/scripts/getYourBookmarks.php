<?php

//$query = "Select * from names";
/*
$mysqli = new mysqli("localhost:3306","Nick","Djstpk#629!()Sql","simpledb");
// Check connection
if ($mysqli -> connect_errno) {
  echo "Failed to connect to MySQL: " . $mysqli -> connect_error;
  exit();
}*/
session_start();
require_once "../../shared/dbConfig.php";

// Perform query
//if ($result = $mysqli -> query("SELECT * FROM names")) {
  //echo "Returned rows are: " . $result -> num_rows;
$stmt = $mysqli->prepare('SELECT url
FROM simpledb.bookmark
WHERE idusers = ?');
$stmt->bind_param('i', $_SESSION["idusers"]);

$stmt->execute();
$result = $stmt->get_result();

/*
$row = $result->fetch_array(MYSQLI_ASSOC);
if($row){
  //$_SESSION["idusers"] = $row["idusers"];
  //$_SESSION["username"] = $row["username"];
  echo $row["idusers"],",", $row["username"];
}
else{
  //TODO: ERROR handling
}
*/

 while ($row = $result->fetch_assoc()) {
    echo $row['url'],',';
 }



/*
  while($row = $result -> fetch_array(MYSQLI_ASSOC)){
printf ("%s (%s)\n", $row["name"], $row["age"]);}
  $result -> free_result();
  }
  */


$mysqli -> close();

?>