const fs = require('fs');
const path = require('path');
const https = require('https');

const publicDir = path.join(__dirname, 'public');
const files = fs.readdirSync(publicDir);

let count = 1;
for (const file of files) {
  if (file.endsWith('.htm') && file.includes('https___lh3.googleusercontent.com')) {
    const match = file.match(/6s(https___lh3\.googleusercontent\.com_p_[^!]+)/);
    if (match) {
      // The original URL in the filename has "___" for "://" and "_" for "/".
      // Wait, let's look at it: https___lh3.googleusercontent.com_p_AF1QipNyKnV0GdXy2EXvUved7zi8ZkaI8IqRG3n5JYI=w203-h152-k-no
      // Replacing ___ with ://
      let urlStr = match[1].replace('___', '://');
      // Replacing the next _ with / for the path
      urlStr = urlStr.replace('_p_', '/p/');
      // Replacing resolution
      urlStr = urlStr.replace(/=w.*$/, '=s1080');
      
      console.log('Downloading:', urlStr);
      
      const dest = path.join(publicDir, `gallery-${count}.jpg`);
      count++;
      
      https.get(urlStr, (res) => {
        const fileStream = fs.createWriteStream(dest);
        res.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
          console.log('Saved', dest);
          try {
            fs.unlinkSync(path.join(publicDir, file)); // delete the htm file
          } catch(e) {}
        });
      }).on('error', (err) => {
        console.error('Error downloading:', err.message);
      });
    }
  }
}
