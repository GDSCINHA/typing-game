'use client';

import { useState, React } from 'react';
import { Sparkles, Code } from 'lucide-react';
import axios from 'axios';

export default function Result({ endTime, startTime, question, userTime, userRank, questionCode }) {
  let totalTime = 0;
  for (let time of userTime) {
    totalTime += parseFloat(time);
  }

  return (
    <div className='z-10'>
      <div className='space-y-6 py-4'>
        <div className='text-center'>
          <h3 className={`text-2xl font-semibold flex items-center justify-center gap-2 text-green-600 font-neo`}>
            <Sparkles className='h-5 w-5' />
            {question}단계 성공!
            <Sparkles className='h-5 w-5' />
          </h3>
          <p className='text-muted-foreground mt-2 font-neo'>
            {((endTime - startTime) / 1000).toFixed(2)}초 만에 완료했습니다!
          </p>
        </div>

        <div className='rounded-md bg-muted p-4'>
          {question < 5 ? (
            <div>
              <p className='text-sm font-medium flex items-center gap-2 font-neo'>
                <Code className='h-4 w-4' />
                실행 결과:
              </p>
              <div className='mt-2 rounded-md bg-black/90 p-4 w-[400px]'>
                <p className='text-white font-mono'>{questionCode[question - 1].result}</p>
              </div>
            </div>
          ) : (
            <div>
              <div className='mt-2 rounded-md bg-black/70 p-4 w-[400px] font-neo'>
                {userTime.map((time, index) => (
                  <p key={index} className='text-white font-mono'>
                    <strong className='mr-3'>{index + 1}차 시도: </strong>
                    {parseFloat(time).toFixed(2)}초
                    {console.log(userTime)}
                  </p>
                ))}
              </div>
              <div className='mt-4 flex items-center justify-center flex-col font-neo text-xl'>
                <p className='text-white font-mono'>총합 시간: {parseFloat(totalTime).toFixed(2)}초</p>
                <p className='text-white font-mono'>순위: {userRank} 위</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
