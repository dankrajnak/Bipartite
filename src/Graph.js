// @flow
import {Edge} from './Edge';
import {GraphNode} from './GraphNode';

export interface Graph{
    getEdges(): Edge[];
    getNodes(): GraphNode[];
}
