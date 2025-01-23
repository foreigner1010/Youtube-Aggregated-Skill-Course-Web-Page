// Course Data
const courseData = {
    currentVideo: 0,
    videos: [
        {
            id: 1,
            title: "Web Security - Lecture 01 - What is Web Security?/HTML & JavaScript Review",
            duration: "45:00",
            completed: true,
            videoId: "example1", // YouTube video ID
            views: "125K"
        },
        {
            id: 2,
            title: "Web Security - Lecture 02 - HTTP, Cookies, Sessions",
            duration: "50:00",
            completed: true,
            videoId: "example2",
            views: "98K"
        },
        {
            id: 3,
            title: "Web Security - Lecture 03 - Session Attacks",
            duration: "55:00",
            completed: false,
            videoId: "example3",
            views: "87K"
        },
        {
            id: 4,
            title: "Web Security - Lecture 04 - Cross-Site Request Forgery, Same Origin Policy",
            duration: "48:00",
            completed: false,
            videoId: "example4",
            views: "92K"
        },
        {
            id: 5,
            title: "Web Security - Lecture 05 - Exceptions to the Same Origin Policy",
            duration: "52:00",
            completed: false,
            videoId: "example5",
            views: "76K"
        },
        {
            id: 6,
            title: "Web Security - Lecture 06 - Cross-Site Scripting (XSS)",
            duration: "47:00",
            completed: false,
            videoId: "example6",
            views: "83K"
        },
        {
            id: 7,
            title: "Web Security - Lecture 07 - Cross-Site Scripting Defenses",
            duration: "51:00",
            completed: false,
            videoId: "example7",
            views: "71K"
        },
        {
            id: 8,
            title: "Web Security - Lecture 08 - Fingerprinting and Privacy on the Web",
            duration: "49:00",
            completed: false,
            videoId: "example8",
            views: "65K"
        }
    ]
};

// Initialize YouTube Player
let player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '100%',
        width: '100%',
        videoId: courseData.videos[courseData.currentVideo].videoId,
        playerVars: {
            'playsinline': 1,
            'rel': 0,
            'cc_load_policy': 1,  // Force closed captions to load
            'cc_lang_pref': 'en'  // Default to English captions
        },
        events: {
            'onStateChange': onPlayerStateChange,
            'onReady': onPlayerReady
        }
    });
}

// Caption Controls
let captionsEnabled = true;
const captionBtn = document.getElementById('toggleCaptions');
const captionLanguage = document.getElementById('captionLanguage');

function onPlayerReady(event) {
    // Initialize caption button state
    captionBtn.classList.add('active');
    
    // Load available caption tracks
    updateAvailableCaptions();
}

function updateAvailableCaptions() {
    const tracks = player.getOption('captions', 'tracklist') || [];
    
    // Clear existing options except the default one
    while (captionLanguage.options.length > 1) {
        captionLanguage.remove(1);
    }
    
    // Add available language options
    tracks.forEach(track => {
        const option = document.createElement('option');
        option.value = track.languageCode;
        option.textContent = track.languageName;
        captionLanguage.appendChild(option);
    });
}

// Toggle Captions
captionBtn.addEventListener('click', () => {
    captionsEnabled = !captionsEnabled;
    
    if (captionsEnabled) {
        player.loadModule('captions');
        player.setOption('captions', 'track', {'languageCode': captionLanguage.value});
        captionBtn.classList.add('active');
    } else {
        player.unloadModule('captions');
        captionBtn.classList.remove('active');
    }
});

// Change Caption Language
captionLanguage.addEventListener('change', (e) => {
    if (captionsEnabled && e.target.value) {
        player.setOption('captions', 'track', {'languageCode': e.target.value});
    }
});

// Update captions when loading new video
function loadVideo(index) {
    player.loadVideoById(courseData.videos[index].videoId);
    courseData.currentVideo = index;
    updateVideoList();
    updateProgress();
    
    // Reset and update captions for new video
    setTimeout(() => {
        updateAvailableCaptions();
        if (captionsEnabled) {
            player.loadModule('captions');
            player.setOption('captions', 'track', {'languageCode': captionLanguage.value});
        }
    }, 1000); // Give the video time to load
}

