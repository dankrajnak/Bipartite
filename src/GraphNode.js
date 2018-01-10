// @flow
import {Edge} from './Edge';

export class GraphNode {
    x: number;
    y: number;
    edges: Edge[];
    constructor(x: number = 0, y: number = 0, edges: Edge[] = []) {
        this.x = x;
        this.y = y;
        this.edges = edges;
    }

    addEdgeToNode(node: GraphNode): Edge {
        let edge = new Edge(this, node);
        this.edges.push(edge);
        node.edges.push(edge);
        return edge;
    }

    removeEdgeFromNode(node: Node) {
        //Find index of edge
        let index = this.edges.findIndex((edge) =>
        (edge.nodeA === this && edge.nodeB === node) ||
        (edge.nodeB === this && edge.nodeA === node));

        //If the edge is in this.edges
        if (index > -1) {
            this.edges.slice(index, 1); //Remove edge;
        }
    }
}
