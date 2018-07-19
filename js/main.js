$(function() {
    var canvas = $("#c");
    var canvasHeight;
    var canvasWidth;
    var ctx;
    var dt = 0.1;

    var pointCollection;

    function init() {
        updateCanvasDimensions();

        // x, y, z, size, colour => y: [-20, 55], x: [-50, 430]

        var g = [
                //S
                new Point(-150,-20.0,0,10, '#aaa'),
                new Point(-150,55,0.0,10, '#000'),
                new Point(-230,-20.0,0,10, '#aaa'),
                new Point(-230,55,0.0,10, '#000'),


                //A
                new Point(-40, -20, 0.0, 9, "#114B5F"),
                new Point(-50, -5, 0.0, 10, "#028090"),
                new Point(-30, -5, 0.0, 8, "#119DA4"),
                new Point(-60, 10, 0.0, 10, "#00A9A5"),
                new Point(-20, 10, 0.0, 7, "#114B5F"),
                new Point(-70, 25, 0.0, 6, "#00A9A5"),
                new Point(-50, 25, 0.0, 9, "#028090"),
                new Point(-30, 25, 0.0, 11, "#17638C"),
                new Point(-10, 25, 0.0, 5.5, "#119DA4"),
                new Point(-80, 40, 0.0, 8, "#114B5F"),
                new Point(0, 40, 0.0, 9, "#028090"),
                new Point(-90, 55, 0.0, 10, "#00A9A5"),
                new Point(10, 55, 0.0, 11, "#17638C"),


                //R
                new Point(60, 55, 0.0, 10, "#FBC02D"),
                new Point(60, 40, 0.0, 9, "#FFF9C4"),
                new Point(60, 25, 0.0, 8, "#FFEB3B"),
                new Point(60, 10, 0.0, 8, "#FFF9C4"),
                new Point(60, -5, 0.0, 9, "#FFC107"),
                new Point(60, -20, 0.0, 10, "#FFEB3B"),
                new Point(130,-20.0,0,10, '#aaa'),
                new Point(130,55,0.0,10, '#000'),


                //T
                new Point(210, 55, 0.0, 10, "#FBC02D"),
                new Point(210, 40, 0.0, 9, "#FFF9C4"),
                new Point(210, 25, 0.0, 8, "#FFEB3B"),
                new Point(210, 10, 0.0, 8, "#FFF9C4"),
                new Point(210, -5, 0.0, 9, "#FFC107"),
                new Point(210, -20, 0.0, 10, "#FFEB3B"),
                new Point(195, -20, 0.0, 6, "#FBC02D"),
                new Point(180, -20, 0.0, 8, "#FFC107"),
                new Point(225, -20, 0.0, 6, "#FFEB3B"),
                new Point(240, -20, 0.0, 8, "#FBC02D"),


                //H
                new Point(290, 55, 0.0, 10, "#FF9800"),
                new Point(290, 37, 0.0, 8, "#FF5722"),
                new Point(290, 23, 0.0, 6, "#FF9800"),
                new Point(290, 12, 0.0, 6, "#FFCCBC"),
                new Point(290, -2, 0.0, 8, "#E64A19"),
                new Point(290, -20, 0.0, 10, "#E64A19"),

                new Point(350, 55, 0.0, 10, "#FF9800"),
                new Point(350, 37, 0.0, 8, "#FF5722"),
                new Point(350, 23, 0.0, 6, "#FF9800"),
                new Point(350, 12, 0.0, 6, "#FFCCBC"),
                new Point(350, -2, 0.0, 8, "#E64A19"),
                new Point(350, -20, 0.0, 10, "#E64A19"),

                new Point(302,17,0,6, "#E99090"),
                new Point(320,17,0,11,"#DF1100"),
                new Point(338,17,0,6, "#E99090"),


                //A
                new Point(450, -20, 0.0, 9, "#114B5F"),
                new Point(440, -5, 0.0, 10, "#028090"),
                new Point(460, -5, 0.0, 8, "#119DA4"),
                new Point(430, 10, 0.0, 10, "#00A9A5"),
                new Point(470, 10, 0.0, 7, "#114B5F"),
                new Point(420, 25, 0.0, 6, "#00A9A5"),
                new Point(440, 25, 0.0, 9, "#028090"),
                new Point(460, 25, 0.0, 11, "#17638C"),
                new Point(480, 25, 0.0, 5.5, "#119DA4"),
                new Point(410, 40, 0.0, 8, "#114B5F"),
                new Point(490, 40, 0.0, 9, "#028090"),
                new Point(400, 55, 0.0, 10, "#00A9A5"),
                new Point(500, 55, 0.0, 11, "#17638C"),


                //K
                new Point(550, -20, 0.0, 10, "#689F38"),
                new Point(550, -5, 0.0, 9, "#4CAF50"),
                new Point(550, 10, 0.0, 8, "#8BC34A"),
                new Point(550, 25, 0.0, 8, "#689F38"),
                new Point(550, 40, 0.0, 9, "#4CAF50"),
                new Point(550, 55, 0.0, 10, "#8BC34A"),

                new Point(562, 24, 0,8, "#45DC85"),
                new Point(575,12,0,7, "#24CF08"),
                new Point(585,0 ,0,6, "#34CF58"),
                new Point(593,-10,0,5, "#34FF58"),
                new Point(600,-20,0,4,"#56DF45"),

                new Point(575,32,0,7, "#24CF08"),
                new Point(585,40,0,6, "#34CF58"),
                new Point(593,48,0,5, "#34FF58"),
                new Point(600,55.0,0,4, '#68FF5A'),

            // new Point(610,25,0,6,"#359F44"),
                // new Point(621,17,0,9,"#35FF44"),
                // new Point(600, 40, 0.0, 9, "#4CAF50"),
                // new Point(650,0,0,6,"#35FF44"),
                // new Point(665,-12,0,10,"#35FF44"),
                // new Point(680,-20.0,0,7, '#68FF00'),

                // new Point(610,25,0,6,"#359F44"),
                // new Point(623,20,0,8,"#35FF44"),
                // new Point(650,20,0,8,"#35FF44"),
                // new Point(665,20,0,8,"#35FF44"),
                // new Point(680,-20.0,0,7, '#68FF00'),
        ];

        gLength = g.length;
        for (var i = 0; i < gLength; i++) {
            g[i].curPos.x = (canvasWidth / 2 - 180) + g[i].curPos.x;
            g[i].curPos.y = (canvasHeight / 2 - 65) + g[i].curPos.y;

            g[i].originalPos.x = (canvasWidth / 2 - 180) + g[i].originalPos.x;
            g[i].originalPos.y = (canvasHeight / 2 - 65) + g[i].originalPos.y;
        };

        pointCollection = new PointCollection();
        pointCollection.points = g;

        initEventListeners();
        timeout();
    };

    function initEventListeners() {
        $(window).bind('resize', updateCanvasDimensions).bind('mousemove', onMove);

        canvas.get(0).ontouchmove = function(e) {
            e.preventDefault();
            onTouchMove(e);
        };

        canvas.get(0).ontouchstart = function(e) {
            e.preventDefault();
        };
    };

    function updateCanvasDimensions() {
        canvas.attr({
            height: $(window).height(),
            width: $(window).width()
        });
        canvasWidth = canvas.width();
        canvasHeight = canvas.height();

        draw();
    };

    function onMove(e) {
        if (pointCollection)
            pointCollection.mousePos.set(e.pageX, e.pageY);
    };

    function onTouchMove(e) {
        if (pointCollection)
            pointCollection.mousePos.set(e.targetTouches[0].pageX, e.targetTouches[0].pageY);
    };

    function timeout() {
        draw();
        update();

        setTimeout(function() {
            timeout()
        }, 30);
    };

    function draw() {
        var tmpCanvas = canvas.get(0);

        if (tmpCanvas.getContext == null) {
            return;
        };

        ctx = tmpCanvas.getContext('2d');
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        if (pointCollection)
            pointCollection.draw();
    };

    function update() {
        if (pointCollection)
            pointCollection.update();
    };

    function Vector(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;

        this.addX = function(x) {
            this.x += x;
        };

        this.addY = function(y) {
            this.y += y;
        };

        this.addZ = function(z) {
            this.z += z;
        };

        this.set = function(x, y, z) {
            this.x = x;
            this.y = y;
            this.z = z;
        };
    };

    function PointCollection() {
        this.mousePos = new Vector(0, 0);
        this.points = new Array();

        this.newPoint = function(x, y, z) {
            var point = new Point(x, y, z);
            this.points.push(point);
            return point;
        };

        this.update = function() {
            var pointsLength = this.points.length;

            for (var i = 0; i < pointsLength; i++) {
                var point = this.points[i];

                if (point == null)
                    continue;

                var dx = this.mousePos.x - point.curPos.x;
                var dy = this.mousePos.y - point.curPos.y;
                var dd = (dx * dx) + (dy * dy);
                var d = Math.sqrt(dd);

                if (d < 150) {
                    point.targetPos.x = (this.mousePos.x < point.curPos.x) ? point.curPos.x - dx : point.curPos.x - dx;
                    point.targetPos.y = (this.mousePos.y < point.curPos.y) ? point.curPos.y - dy : point.curPos.y - dy;
                } else {
                    point.targetPos.x = point.originalPos.x;
                    point.targetPos.y = point.originalPos.y;
                };

                point.update();
            };
        };

        this.draw = function() {
            var pointsLength = this.points.length;
            for (var i = 0; i < pointsLength; i++) {
                var point = this.points[i];

                if (point == null)
                    continue;

                point.draw();
            };
        };
    };

    function Point(x, y, z, size, colour) {
        this.colour = colour;
        this.curPos = new Vector(x, y, z);
        this.friction = 0.8;
        this.originalPos = new Vector(x, y, z);
        this.radius = size;
        this.size = size;
        this.springStrength = 0.1;
        this.targetPos = new Vector(x, y, z);
        this.velocity = new Vector(0.0, 0.0, 0.0);

        this.update = function() {
            var dx = this.targetPos.x - this.curPos.x;
            var ax = dx * this.springStrength;
            this.velocity.x += ax;
            this.velocity.x *= this.friction;
            this.curPos.x += this.velocity.x;

            var dy = this.targetPos.y - this.curPos.y;
            var ay = dy * this.springStrength;
            this.velocity.y += ay;
            this.velocity.y *= this.friction;
            this.curPos.y += this.velocity.y;

            var dox = this.originalPos.x - this.curPos.x;
            var doy = this.originalPos.y - this.curPos.y;
            var dd = (dox * dox) + (doy * doy);
            var d = Math.sqrt(dd);

            this.targetPos.z = d / 100 + 1;
            var dz = this.targetPos.z - this.curPos.z;
            var az = dz * this.springStrength;
            this.velocity.z += az;
            this.velocity.z *= this.friction;
            this.curPos.z += this.velocity.z;

            this.radius = this.size * this.curPos.z;
            if (this.radius < 1) this.radius = 1;
        };

        this.draw = function() {
            ctx.fillStyle = this.colour;
            ctx.beginPath();
            ctx.arc(this.curPos.x, this.curPos.y, this.radius, 0, Math.PI * 2, true);
            ctx.fill();
        };
    };

    init();
});
