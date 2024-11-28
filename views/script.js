var $messages = $(".messages-content"),
  d,
  h,
  m,
  i = 0;
console.log(273618273186, $messages);
$(window).load(function () {
  $messages.mCustomScrollbar();
  setTimeout(function () {
    fakeMessage();
  }, 100);
});

function updateScrollbar() {
  $messages.mCustomScrollbar("update").mCustomScrollbar("scrollTo", "bottom", {
    scrollInertia: 10,
    timeout: 0,
  });
}

function setDate() {
  d = new Date();
  if (m != d.getMinutes()) {
    m = d.getMinutes();
    $('<div class="timestamp">' + d.getHours() + ":" + m + "</div>").appendTo(
      $(".message:last"),
    );
  }
}

function insertMessage() {
  msg = $(".message-input").val();
  if ($.trim(msg) == "") {
    return false;
  }
  $('<div class="message message-personal">' + msg + "</div>")
    .appendTo($(".mCSB_container"))
    .addClass("new");
  setDate();
  $(".message-input").val(null);
  updateScrollbar();
  setTimeout(
    function () {
      fakeMessage();
    },
    1e3 + Math.random() * 20 * 100,
  );
}
$(".message-submit").click(function () {
  insertMessage();
});
$(window).on("keydown", function (e) {
  if (e.which == 13) {
    insertMessage();
    return false;
  }
});
var Fake = [
  "Hola como estas?",
  "That's awesome",
  "Codepen is a nice place to stay",
  "I think you're a nice person",
  "Why do you think that?",
  "Can you explain?",
  "Anyway I've gotta go now",
  "It was a pleasure chat with you",
  "Time to make a new codepen",
  "Bye",
  ":)",
];

function fakeMessage() {
  if ($(".message-input").val() != "") {
    return false;
  }
  $(
    '<div class="message loading new"><figure class="avatar"><img src="https://www.pikpng.com/pngl/b/109-1099794_ios-emoji-emoji-iphone-ios-heart-hearts-spin.png" /></figure><span></span></div>',
  ).appendTo($(".mCSB_container"));
  updateScrollbar();
  setTimeout(
    function () {
      $(".message.loading").remove();
      $(
        '<div class="message new"><figure class="avatar"><img src="https://www.pikpng.com/pngl/b/109-1099794_ios-emoji-emoji-iphone-ios-heart-hearts-spin.png" /></figure>' +
          Fake[i] +
          "</div>",
      )
        .appendTo($(".mCSB_container"))
        .addClass("new");
      setDate();
      updateScrollbar();
      i++;
    },
    1e3 + Math.random() * 20 * 100,
  );
}
