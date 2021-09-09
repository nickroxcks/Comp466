<?php

/*
function sxe($url)
{   
    $xml = file_get_contents($url);
    foreach ($http_response_header as $header)
    {   
        if (preg_match('#^Content-Type: text/xml; charset=(.*)#i', $header, $m))
        {   
            switch (strtolower($m[1]))
            {   
                case 'utf-8':
                    // do nothing
                    break;

                case 'iso-8859-1':
                    $xml = utf8_encode($xml);
                    break;

                default:
                    $xml = iconv($m[1], 'utf-8', $xml);
            }
            break;
        }
    }

    return simplexml_load_string($xml);
}*/

session_start();
$userID = $_SESSION["idusers"];
//$location = 'upload/U_'.$_SESSION["idusers"].'_data.xml';
$location = "upload/U_12_data.xml";

$xmlString = file_get_contents($location);

if( ini_get('allow_url_fopen') ) {
    echo "allow url open is enabled...";
 }

libxml_use_internal_errors(true);

if (file_exists($location)) {
    echo "going to try loading file";
    echo htmlentities($xmlString);
    //$xml = sxe($location);  //this is a SimpleXMLElement class. Note: __toString returns the data of the object
    $xml = iconv("GB18030", "utf-8", $xmlString);
    $xml = simplexml_load_string($xml);
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