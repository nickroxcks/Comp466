<?php
$mysqli = new mysqli("localhost:3306","root","23cedeef783b30e4cd6da208b66d836dee70082b2acf715c","simpledb");
// Check connection
if ($mysqli -> connect_errno) {
  echo "Failed to connect to MySQL: " . $mysqli -> connect_error;
  exit();
}
?>