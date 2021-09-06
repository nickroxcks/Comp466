<?php
$mysqli = new mysqli("localhost","webserver","some_pass","simpledb");
// Check connection
if ($mysqli -> connect_errno) {
  echo "Failed to connect to MySQL: " . $mysqli -> connect_error;
  exit();
}
?>