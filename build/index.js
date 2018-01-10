(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BipartiteGraph = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GraphNode = require('./GraphNode');

var _Edge = require('./Edge');

var _Graph = require('./Graph');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Creates a complete Bipartite graph.
 */
var BipartiteGraph = exports.BipartiteGraph = function () {
    function BipartiteGraph() {
        var _this = this;

        var aNodes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        var bNodes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

        _classCallCheck(this, BipartiteGraph);

        this.aNodes = aNodes;
        this.bNodes = bNodes;
        this.edges = [];
        //All nodes shouldn't have edges.
        this.aNodes.forEach(function (anode) {
            anode.edges = [];
        });
        this.bNodes.forEach(function (bnode) {
            bnode.edges = [];
        });

        //Connect each aNode to all bNodes;
        this.aNodes.forEach(function (anode) {
            _this.bNodes.forEach(function (bnode) {
                _this.edges.push(anode.addEdgeToNode(bnode));
            });
        });
    }

    _createClass(BipartiteGraph, [{
        key: 'getNodes',
        value: function getNodes() {
            // Note: not a deep copy.  Nodes are mutable.
            return this.aNodes.concat(this.bNodes);
        }
    }, {
        key: 'getEdges',
        value: function getEdges() {
            return this.edges;
        }
    }]);

    return BipartiteGraph;
}();

},{"./Edge":2,"./Graph":3,"./GraphNode":5}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Edge = undefined;

