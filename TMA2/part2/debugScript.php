<?php


session_start();
$userID = $_SESSION["idusers"];
//$location = 'upload/U_'.$_SESSION["idusers"].'_data.xml';
$location = 'http://143.198.71.129/part2/upload/U_'.$_SESSION["idusers"].'_data.xml';

/*
if( ini_get('allow_url_fopen') ) {
    echo "allow url open is enabled...";
 }

if (file_exists($location)) {
    echo "going to try loading file";
    $xml = simplexml_load_file($location);  //this is a SimpleXMLElement class. Note: __toString returns the data of the object
    echo "success";
}
else{
    echo "file not in path";
}

echo "test";
*/
$url = $location;
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$xmlresponse = curl_exec($ch);
$xml=simplexml_load_string($xmlresponse);
print_r($xml);
?>