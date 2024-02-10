var CollisionObserver = (function(){
    function CollisionObserver (bodyUpdater) {
        this.bu = bodyUpdater;
        this.items = [];
    }
    
    CollisionObserver.prototype.addBody = function(body) {
        this.items.push(body);
    }

    CollisionObserver.prototype.update = function() {
        var filteredItems = this.items.filter(function (item) { return !item.static || !item.visible; });
        var collisionPairs = [];

        for (var i = 0, len = filteredItems.length; i < len; i++) {
			for (var j = i + 1; j < len; j++) {
				collisionPairs.push([filteredItems[i], filteredItems[j]]);
			}
		}

		while (collisionPairs.length > 0) {
			var pair = collisionPairs.shift();
			if (this.isColliding(pair[0], pair[1])) {
				console.log('bip');
                this.resolveCollision(pair[0], pair[1]);
			}
		}
    }

    CollisionObserver.prototype.resolveCollision = function(body1, body2) {
        body1.acceleration.invert();
        body2.acceleration.invert();
    }

    CollisionObserver.prototype.isColliding = function(body1, body2) {
        return body1 !== body2 && this.intersectionTest(body1, body2);
    }

    CollisionObserver.prototype.intersectionTest = function(body1, body2) {
        const capitalize2Type = body2.shape.type.charAt(0).toUpperCase() + body2.shape.type.slice(1);

        return testFuncs[`${body1.shape.type}${capitalize2Type}`](body1,body2);
    }

    var testFuncs = {
        circleCircle: testCircleCircle,
        circleRect: function() { return false; },
        rectCircle: function() { return false; },
        rectRect: function() { return false; },
    };

    function testCircleCircle (body1, body2) {
        return body1.position.distance(body2.position) < (body1.shape.radius + body2.shape.radius);
    }

    return CollisionObserver;
})()