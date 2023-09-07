<?php
    include 'db_Conection.php';
    $conn = OpenConnection();
   
    function genarateIDs(){
        $characters = "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        $characterLength = strlen($characters);
        $randomString = "";
        for ($i = 0; $i < 15; $i++) {
            $randomString .= $characters[random_int(0, $characterLength -1)];
        }
        return $randomString;
    }

    $ID = genarateIDs(); 

    $pic = "";

    if(isset($_FILES["pic"]) && $_FILES["pic"]["error"] == 0){
           $allowed = array("jpg" => "image/jpg", "jpeg" => "image/jpeg", "gif" => "image/gif", "png" => "image/png");
           $filename = $_FILES["pic"]["name"];
           $filetype = $_FILES["pic"]["type"];
           $filesize = $_FILES["pic"]["size"];

           // Verify file extension
           $ext = pathinfo($filename, PATHINFO_EXTENSION);
           if(!array_key_exists($ext, $allowed)) die("Error: Please select a valid file format.");

           // Verify file size - 5MB maximum
           $maxsize = 5 * 1024 * 1024;
           if($filesize > $maxsize) die("Error: File size is larger than the allowed limit.");

           // Verify MYME type of the file
           if(in_array($filetype, $allowed)){
               // Check whether file exists before uploading it
               if(file_exists("upload/" . $filename)){
                   echo $filename . " is already exists.";
               } else{
                   //move_uploaded_file($_FILES["pic"]["tmp_name"], "upload/" . $filename);
                    if (move_uploaded_file($_FILES['pic']['tmp_name'], 'upload/' . $filename)) {
                            
                        } else {
                            echo "Upload failed";
                        }

                     $pic = $filename;
               }
           } else{
               echo "Error: There was a problem uploading your file. Please try again.";
           }
            }else{
                echo "Error: " . $_FILES["pic"]["error"];
            }

    
    $user_name = $_POST["Fullname"];
    $user_email = $_POST["Email"];
    $user_password = $_POST["Password"];




    if (!$conn -> query(
        "INSERT INTO Users (ID, Fullname, Email, Password, Img_url)
        VALUES ('$ID', '$user_name', '$user_email', '$user_password', '$pic' )"
    )){
        echo("errorDescription".$conn->error);
    }
    header("Location:../signIn.html");
    exit
?>


