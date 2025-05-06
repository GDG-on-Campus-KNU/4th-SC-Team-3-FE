import CategoryItemNode from '../components/nodes/category/CategoryItemNode';
import CategoryNode from '../components/nodes/category/CategoryNode';
import ImageNodeWrapper from '../components/nodes/image/ImageNodeWrapper';
import ImageUploadNodeWrapper from '../components/nodes/image/ImageUploadNodeWrapper';
import TextNodeWrapper from '../components/nodes/text/TextNodeWrapper';

export const nodeTypes = {
  text: TextNodeWrapper,
  category: CategoryNode,
  categoryItem: CategoryItemNode,
  image: ImageNodeWrapper,
  imageUpload: ImageUploadNodeWrapper,
};
