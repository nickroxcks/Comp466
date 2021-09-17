<?php

//$query = "Select * from names";
$name = strval($_GET['name']);
$password = strval($_GET['password']);

require_once "dbConfig.php";

//first check if user exists
$checkStmt = $mysqli->prepare('SELECT * FROM users WHERE users.username = ?');
$checkStmt->bind_param('s', $name);
$checkStmt->execute();
$checkResult = $checkStmt->get_result();

$checkRow = $checkResult->fetch_array(MYSQLI_ASSOC);
if($checkRow){
  echo "User Exists";
  exit();
}

// Perform query to add new user
$stmt = $mysqli->prepare('INSERT INTO users (username,password) VALUES (?,?)');
$stmt->bind_param('ss', $name, $password);

$stmt->execute();
$result = $stmt->get_result();

//create a folder for user on the server
$stmt = $mysqli->prepare('SELECT * FROM users WHERE users.username = ? AND users.password = ?');
$stmt->bind_param('ss', $name, $password);
$stmt->execute();
$result = $stmt->get_result();

$row = $result->fetch_array(MYSQLI_ASSOC);

if($row){
  if (!mkdir("../Users/U_" . $row["idusers"])) {
    die('Failed to create directories...');
  }
  else{
    echo "User Created";
  }
}
else{

}
/*


$stmt = $mysqli->prepare('SELECT * FROM users WHERE users.username = ? AND users.password = ?');
$stmt->bind_param('ss', $name, $password);

$stmt->execute();
$result = $stmt->get_result();

$row = $result->fetch_array(MYSQLI_ASSOC);
if($row){
  $_SESSION["loggedin"] = true;
  $_SESSION["idusers"] = $row["idusers"];
  $_SESSION["username"] = $row["username"];
  //header('location: selectApplication.php');
  //exit();
  echo $row["idusers"],",", $row["username"];
}
*/

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