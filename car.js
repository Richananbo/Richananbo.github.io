class Car {
  constructor(x, y, width, height, img, canvas, host=false, ) {
    this.x = x;
    this.y = y;
    this.traffic = null;
    this.speed = 0;
    this.acceleration = 0.25;
    this.maxSpeed = 8;
    this.friction = 0.05;
    this.angle = 0;
    this.width = width;
    this.height = height;
    this.img = img;
    console.log(host);
    this.spun = false;
    this.crashed = false;
    this.host = host;
    this.canvas = canvas;

    this.scoreOffset = -y;
    this.score = 0;

    this.sensor = new Sensor(this, 7);
    if (host == true) {

      this.controls = new Controls(true);
    }
    //this.spinAngle =  Math.PI * 2 + (Math.random() * Math.PI - Math.PI / 2);
  }

  draw(ctx) {
    if (this.host == true) {
      this.sensor.draw(ctx);
    }
    ctx.save();

    /*if (this.crashed) {
      ctx.fillStyle = "red";
    }
    else {
      ctx.fillStyle = "black";
    }

    ctx.moveTo(this.polybounds[0].x, this.polybounds[0].y);
    for (let i=1;i<this.polybounds.length;i++) {
      ctx.lineTo(this.polybounds[i].x, this.polybounds[i].y);
    }

    ctx.fill();

    */


    ctx.translate(this.x, this.y);
    ctx.rotate(-this.angle);

    ctx.beginPath();

    ctx.drawImage(this.img,
      - this.width / 2,
      - this.height / 2,
      this.width,
      this.height,
    );

    ctx.fill();
    ctx.restore();


  }

  bounds() {
    const points = [];
    const radius = Math.hypot(this.width, this.height) / 2;
    const theta = Math.atan2(this.width, this.height);

    points.push(
      {x: this.x - radius * Math.sin(this.angle - theta),
        y: this.y - radius * Math.cos(this.angle - theta)}
    );
    points.push(
      {x: this.x - radius * Math.sin(this.angle + theta),
        y: this.y - radius * Math.cos(this.angle + theta)}
    );

    points.push(
      {x: this.x - radius * Math.sin(Math.PI + this.angle - theta),
        y: this.y - radius * Math.cos(Math.PI + this.angle - theta)}
    );

    points.push(
      {x: this.x - radius * Math.sin(Math.PI + this.angle + theta),
        y: this.y - radius * Math.cos(Math.PI + this.angle + theta)}
    );
    return points;

  }

  #checkCrashed(borders) {
    for (let i=0; i<borders.length; i++) {
      if (polysInterect(this.bounds(), borders[i])) {
        return true;
      }
    }

    return false;
  }


  #checkCrashedTraffic(borders) {
    for (let i=0; i<borders.length; i++) {
      if (polysInterect(this.bounds(), borders[i].bounds())) {
        return true;
      }
    }

    return false;
  }

  update(borders) {
    if (this.host == true) {

      this.maxSpeed += 0.001;

      if (this.spun){


          this.speed = Math.abs(this.speed) - this.acceleration * 0.6;

          if (Math.abs(this.speed) > this.maxSpeed/2) {
            this.speed = this.maxSpeed/2;
          }

          if (Math.abs(this.speed) < this.friction * 3) {
            this.speed = 0;
            this.acceleration = 0;


          }

          if (this.speed != 0) {
            this.angle += 0.05 * Math.sign(this.angle) * this.speed;
          }
          else {
            this.menu.pause();
            this.spun = false;
            this.crashed = false;
            this.controls.playing = false;
            this.acceleration = 0.25;
          }


        }
      else {
        this.#move();
        //this.angle = this.angle % (Math.PI * 2);
      }

      this.polybounds = this.bounds(borders);
      this.crashed = this.#checkCrashed(borders) || this.#checkCrashedTraffic(this.traffic);
      if (this.crashed) {
        if (!this.spun && this.host) {
          this.controls.audio.pause();
          this.menu = new Audio('menu.wav');
          this.menu.play();
        }

        this.spun = true;
      }

      this.sensor.update(borders);

      this.score = Math.round(this.y - this.scoreOffset);

    }
    else {
      this.maxSpeed += 0.0007;
      this.#automove();
    }

  }


  #automove() {
    this.speed += this.acceleration * 0.7;


    if (this.speed > this.maxSpeed * 0.5) {
      this.speed = this.maxSpeed * 0.5;
    }

    this.y -= this.speed * Math.cos(this.angle);
    this.x -= this.speed * Math.sin(this.angle);

    if (this.y > (this.host.y + this.canvas.height * 0.5)) {
      console.log('off screen');
      this.y -= this.canvas.height * 1.2 + Math.random() * 1.4 * this.canvas.height;
    }


  }

  #move() {
    if (this.controls.forward) {
      this.speed += this.acceleration;
    }
    if (this.controls.backward) {
      this.speed -= this.acceleration;
    }

    if (this.speed > this.maxSpeed) {
      this.speed = this.maxSpeed;
    }
    else if (this.speed < -this.maxSpeed/2) {
      this.speed = -this.maxSpeed/2;
    }

    if (this.speed > 0) {
      this.speed -= this.friction;
    }
    else if (this.speed < 0) {
      this.speed += this.friction;
    }

    if (Math.abs(this.speed) < this.friction) {
      this.speed = 0;
    }

    if (this.speed != 0) {
      const flip = this.speed>0?1: -1;
      if (this.controls.left) {
        this.angle +=0.03 * flip;
      }
      if (this.controls.right) {
        this.angle -=0.03 * flip;
      }
    }

    this.y -= this.speed * Math.cos(this.angle);
    this.x -= this.speed * Math.sin(this.angle);
  }
}
