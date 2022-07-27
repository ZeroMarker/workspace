<?php
include_once("fox.php");
global $conn;
$result = mysqli_query($conn, "select User from user;");
if(!$result){
    echo "Failed";
    exit();
}
while($myrow=mysqli_fetch_array($result)){

?>
<tr>
    <td><span><?php echo $myrow[0];?></span></td>
</tr>
<?php
}
?>