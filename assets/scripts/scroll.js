const scrollToContent = function () {
    var element = document.getElementById("content");
    var headerOffset = 35;
    var elementPosition = element.getBoundingClientRect().top;
    var offsetPosition = elementPosition - headerOffset;
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };