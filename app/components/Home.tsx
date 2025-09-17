"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import libraryStyles from "./library.module.css";
import playlistStyles from "./MyPlaylists.module.css";

export default function Home() {
  const [activeSection, setActiveSection] = useState<
    "Home" | "Library" | "Playlist"
  >("Home");

  useEffect(() => {
    document.title = `${activeSection} | NhacCuaTui`;
  }, [activeSection]);

  const [greeting, setGreeting] = useState("");
  const getGreeting = (): string => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 11) return "Chào buổi sáng";
    if (hour >= 11 && hour < 14) return "Chào buổi trưa";
    if (hour >= 14 && hour < 18) return "Chào buổi chiều";
    if (hour >= 18 && hour < 23) return "Chào buổi tối";
    return "Chúc bạn ngủ ngon";
  };
  useEffect(() => {
    setGreeting(getGreeting());
    const interval = setInterval(() => setGreeting(getGreeting()), 60000);
    return () => clearInterval(interval);
  }, []);

  const playlists = [
    { title: "Chill Vibes", songs: 12 },
    { title: "Workout Mix", songs: 8 },
    { title: "Love Songs", songs: 20 },
    { title: "Hip Hop Hits", songs: 15 },
    { title: "Study Focus", songs: 5 },
    { title: "Party Time", songs: 18 },
  ];

  return (
    <div className="app-container">
      {/* Sidebar */}
      <SiderBar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Main */}
      <div className="main">
        {/* Header */}
        <WebHeader />

        {/* Content */}
        <div className="content">
          {/* HOME */}
          <HomeOption activeSection={activeSection} greeting={greeting} />

          {/* LIBRARY */}
          <LibraryOption activeSection={activeSection} />

          {/* PLAYLIST */}
          <PlaylistOption activeSection={activeSection} playlists={playlists} />
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

function HeaderRight() {
  return (
    <div className="header-right">
      <button className="sign-up head">
        <Link href="/signup" className="a-sign-up">
          Sign up
        </Link>
      </button>
      <button className="login head">
        <Link href="/signin">Sign in</Link>
      </button>
    </div>
  );
}

function WebHeader() {
  return (
    <header className="header">
      <div className="back-next-search">
        <div className="back chevron">
          <button>
            <i className="fa-solid fa-chevron-left"></i>
          </button>
        </div>
        <div className="next chevron">
          <button>
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>
        <div className="search-box">
          <i className="fa-solid fa-magnifying-glass i-search"></i>
          <input
            className="input-text"
            placeholder="What do you want to hear about?"
          />
        </div>
      </div>

      <HeaderRight />
    </header>
  );
}

function SiderBar({
  activeSection,
  setActiveSection,
}: {
  activeSection: string;
  setActiveSection: (s: "Home" | "Library" | "Playlist") => void;
}) {
  return (
    <div className="menu">
      <Logo url="/images/logo.png" />
      <Option
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
    </div>
  );
}

function Logo({ url }: { url: string }) {
  return (
    <div className="title">
      <Link href="/">
        <img src={url} alt="logo" />
      </Link>
    </div>
  );
}

const navItems = [
  { key: "Home", label: "Explore", icon: "fa-regular fa-compass" },
  { key: "Library", label: "Library", icon: "fa-solid fa-book" },
  { key: "Playlist", label: "My Playlist", icon: "fa-solid fa-list" },
];

function Option({
  activeSection,
  setActiveSection,
}: {
  activeSection: string;
  setActiveSection: (s: "Home" | "Library" | "Playlist") => void;
}) {
  return (
    <nav>
      {navItems.map((item) => (
        <a
          key={item.key}
          href="#"
          className={activeSection === item.key ? "active" : ""}
          onClick={() => setActiveSection(item.key as any)}
        >
          <i className={item.icon}></i>
          {item.label}
        </a>
      ))}
    </nav>
  );
}

