import CategoryItemNode from '../components/nodes/category/CategoryItemNode';
import CategoryNode from '../components/nodes/category/CategoryNode';
import ImageNodeWrapper from '../components/nodes/image/ImageNodeWrapper';
import ImageUploadNodeWrapper from '../components/nodes/image/ImageUploadNodeWrapper';
import TextNodeWrapper from '../components/nodes/text/TextNodeWrapper';
import TextPromptNodeWrapper from '../components/nodes/text/TextPromptNodeWrapper';

export const nodeTypes = {
  text: TextNodeWrapper,
  textPrompt: TextPromptNodeWrapper,
  category: CategoryNode,
  categoryItem: CategoryItemNode,
  image: ImageNodeWrapper,
  imageUpload: ImageUploadNodeWrapper,
};
