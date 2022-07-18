class Road {
  constructor(x, width, lanes=3) {
    this.x=x;
    this.width = width;
    this.lanes = lanes;

    this.left = x-width/2;
    this.right = x+width/2;

    const infinity = 1000000;
    this.top = -infinity;
    this.bottom = infinity;

    const topLeft = {y: this.top, x: this.left};
    const topRight = {y: this.top, x: this.right};
    const bottomLeft = {y: this.bottom, x: this.left};
    const bottomRight = {y: this.bottom, x: this.right};

    this.borders = [
          [topLeft, bottomLeft],
          [topRight, bottomRight],

      ];
    }

    getLaneCenter(index) {
      const lwidth = this.width / this.lanes;
      return this.left + (Math.min(index, this.lanes - 1) + 0.5) * lwidth;
    }

    draw(ctx) {
      ctx.lineWidth = 5;
      ctx.strokeStyle = "white";

      for (let i=1; i<this.lanes; i++) {
        const x = lerp(this.left, this.right, i/this.lanes);


        ctx.setLineDash([20, 20]);


        ctx.beginPath();
        ctx.moveTo(x, this.top);
        ctx.lineTo(x, this.bottom);
        ctx.stroke();

      }

      ctx.setLineDash([]);

      this.borders.forEach(border=>{
        ctx.beginPath();
        ctx.moveTo(border[0].x, border[0].y);
        ctx.lineTo(border[1].x, border[1].y);
        ctx.stroke();
      })


    }


}
