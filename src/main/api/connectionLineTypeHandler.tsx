import ImageConnectionLine from '../components/edges/image/ImageConnectionLine';
import TextConnectionLine from '../components/edges/text/TextConnectionLine';
import { ConnectionLineComponentProps } from '@xyflow/react';

export default function connectionLineTypeHandler(props: ConnectionLineComponentProps) {
  const sourceHandleId = props.fromNode.type;

  if (sourceHandleId === 'text') {
    return <TextConnectionLine {...props} />;
  }

  if (sourceHandleId === 'image') {
    return <ImageConnectionLine {...props} />;
  }

  return <TextConnectionLine {...props} />;
}
