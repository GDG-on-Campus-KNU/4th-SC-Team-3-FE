import CategoryNode from '../components/nodes/CategoryNode';
import ImageNode from '../components/nodes/ImageNode';
import { TextNodeWrapper } from '../components/nodes/text/TextNodeWrapper';

export const nodeTypes = {
  text: TextNodeWrapper,
  category: CategoryNode,
  image: ImageNode,
};
