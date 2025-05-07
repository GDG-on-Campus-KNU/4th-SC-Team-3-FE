import ImageConnectionLine from '../components/edges/image/ImageConnectionLine';
import TextConnectionLine from '../components/edges/text/TextConnectionLine';
import { ConnectionLineComponentProps } from '@xyflow/react';

export default function connectionLineTypeHandler(props: ConnectionLineComponentProps) {
  const sourceHandleId = props.fromNode.type;

  switch (sourceHandleId) {
    case 'text':
    case 'category':
      return <TextConnectionLine {...props} />;
    case 'image':
      return <ImageConnectionLine {...props} />;
    case 'imageUpload':
      return <ImageConnectionLine {...props} />;
    default:
      return <TextConnectionLine {...props} />;
  }
}
