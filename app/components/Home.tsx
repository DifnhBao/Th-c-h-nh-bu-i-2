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

  return (
    <div className="app-container">
      {/* Sidebar */}
      <div className="menu">
        <div className="title">
          <Link href="/">
            <img src="/images/logo.png" alt="logo" />
          </Link>
        </div>
        <nav>
          <a
            href="#"
            className={activeSection === "Home" ? "active" : ""}
            onClick={() => setActiveSection("Home")}
          >
            <i className="fa-regular fa-compass"></i> Explore
          </a>
          <a
            href="#"
            className={activeSection === "Library" ? "active" : ""}
            onClick={() => setActiveSection("Library")}
          >
            <i className="fa-solid fa-book"></i> Library
          </a>
          <a
            href="#"
            className={activeSection === "Playlist" ? "active" : ""}
            onClick={() => setActiveSection("Playlist")}
          >
            <i className="fa-solid fa-list"></i> My Playlist
          </a>
        </nav>
      </div>

      {/* Main */}
      <div className="main">
        {/* Header */}
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
                placeholder="Bạn muốn phát nội dung gì?"
              />
            </div>
          </div>

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
        </header>

        {/* Content */}
        <div className="content">
          {/* HOME */}
          {activeSection === "Home" && (
            <div className="home-menu section active">
              <div id="greeting" className="greeting-text">
                {greeting}
              </div>
              <h2>Featured Playlists</h2>
              <div className="playlists">
                {[1, 2, 3, 4].map((i) => (
                  <div className="playlists-card" key={i}>
                    <img
                      src={`/images/playlist${i}.jpg`}
                      alt={`Playlist${i}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* LIBRARY */}
          {activeSection === "Library" && (
            <div className="library-menu section active">
              <h1>Your Library</h1>
              <div className={libraryStyles.table}>
                <div className={libraryStyles.tableHeader}>
                  <div className="col index">#</div>
                  <div className="col title">Title</div>
                  <div className="col artist">Artist</div>
                  <div className="col duration">Duration</div>
                </div>
                <div className={libraryStyles.row}>
                  <div className="col index">1</div>
                  <div className="col title">
                    <img
                      src="/images/song1.jpg"
                      alt="cover"
                      className={libraryStyles.cover}
                    />
                    <span>Phép Màu</span>
                  </div>
                  <div className="col artist">MAYDAYs, Minh Tốc & Lam</div>
                  <div className="col duration">04:26</div>
                </div>
                <div className={libraryStyles.row}>
                  <div className="col index">2</div>
                  <div className="col title">
                    <img
                      src="song2.jpg"
                      alt="cover"
                      className={libraryStyles.cover}
                    />
                    <span>Kho Báu (with Rhymastic)</span>
                  </div>
                  <div className="col artist">(S)TRONG, Rhymastic</div>
                  <div className="col duration">03:37</div>
                </div>
              </div>
            </div>
          )}

          {/* PLAYLIST */}
          {activeSection === "Playlist" && (
            <div className="myplaylist-menu section active">
              <div className="main-header">
                <h1>My Playlist</h1>
                <button className="new-playlist-btn">+ New Playlist</button>
              </div>
              <div className="playlist-grid" id="playlistGrid"></div>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="info">
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
          <div className="player-center">
            <div className="control">
              <button className="play">
                <i className="fa-solid fa-shuffle"></i>
              </button>
              <button className="play">
                <i className="fa-solid fa-backward-step"></i>
              </button>
              <button className="play-btn">
                <i className="fas fa-play"></i>
              </button>
              <button className="play">
                <i className="fa-solid fa-forward-step"></i>
              </button>
              <button className="play">
                <i className="fa-solid fa-repeat"></i>
              </button>
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
          <div className="vol">
            <button className="volume">
              <i className="fa-solid fa-volume-high"></i>
            </button>
            <input type="range" defaultValue="50" min="0" max="100" />
          </div>
        </footer>
      </div>
    </div>
  );
}
