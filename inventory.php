<?php
    $serverName = 'localhost';
    $username = 'root';
    $password = '';
    $dbName = 'turnbattler';
    //mysql://b6c9359c6f6d71:e675ebe7@eu-cdbr-west-03.cleardb.net/heroku_3060400c25f2ef3?reconnect=true
    $conn = mysqli_connect($serverName, $username, $password, $dbName) or die('Error on connecting to MySQL server');

    $query = "SELECT * from potions";
    $result = mysqli_query($db,$query);
    $row =  mysqli_fetch_array($result);

    $email_id = $_REQUEST["q"];

    $sql = "SELECT * FROM potions WHERE email_id = ?;";
    $stmt = mysqli_stmt_init($conn);

    if(!mysqli_stmt_prepare($stmt,$sql))
    {
        header("location: ../index.html");
        exit("statement error")
    }

    mysqli_stmt_bind_param($stmt,"ss",$email_id);

    mysqli_stmt_execute($stmt);


