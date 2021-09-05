<?php
session_start();
if(isset($_FILES['file']['name'])){
    // file name
    $filename = $_FILES['file']['name'];
 
    // Location
    $location = 'upload/U_'.$_SESSION["idusers"].'_data.xml';
 
    // file extension
    $file_extension = pathinfo($location, PATHINFO_EXTENSION);
    $file_extension = strtolower($file_extension);
 
    // Valid extensions
    $valid_ext = array("xml");
    //$valid_ext = array("pdf","doc","docx","jpg","png","jpeg");
 
    if(in_array($file_extension,$valid_ext)){
       // Upload file
       if(move_uploaded_file($_FILES['file']['tmp_name'],$location)){
          echo 1;
          //exit();
       } 
    }
}
?>