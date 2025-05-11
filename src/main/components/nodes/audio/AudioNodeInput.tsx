import { Play, AudioLines } from 'lucide-react';

export function AudioNodeInput({
  id,
  data,
}: {
  id: string;
  data: { model: string; value?: string };
}) {
  return (
    <div
      className={`group flex flex-col rounded-md border border-transparent bg-[#FFFFFF] transition-all duration-300 hover:border-[#FFDD8E]/50 hover:shadow-lg`}
    >
      <div className='m-[5px] mb-0 flex h-[30px] w-[235px] flex-row place-items-end rounded-t-sm'>
        <div className='flex h-[28px] w-[28px] flex-col justify-center self-center rounded-sm border-2 border-[#337758]'>
          <AudioLines size='18' strokeWidth='2.5' className='self-center text-[#337758]' />
        </div>
        <div className='font-[Noto Sans] ml-2 h-[28px] w-[180px] pt-0.5 text-left text-[16px] font-semibold text-[#000000]'>
          {data.model}
        </div>
        <button
          className={`flex h-6 w-6 items-center justify-center rounded-full transition-all duration-200`}
        >
          <Play strokeWidth='3' className={`size-15px place-self-end self-center text-[#98BAAB]`} />
        </button>
      </div>

      <div
        className='relative m-[5px] flex h-[150px] w-[235px] flex-col justify-center overflow-hidden rounded-sm bg-[#B2CBC0] p-[5px] transition-all duration-300 group-hover:shadow-inner'
        style={{ cursor: 'pointer' }}
      >
        <div className='flex h-full w-full items-center justify-center'></div>
      </div>
    </div>
  );
}

export default AudioNodeInput;
