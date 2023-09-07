function passwordVis() {
  var x = document.getElementById("Password2");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}

