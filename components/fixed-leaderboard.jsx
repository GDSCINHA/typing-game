"use client"

import React from 'react';
import { Trophy, Medal } from "lucide-react"
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@heroui/table"
import Image from "next/image"
export default function FixedLeaderboard() {
    // 예시 데이터s
    const rankings = [
        { rank: 1, name: "김철수", department: "컴퓨터공학과", time: "2.532" },
        { rank: 2, name: "이영희", department: "전자공학과", time: "3.232" },
        { rank: 3, name: "박민수", department: "기계공학과", time: "3.832" },
        { rank: 4, name: "정다희", department: "산업공학과", time: "4.132" },
        { rank: 5, name: "최준호", department: "화학공학과", time: "4.332" },
        { rank: 6, name: "강지원", department: "건축공학과", time: "4.532" },
        { rank: 7, name: "윤서연", department: "소프트웨어학과", time: "4.732" },
        { rank: 8, name: "임현우", department: "전기공학과", time: "4.932" },
        { rank: 9, name: "한미래", department: "정보통신공학과", time: "5.232" },
        { rank: 10, name: "송태양", department: "신소재공학과", time: "5.432" },
        { rank: 11, name: "김영호", department: "컴퓨터공학과", time: "5.632" },
        { rank: 12, name: "이준호", department: "전자공학과", time: "5.832" },
        { rank: 13, name: "박서연", department: "기계공학과", time: "6.032" },
        { rank: 14, name: "정서연", department: "산업공학과", time: "6.232" },
        { rank: 15, name: "최준호", department: "화학공학과", time: "6.432" },
    ];

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
                            <TableCell className={`text-center py-3 ${item.rank === 1 || item.rank === 2 || item.rank === 3 ? "font-bold" : ""}`}>{item.name}</TableCell>
                            <TableCell className={`text-center py-3 ${item.rank === 1 || item.rank === 2 || item.rank === 3 ? "font-bold" : ""}`}>{item.department}</TableCell>
                            <TableCell className={`text-center py-3 ${item.rank === 1 || item.rank === 2 || item.rank === 3 ? "font-bold" : ""}`}>{item.time}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

