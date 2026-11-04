const fs = require('fs');
const path = require('path');
const JSZip = require('jszip');

async function createZip() {
  const zip = new JSZip();
  const rootDir = path.join(__dirname, '..');
  const assetsDir = path.join(rootDir, 'assets');

  // Add README.md
  const readmeContent = fs.readFileSync(path.join(rootDir, 'README.md'));
  zip.file('README.md', readmeContent);

  // Add all files from assets
  const assetFiles = fs.readdirSync(assetsDir);
  const assetsFolder = zip.folder('assets');
  for (const file of assetFiles) {
    const filePath = path.join(assetsDir, file);
    const content = fs.readFileSync(filePath);
    assetsFolder.file(file, content);
  }

  // Generate zip file
  const zipBuffer = await zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' });
  fs.writeFileSync(path.join(rootDir, 'public', 'profile-assets.zip'), zipBuffer);
  fs.writeFileSync(path.join(rootDir, 'profile-assets.zip'), zipBuffer);
  console.log(`✅ Upload-ready ZIP created successfully (${zipBuffer.length} bytes)!`);
}

createZip().catch(console.error);
