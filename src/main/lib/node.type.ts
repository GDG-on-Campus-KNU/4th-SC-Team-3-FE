import CategoryNode from '../components/nodes/CategoryNode';
// import CategoryItemNode from '../components/nodes/cateogry/CategoryItemNode';
import ImageNodeWrapper from '../components/nodes/image/ImageNodeWrapper';
import TextNodeWrapper from '../components/nodes/text/TextNodeWrapper';

export const nodeTypes = {
  text: TextNodeWrapper,
  category: CategoryNode,
  image: ImageNodeWrapper,
  // categoryItem: CategoryItemNode,
};
