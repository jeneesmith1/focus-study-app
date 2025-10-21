import { useState } from 'react'
import './VideoBackground.css'

const calmingVideos = [
  {
    id: 1,
    name: 'Ocean Waves',
    url: 'https://cdn.pixabay.com/video/2022/11/07/137579-769264539_large.mp4'
  },
  {
    id: 2,
    name: 'Forest Stream',
    url: 'https://cdn.pixabay.com/video/2021/08/10/84762-587103553_large.mp4'
  },
  {
    id: 3,
    name: 'Mountain View',
    url: 'https://cdn.pixabay.com/video/2022/02/07/107157-676276360_large.mp4'
  },
  {
    id: 4,
    name: 'Night Sky',
    url: 'https://cdn.pixabay.com/video/2020/06/14/41841-431700933_large.mp4'
  }
]

function VideoBackground() {
  const [currentVideo, setCurrentVideo] = useState(0)
  const [showSelector, setShowSelector] = useState(false)

  return (
    <div className="video-background">
      <video
        key={currentVideo}
        autoPlay
        loop
        muted
        playsInline
        className="background-video"
      >
        <source src={calmingVideos[currentVideo].url} type="video/mp4" />
      </video>

      <button
        className="video-selector-toggle"
        onClick={() => setShowSelector(!showSelector)}
      >
        {showSelector ? '✕' : '🎬'}
      </button>

      {showSelector && (
        <div className="video-selector">
          <h3>Choose Background</h3>
          <div className="video-options">
            {calmingVideos.map((video, index) => (
              <button
                key={video.id}
                className={`video-option ${currentVideo === index ? 'active' : ''}`}
                onClick={() => {
                  setCurrentVideo(index)
                  setShowSelector(false)
                }}
              >
                {video.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default VideoBackground
