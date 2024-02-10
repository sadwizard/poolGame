var PoolGame = (function(){
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    // set default window style
    canvas.width = w;
    canvas.height = h;
    document.body.style.margin = 0;
    document.body.style.background = backgroundColor;
  
    function PoolGame() {
        this.id = null;
        this.fpsRate = 1000 / 30;
        this.painter = new Drawer(ctx);
        this.bodyUpdater = new BodyUpdater();
        this.collisionObserver = new CollisionObserver(this.bodyUpdater);
        this.bodyBuilder = new BodyBuilder(this.collisionObserver);
        this.bodyRenderer = new BodyRenderer(this.painter);
        this.currentTime = Date.now();
        this.realFps = new FpsCounter();

        const gameApi = {
            bb: this.bodyBuilder,
            br: this.bodyRenderer,
            bu: this.bodyUpdater,
            painter: this.painter,
        };

        this.entities = [
            new Table(gameApi),
            new Balls(gameApi),
        ];

        console.log(this.collisionObserver)
        console.log(this)
    }

    PoolGame.prototype.play = function() {
        var now = Date.now();
        var delta = now - this.currentTime;

        if(this.id !== null) {
            clearTimeout(this.id);
        }

        this.render();
        this.update(delta);

    
        this.currentTime = now;
        this.id = setTimeout(this.play.bind(this), this.fpsRate);
    }

    PoolGame.prototype.stop = function() {
        if(this.id !== null) {
            clearTimeout(this.id);
            this.id = null;
        }
    }

    PoolGame.prototype.render = function() {
        ctx.fillStyle = backgroundColor;
        ctx.strokeStyle = borderColor;
        ctx.clearRect(0, 0, w, h);

        this.entities.forEach(function(entity) {
            if (!'render' in entity) {
                throw new Error(entity.id + ' entity does\'t have render method!');
            }

            entity.render();
        })
    }

    PoolGame.prototype.update = function(delta) {
        this.entities.forEach(function(entity) {
            if (!'update' in entity) {
                throw new Error(entity.id + ' entity does\'t have update method!');
            }

            entity.update(delta);
        });

         this.collisionObserver.update();
    }

    return PoolGame;

})(this);