// Load YouTube API
const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Player State Change Handler
function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.ENDED) {
        markVideoComplete(courseData.currentVideo);
        if (courseData.currentVideo < courseData.videos.length - 1) {
            loadNextVideo();
        }
    }
}

// Video Navigation
document.getElementById('prevVideo').addEventListener('click', loadPreviousVideo);
document.getElementById('nextVideo').addEventListener('click', loadNextVideo);

function loadNextVideo() {
    if (courseData.currentVideo < courseData.videos.length - 1) {
        courseData.currentVideo++;
        loadVideo(courseData.currentVideo);
    }
}

function loadPreviousVideo() {
    if (courseData.currentVideo > 0) {
        courseData.currentVideo--;
        loadVideo(courseData.currentVideo);
    }
}

// Video List Management
function initializeVideoList() {
    const videoList = document.querySelector('.video-items');
    videoList.innerHTML = courseData.videos.map((video, index) => `
        <div class="video-item ${index === courseData.currentVideo ? 'active' : ''}" 
             onclick="loadVideo(${index})">
            <div class="completion-status ${video.completed ? 'completed' : ''}"></div>
            <div class="video-details">
                <div class="video-title">${video.title}</div>
                <div class="video-meta">
                    <span class="video-duration"><i class="fas fa-clock"></i> ${video.duration}</span>
                    <span class="video-views"><i class="fas fa-eye"></i> ${video.views}</span>
                </div>
            </div>
        </div>
    `).join('');
}

function updateVideoList() {
    const videoItems = document.querySelectorAll('.video-item');
    videoItems.forEach((item, index) => {
        item.classList.toggle('active', index === courseData.currentVideo);
    });
}

// Progress Tracking
function updateProgress() {
    const completedCount = courseData.videos.filter(video => video.completed).length;
    const progress = (completedCount / courseData.videos.length) * 100;
    document.querySelector('.progress').style.width = `${progress}%`;
    document.querySelector('.progress-text').textContent = `${Math.round(progress)}% Complete`;
}

function markVideoComplete(index) {
    courseData.videos[index].completed = true;
    updateProgress();
    updateVideoList();
}

// Tab Management
const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanes = document.querySelectorAll('.tab-pane');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const tabId = button.dataset.tab;
        
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanes.forEach(pane => pane.classList.remove('active'));
        
        button.classList.add('active');
        document.getElementById(tabId).classList.add('active');
    });
});

// Notes Management
const notesTextarea = document.querySelector('textarea');
const saveButton = document.querySelector('.save-btn');

saveButton.addEventListener('click', () => {
    const notes = notesTextarea.value;
    localStorage.setItem(`notes_${courseData.currentVideo}`, notes);
    showNotification('Notes saved successfully!');
});

function loadNotes() {
    const notes = localStorage.getItem(`notes_${courseData.currentVideo}`);
    notesTextarea.value = notes || '';
}

// AI Summary Generation (Mock)
function generateAISummary() {
    const summaryPoints = [
        "Introduction to web security fundamentals",
        "Common vulnerabilities and attack vectors",
        "Best practices for secure web development",
        "Implementation of security measures"
    ];
    
    const summaryList = document.getElementById('summary-points');
    summaryList.innerHTML = summaryPoints.map(point => `<li>${point}</li>`).join('');
}

// Practice Questions (Mock)
function loadPracticeQuestions() {
    const questions = [
        {
            question: "What is the primary purpose of the Same Origin Policy?",
            options: [
                "To prevent cross-site scripting attacks",
                "To manage browser cookies",
                "To restrict cross-origin requests",
                "To validate user input"
            ],
            correct: 2
        }
    ];
    
    const quizContainer = document.querySelector('.quiz-container');
    quizContainer.innerHTML = questions.map((q, i) => `
        <div class="question">
            <p>${q.question}</p>
            ${q.options.map((opt, j) => `
                <label>
                    <input type="radio" name="q${i}" value="${j}">
                    ${opt}
                </label>
            `).join('')}
        </div>
    `).join('');
}

