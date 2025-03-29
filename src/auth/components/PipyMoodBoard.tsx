import ImageAttention from '@/assets/signin/img-attention.png';
import LogoPipy from '@/assets/signin/img-logo.png';
import ImagePipe1 from '@/assets/signin/img-pipe1.png';
import ImagePipe2 from '@/assets/signin/img-pipe2.png';
import ImagePipe3 from '@/assets/signin/img-pipe3.png';
import ImagePipe4 from '@/assets/signin/img-pipe4.png';

export const PipyMoodBoard = () => {
  return (
    <div className='relative w-[34vw] h-[66vh] bg-[#EDEDED] mt-20'>
      <img
        src={ImagePipe1}
        alt='Pipe'
        className='absolute'
        style={{ left: '-4%', top: '-8%', width: '40%' }}
      />
      <img
        src={ImagePipe2}
        alt='Pipe'
        className='absolute'
        style={{ right: '4%', top: '-8%', width: '55%' }}
      />
      <img
        src={ImagePipe3}
        alt='Pipe'
        className='absolute'
        style={{ left: '-12%', bottom: '-17%', width: '61%' }}
      />
      <img
        src={ImagePipe4}
        alt='Pipe'
        className='absolute'
        style={{ right: '-5%', bottom: '5%', width: '61%' }}
      />
      <img
        src={LogoPipy}
        alt='Logo'
        className='absolute'
        style={{ right: '4%', top: '23%', width: '55%' }}
      />
      <img
        src={ImageAttention}
        alt='Attention'
        className='absolute'
        style={{ right: '6%', bottom: '-14%', width: '40%' }}
      />
    </div>
  );
};
