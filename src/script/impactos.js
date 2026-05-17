/* =============================================
   IMPACTOS — impactos.js
   ============================================= */

(function () {
  var cards = document.querySelectorAll(".impacto-card");

  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          var idx = Array.from(cards).indexOf(e.target);
          e.target.style.transitionDelay = idx * 120 + "ms";
          e.target.style.opacity = "1";
          e.target.style.transform = "translateY(0)";
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.15 },
  );

  cards.forEach(function (c) {
    c.style.opacity = "0";
    c.style.transform = "translateY(40px)";
    c.style.transition = "opacity 0.75s ease, transform 0.75s ease";
    io.observe(c);
  });
})();
