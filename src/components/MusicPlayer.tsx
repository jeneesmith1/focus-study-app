import './MusicPlayer.css'

interface MusicPlayerProps {
  onClose: () => void
}

function MusicPlayer({ onClose }: MusicPlayerProps) {
  // You can change this YouTube video ID to any study music you prefer
  const youtubeVideoId = 'jfKfPfyJRdk' // Example: lofi hip hop radio

  return (
    <div className="music-player">
      <div className="music-header">
        <h3>Study Music</h3>
        <button className="close-btn" onClick={onClose}>×</button>
      </div>
      <div className="video-container">
        <iframe
          width="100%"
          height="315"
          src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1`}
          title="YouTube Music Player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <p className="music-note">
        To change the music, edit the <code>youtubeVideoId</code> in MusicPlayer.tsx
      </p>
    </div>
  )
}

export default MusicPlayer
