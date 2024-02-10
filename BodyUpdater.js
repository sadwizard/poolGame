(function(w){
    function BodyUpdater() {

    }

    BodyUpdater.prototype.update = function(delta, body) {
        if (body.static) {
            return;
        }
// console.log(body)
        var d = delta * 0.01;
        var forcesAll = body.forces.reduce(function (acc, force) {
            acc.add(force);
            return acc;
        }, new Victor(0, 0));
// console.log(forcesAll)
        body.acceleration.add(forcesAll.divideScalar(body.mass));
        body.velocity.add(body.acceleration);
// console.log(body.velocity.divideScalar(body.mass))
        body.position.add(body.velocity.divideScalar(body.mass));
    }

    w.BodyUpdater = BodyUpdater;
})(window);