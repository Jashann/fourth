
  // When clicked displaying Embed Video
document.querySelector("#embed-video-title a i").onclick = function(e)
{
e.preventDefault();
document.querySelector('#embed-video-title').style = "display : none";
document.querySelector('#embed-video').style = "display : flex";
}

