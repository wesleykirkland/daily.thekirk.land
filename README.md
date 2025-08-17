# Wesley & Ellie's Wedding Website 🍂

A beautiful autumn-themed wedding website for Wesley & Ellie's September 19, 2025 wedding at Smoky Mountain National Park.

## Features

- **Elegant Landing Page** with countdown timer
- **Our Story Timeline** with interactive milestones
- **Premium Photo Gallery** with lightbox and filtering
- **Wedding Details** with venue information
- **Registry Integration** with popular retailers
- **Simple RSVP Instructions**
- **Mobile Responsive** design
- **Autumn Theme** with muted orange and fall colors

## Quick Start

1. **Add Your Photos**: Place your wedding photos in the `images/` directory
2. **Update Gallery**: Edit the `galleryData` array in `scripts/main.js`
3. **Update Registry Links**: Replace placeholder URLs in the registry section
4. **Customize Content**: Update your story, timeline, and details

## Deployment to Netlify

### Option 1: Drag & Drop (Easiest)
1. Zip your entire project folder
2. Go to [Netlify](https://netlify.com)
3. Drag and drop your zip file to deploy instantly

### Option 2: Git Integration (Recommended)
1. Push your code to GitHub/GitLab
2. Connect your repository to Netlify
3. Netlify will auto-deploy on every push

### Option 3: Netlify CLI
```bash
npm install -g netlify-cli
netlify deploy --prod
```

## Customization Guide

### Colors
Edit the CSS variables in `styles/main.css`:
```css
:root {
    --primary-orange: #D2691E;
    --muted-orange: #CD853F;
    --autumn-red: #B22222;
    /* ... more colors */
}
```

### Photos
1. Optimize your images (recommended: 1200px wide, under 1MB)
2. Add them to the `images/` directory
3. Update the gallery data in `scripts/main.js`:

```javascript
const galleryData = [
    { src: 'images/your-photo.jpg', category: 'engagement', caption: 'Your caption' },
    // Add more photos...
];
```

### Timeline
Update your story in the timeline section of `index.html`:
```html
<div class="timeline-item">
    <div class="timeline-date">2020</div>
    <div class="timeline-content">
        <h3>How We Met</h3>
        <p>Your story here...</p>
    </div>
</div>
```

### Registry Links
Replace the placeholder URLs in `index.html`:
```html
<a href="YOUR_ACTUAL_REGISTRY_URL" class="registry-link" target="_blank">
    Registry Name
</a>
```

## File Structure

```
wedding-website/
├── index.html              # Main HTML file
├── styles/
│   └── main.css            # All styles with autumn theme
├── scripts/
│   └── main.js             # Interactive functionality
├── images/
│   ├── README.md           # Image guidelines
│   └── (your photos here)
├── netlify.toml            # Netlify configuration
└── README.md               # This file
```

## Performance Tips

1. **Optimize Images**: Use tools like TinyPNG or Squoosh
2. **Lazy Loading**: Already implemented for gallery images
3. **Caching**: Configured in netlify.toml
4. **Mobile First**: Responsive design included

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Need Help?

- Check the browser console for any JavaScript errors
- Ensure all image paths are correct
- Verify registry URLs are working
- Test on mobile devices

## License

This is a personal wedding website. Feel free to use as inspiration for your own wedding! 💕

---

**Made with ❤️ for Wesley & Ellie's special day**
