<?php
echo "Today is ".date("l").".\n";

$mac = true;    // variable

echo "<h2>$mac</h2>";

$arr = array("MySql", "JavaScript", "Golang", "MongoDB", "Redis");

echo $arr[1];

$host = "127.0.0.1";
$user = "root";
$pwd = "123456";
$dataBase = "mysql";
$conn = mysqli_connect($host, $user, $pwd);
if($conn){
    echo "<script type='text/javascript'>alert('Database connect successful!')</script>";
}else{
    echo "<script type='text/javascript'>alert('Database connect failed!')</script>";
}

if(mysqli_select_db($conn, $dataBase)){
    echo "<script type='text/javascript'>alert('Select database successful!')</script>";
}else{
    echo "<script type='text/javascript'>alert('Select database connect failed!')</script>";
}




