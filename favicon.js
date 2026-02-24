(function () {
  var FAVICON_SYMBOL = "𓆏";
  var CANVAS_SIZE = 64;
  var FONT_SIZE = Math.round(CANVAS_SIZE * 0.82);
  var X_POSITION = CANVAS_SIZE / 2;
  var Y_POSITION = CANVAS_SIZE / 2 + CANVAS_SIZE * 0.05;

  function ensureFaviconElement() {
    var icon = document.querySelector('link[data-generated-favicon="true"]');
    if (icon) {
      return icon;
    }

    icon = document.createElement("link");
    icon.rel = "icon";
    icon.type = "image/png";
    icon.setAttribute("data-generated-favicon", "true");
    document.head.appendChild(icon);
    return icon;
  }

  function buildFaviconDataUrl() {
    var canvas = document.createElement("canvas");
    canvas.width = CANVAS_SIZE;
    canvas.height = CANVAS_SIZE;

    var context = canvas.getContext("2d");
    if (!context) {
      return null;
    }

    context.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillStyle = "#ffffff";
    context.font =
      FONT_SIZE +
      'px "Segoe UI Symbol", "Noto Sans Symbols 2", "Apple Symbols", sans-serif';
    context.fillText(FAVICON_SYMBOL, X_POSITION, Y_POSITION);

    return canvas.toDataURL("image/png");
  }

  function setFavicon() {
    var dataUrl = buildFaviconDataUrl();
    if (!dataUrl) {
      return;
    }

    var icon = ensureFaviconElement();
    icon.href = dataUrl;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setFavicon);
  } else {
    setFavicon();
  }
})();
