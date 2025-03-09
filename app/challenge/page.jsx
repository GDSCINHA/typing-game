'use client';

import { useState } from 'react';
import { Button, ButtonGroup } from '@heroui/button';
import { useRouter } from 'next/navigation';
import FixedLeaderboard from '../../components/fixed-leaderboard';
import Register from '../../components/register';
import Countdown from '../../components/countdown';
import Playing from '../../components/playing';
import Result from '../../components/result';

export default function Page() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [studentId, setStudentId] = useState('');
  const [gameState, setGameState] = useState('result');

  const handleStart = () => {
    if (!name || !department || !studentId) {
      alert('모든 정보를 입력해주세요!');
      return;
    }
    setGameState('countdown');
  };
  const handleSubmit = () => {};
  const handlePlayAgain = () => {};
  const handleViewLeaderboard = () => {
    router.push('/leaderboard');
  };

  return (
    <div>
      <FixedLeaderboard />
      {gameState == 'register' && <Register name={name} department={department} studentId={studentId}></Register>}
      {gameState == 'countdown' && <Countdown></Countdown>}
      {gameState == 'playing' && <Playing></Playing>}
      {gameState == 'result' && <Result></Result>}
      <div>
        {gameState === 'register' && (
          <Button onPress={handleStart} className='px-8 py-2 h-auto text-base shadow-md hover:shadow-lg transition-all'>
            시작하기
          </Button>
        )}
        {gameState === 'playing' && (
          <Button
            onPress={handleSubmit}
            className='px-8 py-2 h-auto text-base shadow-md hover:shadow-lg transition-all'
          >
            제출하기
          </Button>
        )}
        {gameState === 'result' && (
          <>
            <Button
              variant='outline'
              onPress={handlePlayAgain}
              className='px-6 py-2 h-auto text-base shadow-sm hover:shadow transition-all'
            >
              다시 도전하기
            </Button>
            <Button
              onPress={handleViewLeaderboard}
              className='px-6 py-2 h-auto text-base shadow-md hover:shadow-lg transition-all'
            >
              랭킹 보드 보기
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
