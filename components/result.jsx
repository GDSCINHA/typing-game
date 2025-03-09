'use client'

import React from 'react';
import { Sparkles, Code } from 'lucide-react';

export default function Result({ userCode, questionCode, question, endTime, startTime, normalizeCode }) {
  return (
    <div className='z-10'>
      <div className='space-y-6 py-4'>
        <div className='text-center'>
          <h3
            className={`text-xl font-semibold flex items-center justify-center gap-2 ${
              normalizeCode(userCode) === normalizeCode(questionCode[question]) ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {normalizeCode(userCode) === normalizeCode(questionCode[question]) ? (
              <>
                <Sparkles className='h-5 w-5' />
                성공!
                <Sparkles className='h-5 w-5' />
              </>
            ) : (
              '실패!'
            )}
          </h3>
          <p className='text-muted-foreground mt-2'>
            {normalizeCode(userCode) === normalizeCode(questionCode[question])
              ? `${((endTime - startTime) / 1000).toFixed(2)}초 만에 완료했습니다!`
              : '코드가 예제와 일치하지 않습니다.'}
          </p>
        </div>

        {normalizeCode(userCode) === normalizeCode(questionCode[question]) && (
          <div className='rounded-md bg-muted p-4'>
            <p className='text-sm font-medium flex items-center gap-2'>
              <Code className='h-4 w-4' />
              실행 결과:
            </p>
            <div className='mt-2 rounded-md bg-black/90 p-4'>
              <p className='text-white font-mono'>15</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

