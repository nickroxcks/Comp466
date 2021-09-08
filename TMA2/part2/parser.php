<?php

session_start();
var_dump(ini_get('allow_url_fopen'));
function console_log($output, $with_script_tags = true) {
    $js_code = 'console.log(' . json_encode($output, JSON_HEX_TAG) . 
');';
    if ($with_script_tags) {
        $js_code = '<script>' . $js_code . '</script>';
    }
    echo $js_code;
}

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
    
    //check if valid file extension, if not, reject file and close cript. 
    if(in_array($file_extension,$valid_ext)){
       // Upload file
       if(!move_uploaded_file($_FILES['file']['tmp_name'],$location)){
          echo 1;
          exit();
       } 
    }
    else{
        echo 0;
        exit();
    }
    //Check if file exists
    echo "check if file exists";
    if (file_exists($location)) {
        echo " file exists, going to load xml.";
        echo " file is at:" . $location;
        $xml = simplexml_load_file($location);  //this is a SimpleXMLElement class. Note: __toString returns the data of the object
        echo " loading has worked";
        $unitArray = array();  //unitArray[0] = Introduction html, unitArray[1][0] = html of Unit 1 page 1, unitArray[2][2] html of unit 2 page 3...
        $quizArray = array();  //quizArray[1][0] html div for unit 1 question 1
        $quizAnswers = array();  //quizAnswers[1][0] Answer for unit 1 question 1
        $maxPages = array();
        $lessonName = '';
        $authorName = '';
        //$totalUnits = count($xmlArray["Lesson"]["LessonContent"]);
        $totalUnits = count($xml->xpath('/Lesson/LessonContent/Unit'));  //not including introduction
        if($totalUnits < 1){
            echo 2;
            exit();
        }
        //build heading navigation
        $headerStr = "<div class=\"fas fa-bars nav_button\" id=\"menubutton\"> SimpleDev</div>" .
        "<div class=\"fas nav_button\" onclick=\"clickUnitButton(0)\" id=\"introductionButton\">Introduction</div>";
        for($x=1; $x <=$totalUnits;$x++){
            $headerStr = $headerStr . "<div class=\"fas nav_button\" onclick=\"clickUnitButton(". $x . ")\" id=\"unit" . $x . "Button\">Unit ". $x . "</div>";
        }

        //begin parsing content. If ever we come across an unknown eml element, we reject the file and end the script
        foreach($xml->children() as $parentValue){

            //Start building introduction page. This should happen first
            if(($parentValue->getName()) == "Introduction"){
                $introductionStr = '';
                foreach($parentValue->children() as $childValue){

                    if($childValue->getName()=="Title"){
                        $introductionStr = $introductionStr . "<div class=\"main2-banner-title\">" . $childValue . "</div>" .
                        "<div id=\"main2-banner-content\">";
                    }
                    
                    else if($childValue->getName()=="Paragraph"){
                        $introductionStr = $introductionStr . "<p class=\"main2-banner-content-text-centered\">" .  $childValue. "</p>";
                    }

                    else if($childValue->getName()=="Image"){
                        $introductionStr = $introductionStr . "<img class=\"main2-banner-content-image-centered\" src=\"" . $childValue. "\" />";
                    }

                    else{
                        echo 0;
                        exit();
                    }
                    
                }
                $introductionStr = $introductionStr . "</div>";
                $unitArray[0] = $introductionStr;

            }
            else if(($parentValue->getName()) == "LessonContent"){
                //put this loop here in case for later if I change EML layout
                $unitNumber = 1; //start at unit 1
                foreach($parentValue->children() as $childValue){
                    if($childValue->getName()=="Unit"){
                        //loop through all the pages in each unit, and build html string
                        $currentUnit = array();
                        $pageNumber = 0;
                        foreach($childValue->children() as $secondChildValue){
                            if($secondChildValue->getName()=="Page"){
                                $strContent = '';
                                foreach($secondChildValue->children() as $thirdChildValue){
                                    if($thirdChildValue->getName()=="Title"){
                                        $strContent = $strContent . "<div class=\"main2-banner-title\">" . $thirdChildValue . "</div>" .
                                        "<div id=\"main2-banner-content\">";
                                    }
                                    else if($thirdChildValue->getName()=="Paragraph"){
                                        $strContent = $strContent . "<p class=\"main2-banner-content-text-centered\">" .  $thirdChildValue . "</p>";
                                    }
                                    else if($thirdChildValue->getName()=="Image"){
                                        $strContent = $strContent . "<img class=\"main2-banner-content-image-centered\" src=\"" . $thirdChildValue . "\" />";
                                    }
                                }
                                $currentUnit[$pageNumber] = $strContent . "</div>";
                                $pageNumber++;
                                //file_put_contents('Welcome.html',$strContent);  //TODO:: move this to user lesson directory
                            }
                            else{
                                echo 0;
                                exit();
                            }
                        }
                        $unitArray[$unitNumber] = $currentUnit;
                        $unitNumber++;
                    }
                    else{
                        echo 3;
                        exit();
                    }
                }
            }
            else if(($parentValue->getName()) == "LessonName"){
                $lessonName = $parentValue;
            }
            else if(($parentValue->getName()) == "Author"){
                $authorName = $parentValue;
            }
            else if(($parentValue->getName()) == "Quiz"){
                $currentUnitNumber = 1;
                foreach($parentValue->children() as $childValue){
                    if($childValue->getName()=="Unit"){
                        //loop through all the pages in each unit, and build html string
                        $currentQuiz = array();
                        $currentAnswers = array();
                        $questionNumber = 0;
                        foreach($childValue->children() as $secondChildValue){
                            if($secondChildValue->getName()=="MultipleChoice"){
                                $strContent = '';
                                foreach($secondChildValue->children() as $thirdChildValue){
                                    if($thirdChildValue->getName()=="Question"){
                                        $strContent = $strContent . "<div><p>" . ($questionNumber+1) .". " . $thirdChildValue . "</p><ul>";
                                    }
                                    else if($thirdChildValue->getName()=="A"){
                                        $strContent = $strContent . "<li>A) <input type=\"radio\" name=\"q" . ($questionNumber+1) . 
                                        "\" id=\"q" . ($questionNumber+1) . "A\"</li>" . $thirdChildValue . "</li>";
                                    }
                                    else if($thirdChildValue->getName()=="B"){
                                        $strContent = $strContent . "<li>B) <input type=\"radio\" name=\"q" . ($questionNumber+1) . 
                                        "\" id=\"q" . ($questionNumber+1) . "B\"</li>" . $thirdChildValue . "</li>";
                                    }
                                    else if($thirdChildValue->getName()=="C"){
                                        $strContent = $strContent . "<li>A) <input type=\"radio\" name=\"q" . ($questionNumber+1) . 
                                        "\" id=\"q" . ($questionNumber+1) . "C\"</li>" . $thirdChildValue . "</li>";
                                    }
                                    else if($thirdChildValue->getName()=="D"){
                                        $strContent = $strContent . "<li>A) <input type=\"radio\" name=\"q" . ($questionNumber+1) . 
                                        "\" id=\"q" . ($questionNumber+1) . "D\"</li>" . $thirdChildValue . "</li>";
                                    }
                                    else if($thirdChildValue->getName()=="Answer"){
                                        $strContent = $strContent . "</ul></div>";
                                        $currentAnswers[$questionNumber] = $thirdChildValue;
                                    }
                                    else{
                                        echo 0;
                                        exit();
                                    }
                                }
                                $currentQuiz[$questionNumber] = $strContent;
                                $questionNumber++;
                            }
                            else{
                                echo 0;
                                exit();
                            }
                        }
                        $quizArray[$currentUnitNumber] = $currentQuiz;
                        $quizAnswers[$currentUnitNumber] = $currentAnswers;
                        $currentUnitNumber++;
                    }
                    else{
                        echo 0;
                        exit();
                    }
                }
            }
            else{
                echo 0;
                exit();
            }
        }
        //finally, make sure there is a lesson name and author
        if($lessonName == '' || $authorName == ''){
            echo 0;
            exit();
        }

        //all checks have passed, now we add the lesson to the DB, and save the files
        require_once "../shared/dbConfig.php";
        $stmt = $mysqli->prepare('INSERT INTO lessons (lesson_name, author_name, author_id, auth_users) VALUES (?,?,?,?)');
        $stmt->bind_param('ssis', $lessonName, $authorName, $_SESSION["idusers"], $_SESSION["idusers"]);
        $stmt->execute();
        $result = $stmt->get_result();

        //retrieve the new lesson_id
        $stmt = $mysqli->prepare('SELECT * FROM lessons WHERE lessons.author_id = ? AND lessons.lesson_name = ?');
        $stmt->bind_param('is', $_SESSION["idusers"], $lessonName);
        $stmt->execute();
        $result = $stmt->get_result();

        $row = $result->fetch_array(MYSQLI_ASSOC);
        $lessonId = null;
        if($row){
            $lessonId = $row["lesson_id"];
        }
        else{
            echo 0;
            exit();
        }

        //echo $unitArray[1][0];
        if(!is_dir("../Users/U_" . $_SESSION["idusers"])){  //this error should not occur, but a check is here just in case
            echo 0;
            exit();
        }
        if (!mkdir("../Users/U_" . $_SESSION["idusers"] . "/L_" . $lessonId)) {
            echo 0;
            exit();
        }

        //We've made the lesson folder, now we save all the files in the correspoding lesson folder for that user
        file_put_contents("../Users/U_" . $_SESSION["idusers"] . "/L_" . $lessonId . "/Introduction.html",$unitArray[0]);  //introduction

        $pagesStr = "";
        for($i=1;$i<=$totalUnits;$i++){
            for($j=0;$j<sizeof($unitArray[$i]);$j++){  //all pages for each unit
                file_put_contents("../Users/U_" . $_SESSION["idusers"] . "/L_" . $lessonId . "/U" . $i . "_P" . ($j + 1) . ".html",$unitArray[$i][$j]);
            }
            if($i!=$totalUnits){
                $pagesStr = $pagesStr . sizeof($unitArray[$i]) . ",";
            }
            else{
                $pagesStr = $pagesStr . sizeof($unitArray[$i]);
            }
        }
        file_put_contents("../Users/U_" . $_SESSION["idusers"] . "/L_" . $lessonId . "/pageInfo.txt",$pagesStr);  //make a pages file
        
        /*
            <div class="fas nav_button">
                <ul class="fas" id="quizul">Quizzes
                    <li id="Main2-Nav-Quiz1-button" class="nav_dropdown">Quiz1</li>
                    <li id="Main2-Nav-Quiz2-button" class="nav_dropdown">Quiz2</li>
                    <li id="Main2-Nav-Quiz3-button" class="nav_dropdown">Quiz3</li>
                </ul>
            </div>
        */
        $headerStr = $headerStr . "<div class=\"fas nav_button\"> <ul class=\"fas\" id=\"quizul\">Quizzes";
        for($i=1;$i<=sizeof($quizArray);$i++){  //build quizes. Each html file are several div's (1 div for each question)
            $strContent = "";
            for($j=0;$j<sizeof($quizArray[$i]);$j++){ 
                $strContent = $strContent . $quizArray[$i][$j];
            }
            file_put_contents("../Users/U_" . $_SESSION["idusers"] . "/L_" . $lessonId . "/Q" . $i . ".html",$strContent);
            $headerStr = $headerStr . "<li id=\"Quiz-".$i."-Button\" onclick=\"clickQuizButton(" . $i . ")\" class=\"nav_dropdown\">Quiz".$i."</li>";
        }
        $headerStr = $headerStr . "</ul></div>";
        file_put_contents("../Users/U_" . $_SESSION["idusers"] . "/L_" . $lessonId . "/Header.html",$headerStr);  //header
        // Store the path of source file
        $source = 'html/htmlTemplate.php'; 
        
        // Store the path of destination file
        $destination = "../Users/U_" . $_SESSION["idusers"] . "/L_" . $lessonId . "/index.php"; 
        
        if(!copy($source, $destination) ) { 
            echo 0; 
            exit();
        }
        //create a copy of the data file in the lesson folder
        if(!copy($location, "../Users/U_" . $_SESSION["idusers"] . "/L_" . $lessonId . "/data.xml")){
            echo 0;
            exit();
        }
        echo $lessonId . ',' . $lessonName;  //lesson has been successfully created. return the lessonid and the lessonName
    } 
    else {
        echo 0;
        exit();
    }
}
?>