// Job Tips Carousel (Mock)
function initializeJobTips() {
    const tips = [
        "Security Engineer positions often require knowledge of OWASP Top 10",
        "Practice with CTF (Capture The Flag) challenges to improve skills",
        "Consider getting certified in security (e.g., CompTIA Security+)",
        "Build a portfolio of security projects on GitHub"
    ];
    
    const carousel = document.querySelector('.tips-carousel');
    carousel.innerHTML = tips.map(tip => `<div class="tip">${tip}</div>`).join('');
}

// Notifications
function showNotification(message) {
    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Rating System
function initializeRating() {
    const stars = document.querySelectorAll('.star-rating i');
    const submitButton = document.getElementById('submit-rating');
    const reviewText = document.getElementById('review-text');
    let currentRating = 0;

    // Star rating interaction
    stars.forEach(star => {
        star.addEventListener('mouseover', () => {
            const rating = parseInt(star.dataset.rating);
            highlightStars(rating);
        });

        star.addEventListener('mouseout', () => {
            highlightStars(currentRating);
        });

        star.addEventListener('click', () => {
            currentRating = parseInt(star.dataset.rating);
            highlightStars(currentRating);
            updateRatingText(currentRating);
            submitButton.disabled = false;
        });
    });

    // Submit rating and review
    submitButton.addEventListener('click', () => {
        if (currentRating === 0) {
            showNotification('Please select a rating before submitting');
            return;
        }

        const review = {
            rating: currentRating,
            comment: reviewText.value.trim(),
            timestamp: new Date().toISOString()
        };

        // Store rating in localStorage
        const ratings = JSON.parse(localStorage.getItem('courseRatings') || '[]');
        ratings.push(review);
        localStorage.setItem('courseRatings', JSON.stringify(ratings));

        // Update UI
        showNotification('Thank you for your review!');
        resetRatingForm();
        updateAverageRating();
    });
}

function highlightStars(rating) {
    const stars = document.querySelectorAll('.star-rating i');
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.remove('far');
            star.classList.add('fas');
            star.classList.add('active');
        } else {
            star.classList.add('far');
            star.classList.remove('fas');
            star.classList.remove('active');
        }
    });
}

function updateRatingText(rating) {
    const ratingText = document.querySelector('.rating-text');
    const texts = [
        'Click to rate',
        'Poor',
        'Fair',
        'Good',
        'Very Good',
        'Excellent'
    ];
    ratingText.textContent = texts[rating];
}

function resetRatingForm() {
    const reviewText = document.getElementById('review-text');
    const submitButton = document.getElementById('submit-rating');
    
    highlightStars(0);
    reviewText.value = '';
    submitButton.disabled = true;
    updateRatingText(0);
}

function updateAverageRating() {
    const ratings = JSON.parse(localStorage.getItem('courseRatings') || '[]');
    if (ratings.length === 0) return;

    const sum = ratings.reduce((acc, curr) => acc + curr.rating, 0);
    const average = sum / ratings.length;
    
    // Update UI with new average (if you have an element for this)
    showNotification(`Current course rating: ${average.toFixed(1)}/5`);
}

