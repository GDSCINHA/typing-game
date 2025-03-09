'use client'

import { Link } from "@heroui/link";
import { Snippet } from "@heroui/snippet";
import { Code } from "@heroui/code";
import { button as buttonStyles } from "@heroui/theme";
import { Button } from "@heroui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    router.push('/challenge');
    setIsLoading(false);
  }, []);
  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
