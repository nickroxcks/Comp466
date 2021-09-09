<?php


session_start();
$userID = $_SESSION["idusers"];
$location = 'upload/U_'.$_SESSION["idusers"].'_data.xml';


if (file_exists($location)) {
    echo "going to try loading file";
    $xml = simplexml_load_file($location);  //this is a SimpleXMLElement class. Note: __toString returns the data of the object
    echo "success";
}
else{
    echo "file not in path";
}

echo "test";
?>