import React from 'react';

import HandleImage from '@/components/HandleImage';
import CropImage from '../components/CropImage';

const ImageUpload: React.FC = () => {

  return (
    <div className="flex mx-auto justify-center self-center items-center">
      <div className="md:w-6/12 lg:w-4/12">
        <HandleImage />
        <CropImage />
      </div>
    </div>
  );
};

export default ImageUpload;
