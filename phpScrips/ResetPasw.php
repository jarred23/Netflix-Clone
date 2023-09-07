<?php

    include 'db_Conection.php';
    $conn = OpenConnection();

    $sql = 'SELECT * FROM Users ';

    $result = $conn->query($sql);

    $exist = false;

    $userEmail = $_POST['Email'];

    $userName = '';

    $resiver = '';
    
    while($row= mysqli_fetch_assoc($result)){
        if($row['Email'] == $userEmail  ) {
            $exist = true;
            $resiver = $row['Email'];
            $userName = $row['Fullname'];
            break;
        }
    }

    function sendEmail() {
        /*
        $to = $userEmail;
        $from = 'Jarredcockett2003@gmail.com';
        $fromName = 'Netflix System Admin Clone';

        $subject = 'Netflix Clone Password Reset';
        $message = 'Please see the link below to reset your Netflix Clone Password NOW!.. \n Please Copy and Paste the following link in your browser to continue '; //ADD LINK 
        $headers = 'from : '.$fromName .'<'.$from.'>';
        */
                    
            $to = '$resiver';
            $subject = "Netflix System Admin Clone";
            $message = 'Please see the link below to reset your Netflix Clone Password NOW!.. \n Please Copy and Paste the following link in your browser to continue '; //ADD LINK 
            $headers =
                "From: Jarredcockett2003@gmail.com" .
                "\r\n" .
                "Reply-To: reply@NetflixClone.com" .
                "\r\n" .
                mail($_POST['Email'], $subject, $message, $headers, );

        if(mail($_POST['Email'], $subject, $message, $headers )){
            echo 'Email sent successfully';
        }else{
            echo 'Email not send!';
        }

    }
   
    if($exist == true){
        sendEmail();
        header("Location: ../ExternalHtml/checkEmail.html ");
        exit();
    }else {
        header("Location: ../ExternalHtml/emailNotFound.html ");
        exit();
    }

 
?>