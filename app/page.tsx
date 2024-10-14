"use client";
import {
  addEdge,
  ReactFlow,
  Controls,
  Background,
  applyEdgeChanges,
  applyNodeChanges,
  Panel,
  useReactFlow,
  Connection,
  MarkerType,
} from "@xyflow/react";
import { uuid } from "@/lib/utils";
import "@xyflow/react/dist/style.css";
import Node2 from "@/components/nodes/Node2";
import Node1 from "@/components/nodes/Node1";
import Node3 from "@/components/nodes/Node3";
import { useCallback, useRef, useState } from "react";
import { LinkIcon } from "@heroicons/react/24/outline";
import CustomCurvedEdge from "@/components/edges/Edge1";
import CustomEdge from "@/components/edges/Edge2";
import { Button } from "@/components/ui/button";
import ConnectionLine from "@/components/connectionline/ConnectionLine";
const Nodes = [{type:"Node1",name:"Node1",id:"800"},{type:"Node2",name:"Node2",id:"801"},{type:"Node3",name:"Node3",id:"802"}]
const initialNodes:any = [
];
const nodeTypes = { Node1, Node2, Node3 };
const initialEdges: any = [];
export default function Home() {
  const [nodes, setNodes] = useState<any>(initialNodes);
  const [edges, setEdges] = useState<any>(initialEdges);
const {screenToFlowPosition} = useReactFlow();
  const isValidConnection = (connection: any) => {
    if (connection.source === connection.target) {
      return false;
    }
    return true;
  };
  console.log("nodes",nodes);
  console.log("edges",edges)
  const onNodesChange = useCallback(
    (changes: any) => {
      setNodes((eds: any) => applyNodeChanges(changes, eds));
    },
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes: any) => {
      setEdges((eds: any) => applyEdgeChanges(changes, eds));
    },
    [setEdges]
  );
  const onConnect = useCallback(
    (connection: Connection) => {
      let edge;
      edge ={
        ...connection,
        id:uuid(),
        type:"CustomEdge",
        markerEnd:{
          type:MarkerType.ArrowClosed,
          width:10,
          height:10,
          color:"#fff"
        },
        data:[]
      }

      setEdges((eds: any) => eds.concat(edge));
    },
    [setEdges]
  );
  const getnodetype = useRef<any>(null)
 const onDragStart = (event:React.DragEvent<HTMLButtonElement>,type:string,id:string)=>{
  getnodetype.current=[type,id];
  event.dataTransfer.effectAllowed ="move"
 }
 const onDragOver:React.DragEventHandler<HTMLDivElement> = (event) =>{
  event.preventDefault();
  event.dataTransfer.dropEffect ="move";
 }
 const onDrop:React.DragEventHandler<HTMLDivElement> = (event)=>{
  event.preventDefault();
  const type = getnodetype.current[0];
  const id = getnodetype.current[1];
  if(!type){
    return;
  }
  const position = screenToFlowPosition({x:event.clientX,y:event.clientY})
  let node;
  node=undefined;
  
  if(["Node1","Node2","Node3"].includes(type)){
    node = {
      id :uuid(),
      type:type,
      position,
      data:[]
    }
  }
  if(node){
    setNodes((eds: any) => eds.concat(node));
  }
 }
  return (
    <div className="w-[100vw] h-[100vh] min-h-screen ">
      <ReactFlow
        colorMode="dark"
        onEdgesChange={onEdgesChange}
        onNodesChange={onNodesChange}
        edgeTypes={{ CustomEdge: CustomEdge }}
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onConnect={onConnect}
        isValidConnection={isValidConnection}
        onDragOver={onDragOver}
        onDrop={onDrop}
        connectionLineComponent={ConnectionLine}
      >
        <Controls />
        <Background />
        <Panel position="top-right" className="bg-white rounded-lg p-7">
          <div className="flex flex-wrap gap-3">{Nodes.map((item,index)=><Button variant={'secondary'} key={index} className="rounded-lg" draggable onDragStart={(event)=>onDragStart(event,item.type,item.id)}>{item.name}</Button>)}</div>
        </Panel>
         </ReactFlow>
    </div>
  );
}
