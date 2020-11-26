<?php
    $db = mysqli_connect('localhost','root','','turnbattler') or die('Error on connecting to MySQL server');

    $query = "SELECT * from potions";
    $result = mysqli_query($db,$query);
    $row =  mysqli_fetch_array($result);

    $q = $_REQUEST["q"];

    echo $row[$q];

    mysqli_close($db);
    ?>