import AudioNodeWrapper from '../components/nodes/audio/AudioNodeWrapper';
import CategoryItemNode from '../components/nodes/category/CategoryItemNode';
import CategoryNode from '../components/nodes/category/CategoryNode';
import ImageNodeWrapper from '../components/nodes/image/ImageNodeWrapper';
import ImageUploadNodeWrapper from '../components/nodes/image/ImageUploadNodeWrapper';
import TextNodeWrapper from '../components/nodes/text/TextNodeWrapper';
import TextPromptNodeWrapper from '../components/nodes/text/TextPromptNodeWrapper';
import VideoNodeWrapper from '../components/nodes/video/VideoNodeWrapper';

export const nodeTypes = {
  text: TextNodeWrapper,
  textPrompt: TextPromptNodeWrapper,
  category: CategoryNode,
  categoryItem: CategoryItemNode,
  image: ImageNodeWrapper,
  imageUpload: ImageUploadNodeWrapper,
  video: VideoNodeWrapper,
  audio: AudioNodeWrapper,
};
