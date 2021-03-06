<?php
session_start();
 
// Check if the user is already logged in, if yes then redirect him to welcome page
if(isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true){
    header("location: shared/selectApplication.php");
    exit;
}
?>
<!DOCTYPE html>
<html lang="en">

<head>

	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<meta name="description" content="">
	<meta name="author" content="">
	<meta http-equiv="Cache-control" content="no-cache">
	<link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700" rel="stylesheet">
	<link href='https://fonts.googleapis.com/css?family=Oxygen' rel='stylesheet'>
	<script src="https://kit.fontawesome.com/a076d05399.js"></script>
	<script src="shared/main.js"></script>

	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
	<title>Nicholas Serrano Assignment 2 HomePage</title>

	<!-- Additional CSS Files -->
	<link rel="stylesheet" href="shared/style.css">

</head>

<body>
	<style>
		body {
			background-color: #00BFFF;
		}
	</style>

	<!-- Wrapper -->
	<div id="wrapper">

		<!-- Main -->
		<div id="main">
			<p class="loginLogo">SimpleDev</p>

			<div id="loginForm" class="loginForm">
				<div class="loginTitle">Sign in</div>
				<div class="loginEntry">
					<p id="loginUsernameLabel" class="loginText">Username:</p>
					<input id="loginUsername" type="text" class="loginText">
				</div>
				<div class="loginEntry">
					<p id="loginPasswordLabel" class="loginText">Password:</p>
					<input id="loginPassword" type="password" class="loginText">
				</div>
				<div class="buttonContainer">
					<button id="loginButton" class="loginButton">Login</button>
					<button id="createAccountButton" class="loginButton">Create Account</button>
					<div id="lds-dual-ring" class="lds-dual-ring" style="display: none;"></div>
				</div>
				<p id="loginNotice" class="loginText"></p>

			</div>
		</div>
	</div>
	<!--
                        <?php

$query = "Select * from names";

$mysqli = new mysqli("localhost:3306","Nick","Djstpk#629!()Sql","dbtest");
// Check connection
if ($mysqli -> connect_errno) {
  echo "Failed to connect to MySQL: " . $mysqli -> connect_error;
  exit();
}

// Perform query
if ($result = $mysqli -> query("SELECT * FROM names")) {
  echo "Returned rows are: " . $result -> num_rows;


  while($row = $result -> fetch_array(MYSQLI_ASSOC)){
printf ("%s (%s)\n", $row["name"], $row["age"]);}
  $result -> free_result();
}

$mysqli -> close();

?>
-->

	</div>

	<!--End of content update-->
	<div class="main2-banner-content-page-navigation" id="Main2-Page-Navigation">
	</div>
	<!--  
mysql_connect(server,user,pwd,newlink,clientflag) -->
	</div>
	</div>
	</div>
</body>

</html>