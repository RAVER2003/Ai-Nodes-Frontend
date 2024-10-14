import { useCallback, useState } from 'react';
import { Handle, Position,useReactFlow,useUpdateNodeInternals } from '@xyflow/react';
 import { Battery0Icon ,LightBulbIcon} from '@heroicons/react/24/outline';
import { uuid } from '@/lib/utils';
function Node3({ id,data,isConnectable }:{id:string,data:{value:string},isConnectable:boolean}) {
  const {getNode} = useReactFlow()
  const updateNodeInternals = useUpdateNodeInternals();
const [totalNodes,setNumberOfNodes] = useState<number>(3)

 const handleclick=()=>{
setNumberOfNodes(totalNodes+1);
updateNodeInternals(id)
 }
  return (
    <div className='p-3 border-2 bg-slate-400 border-cyan-400 rounded-lg'>
      <Handle type="target" position={Position.Top} id={'a'}  isConnectable={isConnectable} />
      <div>
        <button className='bg-black text-white rounded-lg px-3 py-2' onClick={handleclick}>Node3 <LightBulbIcon className='text-yellow-400' /></button>
      </div>
      {Array.from({ length: totalNodes }, (_, index) => (
         <Handle
         key={index}
         type="target"
         position={ Position.Left }
         id={index.toString()}
         style={{left:0,top:10*index}}
         isConnectable={isConnectable}
       />
      ))}
      <Handle type="source" id={'b'} position={Position.Bottom}  />
     
    </div>
  );
}

export default Node3;