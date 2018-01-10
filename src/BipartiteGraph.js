// @flow
import {GraphNode} from './GraphNode';
import {Edge} from './Edge';
import {Graph} from './Graph';

/**
 * Creates a complete Bipartite graph.
 */
export class BipartiteGraph implements Graph{
    aNodes: GraphNode[];
    bNodes: GraphNode[];
    edges: Edge[];

    getNodes: ()=> GraphNode[];
    getEdges: ()=> Edge[];


    constructor(aNodes: GraphNode[] = [], bNodes: GraphNode[] = []) {
        this.aNodes = aNodes;
        this.bNodes = bNodes;
        this.edges = [];
        //All nodes shouldn't have edges.
        this.aNodes.forEach(anode =>{
            anode.edges = [];
        })
        this.bNodes.forEach(bnode =>{
            bnode.edges = [];
        })

        //Connect each aNode to all bNodes;
        this.aNodes.forEach((anode)=>{
            this.bNodes.forEach((bnode)=>{
                this.edges.push(anode.addEdgeToNode(bnode));
            })
        });
    }

    getNodes(){
        // Note: not a deep copy.  Nodes are mutable.
        return this.aNodes.concat(this.bNodes);
    }

    getEdges(){
        return this.edges;
    }



}