function HomeOption({
  activeSection,
  greeting,
}: {
  activeSection: string;
  greeting: string;
}) {
  if (activeSection !== "Home") return null;
  return (
    <div className="home-menu section active">
      <div id="greeting" className="greeting-text">
        {greeting}
      </div>
      <h2>Featured Playlists</h2>
      <div className="playlists">
        {[1, 2, 3, 4].map((i) => (
          <div className="playlists-card" key={i}>
            <img src={`/images/playlist${i}.jpg`} alt={`Playlist${i}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

function LibraryOption({ activeSection }: { activeSection: string }) {
  if (activeSection !== "Library") return null;
  return (
    <div className="library-menu section active">
      <h1>Your Library</h1>
      <div className={libraryStyles.table}>
        <div className={libraryStyles.tableHeader}>
          <div className="col index">#</div>
          <div className="col title">Title</div>
          <div className="col artist">Artist</div>
          <div className="col duration">Duration</div>
        </div>

        {songs.map((song, index) => (
          <LibraryRow
            key={index}
            index={index + 1}
            title={song.title}
            artist={song.artist}
            duration={song.duration}
            cover={song.cover}
          />
        ))}
      </div>
    </div>
  );
}

const songs = [
  {
    title: "Song 1",
    artist: "Artist A",
    duration: "3:45",
    cover: "/covers/song1.jpg",
  },
  {
    title: "Song 2",
    artist: "Artist B",
    duration: "4:12",
    cover: "/covers/song2.jpg",
  },
  // thêm các bài khác
];

function LibraryRow({
  index,
  title,
  artist,
  duration,
  cover,
}: {
  index: number;
  title: string;
  artist: string;
  duration: string;
  cover: string;
}) {
  return (
    <div className={libraryStyles.row}>
      <div className="col index">{index}</div>
      <div className="col title">
        <img src={cover} alt="cover" className={libraryStyles.cover} />
        <span>{title}</span>
      </div>
      <div className="col artist">{artist}</div>
      <div className="col duration">{duration}</div>
    </div>
  );
}

function PlaylistOption({
  activeSection,
  playlists,
}: {
  activeSection: string;
  playlists: { title: string; songs: number }[];
}) {
  if (activeSection !== "Playlist") return null;
  return (
    <div className="myplaylist-menu section active">
      <div className={playlistStyles.plistHeader}>
        <h1>My Playlist</h1>
        <button className={playlistStyles.newPlaylistBtn}>
          + New Playlist
        </button>
      </div>

      <div className={playlistStyles.platlistGrid}>
        {playlists.map((pl, index) => (
          <PlaylistCard key={index} title={pl.title} songs={pl.songs} />
        ))}
      </div>
    </div>
  );
}

function PlaylistCard({ title, songs }: { title: string; songs: number }) {
  return (
    <div className={playlistStyles.playlistCard}>
      <div className={playlistStyles.playlistThunb}></div>
      <p className={playlistStyles.playlistTitle}>{title}</p>
      <p className={playlistStyles.playlistCount}>{songs} songs</p>
    </div>
  );
}

function Footer() {
  return (
    <footer className="info">
      {/* INFO-SINGER */}
      <InfoPlayer />

      {/* player center */}
      <div className="player-center">
        <div className="control">
          <ControlButton icon="fa-solid fa-shuffle" />
          <ControlButton icon="fa-solid fa-backward-step" />
          <ControlButton icon="fas fa-play" big />
          <ControlButton icon="fa-solid fa-forward-step" />
          <ControlButton icon="fa-solid fa-repeat" />
        </div>

        <div className="run">
          <input
            type="range"
            className="seek-bar"
            value="0"
            min="0"
            max="100"
          />
          <span className="current-time">00:00</span>
          <span className="music-time">00:00</span>
        </div>
      </div>

      {/* volume */}
      <div className="vol">
        <button className="volume">
          <i className="fa-solid fa-volume-high"></i>
        </button>
        <input type="range" defaultValue="50" min="0" max="100" />
      </div>
    </footer>
  );
}

function InfoPlayer() {
  return (
    <div className="info-player">
      <a className="background-singer">
        <img src="" alt="Singer" />
      </a>
      <div className="info-song">
        <a href="#" className="song-tittle">
          Song Title
        </a>
        <a href="#" className="artist-name">
          Artist Name
        </a>
      </div>
    </div>
  );
}

function ControlButton({ icon, big = false }: { icon: string; big?: boolean }) {
  return (
    <button className={big ? "play-btn" : "play"}>
      <i className={icon}></i>
    </button>
  );
}
