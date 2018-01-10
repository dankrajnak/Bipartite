// @flow
import {GraphNode} from './GraphNode';

export class Edge {
    nodeA: GraphNode;
    nodeB: GraphNode;

    constructor(nodeA: GraphNode, nodeB: GraphNode) {
        this.nodeA = nodeA;
        this.nodeB = nodeB;
    }
}
