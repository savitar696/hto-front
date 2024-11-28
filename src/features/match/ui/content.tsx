import { useUser } from "@entities/user"
import { useEffect, useState } from "react"
import { useShallow } from "zustand/react/shallow"
import { socket } from "../api"

interface Pick {
  maps: string[];
  players: { client_id: string; name: string }[];
  vote_right: number;
  vote_right_end: number;
  ended_when: number;
  mapsSource: string[];
}

interface BanJoinSocketInput {
  game_id: string;
  name: string;
}

interface BanSocketInput {
  game_id: string;
  name: string;
  ban_map: string;
}

export const Match = ({ id }: { id: string }) => {
  const { profile } = useUser(useShallow((state) => state.payload))
  const [socketData, setSocketData] = useState([])
  const [banMap, setBanMap] = useState<string>('');
  const [picks, setPicks] = useState<Pick | null>(null);

  console.log(profile.name, profile)
  useEffect(() => {
    socket.on("connect", () => {
      socket.on("ban.listener", (data) => {
        setSocketData(data)
      })

      socket.emit("ban.ticker", {
        game_id: id,
        name: profile.name,
      });

      socket.emit("ban.join", {
        game_id: id,
        name: profile.name,
      });

      socket.on("ban.join", (data) => {
        setSocketData(data);
      });

      socket.on("ban.ticker", (data) => {
        setSocketData(data)
      })
    })
  }, [])

  useEffect(() => {
    socket.on('BAN_LISTENER', (updatedPicks: Pick) => {
      setPicks(updatedPicks)
    });
  }, [])

  const handleBan = () => {
    const data: BanSocketInput = { game_id: id, name: profile.name, ban_map: banMap };
    socket.emit('ban', data);
  };

  const handleTicker = () => {
    const data: BanJoinSocketInput = { game_id: id, name: profile.name };
    socket.emit('ban.ticker', data);
  };

  console.log(socketData)
  return (
    <>`
      <h2>{id}</h2>
      <p>{socketData}</p>
      <h2>hello</h2>
      {picks?.maps && (
        <div>
          <h2>Available Maps</h2>
          <ul>
            {picks.maps.map((map, index) => (
              <li key={index}>{map}</li>
            ))}
          </ul>
          <input
            type="text"
            placeholder="Map to Ban"
            value={banMap}
            onChange={(e) => setBanMap(e.target.value)}
          />
          <button onClick={handleBan}>Ban Map</button>
        </div>
      )}

      {picks && (
        <div>
          <h2>Voting Info</h2>
          <p>Vote Right: {picks.vote_right}</p>
          <p>Vote Right Ends: {new Date(picks.vote_right_end).toLocaleTimeString()}</p>
        </div>
      )}

      {/* Trigger Ticker */}
    <button onClick={handleTicker}>Start Ticker</button>

      {/* Players List */}
      {picks?.players && (
        <div>
          <h2>Players</h2>
          <ul>
            {picks.players.map((player, index) => (
              <li key={index}>{player.name}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}
