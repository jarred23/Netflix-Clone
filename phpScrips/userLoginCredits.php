<?php 

    session_start();
    include 'db_Conection.php';
    $conn = OpenConnection();
    
    $userName = mysqli_real_escape_string($conn, $_POST['Email']);
    $password = mysqli_real_escape_string($conn, $_POST['Password']);

    $query = "SELECT * FROM Users WHERE Email = '".$userName."' AND Password = '".$password."'";

    $result = mysqli_query($conn, $query);

    $userEmail = $_POST['Email'];

   

    if (mysqli_num_rows($result)==1) {
        $_SESSION['user'] = $userEmail;
        header("location:../homePage.php?userEmail=".$userEmail);
        exit();
    }else {
        header("location:../signIn.php");
        exit();
    };
    
    
?>
