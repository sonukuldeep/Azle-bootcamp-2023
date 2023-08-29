export const Move = {
  x: 0,
  y: 0,
};

// handle movement
export const keyDown = (e: KeyboardEvent) => {
  e.preventDefault();
  switch (e.key) {
    case 'w':
    case 'ArrowUp':
      Move.y = 1;
      break;
    case 'a':
    case 'ArrowLeft':
      Move.x = 1;
      break;
    case 's':
    case 'ArrowDown':
      Move.y = -1;
      break;
    case 'd':
    case 'ArrowRight':
      Move.x = -1;
      break;
    default:
    // console.log(e.key);
  }
};

export const keyUp = (e: KeyboardEvent) => {
  e.preventDefault();

  switch (e.key) {
    case 'w':
    case 'ArrowUp':
      Move.y = 0;
      break;
    case 'a':
    case 'ArrowLeft':
      Move.x = 0;
      break;
    case 's':
    case 'ArrowDown':
      Move.y = 0;
      break;
    case 'd':
    case 'ArrowRight':
      Move.x = 0;
      break;
    default:
    // console.log(e.key);
  }
};

// mouse controls
function beginSliding(e: TouchEvent, canvasCenter: number, touchPoint: number) {
  e.preventDefault();
  touchPoint = e.touches[0].clientX;
  if (touchPoint > canvasCenter) Move.x = -1;
  else Move.x = 1;
}

function stopSliding(e: TouchEvent) {
  e.preventDefault();
  Move.x = 0;
}

export function mouseControls(canvas: HTMLCanvasElement) {
  // const canvas = document.querySelector("main")!;
  const canvasCenter = canvas.clientWidth / 2;
  const touchPoint = 0;
  canvas.ontouchstart = (e) => beginSliding(e, canvasCenter, touchPoint);
  canvas.ontouchend = stopSliding;
}
