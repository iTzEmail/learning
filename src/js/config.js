export const SESSION_CONFIG = {
    idleDuration: 10 * 60 * 1000, // 10 minutes
    maxSessionDuration: 60 * 60 * 1000, // 1 hour, optimal
};


export const PUBLIC_PAGES = ['', 'home', 'login', 'register', 'check-email', 'reset'];


// Pages
export const HOME = {
    playerDefaults: {autoplay: 1, controls: 0, modestbranding: 1, rel: 0, showinfo: 0, disablekb: 1, fs: 0, loop: 1, mute: 1},
    vids: [
        { videoId: 'M-PcjpkS7OY', startSeconds: 77, endSeconds: 130, suggestedQuality: 'hd720' },
        { videoId: 'W_14QhYt-O4', startSeconds: 35, endSeconds: 100, suggestedQuality: 'hd720' },
    ]
};