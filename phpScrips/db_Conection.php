<?php
    function OpenConnection () {
        $dbHost = "localhost";
        $user = "root";
        $password = "";
        $db = "Netflix_Clone";

        $conn = new mysqli($dbHost, $user, $password, $db)or die("Couldn't connect to DB".$conn->error);
        return $conn;
    }

    function CloseConn($conn) {
        $conn -= close();
    }
 /*
    function OpenConnection () {
        $dbHost = "localhost";
        $user = "u703366481_root";
        $password = "yJoCs9uOh7P;";
        $db = "u703366481_Netflix_Clone";

        $conn = new mysqli($dbHost, $user, $password, $db)or die("Couldn't connect to DB".$conn->error);
        return $conn;
    }
    */
?>