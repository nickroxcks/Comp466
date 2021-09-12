<?php

session_start();
$userID = $_SESSION["idusers"];
//$location = 'upload/U_'.$_SESSION["idusers"].'_data.xml';
$location = "upload/U_12_data.xml";

$xmlString = file_get_contents($location);

if( ini_get('allow_url_fopen') ) {
    echo "allow url open is enabled...";
 }

libxml_use_internal_errors(true);
echo 'Current PHP version: ' . phpversion();
if (file_exists($location)) {
    echo "going to try loading file">;
    echo $xmlString;
    $dom = new DOMDocument;
    $dom->loadXML($xmlString);
    echo "success";
    $Answers = $dom->getElementsByTagName('Answer');
    foreach ($Answers as $Answer) {
        echo $Answer->nodeValue, PHP_EOL;
    }


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