import { socket } from "@entities/game";
import { useState, useEffect } from "react";

interface UseSocketOptions<T> {
    event: string;
    initialData?: T;
  }

export function useSocketEvent<T>({ event, initialData }: UseSocketOptions<T>) {
    const [data, setData] = useState<T | null>(initialData || null);

    useEffect(() => {
      const handler = (newData: T) => setData(newData);
      socket.on(event, handler);
      return () => {
        socket.off(event, handler);
      };
    }, [event]);

    return data;
  }
