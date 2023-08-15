import React from 'react';

import HandleImage from '@/components/HandleImage';

const ImageUpload: React.FC = () => {

  return (
    <div className="flex mx-auto justify-center self-center items-center">
      <div className="md:w-6/12 lg:w-4/12">
        <HandleImage />
      </div>
    </div>
  );
};

export default ImageUpload;