var _GraphNode = require('./GraphNode');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Edge = exports.Edge = function Edge(nodeA, nodeB) {
    _classCallCheck(this, Edge);

    this.nodeA = nodeA;
    this.nodeB = nodeB;
};

},{"./GraphNode":5}],3:[function(require,module,exports){
'use strict';

var _Edge = require('./Edge');

var _GraphNode = require('./GraphNode');

},{"./Edge":2,"./GraphNode":5}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GraphDrawer = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Graph = require('./Graph');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GraphDrawer = exports.GraphDrawer = function () {
    function GraphDrawer(context, graph) {
        var background = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'white';

        _classCallCheck(this, GraphDrawer);

        this.context = context;
        this.graph = graph;
        this.nodeRadius = 3;
        this.nodeColor = 'black';
        this.edgeWidth = 3;
        this.edgeColor = 'black';
        this.context.fillStyle = background;
        this.context.fillRect(0, 0, this.context.canvas.width, this.context.canvas.height);
    }

    _createClass(GraphDrawer, [{
        key: 'drawNodes',
        value: function drawNodes() {
            var _this = this;

            this.context.fillStyle = this.nodeColor;
            var nodes = this.graph.getNodes();
            nodes.forEach(function (node) {
                _this.context.beginPath();
                _this.context.ellipse(node.x, node.y, _this.nodeRadius, _this.nodeRadius, 0, 0, Math.PI * 2);
                _this.context.fill();
                _this.context.closePath();
            });
        }
    }, {
        key: 'drawEdges',
        value: function drawEdges() {
            var _this2 = this;

            this.context.strokeStyle = this.edgeColor;
            var edges = this.graph.getEdges();
            this.context.lineWidth = this.edgeWidth;
            edges.forEach(function (edge) {
                _this2.context.beginPath();
                var chance = Math.random();
                if (chance < .01) _this2.context.strokeStyle = 'yellow';
                _this2.context.moveTo(edge.nodeA.x, edge.nodeA.y);
                _this2.context.lineTo(edge.nodeB.x, edge.nodeB.y);
                _this2.context.stroke();
                _this2.context.strokeStyle = _this2.edgeColor;
            });
        }
    }]);

    return GraphDrawer;
}();

},{"./Graph":3}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GraphNode = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Edge = require('./Edge');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GraphNode = exports.GraphNode = function () {
    function GraphNode() {
        var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var edges = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

        _classCallCheck(this, GraphNode);

        this.x = x;
        this.y = y;
        this.edges = edges;
    }

    _createClass(GraphNode, [{
        key: 'addEdgeToNode',
        value: function addEdgeToNode(node) {
            var edge = new _Edge.Edge(this, node);
            this.edges.push(edge);
            node.edges.push(edge);
            return edge;
        }
    }, {
        key: 'removeEdgeFromNode',
        value: function removeEdgeFromNode(node) {
            var _this = this;

            //Find index of edge
            var index = this.edges.findIndex(function (edge) {
                return edge.nodeA === _this && edge.nodeB === node || edge.nodeB === _this && edge.nodeA === node;
            });

            //If the edge is in this.edges
            if (index > -1) {
                this.edges.slice(index, 1); //Remove edge;
            }
        }
    }]);

    return GraphNode;
}();

},{"./Edge":2}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PoissonDisk = exports.PoissonDisk = function () {
    function PoissonDisk(width, height, radius) {
        _classCallCheck(this, PoissonDisk);

        this.width = width;
        this.height = height;
        this.radius = radius;
    }

    _createClass(PoissonDisk, [{
        key: "generatePoints",
        value: function generatePoints() {
            var points = [],
                activeSamples = [],
                numberToCheck = 30;
            // Add first point
            activeSamples.push([Math.random() * this.width, Math.random() * this.height]);

            while (activeSamples.length > 0) {
                //Get random active sample
                var activeSamplesIndex = Math.floor(Math.random() * activeSamples.length);
                var sample = activeSamples[activeSamplesIndex];

                //Generate new point within the annulus (r to 2r from sample)
                var newPoint = this._newPointInAnnulus(sample);
                var validPoint = false;
                for (var i = 0; i < numberToCheck; i++) {
                    //Point is valid if it is at least a radius away from all other points (active or not)
                    if (this._pointIsValid(newPoint, activeSamples.concat(points))) {
                        validPoint = true;
                        break;
                    }
                    newPoint = this._newPointInAnnulus(sample);
                }
                if (validPoint) {
                    activeSamples.push(newPoint);
                } else {
                    //No valid points found, remove this from active samples.
                    activeSamples.splice(activeSamplesIndex, 1);
                    points.push(sample);
                }
            }
            return points;
        }
    }, {
        key: "_newPointInAnnulus",
        value: function _newPointInAnnulus(point) {
            var x = point[0],
                y = point[1];
            var dist = Math.random() * this.radius + this.radius;
            var angle = Math.random() * Math.PI * 2;
            var dx = dist * Math.cos(angle);
            var dy = dist * Math.sin(angle);
            return [x + dx, y + dy];
        }
    }, {
        key: "_pointIsValid",
        value: function _pointIsValid(point, samples) {
            var _this = this;

            if (point[0] < 0 || point[0] > this.width) {
                return false;
            }

            if (point[1] < 0 || point[1] > this.height) {
                return false;
            }
            var valid = true;

            samples.forEach(function (sample) {
                if (Math.sqrt(Math.pow(point[0] - sample[0], 2) + Math.pow(point[1] - sample[1], 2)) < _this.radius) {
                    valid = false;
                    return; //exit forEach
                }
            });
            return valid;
        }
    }]);

    return PoissonDisk;
}();

},{}],7:[function(require,module,exports){
'use strict';

var _BipartiteGraph = require('./BipartiteGraph');

var _GraphNode = require('./GraphNode');

var _GraphDrawer = require('./GraphDrawer');

var _PoissonDisk = require('./PoissonDisk');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// Set up Canvas
var width = window.innerWidth,
    height = window.innerHeight,
    canvas = document.getElementById('canvas');

// Make fullscreen. (Flow thought that canvas could be null.  If it's
//null, we have bigger problems)
// $FlowFixMe
canvas.setAttribute('width', width);
// $FlowFixMe
canvas.setAttribute('height', height);

// $FlowFixMe
var context = canvas.getContext('2d');

/*  Generate Nodes   ----------   */
var halfway = width / 2;
var margin = width / 4; //Margin on both sides of halfway line
var numANodes = 16;
var numBNodes = 16;
var nodeRadius = 6;
// Points are uniformly generated using Poisson Disk sampling.
// Establishing the following radii will ensure that around the right number
// of points are generated.
var aPoissonRadius = Math.sqrt((halfway - margin) * height / numANodes);
var bPoissionRadius = Math.sqrt((halfway - margin) * height / numBNodes);

//Generate aNodes
var aNodes = new _PoissonDisk.PoissonDisk( //Generate points
halfway - margin - 2 * nodeRadius, //from nodeRadius (on the left) to halfway-margin-nodeRadius
height - 2 * nodeRadius, //Full height (minus the radius on both sides)
aPoissonRadius).generatePoints().map(function (point) {
    return (//Graph to GraphNodes, translating by a radius.
        new (Function.prototype.bind.apply(_GraphNode.GraphNode, [null].concat(_toConsumableArray(point.map(function (pos) {
            return pos + nodeRadius;
        })))))()
    );
}); //Generate Nodes

//Generate bNodes
var bNodes = new _PoissonDisk.PoissonDisk( //Generate points
halfway - margin - 2 * nodeRadius, //same width as before.  We'll transform it later
height - 2 * nodeRadius, //Full height (minus the radius on both sides)
bPoissionRadius).generatePoints().map(function (point) {
    return (//map to GraphNodes, translating by halfway+margin (and a radius)
        new _GraphNode.GraphNode(point[0] + halfway + margin + nodeRadius, point[1] + nodeRadius)
    );
});

console.log(aNodes, bNodes);
//Construct Graph.
var graph = new _BipartiteGraph.BipartiteGraph(aNodes, bNodes);

console.log(graph.getNodes());
//Draw the Graph
var drawer = new _GraphDrawer.GraphDrawer(context, graph, '#111');
drawer.nodeColor = '#888';
drawer.edgeColor = '#444';
drawer.nodeRadius = nodeRadius;
drawer.edgeWidth = 2;
drawer.drawNodes();
drawer.drawEdges();

},{"./BipartiteGraph":1,"./GraphDrawer":4,"./GraphNode":5,"./PoissonDisk":6}]},{},[7]);
