
const canvas = document.getElementById("canvas");


const ctx = canvas.getContext("2d");
const road = new Road(canvas.width*2, canvas.width*1.8, 5);
var img = new Image();
img.src = "a522.svg";


img.onload=setup;
var haas = new Image();
haas.src = "haas.svg";

haas.onload=setup;


//car.draw(ctx);

function setup() {

  car = new Car(road.getLaneCenter(1), 1000, 70, 200, img, canvas, true);
  traffic = [];

  for (let i=0; i<5;i++) {
    traffic.push(new Car(road.getLaneCenter(Math.floor(Math.random() * road.lanes)), Math.random() * 2 * canvas.height - canvas.height * 1.5, 70, 200, haas, canvas, car));
  }

  car.traffic = traffic;
  animate();
}



function animate() {
  //console.log(car);

  for (let i=0;i<traffic.length;i++) {
    traffic[i].update();
  }

  car.update(road.borders);

  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;

  ctx.save();
  ctx.translate(0, -car.y+canvas.height*0.7);
  road.draw(ctx);
  car.draw(ctx);

  for (let i=0;i<traffic.length;i++) {
    traffic[i].draw(ctx);
  }

  ctx.restore();
  requestAnimationFrame(animate);


}
