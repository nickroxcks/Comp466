<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">
    <meta http-equiv="Cache-control" content="no-cache">
    <link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700" rel="stylesheet">
    <script src="https://kit.fontawesome.com/a076d05399.js"></script>
    <script src="main.js"></script>
    <script src="documentation.js"></script>


    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
    <title>Nicholas Serrano Assignment 1 Documentation</title>

    <!-- Additional CSS Files -->
    <link rel="stylesheet" href="style.css">

</head>

<body>

    <!-- Wrapper -->
    <div id="wrapper">

        <!-- Main -->
        <div id="main">
            <div class="main2_center">

                <!-- Header -->
                <header id="header">
                    <div class="fas fa-bars nav_button" id="menubutton"> Menu</div>
                    <div class="fas nav_button" id="Main-Nav-Summary-button">Summary</div>
                    <div class="fas nav_button" id="Main-Nav-Part1-button">Part 1 Info</div>
                    <div class="fas nav_button" id="Main-Nav-Part2-button">Part 2 Info</div>
                    <div class="fas nav_button" id="Main-Nav-Part3-button">Part 3 Info</div>
                    <div class="fas nav_button" id="Main-Nav-Part4-button">Part 4 Info</div>

                </header>

                <!-- Banner -->
                <section class="main2-banner-container" id="Main2-container">
                    <!--It is here where the content presented can be updated from documentation.js-->
                    <div class="main2-banner-title">Running SQL stuff</div>
                    <div id="main2-banner-content">
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

                    </div>

                    <!--End of content update-->
                </section>
                <div class="main2-banner-content-page-navigation" id="Main2-Page-Navigation">
                </div>
                <!--  
mysql_connect(server,user,pwd,newlink,clientflag) -->
            </div>
        </div>

        <!-- Sidebar -->
        <div id="sidebar">
            <div class="inner_sidebar">
                <!-- Menu -->
                <nav id="menu">
                    <ul>
                        <li><a href="tma1.html">Documentation</a></li>
                        <li><a href="part1/resume.xml">Resume - Part 1</a></li>
                        <li><a href="part2/main2.html">Web Course - Part 2</a></li>
                        <li><a href="part3/main3.html">SlideShow - Part 3</a></li>
                        <li><a href="part4/main4.html">Utilities - Part 4</a></li>
                    </ul>
                </nav>

            </div>
        </div>
    </div>
</body>

</html>