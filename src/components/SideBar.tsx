import { useEffect, useState } from 'react';

import { Button } from '../components/Button';
import { MovieCard } from '../components/MovieCard';

// import { SideBar } from './components/SideBar';
import { Content } from '../components/Content';

import { api } from '../services/api';

import '../styles/global.scss';

import '../styles/sidebar.scss';

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}
interface SidebarProps {
  selectedGenreId: number,
  handleClickButton(id: number): void
}

export function SideBar({ selectedGenreId, handleClickButton }: SidebarProps) {

  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <nav className="sidebar">
        <span>Watch<p>Me</p></span>

        <div className="buttons-container">
          {genres.map(genre => (
            <Button
              key={String(genre.id)}
              title={genre.title}
              iconName={genre.name}
              onClick={() => handleClickButton(genre.id)}
              selected={selectedGenreId === genre.id}
            />
          ))}
        </div>

      </nav>
    </div>
  )
}