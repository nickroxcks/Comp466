<?php

//$query = "Select * from names";
$name = strval($_GET['name']);
$password = strval($_GET['password']);
echo $name;
$mysqli = new mysqli("localhost:3306","Nick","Djstpk#629!()Sql","simpledb");
// Check connection
if ($mysqli -> connect_errno) {
  echo "Failed to connect to MySQL: " . $mysqli -> connect_error;
  exit();
}
else{
    echo "we gucci";
}

// Perform query
//if ($result = $mysqli -> query("SELECT * FROM names")) {
  //echo "Returned rows are: " . $result -> num_rows;
$stmt = $mysqli->prepare('INSERT INTO users (username,password) VALUES (?,?)');
$stmt->bind_param('ss', $name, $password);

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