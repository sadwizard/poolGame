function Table (api) {
    this.id = 'table';
    this.p = new Victor(w, h).divide(new Victor(2,2));
    this.painter = api.painter;
    this.api = api;

    this.items = {
        topBorder: this.api.bb.createShape('rect', {
            position: this.p.clone().subtract(new Victor(0, 250)),
            shape: { width: 1060, height: 30 },
            style: { color: '#540d0f' }
        }),
        bottomBorder: this.api.bb.createShape('rect', {
            position: this.p.clone().subtract(new Victor(0, -250)),
            shape: { width: 1060, height: 30 },
            style: { color: '#540d0f' }
        }),
        rightBorder: this.api.bb.createShape('rect', {
            position: this.p.clone().subtract(new Victor(515, 0)),
            shape: { width: 30, height: 530 },
            style: { color: '#540d0f' }
        }),
        leftBorder: this.api.bb.createShape('rect', {
            position: this.p.clone().subtract(new Victor(-515, 0)),
            shape: { width: 30, height: 530 },
            style: { color: '#540d0f' }
        }),
    }
}

Table.prototype.render = function() {
    this.painter.rect({
        position: this.p,
        color: '#255a36',
        width: 1000,
        height: 500,
    });
    this.painter.line({
        position: this.p.clone().subtract(new Victor(-200, 250)),
        points: [new Victor(0, 0), new Victor(0, 500)],
        strokeColor: '#999999',
    });
    Object.values(this.items).forEach((item) => {
        this.api.br.render(item);
    });
}

Table.prototype.update = function(delta) {
    Object.values(this.items).forEach((item) => {
        this.api.bu.update(delta, item);
    });
}

function Ball(api, position, color, forces) {
    this.id = 'ball';
    this.color = color;
    this.api = api;
    this.radius = 20
    this.body = api.bb.createShape('circle', {
        position: position,
        shape: { radius: this.radius },
        style: { color: this.color },
        forces: forces || [],
    });
}

Ball.prototype.render = function() {
    this.api.painter.arc(this.body.position, this.radius, null, this.color);
}

function Balls(api) {
    this.id = 'balls';
    this.api = api;

    this.items = [
        new Ball(api, new Victor(200, 200), '#c10c08'),
        new Ball(api, new Victor(450, 300), '#1c154c'),
        new Ball(api, new Victor(150, 230), '#9a181b'),
        new Ball(api, new Victor(500, 520), '#ff721c'),
        new Ball(api, new Victor(600, 420), '#2a5f42'),
        new Ball(api, new Victor(910, 510), '#131311'),
        new Ball(api, new Victor(870, 470), '#dddddd', [new Victor(0.4,0.4)]),
    ];
}

Balls.prototype.render = function() {
    Object.values(this.items).forEach((item) => {
        this.api.br.render(item.body);
    });
}

Balls.prototype.update = function(delta) {
    Object.values(this.items).forEach((item) => {
        this.api.bu.update(delta, item.body);
    });
}
