import React from 'react';

import HandleImage from '@/components/HandleImage';

const ImageUpload: React.FC = () => {

  return (
    <div className="flex mx-auto h-screen justify-center self-center items-center">
      <div className="md:w-6/12 lg:w-4/12">
        <h1 className='text-center text-5xl mb-2 font-bold'>Compress, scale, crop and convert
          in a flash</h1>
        <HandleImage />
      </div>
    </div>
  );
};

export default ImageUpload;
