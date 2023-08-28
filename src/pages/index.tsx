import React from 'react';

import HandleImage from '@/components/HandleImage';

const ImageUpload: React.FC = () => {

  return (
    <div className="flex mx-auto xl:h-screen justify-center self-center items-center">
      <div className="md:w-6/12 lg:w-5/12">
        <h1 className='text-center text-3xl my-4 xl:mb-8 xl:text-5xl font-bold px-2 md:px-4 xl:px-0'>Compress, scale, crop and convert
          in a flash</h1>
        <HandleImage />
      </div>
    </div>
  );
};

export default ImageUpload;
