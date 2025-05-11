import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScaleLoader } from 'react-spinners';

import axios from 'axios';
import { Baseline, FunnelPlus } from 'lucide-react';

import { analyzeTextNode } from '@/main/api/analyzeTextNode';

import { useToast } from '@/global/hooks/use-toast';
import { useReactFlow, useStore } from '@xyflow/react';

export function TextPromptNodeInput({
  id,
  data,
}: {
  id: string;
  data: { model: string; value?: string };
}) {
  const { t } = useTranslation();
  const { setNodes, updateNodeData } = useReactFlow();
  const [isConverting, setIsConverting] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(data.value || null);

  const edges = useStore((state) => state.edges);
  const [hasRightConnection, setHasRightConnection] = useState(false);

  const { toast } = useToast();

  const getAnalyzedCategories = async () => {
    return (await analyzeTextNode(data.value!)).map((category: any, index: number) => {
      return {
        id: `${id}-item-${index + 1}`,
        name: category.key,
        value: category.value,
        parentId: id,
      };
    });
  };

  const handleConvertClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsConverting(true);
    try {
      const categories = await getAnalyzedCategories();
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === id) {
            return {
              ...node,
              type: 'category',
              data: {
                categories: categories,
              },
              position: node.position,
            };
          }
          return node;
        }),
      );
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        type ErrorResponse = {
          status: number;
          error: string;
        };
        const data = error.response.data as ErrorResponse;
        toast({
          title: t('toast.failTitle'),
          description: data.error,
          variant: 'destructive',
          duration: 3000,
        });
      } else {
        toast({
          title: t('toast.failTitle'),
          description: t('toast.failContent'),
          variant: 'destructive',
          duration: 3000,
        });
      }
    } finally {
      setIsConverting(false);
    }
  };

  const handleTextareaClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleTextareaChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateNodeData(id, { value: evt.target.value });
  };

  return (
    <div className='group flex flex-col rounded-md border border-transparent bg-white transition-all duration-300 hover:border-[#C9DCF9]/50 hover:shadow-lg'>
      <div className='m-[5px] mb-0 flex h-[30px] w-[235px] flex-row place-items-end rounded-t-sm'>
        <div className='flex h-[28px] w-[28px] flex-col justify-center self-center rounded-sm border-2 border-pipy-blue'>
          <Baseline size='18' strokeWidth='2.5' className='self-center text-pipy-blue' />
        </div>
      </div>

      <div className='m-[5px] flex h-[150px] w-[235px] flex-col items-stretch rounded-sm bg-[#C9DCF9] p-[5px] transition-all duration-300'>
        <textarea
          className='nodrag m-[5px] h-[100px] w-[215px] resize-none bg-transparent placeholder-[#808080] focus-visible:outline-none group-hover:placeholder-[#666666]'
          onClick={handleTextareaClick}
          onChange={handleTextareaChange}
          placeholder={t('node.textPlaceholder')}
          value={data.value || ''}
        />

        <button
          onClick={handleConvertClick}
          disabled={isConverting || hasRightConnection}
          className={`group/btn flex h-[35px] w-[225px] flex-row items-center justify-center self-end rounded-sm transition-all duration-300 ${
            isConverting || hasRightConnection
              ? 'cursor-not-allowed bg-gray-400'
              : 'bg-[#808080] hover:bg-[#3A7DE8] hover:shadow-md'
          }`}
        >
          {isConverting ? (
            <span className='text-white'>...</span>
          ) : (
            <>
              <FunnelPlus
                size='20'
                className={`size-[20px] text-[#FFFFFF] transition-transform duration-300 ${
                  !isConverting && 'group-hover/btn:rotate-12'
                }`}
              />
              <span
                className={`ml-1 text-[#FFFFFF] transition-all duration-300 ${
                  !isConverting && 'group-hover/btn:font-semibold'
                }`}
              >
                {t('node.convertButton')}
              </span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default TextPromptNodeInput;
