'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@heroui/button';
import { useRouter } from 'next/navigation';
import FixedLeaderboard from '../../components/fixed-leaderboard';
import { CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Sparkles, Trophy, Clock, Code } from 'lucide-react';
import Register from '../../components/register';
import { Countdown } from '../../components/countdown';
import Playing from '../../components/playing';
import Result from '../../components/result';
import Image from 'next/image';
import BackgroundPixel from '../../public/images/background-pixel.jpg';
import confetti from 'canvas-confetti';

function normalizeCode(code) {
  if (typeof code !== 'string') {
    return ''; // Return empty string if the code is not a string
  }
  return code
    .replace(/\s+/g, '') // Remove all whitespace
    .replace(/['"]/g, '"') // Normalize quotes
    .toLowerCase(); // Case insensitive
}

export default function Page() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [studentId, setStudentId] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gameState, setGameState] = useState('register'); // 임시변수
  //const [questionCode, setQuestionCode] = useState([]); // 문제코드
  const [questionCode, setQuestionCode] = useState(`function sum(a, b) {
    return a + b;
}
console.log(sum(5, 10));`); // 문제코드
  const [userTime, setUserTime] = useState([]);
  const [userCode, setUserCode] = useState(''); // 유저 입력 코드
  const [userRank, setUserRank] = useState(0); // 추후 post로 받아올 랭크
  const [question, setQuestion] = useState(1); // 문제 번호

  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);

  const timerRef = useRef(null);
  const confettiRef = useRef(null);

  const handleStart = () => {
    if (!name || !department || !studentId) {
      alert('모든 정보를 입력해주세요!');
      return;
    }
    setGameState('countdown');
  };

  const handleCountdownComplete = () => {
    setGameState('playing');
    const now = Date.now();
    setStartTime(now);

    timerRef.current = setInterval(() => {
      setElapsedTime((Date.now() - now) / 1000);
    }, 100);
  };

  useEffect(() => {
    console.log('userCode', normalizeCode(userCode));
    console.log('questionCode', questionCode);
  }, [userCode, questionCode]);

  const handleSubmit = () => {
    const endTimeNow = Date.now();
    setEndTime(endTimeNow);
    setGameState('result');

    // Clear the timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    // Save score to leaderboard
    const timeTaken = (endTimeNow - startTime) / 1000;

    // Compare code using the normalize function
    const isCorrect = normalizeCode(questionCode) === normalizeCode(userCode);
    console.log('isCorrect', isCorrect);
    if (isCorrect) {
      // Trigger confetti effect
      if (confettiRef.current) {
        const rect = confettiRef.current.getBoundingClientRect();

        // 왼쪽 위에서 터지는 컨페티
        confetti({
          particleCount: 150,
          spread: 100,
          origin: { x: 0.2, y: 0.2 },
        });

        // 오른쪽 위에서 터지는 컨페티
        confetti({
          particleCount: 150,
          spread: 100,
          origin: { x: 0.8, y: 0.2 },
        });

        // 가운데 위에서 터지는 컨페티
        confetti({
          particleCount: 200,
          spread: 160,
          origin: { x: 0.5, y: 0.1 },
        });
      }
    }
  };
  const handlePlayAgain = () => {
    if (question <= 5) {
      setQuestion((prev) => prev + 1);
      setUserCode('');
      setUserTime((prev) => [...prev, ((endTime - startTime) / 1000).toFixed(2)]);
      setGameState('countdown');
    } else {
      setQuestion(1);
      setName('');
      setDepartment('');
      setStudentId('');
      setPhoneNumber('');
      userTime([]);
      setGameState('register');
    }
  };
  const handleViewLeaderboard = () => {
    router.push('/leaderboard');
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  return (
    <div ref={confettiRef}>
      <Image
        className='!w-3/4 fixed top-0 left-0 '
        src={BackgroundPixel}
        alt='Background Image'
        layout='fill'
        objectFit='cover'
        quality={100}
      />
      {/* Floating elements */}
      <div className='absolute w-3/4 inset-0 overflow-hidden pointer-events-none text-white'>
        <div className='absolute top-20 left-[10%] animate-float-slow opacity-50'>
          <Code size={40} />
        </div>
        <div className='absolute top-40 right-[15%] animate-float opacity-50'>
          <Sparkles size={30} />
        </div>
        <div className='absolute bottom-[30%] left-[20%] animate-float-slow opacity-50'>
          <Trophy size={35} />
        </div>
        <div className='absolute bottom-[20%] right-[25%] animate-float opacity-50'>
          <Clock size={25} />
        </div>
      </div>

      <FixedLeaderboard />
      <div className='min-h-screen w-3/4 flex flex-col items-center justify-center z-10'>
        <CardHeader className='w-3/4'>
          <CardTitle className='text-center text-4xl flex items-center justify-center gap-2 font-neo'>
            <Sparkles className='h-5 w-5 text-[#eeeeee]' />
            코딩 스피드 챌린지
            <Sparkles className='h-5 w-5 text-[#eeeeee]' />
          </CardTitle>
          <CardDescription className='text-center font-neo'>
            {gameState === 'register' && '정보를 입력하고 도전을 시작하세요'}
            {gameState === 'countdown' && '준비하세요!'}
            {gameState === 'playing' && '코드를 최대한 빠르게 작성하세요!'}
            {gameState === 'result' && '결과'}
          </CardDescription>
        </CardHeader>
        <CardContent className='w-3/4 flex flex-col items-center justify-center'>
          {gameState == 'register' && (
            <Register
              setName={setName}
              name={name}
              setDepartment={setDepartment}
              department={department}
              setStudentId={setStudentId}
              studentId={studentId}
              setPhoneNumber={setPhoneNumber}
              phoneNumber={phoneNumber}
            ></Register>
          )}
          {gameState == 'countdown' && <Countdown onComplete={handleCountdownComplete} />}
          {gameState == 'playing' && (
            <Playing
              elapsedTime={elapsedTime}
              questionCode={questionCode}
              setUserCode={setUserCode}
              userCode={userCode}
            />
          )}
          {gameState == 'result' && (
            <Result
              userTime={userTime}
              question={question}
              endTime={endTime}
              startTime={startTime}
              userRank={userRank}
            />
          )}
          <div className='mt-10 font-neo'>
            {gameState === 'register' && (
              <Button
                onPress={handleStart}
                className='px-8 py-2 h-auto text-base shadow-md hover:shadow-lg transition-all'
              >
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
                {question < 5 ? (
                  <Button
                    variant='outline'
                    onPress={handlePlayAgain}
                    className='px-6 py-2 h-auto text-base shadow-sm hover:shadow transition-all'
                  >
                    다음 문제
                  </Button>
                ) : (
                  <Button
                    variant='outline'
                    onPress={handlePlayAgain}
                    className='px-6 py-2 h-auto text-base shadow-sm hover:shadow transition-all'
                  >
                    다시 도전하기
                  </Button>
                )}
              </>
            )}
          </div>
        </CardContent>
      </div>
    </div>
  );
}