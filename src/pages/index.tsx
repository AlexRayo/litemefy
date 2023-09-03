import React from 'react';
import Footer from '@/components/Footer';

import HandleImage from '@/components/HandleImage';

const ImageUpload: React.FC = () => {

  return (
    <div className="flex flex-col mx-auto justify-center self-center items-center bg-slate-100 min-h-screen">
      <div className="md:w-6/12 lg:w-5/12">
        <div className="mb-4 xl:mb-8 px-2 md:px-4 xl:px-0 text-center">
          <h1 className="mt-8 text-3xl xl:text-4xl font-bold text-teal-400">Litemefy</h1>
          <h2 className='text-xl'>Compress, scale, crop and convert
            in a flash</h2>

        </div>
        <HandleImage />
      </div>
      <section className="my-8">
        <Footer />
      </section>
    </div>
  );
};

export default ImageUpload;
