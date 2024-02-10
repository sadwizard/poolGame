(function(w){
    var SHAPE_TYPES = {
        circle: 'circle',
        rect: 'rect',
        polygon: 'polygon',
    };
    
    var bodyProps = {
        visible: true,
        static: false,
        shape: null, // one of SHAPE_TYPES
        style: {},
        position: null,
        velocity: null,
        acceleration: null,
        forces: [],
        angle: 0,
        angularVelocity: 0,
        angularAcceleration: 0,
        mass: 10,
    };

    var SHAPE_PARAMS = {
        [SHAPE_TYPES.circle]: {
            type: SHAPE_TYPES.circle,
            radius: 10,
        },
        [SHAPE_TYPES.rect]: {
            type: SHAPE_TYPES.rect,
            width: 100,
            height: 50,
        },
        [SHAPE_TYPES.polygon]: {
            type: SHAPE_TYPES.polygon,
            vertices: [
                {x: 0, y: 0},
                {x: 20, y: 20},
                {x: 20, y: 0},
                {x: 0, y: 0},
            ]
        },
    }
    
    function BodyBuilder (observer) {
        if (observer !== undefined) {
            this.observer = observer;
        }
    
        return this;
    }
    
    BodyBuilder.prototype.create = function() {} // TODO: that will create arbitrary vertices body
    
    BodyBuilder.prototype.createShape = function(shapeType, params) {
        if (typeof shapeType !== 'string' || typeof params !== 'object' || params === null ) {
            throw 'uncorrect params!';
        }

        var resultObj = null;
        var otherParams = params || {};
        var defaultBodyProps = Object.assign({}, bodyProps, {
            position: new Victor(0, 0),
            velocity: new Victor(0, 0),
            acceleration: new Victor(0, 0),
        });
    
        if (shapeType === SHAPE_TYPES.circle) {
            const shape = Object.assign({}, SHAPE_PARAMS[SHAPE_TYPES.circle], params.shape || {});
            resultObj = Object.assign({}, defaultBodyProps, otherParams, { shape: shape });
        } else if (shapeType === SHAPE_TYPES.rect) {
            const shape = Object.assign({}, SHAPE_PARAMS[SHAPE_TYPES.rect], params.shape || {});
            resultObj = Object.assign({}, defaultBodyProps, otherParams, { shape: shape });
        } else {
            throw 'uncorrect shape type';
        }

        if (this.observer !== undefined) {
            this.observer.addBody(resultObj);
        }

        return resultObj;
    }

    w.BodyBuilder = BodyBuilder;
})(window)