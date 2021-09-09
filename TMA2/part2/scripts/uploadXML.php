<?php

session_start();
$userID = $_SESSION["idusers"];
if(isset($_FILES['file']['name'])){
    // file name
    $filename = $_FILES['file']['name'];
 
    // Location
    $location = '../upload/U_'.$userID.'_data.xml';
 
    // file extension
    $file_extension = pathinfo($location, PATHINFO_EXTENSION);
    $file_extension = strtolower($file_extension);
 
    // Valid extensions
    $valid_ext = array("xml");
    //$valid_ext = array("pdf","doc","docx","jpg","png","jpeg");
    
    //check if valid file extension, if not, reject file and close cript. 
    if(in_array($file_extension,$valid_ext)){
       // Upload file
       if(!move_uploaded_file($_FILES['file']['tmp_name'],$location)){
          echo "error";
          exit();
       }
       else{
            echo $userID;
       } 
    }
    else{
        echo "error";
        exit();
    }
}
?>