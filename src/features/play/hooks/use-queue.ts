import { useEffect, useState, useCallback, useMemo, SetStateAction } from "react";
import { useTimer } from "use-timer";
import { useNavigate } from "react-router-dom";
import { queueIO } from "@entities/user/model/user.events";
import { toaster } from "@components/ui/toaster";
import { QueueResponse } from "@entities/user/model/user.types";
import foundedGame from "@shared/music/found.mp3";
import afterFoundedGame from "@shared/music/accepted.wav";

export const useQueue = (payload: any) => {
  const [search, setSearch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<QueueResponse<any[]>>({
    status: "searching",
    payload: [],
  });
  const { time, start, pause, reset } = useTimer({
    initialTime: 0,
    interval: 1000,
    timerType: "INCREMENTAL",
  });
  const navigate = useNavigate();

  const hasDiscordId = useMemo(() => {
    return payload?.properties.some((property: any) => property.type === 'discord_id');
  }, [payload]);

  const joinQueue = useCallback(() => {
    if (!payload?.properties || !hasDiscordId) {
      toaster.create({
        description: "Привяжите Discord для того, чтобы войти в очередь.",
        type: "error",
      });
      return;
    }
    reset();
    start();
    setSearch(true);
    queueIO.connect();
  }, [reset, start, hasDiscordId, payload]);

  const outQueue = useCallback(() => {
    reset();
    pause();
    setSearch(false);
    queueIO.disconnect();
  }, [reset, pause]);

  useEffect(() => {
    const handleConnect = () => {
      queueIO.emit("join", { id: payload.id }, (response: SetStateAction<QueueResponse<any[]>>) => {
        if (response) {
          setData(response);
        } else {
          console.error("Failed to join queue");
        }
      });
    };

    const handleJoinEvent = (eventData: QueueResponse<any[]>) => {
      if (eventData) {
        if (eventData.url === undefined) return;
        setData(eventData);
      } else {
        console.error("Received invalid join event data");
      }
    };

    queueIO.on("connect", handleConnect);
    queueIO.on("join.event", handleJoinEvent);

    return () => {
      queueIO.off("connect", handleConnect);
      queueIO.off("join.event", handleJoinEvent);
    };
  }, [payload.id]);

  useEffect(() => {
    const audio1 = new Audio(foundedGame);
    const audio2 = new Audio(afterFoundedGame);
    const playAudio = () => {
      if (data.status === "ready") {
        audio1.play();
        setLoading(true);
        toaster.create({
          description: "Идет создание лобби",
          type: "success",
        });
        setTimeout(() => {
          navigate(`/match/${data.url}`);
          audio2.play();
        }, 5 * 1000);
      }
    };
    audio1.addEventListener("canplaythrough", playAudio);
    return () => {
      audio1.pause();
      audio1.removeEventListener("canplaythrough", playAudio);
    };
  }, [data, navigate]);

  return { search, time, loading, joinQueue, outQueue };
};