import {
    SmoothStepEdge,
    EdgeLabelRenderer,
    getSmoothStepPath,
    useReactFlow,
    MarkerType,
  } from '@xyflow/react';
  import { LinkIcon ,LinkSlashIcon} from '@heroicons/react/16/solid';
  const NodeColors = {
    Node1:"#257180",
    Node2:"#FFF100",
    Node3:"#A594F9"
  }
  export default function CustomEdge({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    markerEnd
  }: any) {
    const { setEdges,getEdge,getNode,updateNodeData } = useReactFlow();
  console.log("current edge",getEdge(id)); 
  const currentEdge = getEdge(id)
  const sourceNode = currentEdge?.source;
  const targetNode = currentEdge?.target;
  let sourceColor ; // Default to pink if not provided
    let targetColor ;
  if(sourceNode && targetNode){
   const sourceType =  getNode(sourceNode)?.type
   const targetType = getNode(targetNode)?.type
   console.log(id,sourceType,targetType)
   switch(sourceType){
    case 'Node1':
        sourceColor=NodeColors.Node1;
        break;
    case 'Node2':
        sourceColor=NodeColors.Node2;
        break;
    case 'Node3':
        sourceColor=NodeColors.Node3;
        break;
   }
   switch(targetType){
    case 'Node1':
        targetColor=NodeColors.Node1;
        break;
    case 'Node2':
        targetColor=NodeColors.Node2;
        break;
    case 'Node3':
        targetColor=NodeColors.Node3;
        break;
   }
  }
  else{
    sourceColor = '#ff0073';
    targetColor =  '#0073ff'; 
  }
    // Get the smooth step path for the edge
    const [edgePath, labelX, labelY] = getSmoothStepPath({
      sourceX,
      sourceY,
      sourcePosition,
      targetX,
      targetY,
      targetPosition,
    });

    // Dotted edge transition animation
    const dashArray = "5, 5"; // Length of dash and gap
    const dashOffset = 0; // Starting point of the dash
   
  console.log(sourceColor,targetColor)
    return (
      <>
        {/* Render the gradient */}
        <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <linearGradient id={`gradient-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={sourceColor} /> {/* Start color */}
            <stop offset="100%" stopColor={targetColor} /> {/* End color */}
          </linearGradient>
        </defs>
      </svg>
  
        {/* Dotted line with animation */}
        <path
        id={id}
          d={edgePath}
          stroke={`url(#gradient-${id})`}
          strokeWidth="2"
          fill="none"
          strokeDasharray={dashArray}
          strokeDashoffset={dashOffset}
          style={{
            fill:"none",
            strokeDasharray:5,
            animation: 'dash-animation 1s linear infinite',
          }}
          markerEnd={markerEnd}
        />
        
        {/* Optional Edge Label Renderer */}
        <EdgeLabelRenderer>
          <button
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
              pointerEvents: 'all',
              background: "#fff",
              height: "20px",
              width: "20px",
              borderRadius: "4px",
              display:"flex",
              justifyContent:"center",
              alignItems:"center"
            }}
            className="nodrag nopan"
            onClick={() => setEdges((edges) => edges.filter((e) => e.id !== id))} // Delete edge on click
          >
            <LinkSlashIcon className='h-4'/>
          </button>
        </EdgeLabelRenderer>

      </>
    );
  }
  