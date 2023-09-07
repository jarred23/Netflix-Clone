
<!DOCTYPE html>
<html lang="en">
  <?php

    session_start();
    include 'phpScrips/db_Conection.php';
    $conn = OpenConnection();
    
    $username = $_SESSION['user'];

    $sql = "SELECT * FROM Users WHERE Email = '".$username."'";
    $result = $conn->query($sql);

    $img_url = '';

    while ($row = mysqli_fetch_assoc($result)){
      $img_url = $row['Img_url'];
      
    }
  ?>
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Home | Netflix</title>
    <link
      rel="icon"
      type="image/x-icon"
      href="assets/images/netflix favicon.png"
    />
    <link rel="stylesheet" href="css/Header&Footer.css" />
    <link rel="stylesheet" href="css/homePage.css" />
    <script src="js/main.js"></script>
    <script src="js/searchFunc.js"></script>
  </head>
  <body>
        <!-- navbar -->
    <div class="nav">
      <div class="nav__left">
        <img class="nav_logo" src="assets/images/logo.png" alt="" />
      </div>
      <nav class="nav-links">
        <ul>
          <li><a href="homePage.php">Home</a></li>
          <li><a href="TvShows.php">TV Shows</a></li>
          <li><a href="Movies.php">Movies</a></li>
          <li><a href="New&Popular.php">New & Popular</a></li>
          <li><a href="MyList.php">My List</a></li>
        </ul>
      </nav>
      <div class="nav__right">
        <img src="phpScrips/upload/<?php echo $img_url ?>" class="nav_avatar" alt="" />
      </div>
    </div>

    <!-- banner -->
    <header id="banner">
      <div id="banner__contents">
        <h1 id="banner__title"></h1>
        <div id="banner__buttons">
          <button id="banner__button">Play</button>
          <button id="banner__button">My List</button>
        </div>
        <p id="banner__description"></p>
      </div>
      <div id="banner__fadeBottom"></div>
    </header>

    <!-- row -->
    <div id="headrow">
      <div class="row">
        <h2 class="row__title"></h2>
        <div class="row__posters"></div>
      </div>
    </div>

    <script src="js/searchFunc.js"></script>

    <script>
      window.addEventListener("scroll", function () {
        var nav = document.querySelector(".nav");
        nav.classList.toggle("active", window.scrollY > 0);
      });
    </script>
  </body>
</html>



