<?php


session_start();
$userID = $_SESSION["idusers"];
//$location = 'upload/U_'.$_SESSION["idusers"].'_data.xml';
$location = 'upload/U_12_data.xml';



if( ini_get('allow_url_fopen') ) {
    echo "allow url open is enabled...";
 }

libxml_use_internal_errors(true);

if (file_exists($location)) {
    echo "going to try loading file";
    $xml = simplexml_load_file($location);  //this is a SimpleXMLElement class. Note: __toString returns the data of the object
    foreach( libxml_get_errors() as $error ) {

        print_r($error);
    
    }
    echo "success";
}
else{
    echo "file not in path";
}

echo "test";

/*
$url = $location;
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$xmlresponse = curl_exec($ch);
$xml=simplexml_load_string($xmlresponse);
print_r($xml);*/
?>