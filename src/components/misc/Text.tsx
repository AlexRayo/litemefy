import React from 'react';

interface TextProps {
  format?: "h1" | "h2" | "h3" | "h4" | "p";
  text: string;
  style?: string;
}

function Text({ format, text, style }: TextProps) {
  /* 
  * "style" prop adds more CSS classes

  * TAG FORMATS
  ** h1 = xl
  ** h2 = lg
  ** h4 = md 
  ** p = sm and xs

  */
  return (
    format === "h1" ?
      <h1 className={`h1 ${style}`}>
        {text}
      </h1>
      :
      format === "h2" ?
        <h2 className={`h2 ${style}`}>
          {text}
        </h2>
        :
        format === "h3" ?
          <h3 className={`h3 ${style}`}>
            {text}
          </h3>
          :
          format === "h4" ?
            <h4 className={`h4 ${style}`}>
              {text}
            </h4>
            :
            <p className={`text-lg ${style}`}>
              {text}
            </p>
  );
}

export default Text;
