const fs = require('fs');
const path = require('path');
const srcDir = '/Users/ayushpant/Documents/Aurelius Media Redesign/Case Studies';
const destDir = '/Users/ayushpant/Downloads/aurelius-media/public/case-studies';
fs.mkdirSync(destDir, { recursive: true });
const files = fs.readdirSync(srcDir);
files.forEach(f => {
    fs.copyFileSync(path.join(srcDir, f), path.join(destDir, f));
});
console.log('Done copying case studies.');
