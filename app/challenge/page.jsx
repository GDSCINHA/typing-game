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
import axios from 'axios';

function normalizeCode(code) {
  if (typeof code !== 'string') {
    return ''; // 코드가 문자열이 아닌 경우 빈 문자열 반환
  }
  return code
    .split('\\n')
    .map(line => line
      .replace(/\s+/g, '') // 모든 공백 제거
      .replace(/['"]/g, '"') // 따옴표 정규화
      .toLowerCase() // 대소문자 구분 없애기
    )
    .join('');
}

export default function Page() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [studentId, setStudentId] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gameState, setGameState] = useState('register'); // 임시변수
  const [questionCode, setQuestionCode] = useState([]); // 문제코드
  const [userTime, setUserTime] = useState([]);
  const [userCode, setUserCode] = useState(''); // 유저 입력 코드
  const [userRank, setUserRank] = useState(0); // 추후 post로 받아올 랭크
  const [question, setQuestion] = useState(1); // 문제 번호

  const [rankings, setRankings] = useState([]);

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
    axios.get('https://www.gdgocinha.site/game/questions')
    .then(response => {
      setQuestionCode(response.data.data);
      setGameState('countdown');
    })
    .catch(error => {
      console.error('에러 발생:', error);
    });
  };

  const handleCountdownComplete = () => {
    setGameState('playing');
    const now = Date.now();
    setStartTime(now);

    timerRef.current = setInterval(() => {
      setElapsedTime((Date.now() - now) / 1000);
    }, 100);
  };

  const handleSubmit = () => {
    const isCorrect = normalizeCode(questionCode[question - 1].content) === normalizeCode(userCode);

    if (!isCorrect) {
      alert('오류를 찾아 수정해주세요!');
      document.querySelector('textarea').focus();
      return;
    }
    const endTimeNow = Date.now();
    setEndTime(endTimeNow);
    setGameState('result');
    setUserTime((prev) => [...prev, ((endTimeNow - startTime) / 1000).toFixed(2)]);

    // Clear the timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    // Compare code using the normalize function
    
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

    if (question === 2) {
      axios.post('https://www.gdgocinha.site/game/result', {
        "name": name,
        "major": department,
        "studentId": studentId,
        "phoneNumber": phoneNumber,
        "typingSpeed": (() => {
            let total = 0;
            for (let time of userTime) {
                total += parseFloat(time);
            }
            total += parseFloat((endTimeNow - startTime) / 1000)
            return total.toFixed(2);
        })(),
      })
      .then(response => {
        setRankings(response.data.data);
        const userRankData = response.data.data.find((item) => {
          return item.name === name && 
          item.major === department && 
          parseFloat(item.typingSpeed) === parseFloat((() => {
            let total = 0;
            for (let time of userTime) {
              total += parseFloat(time);
            }
            total += parseFloat((endTimeNow - startTime) / 1000)
            return total.toFixed(2);
          })())
        });
        if (userRankData) {
          setUserRank(userRankData.rank);
        }
      })
      .catch(error => {
        console.error('에러 발생:', error);
      });
    };
  };

  const handlePlayAgain = () => {
    if (question < 2) {
      setQuestion((prev) => prev + 1);
      setUserCode('');
      setGameState('countdown');
    } else {
      setQuestion(1);
      setName('');
      setDepartment('');
      setStudentId('');
      setPhoneNumber('');
      setUserTime([]);
      setUserCode('');
      setGameState('register');
    }
  };

  useEffect(() => {
    const fetchRankings = async () => {
      try {
        const response = await axios.get('https://www.gdgocinha.site/game/results', {});
        setRankings(response.data.data);
      } catch (error) {
        console.error('Error fetching rankings:', error);
      }
    };
    fetchRankings();
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
      <div className='fixed bottom-1 left-2 font-neo text-sm text-white'>
        2025 GDGoC INHA 김소연·강명묵·박우찬
      </div>
      <FixedLeaderboard rankings={rankings} />
      <div className='min-h-screen w-3/4 flex flex-col items-center justify-center z-10'>
        <CardHeader className='w-3/4'>
          <CardTitle className='text-center text-5xl flex items-center justify-center gap-2 font-neo'>
            <Sparkles className='h-5 w-5 text-[#eeeeee]' />
            코딩 스피드 챌린지
            <Sparkles className='h-5 w-5 text-[#eeeeee]' />
          </CardTitle>
          <CardDescription className='text-center font-neo text-lg'>
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
              question={question}
            />
          )}
          {gameState == 'result' && (
            <Result
              userTime={userTime}
              question={question}
              endTime={endTime}
              startTime={startTime}
              userRank={userRank}
              questionCode={questionCode}
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
                {question < 2 ? (
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