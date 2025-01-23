# YouTube Aggregated Free Skill Course Platform

A modern, interactive web platform that transforms YouTube educational content into structured learning experiences. This platform features gamification, community engagement, and professional certification systems.

## 🌟 Features

### 📺 Course Content
- Organized video lectures with progress tracking
- Interactive video player with caption support
- AI-generated summaries for each video
- Practice questions and quizzes

### 🎮 Gamification
- Points system for engagement
- Achievement badges:
  - 🎥 First Step (Watch first video)
  - 🎓 Getting Started (Complete 2 videos)
  - 🎯 Half Way There (50% completion)
  - 🏆 Course Champion (Full completion)
  - 🦋 Social Butterfly (5 comments)
- Level progression system
- Real-time progress tracking

### 👥 Community Features
- Discussion forum for each video
- Comment system with likes and replies
- User engagement tracking
- Real-time updates

### 📜 Certification
- Automatic certificate generation
- Professional certificate design
- Course completion verification
- Print-ready format

### 📝 Learning Tools
- Note-taking system with auto-save
- AI-generated video summaries
- Practice questions
- Job seeker tips

## 🚀 Getting Started

1. Clone the repository
```bash
git clone [repository-url]
```

2. Open index.html in your web browser
```bash
# No server setup required - it's a static website!
```

## 🌐 Live Demo

Check out the live demo of the project at: [skillcoursepage.netlify.app](https://skillcoursepage.netlify.app)

## 💻 Technical Stack

- HTML5
- CSS3
- JavaScript (ES6+)
- YouTube Embed API
- Font Awesome Icons
- Local Storage for data persistence

## 📂 Project Structure

```
/
├── index.html          # Main HTML file
├── styles/
│   └── main.css       # Stylesheet
├── scripts/
│   └── main.js        # JavaScript functionality
├── README.md          # Documentation
└── readme.txt         # Additional information
```

## 🎯 Core Features

### Video Player
- YouTube video integration
- Caption support in multiple languages
- Progress tracking
- Auto-completion marking

### Points System
- Video watching: 10 points
- Video completion: 50 points
- Posting comments: 5 points
- Receiving likes: 2 points
- Course completion: 500 points

### Achievement Badges
Each badge represents a milestone in the learning journey:
- First Step: Starting the learning journey
- Getting Started: Building momentum with 2 completed videos
- Half Way There: Reaching the midpoint
- Course Champion: Complete course mastery
- Social Butterfly: Community engagement

## 🔧 Customization

### Adding New Videos
Modify the courseData object in main.js:
```javascript
{
    id: [number],
    title: "Video Title",
    duration: "MM:SS",
    videoId: "YouTube-Video-ID"
}
```

### Creating New Badges
Add to the badges array in main.js:
```javascript
{
    id: 'badge_id',
    name: 'Badge Name',
    icon: '🎓',
    description: 'Badge Description',
    condition: (user) => user.someCondition
}
```

## 📱 Responsive Design

- Mobile-first approach
- Adapts to all screen sizes
- Touch-friendly interface
- Consistent experience across devices

## 🔜 Future Enhancements

- [ ] User authentication system
- [ ] Backend integration
- [ ] Real-time chat
- [ ] Advanced analytics
- [ ] Mobile app version
- [ ] Social media integration

## 💡 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 🤝 Support

For support, please:
1. Check the documentation
2. Review existing issues
3. Create a new issue if needed

## 🌐 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Opera

## ⚙️ Local Development

No special setup required! Just open index.html in your browser and start developing.

## 📊 Performance

- Lightweight static site
- Fast loading times
- Efficient local storage usage
- Optimized video loading
