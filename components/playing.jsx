'use client'

import React from 'react';
import { Textarea } from "@heroui/input";

export default function Playing({ elapsedTime, questionCode, setUserCode, userCode, question }) {

    return (
        <div className="z-10 w-full">
            <p className='font-neo select-none'>예제코드</p>
            <div className='flex w-full flex-row'>
                <div className="flex w-full mt-2 h-full bg-black border-1 border-white rounded-lg p-3 w-full min-h-40 ">
                    <span className="font-consolas whitespace-pre select-none">
                        {questionCode[question - 1].content.split('\\n').map((line, index, array) => (
                            <span key={index}>
                                {line}
                                {index < array.length - 1 && <br />}
                            </span>
                        ))}
                    </span>
                </div>
                <div className='flex border-1 border-white rounded-lg p-3 ml-3 mt-2 w-36 justify-center items-center text-[1.25vw] select-none font-neo'>
                    {elapsedTime.toFixed(2)}초
                </div>
            </div>
            <Textarea
                //disableAutosize
                className="w-full mt-2 font-consolas min-h-40 h-full "
                placeholder="여기에 코드를 작성하세요"
                minRows={7}
                maxRows={7}
                size="lg"
                value={userCode}
                onValueChange={setUserCode}
                onKeyDown={(e) => {
                    if (e.key === 'Tab') {
                        // Tab 키: 4칸 공백 삽입
                        e.preventDefault();
                        const start = e.target.selectionStart;
                        const end = e.target.selectionEnd;
                        const newValue = userCode.substring(0, start) + '    ' + userCode.substring(end);
                        setUserCode(newValue);
                        setTimeout(() => {
                            e.target.selectionStart = e.target.selectionEnd = start + 4;
                        }, 0);
                    }
                }}
                classNames={{
                    inputWrapper: "!h-full bg-black border-white rounded-lg p-3 group-data-[hover=true]:bg-black group-data-[focus=true]:bg-black",
                    input: "!h-fullfont-consolas",
                    innerWrapper: '!h-full',
                }}
            />
        </div>
    );
}

