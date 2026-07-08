const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, 'src', 'config', 'memories.js');
const imagesDir = path.join(__dirname, 'public', 'images');

// Read all files in public/images
fs.readdir(imagesDir, (err, files) => {
  if (err) {
    console.error('Error reading images directory:', err);
    process.exit(1);
  }

  // Filter out system files, unicorn logo
  const validFiles = files.filter(file => {
    const ext = path.extname(file).toLowerCase();
    const isAsset = ['.jpg', '.jpeg', '.png', '.mp4', '.mov', '.webp'].includes(ext);
    const isUnicorn = file.toLowerCase().includes('unicorn');
    return isAsset && !isUnicorn;
  });

  // Natural sort helper (so photo_2 comes before photo_10)
  validFiles.sort((a, b) => {
    return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
  });

  // Generate gallery array items
  const galleryItems = validFiles.map((file, idx) => {
    const ext = path.extname(file).toLowerCase();
    const isVideo = ['.mp4', '.mov'].includes(ext);
    
    let title = 'Sweet Moment 🥰';
    if (isVideo) {
      title = 'Video Memory 🎥';
    } else if (file.includes('Snapchat')) {
      title = 'Snapchat Moment ✨';
    } else if (file.includes('WhatsApp')) {
      title = 'WhatsApp Memory 💬';
    } else if (file.includes('photo_')) {
      title = `Karthu Portrait #${idx + 1} 💖`;
    } else if (file.includes('gallery')) {
      title = 'Special Highlight 🌟';
    } else if (file.includes('memory')) {
      title = 'Timeline Flashback 📸';
    }

    return {
      id: idx + 1,
      title: title,
      date: isVideo ? 'Interactive Video' : 'Special Moment',
      image: `/images/${file}`
    };
  });

  // Read current memories.js
  fs.readFile(configPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading config file:', err);
      process.exit(1);
    }

    // Replace the gallery array using regex
    const regex = /(gallery:\s*\[)[\s\S]*?(\],\s*\/\/ Birthday wishes)/;
    const replacementString = `gallery: ${JSON.stringify(galleryItems, null, 2)},\n\n  // Birthday wishes`;
    
    const updatedData = data.replace(regex, replacementString);

    // Save back to memories.js
    fs.writeFile(configPath, updatedData, 'utf8', (err) => {
      if (err) {
        console.error('Error writing to config file:', err);
        process.exit(1);
      }
      console.log(`Successfully generated gallery with ${galleryItems.length} items inside memories.js!`);
    });
  });
});