// Gamification System
const gamificationSystem = {
    points: 0,
    level: 1,
    badges: [],
    activities: {
        WATCH_VIDEO: 10,
        COMPLETE_VIDEO: 50,
        POST_COMMENT: 5,
        RECEIVE_LIKE: 2,
        COMPLETE_COURSE: 500
    },
    badges: [
        {
            id: 'level_1',
            name: 'Novice Learner',
            icon: '🪄',
            description: 'Reach Level 1',
            condition: (user) => user.level === 1
        },
        {
            id: 'level_2',
            name: 'Adept Learner',
            icon: '📘',
            description: 'Reach Level 2',
            condition: (user) => user.level === 2
        },
        {
            id: 'level_3',
            name: 'Proficient Learner',
            icon: '🏅',
            description: 'Reach Level 3',
            condition: (user) => user.level === 3
        },
        {
            id: 'level_4',
            name: 'Expert Learner',
            icon: '🎖️',
            description: 'Reach Level 4',
            condition: (user) => user.level === 4
        },
        {
            id: 'level_5',
            name: 'Master Learner',
            icon: '🏆',
            description: 'Reach Level 5',
            condition: (user) => user.level === 5
        },
        {
            id: 'first_video',
            name: 'First Step',
            icon: '🎥',
            description: 'Watch your first video',
            condition: (user) => user.videosWatched >= 1
        },
        {
            id: 'getting_started',
            name: 'Getting Started',
            icon: '🎓',
            description: 'Complete 2 videos',
            condition: (user) => user.videosWatched >= 2
        },
        {
            id: 'half_way',
            name: 'Half Way There',
            icon: '🎯',
            description: 'Complete 50% of the course',
            condition: (user) => user.progress >= 50
        },
        {
            id: 'course_complete',
            name: 'Course Champion',
            icon: '🏆',
            description: 'Complete the entire course',
            condition: (user) => user.progress === 100
        },
        {
            id: 'social_butterfly',
            name: 'Social Butterfly',
            icon: '🦋',
            description: 'Make 5 comments',
            condition: (user) => user.comments >= 5
        }
    ]
};

function awardPoints(activity) {
    const points = gamificationSystem.activities[activity];
    gamificationSystem.points += points;
    updateLevel();
    updateBadges();
    updateUI();
    saveProgress();
}

function updateLevel() {
    const newLevel = Math.floor(gamificationSystem.points / 100) + 1;
    if (newLevel !== gamificationSystem.level) {
        gamificationSystem.level = newLevel;
        showNotification(`Level Up! You're now level ${newLevel}`);
    }
}

function updateBadges() {
    const userData = {
        videosWatched: courseData.videos.filter(v => v.completed).length,
        progress: calculateProgress(),
        comments: getCommentCount()
    };

    console.log('User Data:', userData); // Debugging log

    gamificationSystem.badges.forEach(badge => {
        const badgeElement = document.getElementById(`badge-${badge.id}`);
        console.log(`Checking badge: ${badge.name}, Condition Met: ${badge.condition(userData)}`); // Debugging log

        if (!gamificationSystem.earnedBadges?.includes(badge.id) && badge.condition(userData)) {
            gamificationSystem.earnedBadges = [...(gamificationSystem.earnedBadges || []), badge.id];
            badgeElement.style.display = 'block';
            showNotification(`New Badge Earned: ${badge.name}!`);
        }
    });
}

function renderBadges() {
    const badgesGrid = document.querySelector('.badges-grid');
    const earnedBadges = gamificationSystem.earnedBadges || [];
    
    badgesGrid.innerHTML = gamificationSystem.badges.map(badge => `
        <div class="badge ${earnedBadges.includes(badge.id) ? 'earned' : 'locked'}">
            <div class="badge-icon">${badge.icon}</div>
            <div class="badge-name">${badge.name}</div>
        </div>
    `).join('');
}

// Community System
function initializeCommunity() {
    const submitPost = document.getElementById('submitPost');
    const postContent = document.getElementById('postContent');

    submitPost.addEventListener('click', () => {
        const content = postContent.value.trim();
        if (!content) return;

        const post = {
            id: Date.now(),
            content,
            author: 'User',
            timestamp: new Date().toISOString(),
            likes: 0,
            replies: []
        };

        addPost(post);
        postContent.value = '';
        awardPoints('POST_COMMENT');
    });

    loadPosts();
}

function addPost(post) {
    const posts = JSON.parse(localStorage.getItem('coursePosts') || '[]');
    posts.unshift(post);
    localStorage.setItem('coursePosts', JSON.stringify(posts));
    renderPosts(posts);
}

