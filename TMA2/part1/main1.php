<?php
// Initialize the session
session_start();
 
// Check if the user is logged in, if not then redirect him to login page
if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
    header("location: ../login.php");
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
    <script src="https://kit.fontawesome.com/a076d05399.js"></script>
    <script src="scripts/main1.js"></script>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
    <title>Nicholas Serrano Assignment 2 Part 1</title>

    <!-- Additional CSS Files -->
    <link rel="stylesheet" href="../shared/style.css">

</head>

<body>

    <!-- Wrapper -->
    <div id="wrapper">

        <!-- Main -->
        <div id="main">
            <div class="main2_center">

                <!-- Header -->
                <header id="header">
                    <div class="fas fa-bars nav_button" id="menubutton"> SimpleDev</div>
                    <div class="fas nav_button" id="BookmarkHomeButton">Home</div>
                    <div class="fas nav_button" id="BookmarkYourBookmarksButton">Your Bookmarks</div>
                    <div class="fas nav_button" id="BookmarkAddBookmarkButton">Add Bookmark</div>
                    <div class="fas nav_button" id="BookmarkDeleteBookmarkButton">Edit Bookmark</div>
                </header>

                <!-- Banner -->
                <section class="main2-banner-container" id="Main2-container">
                    <!--It is here where the content presented can be updated from main2.js-->
                    <div class="main2-banner-title">Top 10 most popular Bookmarks</div>
                    <div id="main2-banner-content">


                    </div>
                    <!--End of content update-->
                </section>

                <div class="main2-banner-content-page-navigation" id="Main2-Page-Navigation">
                </div>


            </div>
        </div>

        <!-- Sidebar -->
        <div id="sidebar">
            <div class="inner_sidebar">
                <!-- Menu -->
                <nav id="menu">
                    <ul>
                        <li><a href="http://143.198.71.129/part1/main1.php">Bookmarking Service</a></li>
                        <li><a href="http://143.198.71.129/part2/main2.php">Lesson Service</a></li>
                        <li><a href="http://143.198.71.129/tma2.html">Documentation</a></li>
                        <li><a href="../shared/logout.php">Logout</a></li>
                    </ul>
                </nav>

            </div>
        </div>
    </div>
</body>

</html>