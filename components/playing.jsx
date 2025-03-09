'use client'

import React from 'react';
import { Textarea } from "@heroui/input";

export default function Playing({ elapsedTime, questionCode, setUserCode, userCode }) {

    return (
        <div className="z-10 w-full">
            <p className='font-neo'>예제코드</p>
            <div className='flex w-full flex-row'>
                <div className="flex w-full mt-2 h-full bg-black border-1 border-white rounded-lg p-3 w-full min-h-40">
                    <span className="font-consolas whitespace-pre">
                        {questionCode}
                    </span>
                </div>
                <div className='flex border-1 border-white rounded-lg p-3 ml-3 mt-2 w-36 justify-center items-center text-2xl font-neo'>
                    {elapsedTime.toFixed(3)}초
                </div>
            </div>
            <Textarea
                className="w-full mt-2 font-consolas min-h-40 "
                placeholder="여기에 코드를 작성하세요"
                minRows={7}
                size="lg"
                value={userCode}
                onValueChange={setUserCode}
                classNames={{
                    inputWrapper: "bg-black border-white rounded-lg p-3 group-data-[hover=true]:bg-black group-data-[focus=true]:bg-black",
                    input: "font-consolas",
                }}
            />
        </div>
    );
}

