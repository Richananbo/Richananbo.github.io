

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


class Vector2d {

    constructor(i, j, polar=false, x=0, y=0) {

      this.x = x;
      this.y = y;

      if (i == undefined) {
        i = 0;
      }

      if (j == undefined) {
        j = i;
      }

      if (polar) {
        // i - argument, j - modulus
        this.i = i * Math.cos(j);
        this.j = i * Math.sin(j);

      } else {
        this.i = i;
        this.j = j;

      }

    }

    get_i() {
      return this.i;
    }

    get_j() {
      return this.j;
    }

    copy() {
      return new Vector2d(this.i, this.j, false, this.x, this.y);
    }

    add(v) {
      if (v instanceof Vector2d) {
        this.i += v.get_i();
        this.j += v.get_j();
      }
      return this;
    }

    subtract(v) {
      if (v instanceof Vector2d) {
        this.i -= v.get_i();
        this.j -= v.get_j();
      }
      return this;
    }

    dot(v) {
      if (v instanceof Vector2d) {
        return this.i * v.get_i() + this.j * v.get_j();
      }
    }

    argument() {
      return Math.atan2(this.j, this.i)
    }

    modulus() {
      return Math.sqrt(Math.pow(this.i, 2), Math.pow(this.j, 2));
    }

    gradient() {
      return this.j / this.i;
    }

    scale(l) {
      if (!isNaN(l)) {
        this.i *= l;
        this.j *= l;
      }

      return this;
    }


    random_inside_circle(modulus) {
        return new Vector2d(Math.random() * Math.PI * 2);
    }

}

class Force {


}

class ResultantForce {

}

class Unknown {

}

class Particle {
  constructor(name, mass, position, velocity, resultant_force, size) {
    this.name = name;
    this.mass = mass;
    this.position = position;
    this.velocity = velocity;
    this.resultant_force = resultant_force;
    this.size = size;

    this.hue = Math.round(Math.random() * 360);

    this.gradient = c.createLinearGradient(0, 0, 0.65 * this.size, 0.65 * this.size);
    this.gradient.addColorStop(0, 'hsl(' + this.hue + ', 45%, 70%)');
    this.gradient.addColorStop(1, 'hsl(' + this.hue + ', 65%, 30%)');

  }

  update(t) {
    this.position.add(this.velocity.copy().scale(t));

  }

/*  float hue = (float) (248 + (Math.random() * 40)) / 360f;
          this.fill_colour = new GradientPaint(0, 0,
                  Color.getHSBColor(hue, 0.45f, 0.9f),
                  (int)(this.radius.modulus()), (int)(this.radius.modulus()),
                  Color.getHSBColor(hue, 0.65f, 0.3f));
*/
  draw() {
    //c.fillStyle = 'rgba(0,255,0,0.2)';

    c.translate(this.position.i, this.position.j);

    c.fillStyle = this.gradient;

    c.beginPath();
    c.arc(0, 0, this.size, 0, 2 * Math.PI);
    c.fill();

    c.translate(-this.position.i, -this.position.j)
  }

}

const a = new Particle("n", 2, new Vector2d(100, 400, false), new Vector2d(0.7, 0), null, 50);


function loop() {
  c.fillStyle = 'black';
  c.fillRect(0, 0, canvas.width, canvas.height);

  a.draw();
  a.update(1);
  window.requestAnimationFrame(loop);
}


loop();

window.addEventListener('keydown', (event) => {

})
