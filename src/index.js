// @flow
import {BipartiteGraph} from './BipartiteGraph';
import {GraphNode} from './GraphNode';
import {GraphDrawer} from './GraphDrawer';
import {PoissonDisk} from './PoissonDisk';

// Set up Canvas
const width = window.innerWidth,
    height = window.innerHeight,
    canvas = document.getElementById('canvas');

// Make fullscreen. (Flow thought that canvas could be null.  If it's
//null, we have bigger problems)
// $FlowFixMe
canvas.setAttribute('width', width);
// $FlowFixMe
canvas.setAttribute('height', height);

// $FlowFixMe
const context: CanvasRenderingContext2D = canvas.getContext('2d');

/*  Generate Nodes   ----------   */
let halfway = width/2;
let margin = width/4; //Margin on both sides of halfway line
let numANodes = 16;
let numBNodes = 16;
let nodeRadius = 6;
// Points are uniformly generated using Poisson Disk sampling.
// Establishing the following radii will ensure that around the right number
// of points are generated.
let aPoissonRadius = Math.sqrt((halfway-margin)*height/numANodes);
let bPoissionRadius = Math.sqrt((halfway-margin)*height/numBNodes);


//Generate aNodes
let aNodes: GraphNode[] =
    (new PoissonDisk( //Generate points
        halfway-margin-2*nodeRadius, //from nodeRadius (on the left) to halfway-margin-nodeRadius
        height - 2*nodeRadius, //Full height (minus the radius on both sides)
        aPoissonRadius))
    .generatePoints()
    .map(point => //Graph to GraphNodes, translating by a radius.
         new GraphNode(...point.map((pos => pos+nodeRadius)))); //Generate Nodes

//Generate bNodes
let bNodes: GraphNode[] =
    (new PoissonDisk( //Generate points
        halfway-margin-2*nodeRadius, //same width as before.  We'll transform it later
        height - 2*nodeRadius, //Full height (minus the radius on both sides)
        bPoissionRadius))
    .generatePoints()
    .map(point => //map to GraphNodes, translating by halfway+margin (and a radius)
        new GraphNode(point[0]+halfway+margin+nodeRadius, point[1]+nodeRadius));

console.log(aNodes, bNodes);
//Construct Graph.
let graph = new BipartiteGraph(aNodes, bNodes);

console.log(graph.getNodes());
//Draw the Graph
let drawer = new GraphDrawer(context, graph, '#111');
drawer.nodeColor = '#888';
drawer.edgeColor = '#444';
drawer.nodeRadius = nodeRadius;
drawer.edgeWidth = 2;
drawer.drawNodes();
drawer.drawEdges();
