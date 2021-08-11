<?xml version="1.0"?>

<xsl:stylesheet version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:template match="/">
<html>
<head>

<style>

    h2{

        font-size: 22pt;
        text-align: center;
    }

    h3 {
        font-size: 12pt;
        text-align: center;
    }

    .name{

        color: #fff;
        background-color: #008080;
        text-align: center;
        display: inline-block;	
        width: 100%;
        height: 100px;
        line-height: 100px;
        font-size: 36px;
	    text-transform: uppercase;
	    letter-spacing: 1px;
	    color: #fff;
	    font-weight: 700;
	    margin-right: 100px;

    }

    .resume_content{

        text-align: center;
        margin-top: 4px;
        margin-right: 4px;
        margin-bottom: 4px;
        margin-left: 4px;
    }

    .work_experience_content{
        display: table;
        margin: 0 auto;
    }

    div{
        margin-top: 30px;
    }

</style>
</head>
<body>
<header class="name">
    <xsl:value-of select="resume/general_info/name"/>
</header>

<!-- Personal Info-->
<section>
    <h2> <xsl:value-of select="resume/general_info/section_heading"/> </h2>
    <p class="resume_content"><xsl:value-of select="resume/general_info/address"/></p>
    <p class="resume_content"><xsl:value-of select="resume/general_info/phone_number"/></p>
    <p class="resume_content"><xsl:value-of select="resume/general_info/email"/></p>
    <p class="resume_content">Personal website: <xsl:value-of select="resume/general_info/personal_website_link"/></p>
</section>

<!--Educational Info-->
<section>
    <h2> <xsl:value-of select="resume/education/section_heading"/> </h2>
    <p class="resume_content"> <xsl:value-of select="resume/education/program_name"/> </p>
    <p class="resume_content"> <xsl:value-of select="resume/education/university_name"/>, <xsl:value-of select="resume/education/date_attended"/> </p>
    <xsl:for-each select="resume/education/course_load">
        <p class="resume_content"> <xsl:value-of select="course_load_content"/> </p>
    </xsl:for-each>
</section>

<!--Work Experience Info-->
<section>
    
    <h2> <xsl:value-of select="resume/work_experience/section_heading"/> </h2>
    <xsl:for-each select="resume/work_experience/job">
        <div>
            <h3> <xsl:value-of select="position"/>, <xsl:value-of select="employer"/>, <xsl:value-of select="date_attended"/></h3>
            <ul class="work_experience_content">
            <xsl:for-each select="work_experience_info">
                <li> <xsl:value-of select="work_experience_content"/> </li>
            </xsl:for-each>
            </ul>
        </div>
    </xsl:for-each>
</section>

<!--Skills-->
<section>
    <h2> <xsl:value-of select="resume/skills/section_heading"/> </h2>
    <xsl:for-each select="resume/skills/skill_info">
        <p class="resume_content"><xsl:value-of select="skill_content"/></p>
    </xsl:for-each>
</section>
</body>

</html>
</xsl:template>

</xsl:stylesheet>