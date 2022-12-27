const gallery = document.getElementById('gallery');

gallery.addEventListener('mousemove', (event) => {
  const mouseX = event.clientX;
  const mouseY = event.clientY;

  const xDecimal = mouseX / window.innerWidth;
  const yDecimal = mouseY / window.innerHeight;

  const maxX = gallery.offsetWidth - window.innerWidth;
  const maxY = gallery.offsetHeight - window.innerHeight;

  const panX = maxX * xDecimal * -1;
  const panY = maxY * yDecimal * -1;

  gallery.animate(
    {
      transform: `translate(${panX}px, ${panY}px)`,
    },
    {
      duration: 4000,
      fill: 'forwards',
      easing: 'ease',
    },
  );
});
