<!DOCTYPE html>
<html lang="en">
  <head>
     <?php
    session_start();
    include 'phpScrips/db_Conection.php';
    $conn = OpenConnection();

    $username = $_SESSION['user'];

    $sql = "SELECT * FROM Users WHERE Email = '".$username."'";
    $result = $conn->query($sql);

    $result = $conn->
    query($sql); $img_url = ''; while ($row = mysqli_fetch_assoc($result)){
    $img_url = $row['Img_url']; } ?>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>TV Details</title>
    <link
      rel="icon"
      type="image/x-icon"
      href="assets/images/netflix favicon.png"
    />
    <link rel="stylesheet" href="css/tv-details.css" />
    <link rel="stylesheet" href="css/Header&Footer.css"/>
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
        <img
          src="phpScrips/upload/<?php echo $img_url ?>"
          class="nav_avatar"
          alt=""
        />
      </div>
    </div>
    <br>
    <br>
    <br>
    <br>
    <br>
  


    <div class="movie-details">
      <div id="trailer">
        <!-- YouTube trailer embed will be displayed here -->
      </div>
      <div id="tv-info">
        <h6 id="tv-info"></h6>
      </div>
    </div>





















    <script>
      // Function to fetch movie details by ID
      function fetchMovieDetails(Tv_id) {
        const apiKey = "0f55fe2a694492b1ce3e112be30c78aa";
        const movieDetailsUrl = `https://api.themoviedb.org/3/tv/${Tv_id}?api_key=${apiKey}&language=en-US`;

        fetch(movieDetailsUrl)
          .then((response) => response.json())
          .then((data) => {
            const TvInfo = document.getElementById("tv-info");
            TvInfo.innerHTML = `
                        <h2>${data.title}</h2>
                        <p>${data.overview}</p>
                        <p>Release Date: ${data.release_date}</p>
                    `;

            // Now, let's fetch and display the movie trailer (you'll need to adapt this to your API).
            const trailer = document.getElementById("trailer");

            // Example: Fetch movie videos from TMDb
            const TvVideosUrl = `https://api.themoviedb.org/3/tv/${Tv_id}/videos?api_key=${apiKey}&language=en-US`;

            fetch(TvVideosUrl)
              .then((response) => response.json())
              .then((videoData) => {
                // Check if there are videos available
                if (videoData.results.length > 0) {
                  // Assuming you want to embed the first video (you can loop through the results if there are multiple)
                  const firstVideoKey = videoData.results[0].key;
                  const youtubeEmbedUrl = `https://www.youtube.com/embed/${firstVideoKey}`;

                  // Create an iframe element to embed the YouTube video
                  const iframe = document.createElement("iframe");
                  iframe.src = youtubeEmbedUrl;
                  iframe.width = "1250"; // Adjust the width as needed
                  iframe.height = "720"; // Adjust the height as needed
                  iframe.frameborder = "0";
                  iframe.allowfullscreen = true;

                  // Append the iframe to the trailer div
                  trailer.appendChild(iframe);
                } else {
                  trailer.innerHTML = "<p>No trailer available.</p>";
                }
              })
              .catch((error) => {
                console.error("Error fetching tv videos:", error);
              });
          })
          .catch((error) => {
            console.error("Error fetching tv details:", error);
          });
      }

      // Get the Tv ID from the URL parameter
      const urlParams = new URLSearchParams(window.location.search);
      const TvId = urlParams.get("id");

      // Fetch and display Yv details based on the Tv ID
      fetchMovieDetails(TvId);
    </script>
  </body>
</html>
