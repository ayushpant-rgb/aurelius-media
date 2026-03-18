const fs = require('fs');
const path = require('path');
const srcDir = '/Users/ayushpant/Documents/Aurelius Media Redesign/Hero Video';
const destDir = '/Users/ayushpant/Downloads/aurelius-media/public/hero-video';
fs.mkdirSync(destDir, { recursive: true });
const files = fs.readdirSync(srcDir);
files.forEach(f => {
    if (f.endsWith('.mp4')) {
        fs.copyFileSync(path.join(srcDir, f), path.join(destDir, f));
        console.log('Copied ' + f);
    }
});
