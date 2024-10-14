import { uuid } from '@/lib/utils';
import { ConnectionLineComponentProps, getSmoothStepPath } from '@xyflow/react'
import React from 'react'

const ConnectionLine = ({fromX,fromY,toX,toY,toPosition,fromPosition,connectionStatus}:ConnectionLineComponentProps) => {
    const [d] = getSmoothStepPath({
        sourceX:fromX,
        sourceY:fromY,
        sourcePosition:fromPosition,
        targetX:toX,
        targetY:toY,
        targetPosition:toPosition,
      });
      let color ="white";
      if(connectionStatus==='valid'){
        color ='#55dd99'
      }
      if(connectionStatus==='invalid'){
        color='#ff6060'
      }
  return (
    <path fill='none'  stroke={color} strokeWidth={1.5} d={d}/>
  )
}

export default ConnectionLine