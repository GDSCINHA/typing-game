"use client"

import React from 'react';
import { Trophy, Medal } from "lucide-react"
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@heroui/table"
import Image from "next/image"
export default function FixedLeaderboard({ rankings }) {
    return (
        <div className="fixed top-0 right-0 w-1/4 h-full bg-[#1a1a1a] flex flex-col items-center">
            <div className="flex flex-row justify-center font-neo text-2xl my-6 font-bold items-center">
                <Trophy className="h-6 w-6 mr-1 text-yellow-500" />
                랭킹보드
                <Trophy className="h-6 w-6 ml-1 text-yellow-500" />
            </div>
            <div className="relative flex w-full px-3 mb-3">
                <div className=" flex flex-row justify-center items-center w-full p-2 rounded-lg bg-[#27272a]">
                    <div className="flex w-auto h-full justify-center items-center pl-5">
                        <Image src="/images/logo.png" alt="logo" width={100} height={100} />
                    </div>
                    <div className="flex w-full flex-col justify-center items-start pl-10 font-neo">
                        <p className="font-bold">인스타그램 팔로우하고 <br/> 게임에 참여하세요!</p>
                        <p className="">@gdgoc.inha</p>
                    </div>
                </div>
            </div>
            
            {!rankings || rankings.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-3/4 font-neo text-gray-400">
                    <Trophy className="h-12 w-12 mb-4 opacity-50" />
                    <p>아직 기록이 없습니다</p>
                    <p>첫 번째 도전자가 되어보세요!</p>
                </div>
            ) : (
                <Table 
                    aria-label="랭킹 테이블"
                    className="px-3 font-neo h-3/4"
                >
                    <TableHeader>
                        <TableColumn className="text-center">등수</TableColumn>
                        <TableColumn className="text-center">이름</TableColumn>
                        <TableColumn className="text-center">학과</TableColumn>
                        <TableColumn className="text-center">기록(초)</TableColumn>
                    </TableHeader>
                    <TableBody>
                        {rankings.map((item) => (
                            <TableRow key={item.rank}>
                                <TableCell className="text-center text-lg">
                                    {item.rank === 1 ? "🥇" : 
                                     item.rank === 2 ? "🥈" : 
                                     item.rank === 3 ? "🥉" : item.rank}
                                </TableCell>
                                <TableCell className={`text-center py-3 ${item.rank <= 3 ? "font-bold" : ""}`}>{item.name}</TableCell>
                                <TableCell className={`text-center py-3 ${item.rank <= 3 ? "font-bold" : ""}`}>{item.major}</TableCell>
                                <TableCell className={`text-center py-3 ${item.rank <= 3 ? "font-bold" : ""}`}>{item.typingSpeed}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </div>
    );
}

