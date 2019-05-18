const gui = new dat.GUI();

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const wave = {
  y: canvas.height / 2,
  length: 0.01,
  amplitude: 100,
  frequency: 0.01,
  bounce: true
};

const strokeColor = {
  h: 200,
  s: 50,
  l: 50,
  rainbow: true
};

const canvasColor = {
  r: 0,
  g: 0,
  b: 0,
  a: 0.01
};

const canvasFolder = gui.addFolder("canvas");

canvasFolder.add(canvasColor, "r", 0, 255);
canvasFolder.add(canvasColor, "g", 0, 255);
canvasFolder.add(canvasColor, "b", 0, 255);
canvasFolder.add(canvasColor, "a", 0, 1);

const waveFolder = gui.addFolder("wave");
waveFolder.add(wave, "y", 0, canvas.height);
waveFolder.add(wave, "length", -0.01, 0.01);
waveFolder.add(wave, "amplitude", -300, 300);
waveFolder.add(wave, "frequency", -0.01, 1);
waveFolder.add(wave, "bounce", true);

waveFolder.open();

const strokeFolder = gui.addFolder("stroke");

strokeFolder.add(strokeColor, "h", 0, 255);
strokeFolder.add(strokeColor, "s", 0, 255);
strokeFolder.add(strokeColor, "l", 0, 255);
strokeFolder.add(strokeColor, "rainbow", true);

let increment = wave.frequency;

function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = `rgba(${canvasColor.r},${canvasColor.g},${canvasColor.b},${
    canvasColor.a
  })`;
  c.fillRect(0, 0, canvas.width, canvas.height);

  c.beginPath();
  c.moveTo(0, canvas.height / 2);

  for (let i = 0; i < canvas.width; i++) {
    if (wave.bounce) {
      c.lineTo(
        i,
        wave.y +
          Math.sin(i * wave.length + increment) *
            wave.amplitude *
            Math.sin(increment)
      );
    } else {
      c.lineTo(
        i,
        wave.y + Math.sin(i * wave.length + increment) * wave.amplitude
      );
    }
  }
  if (strokeColor.rainbow) {
    c.strokeStyle = `hsl(${Math.abs(strokeColor.h * Math.sin(increment))},${
      strokeColor.s
    }%, ${strokeColor.l}%)`;
  } else {
    c.strokeStyle = `hsl(${strokeColor.h},${strokeColor.s}%, ${
      strokeColor.l
    }%)`;
  }
  c.stroke();
  increment += wave.frequency;
}
animate();
