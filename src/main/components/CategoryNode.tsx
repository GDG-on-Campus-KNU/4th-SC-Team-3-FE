import { memo } from 'react';

import { Position, Handle, useReactFlow, type NodeProps, type Node } from '@xyflow/react';

function CategoryNode({ id, data }: NodeProps<Node<{ category: string[] }>>) {
  const { updateNodeData } = useReactFlow();

  return (
    <div>
      <div>node {id}</div>
      <div>
        <input
          onChange={(evt) => updateNodeData(id, { text: evt.target.value })}
          value={data.category}
          style={{ display: 'block' }}
        />
      </div>
      <Handle type='source' position={Position.Right} />
    </div>
  );
}

export default memo(CategoryNode);
