<?php
    $db = mysqli_connect('localhost','root','','turnbattler') or die('Error on connecting to MySQL server')
?>

<?php 
        $query = "SELECT * from potions";
        $result = mysqli_query($db,$query);
        $row =  mysqli_fetch_array($result);
        echo $row;
        mysqli_close($db);
    ?>