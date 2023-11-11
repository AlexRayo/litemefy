import React from 'react';
import Footer from '@/components/Footer';

import HandleImage from '@/components/HandleImage';
import Head from 'next/head';
import { Analytics } from '@vercel/analytics/react';

const ImageUpload: React.FC = () => {

  return (
    <>
      <Head>
        <title>Litemefy | Compress, scale, crop and convert</title>
        <meta name="description" content="This tool allows you to optimize your images for the web; compress, scale, crop and convert to webP, all in a simple and fast interface" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Analytics />
      <div className="flex flex-col mx-auto justify-center self-center items-center bg-slate-100 min-h-screen">
        <div className="md:w-6/12 lg:w-5/12 relative">
          <div className="mb-4 xl:my-8 px-2 md:px-4 xl:px-0 text-center">
            <svg className={`transition-transform duration-300 md:scale-75 group-hover:scale-90 w-10 md:w-12 lg:w-14 mx-auto fill-teal-400 animate-pulse`} xmlns="http://www.w3.org/2000/svg" viewBox={'0 0 384 512'}><path d={'M0 256L28.5 28c2-16 15.6-28 31.8-28H228.9c15 0 27.1 12.1 27.1 27.1c0 3.2-.6 6.5-1.7 9.5L208 160H347.3c20.2 0 36.7 16.4 36.7 36.7c0 7.4-2.2 14.6-6.4 20.7l-192.2 281c-5.9 8.6-15.6 13.7-25.9 13.7h-2.9c-15.7 0-28.5-12.8-28.5-28.5c0-2.3 .3-4.6 .9-6.9L176 288H32c-17.7 0-32-14.3-32-32z'} /></svg>
            <h1 className="text-3xl xl:text-5xl font-bold text-slate-800">Litemefy</h1>
            <h2 className='text-lg md:text-xl'>Compress, scale, crop and convert
              in a flash</h2>

          </div>
          <HandleImage />
        </div>
        <section className="my-8">
          <Footer />
        </section>
      </div>
    </>
  );
};

export default ImageUpload;
