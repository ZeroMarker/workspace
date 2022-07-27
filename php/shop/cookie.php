<?php
setcookie("mk", "HELLO", time()+60);
if(isset($_COOKIE['mk'])) {
    echo $_COOKIE['mk'];
}
