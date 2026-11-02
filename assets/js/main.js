(function () {
  'use strict';

  document.querySelectorAll('[data-video]').forEach(function (wrapper) {
    var video = wrapper.querySelector('video');
    var button = wrapper.querySelector('.video__play');
    if (!video || !button) return;

    // Adres filmu ma fragment #t=, dzięki któremu przed odtworzeniem widać klatkę
    // z nagrania zamiast czarnego ekranu; samo odtwarzanie zaczyna się od początku.
    var started = false;

    function setState(playing) {
      wrapper.classList.toggle('is-playing', playing);
      button.setAttribute('aria-label', playing ? 'Wstrzymaj film' : 'Odtwórz film');
    }

    button.addEventListener('click', function () {
      if (video.paused || video.ended) {
        video.muted = false;
        if (!started) {
          video.currentTime = 0;
          started = true;
        }
        var attempt = video.play();
        if (attempt && typeof attempt.catch === 'function') {
          attempt.catch(function () { setState(false); });
        }
      } else {
        video.pause();
      }
    });

    video.addEventListener('play', function () { setState(true); });
    video.addEventListener('pause', function () { setState(false); });
    video.addEventListener('ended', function () {
      video.currentTime = 0;
      setState(false);
    });
  });
})();
