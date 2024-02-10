(function(w){
    function Draw(ctx) {
        this.ctx = ctx;
        this.defaults = {
            fill: '#000000',
            strokeWidth: 2,
            angle: 0,
            radius: 10,
        }
    }

    // private
    Draw.prototype.paint = function(x, y, angle, renderFunc) {
        if (typeof renderFunc !== 'function') {
            throw 'missed render func in Draw';
        }
        this.ctx.save();
        this.ctx.translate(x, y);
        if (typeof angle === 'number') {
            this.ctx.rotate(angle);
        }
    
        renderFunc();

        this.ctx.restore();
    }

    // private
    Draw.prototype.setFill = function(color) {
        color && (this.ctx.fillStyle = color);
    }

    // private
    Draw.prototype.setStroke = function(color, strokeWidth) {
        if (color) {
            this.ctx.lineWidth = strokeWidth || 2;
            this.ctx.strokeStyle = color;
        }
    }
    // private
    Draw.prototype.fill = function(color) {
        color && this.ctx.fill();
    }
    // private
    Draw.prototype.stroke = function(color) {
        color && this.ctx.stroke();
    }

    Draw.prototype.rect = function(props) {
        this.paint(
            props.position.x,
            props.position.y,
            props.angle || this.defaults.angle,
            () => {
                this.setFill(props.color);
                this.setStroke(props.strokeColor, props.strokeWidth);
                this.ctx.beginPath();
                this.ctx.rect(-(props.width/2), -(props.height/2), props.width, props.height);
                this.ctx.closePath();
                this.fill(props.color);
                this.stroke(props.strokeColor);
            }
        );
    }

    Draw.prototype.circle = function(props) {
        this.paint(
            props.position.x,
            props.position.y,
            props.angle || this.defaults.angle,
            () => {
                this.setFill(props.color);
                this.setStroke(props.strokeColor, props.strokeWidth || this.defaults.strokeWidth);
                this.ctx.beginPath();
                this.ctx.arc(0, 0, props.radius || this.defaults.radius, 0, 2 * Math.PI);
                this.ctx.closePath();
                this.fill(props.color);
                this.stroke(props.strokeColor);
            }
        );
    }

    // Draw.prototype.arc = function(position,r,p,c,s) {
    //     this.paint(position.x, position.y,Math.PI / 2, () => {
    //         this.setFill(props.color);
    //         this.setStroke(props.strokeColor, props.strokeWidth);

    //         this.ctx.beginPath();
    //         this.ctx.arc(0, 0, r, 0, p || 2 * Math.PI);
    //         // this.ctx.closePath();
    //         this.fill(c,s);
    //     });
    // }

    Draw.prototype.line = function(props) {
        this.paint(props.position.x, props.position.y,0, () => {
            this.setStroke(props.strokeColor, props.strokeWidth);

            this.ctx.beginPath();
            this.ctx.moveTo(0, 0);
    
            props.points.forEach((point) => {
                this.ctx.lineTo(point.x, point.y);
            })
            
            props.closePath && this.ctx.closePath();

            this.stroke(props.strokeColor);
        });
    }

    w.Drawer = Draw;
})(window);