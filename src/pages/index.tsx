import React from 'react';
import Footer from '@/components/Footer';

import HandleImage from '@/components/HandleImage';

const ImageUpload: React.FC = () => {

  return (
    <div className="flex flex-col mx-auto justify-center self-center items-center bg-slate-100 min-h-screen">
      <div className="md:w-6/12 lg:w-5/12">
        <h1 className='text-center text-3xl mt-8 mb-4 xl:mb-8 xl:text-5xl font-bold px-2 md:px-4 xl:px-0'>Compress, scale, crop and convert
          in a flash</h1>
        <HandleImage />
      </div>
      <section className="my-8">
        <Footer />
      </section>
    </div>
  );
};

export default ImageUpload;
