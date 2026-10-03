(function () {
  var iframe = document.createElement("iframe");
  iframe.src =
    "https://lightpollutionmap.app/pt/embed?lat=-21.899700&lng=-42.537600&zoom=6&opacity=50";
  iframe.width = "800";
  iframe.height = "600";
  iframe.frameBorder = "0";
  iframe.style.border = "0";
  iframe.allowFullscreen = true;
  iframe.title = "Light Pollution Map";

  var container = document.getElementById("lightpollution-map-widget");
  if (container) {
    container.appendChild(iframe);
  }
})();
