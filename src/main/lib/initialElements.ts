import { type Node } from '@xyflow/react';

export type TextNode = Node<{ text: string | undefined }, 'text'>;
export type CategoryNode = Node<{ category: string[] | undefined }, 'category'>;
export type ImageNode = Node<{ src: string | undefined }, 'image'>;

export type testNode = TextNode | CategoryNode | ImageNode;

export function isTextNode(node: any): node is TextNode | CategoryNode | undefined {
  return !node ? false : node.type === 'text' || node.type === 'category';
}
