'use client';
import { useState } from 'react';

export function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [index, setIndex] = useState(0);
  return <div className="product-gallery">
    <img src={'/images/'+images[index]} alt={name+' 사진 '+(index+1)}/>
    <div>{images.slice(1,5).map((image,i)=><button key={image} type="button" onClick={()=>setIndex(index===i+1 ? 0 : i+1)} aria-label={name+' 사진 '+(i+2)} aria-pressed={index===i+1}><img src={'/images/'+image} alt={name+" 사진 "+(i+2)}/></button>)}</div>
  </div>;
}
