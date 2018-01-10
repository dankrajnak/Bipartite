// @flow
import {Graph} from './Graph';

export class GraphDrawer{
    context: CanvasRenderingContext2D;
    graph: Graph;
    drawNodes: ()=> void;
    drawEdges: ()=> void;
    nodeRadius: number;
    nodeColor: string;
    edgeColor: string;
    edgeWidth : number;


    constructor(context: CanvasRenderingContext2D, graph: Graph,
        background: string = 'white'){

        this.context = context;
        this.graph = graph;
        this.nodeRadius = 3;
        this.nodeColor = 'black';
        this.edgeWidth = 3;
        this.edgeColor = 'black';
        this.context.fillStyle = background;
        this.context.fillRect(0, 0, this.context.canvas.width, this.context.canvas.height)
    }

    drawNodes(){
        this.context.fillStyle = this.nodeColor;
        let nodes = this.graph.getNodes();
        nodes.forEach((node)=>{
            this.context.beginPath();
            this.context.ellipse(node.x, node.y, this.nodeRadius,
                this.nodeRadius, 0, 0, Math.PI*2);
            this.context.fill();
            this.context.closePath();
        });

    }

    drawEdges(){
        this.context.strokeStyle = this.edgeColor;
        let edges = this.graph.getEdges();
        this.context.lineWidth = this.edgeWidth;
        edges.forEach(edge=>{
            this.context.beginPath();
            let chance = Math.random()
            if(chance<.01) this.context.strokeStyle = 'yellow';
            this.context.moveTo(edge.nodeA.x, edge.nodeA.y);
            this.context.lineTo(edge.nodeB.x, edge.nodeB.y);
            this.context.stroke();
            this.context.strokeStyle = this.edgeColor;
        });


    }
}
