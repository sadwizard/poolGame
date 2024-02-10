(function(w){
    function BodyRenderer(painter) {
        this.painter = painter;
    }

    BodyRenderer.prototype.render = function(body /* from BodyBuilder module */) {
        var shape = body.shape;
        var position = body.position;
        var angle = body.angle;
        var styles = body.style;
// console.log(Object.assign({}, shape, styles, { position: position }))
        this.painter[shape.type](Object.assign({}, shape, styles, { position: position, angle: angle }));
    }

    w.BodyRenderer = BodyRenderer;
})(window);