'use client'

import React from 'react';
import { Sparkles, Code } from 'lucide-react';

export default function Result({ endTime, startTime }) {
  return (
    <div className='z-10'>
      <div className='space-y-6 py-4'>
        <div className='text-center'>
          <h3 className={`text-2xl font-semibold flex items-center justify-center gap-2 text-green-600 font-neo`}>
            <Sparkles className='h-5 w-5' />
            성공!
            <Sparkles className='h-5 w-5' />
          </h3>
          <p className='text-muted-foreground mt-2 font-neo'>
            {((endTime - startTime) / 1000).toFixed(2)}초 만에 완료했습니다!
          </p>
        </div>

        <div className='rounded-md bg-muted p-4'>
          <p className='text-sm font-medium flex items-center gap-2 font-neo'>
            <Code className='h-4 w-4' />
            실행 결과:
          </p>
          <div className='mt-2 rounded-md bg-black/90 p-4 w-[400px]'>
            <p className='text-white font-mono'>15</p>
          </div>
        </div>
      </div>
    </div>
  );
}