function loadPosts() {
    const posts = JSON.parse(localStorage.getItem('coursePosts') || '[]');
    renderPosts(posts);
}

function renderPosts(posts) {
    const postsList = document.querySelector('.posts-list');
    postsList.innerHTML = posts.map(post => `
        <div class="post" data-id="${post.id}">
            <div class="post-header">
                <span class="post-author">${post.author}</span>
                <span class="post-time">${formatTime(post.timestamp)}</span>
            </div>
            <div class="post-content">${post.content}</div>
            <div class="post-actions">
                <span class="post-action" onclick="likePost(${post.id})">
                    <i class="far fa-heart"></i> ${post.likes}
                </span>
                <span class="post-action" onclick="replyToPost(${post.id})">
                    <i class="far fa-comment"></i> ${post.replies.length}
                </span>
            </div>
        </div>
    `).join('');
}

// Certificate System
function initializeCertificate() {
    const certificateBtn = document.getElementById('downloadCertificate');
    
    certificateBtn.addEventListener('click', generateCertificate);
    updateCertificateAvailability();
}

function updateCertificateAvailability() {
    const certificateBtn = document.getElementById('downloadCertificate');
    const progress = calculateProgress();
    
    if (progress === 100) {
        certificateBtn.disabled = false;
        certificateBtn.title = 'Download your course completion certificate!';
    } else {
        certificateBtn.disabled = true;
        certificateBtn.title = `Complete the course to unlock your certificate (${progress}% completed)`;
    }
}

function generateCertificate() {
    // Create certificate content
    const certificateContent = `
        <div class="certificate">
            <h1>Certificate of Completion</h1>
            <p>This certifies that</p>
            <h2>Student Name</h2>
            <p>has successfully completed the course</p>
            <h3>Web Security Fundamentals</h3>
            <p>Date: ${new Date().toLocaleDateString()}</p>
        </div>
    `;

    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <html>
            <head>
                <title>Course Certificate</title>
                <style>
                    .certificate {
                        text-align: center;
                        padding: 40px;
                        border: 20px solid #666;
                        margin: 20px;
                    }
                    h1 { color: #333; }
                    h2 { color: #666; }
                    h3 { color: #999; }
                </style>
            </head>
            <body>
                ${certificateContent}
                <script>
                    window.onload = () => {
                        window.print();
                        window.onfocus = () => { window.close(); }
                    }
                </script>
            </body>
        </html>
    `);
}

// Helper Functions
function calculateProgress() {
    const completedVideos = courseData.videos.filter(video => video.completed).length;
    return Math.round((completedVideos / courseData.videos.length) * 100);
}

function getCommentCount() {
    const posts = JSON.parse(localStorage.getItem('coursePosts') || '[]');
    return posts.filter(post => post.author === 'User').length;
}

function formatTime(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
}

function saveProgress() {
    localStorage.setItem('courseProgress', JSON.stringify({
        points: gamificationSystem.points,
        level: gamificationSystem.level,
        earnedBadges: gamificationSystem.earnedBadges
    }));
}

function loadProgress() {
    const progress = JSON.parse(localStorage.getItem('courseProgress') || '{}');
    if (progress.points) gamificationSystem.points = progress.points;
    if (progress.level) gamificationSystem.level = progress.level;
    if (progress.earnedBadges) gamificationSystem.earnedBadges = progress.earnedBadges;
    updateUI();
}

function updateUI() {
    document.getElementById('userPoints').textContent = gamificationSystem.points;
    document.getElementById('userLevel').textContent = gamificationSystem.level;
    renderBadges();
    updateCertificateAvailability();
}

// Initialize Everything
document.addEventListener('DOMContentLoaded', () => {
    initializeVideoList();
    updateProgress();
    loadNotes();
    generateAISummary();
    loadPracticeQuestions();
    initializeJobTips();
    initializeRating();
    initializeCommunity();
    initializeCertificate();
    loadProgress();
});
