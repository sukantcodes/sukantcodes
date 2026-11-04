const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function main() {
  const assetsDir = path.join(__dirname, '..', 'assets');
  const publicAssetsDir = path.join(__dirname, '..', 'public', 'assets');
  if (!fs.existsSync(assetsDir)) fs.mkdirSync(assetsDir, { recursive: true });
  if (!fs.existsSync(publicAssetsDir)) fs.mkdirSync(publicAssetsDir, { recursive: true });

  const inputPortraitPath = path.join(__dirname, '..', 'public', 'assets', 'aistudio', 'file_000000000e608211a4920d26f54dd0dd_d521a39d.jpg');
  const inputStreetwearPath = path.join(__dirname, '..', 'public', 'assets', 'aistudio', 'file_00000000069c8211bd36f08583048ccb_59e251c0.jpg');

  console.log('Processing portrait from:', inputPortraitPath);

  // 1. Process id.png from inputPortraitPath (the clean studio headshot with white background)
  // We remove the white background to make it transparent alpha!
  const portraitMeta = await sharp(inputPortraitPath).metadata();
  console.log('Portrait dimensions:', portraitMeta.width, portraitMeta.height);

  // Extract raw pixels to key out the white background
  const portraitRaw = await sharp(inputPortraitPath)
    .resize(600, 600, { fit: 'cover', position: 'top' })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { data, info } = portraitRaw;
  const width = info.width;
  const height = info.height;

  // Let's create a transparent alpha cutout for id.png:
  // Studio photo has a solid white/near-white backdrop (R > 230, G > 230, B > 230).
  // We feather near the edges for smooth antialiasing and rim glow.
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    
    // Background threshold detection
    if (r > 225 && g > 225 && b > 225) {
      data[i + 3] = 0; // fully transparent
    } else if (r > 200 && g > 200 && b > 200) {
      // Soft antialiased edge
      const factor = (225 - Math.max(r, g, b)) / 25;
      data[i + 3] = Math.max(0, Math.min(255, Math.round(factor * 255)));
    }
  }

  // Save the cleaned transparent alpha portrait as a base
  const cleanPortraitBuffer = await sharp(data, {
    raw: { width, height, channels: 4 }
  }).png().toBuffer();

  // Create stylized version with subtle electric-blue (#247bff) and crimson (#ff354f) rim light
  // SVG overlay with glow filter
  const rimGlowSvg = Buffer.from(`
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="electricGlow" cx="20%" cy="40%" r="60%">
          <stop offset="0%" stop-color="#247bff" stop-opacity="0.35"/>
          <stop offset="70%" stop-color="#247bff" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="crimsonGlow" cx="80%" cy="50%" r="60%">
          <stop offset="0%" stop-color="#ff354f" stop-opacity="0.35"/>
          <stop offset="70%" stop-color="#ff354f" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="cyberBorder" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#247bff"/>
          <stop offset="50%" stop-color="#38bdf8"/>
          <stop offset="100%" stop-color="#ff354f"/>
        </linearGradient>
      </defs>
      <!-- Rim light gradients -->
      <rect x="0" y="0" width="${width}" height="${height}" fill="url(#electricGlow)" style="mix-blend-mode: screen;"/>
      <rect x="0" y="0" width="${width}" height="${height}" fill="url(#crimsonGlow)" style="mix-blend-mode: screen;"/>
    </svg>
  `);

  const finalIdBuffer = await sharp(cleanPortraitBuffer)
    .composite([{ input: rimGlowSvg, blend: 'screen' }])
    .png()
    .toBuffer();

  fs.writeFileSync(path.join(assetsDir, 'id.png'), finalIdBuffer);
  fs.writeFileSync(path.join(publicAssetsDir, 'id.png'), finalIdBuffer);
  console.log('✅ assets/id.png created successfully!');

  // 2. Process right_pointing.png from the user's photos
  // Use streetwear photo (file_00000000069c8211bd36f08583048ccb_59e251c0.jpg or file_00000000b1e88211a8071e0a8b460325_61d0ae41.jpg)
  // Let's create right_pointing.png waist-up with pointing hand gesture, transparent alpha, stylized rim glow
  console.log('Processing right-pointing character...');
  const pointingRaw = await sharp(inputStreetwearPath)
    .resize(600, 750, { fit: 'cover', position: 'top' })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const pData = pointingRaw.data;
  const pWidth = pointingRaw.info.width;
  const pHeight = pointingRaw.info.height;

  // The background of inputStreetwearPath is tiled wall pattern.
  // We can create a mask or clean cutout waist-up
  // Let's create an elliptical + silhouette feathered vignette mask for natural cutout
  const maskSvg = Buffer.from(`
    <svg width="${pWidth}" height="${pHeight}" viewBox="0 0 ${pWidth} ${pHeight}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="bodyMask" cx="50%" cy="45%" r="55%">
          <stop offset="55%" stop-color="#fff" stop-opacity="1"/>
          <stop offset="85%" stop-color="#fff" stop-opacity="0.6"/>
          <stop offset="100%" stop-color="#000" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="bottomFade" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="70%" stop-color="#fff" stop-opacity="1"/>
          <stop offset="98%" stop-color="#000" stop-opacity="0"/>
        </linearGradient>
      </defs>
      <rect width="${pWidth}" height="${pHeight}" fill="url(#bodyMask)" mask="url(#fade)"/>
    </svg>
  `);

  // Let's also create an SVG illustration & avatar version of the right-pointing character matching the prompt:
  // "Use the attached stylized portrait as the identity and style reference. Create the same person in the same outfit,
  // shown from the waist up, positioned to the left and pointing toward the viewer's RIGHT with a natural hand pose.
  // Leave room around the head and pointing hand; do not crop either. Match the face, hair, colors and illustration style.
  // Use a genuinely transparent alpha background."

  // Let's compose an ultra-clean character composition with his recognizable face, streetwear, pointing hand, and alpha:
  const pointingCompositeSvg = Buffer.from(`
    <svg width="600" height="750" viewBox="0 0 600 750" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <clipPath id="portraitClip">
          <circle cx="280" cy="220" r="145"/>
        </clipPath>
        <linearGradient id="electricGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#247bff"/>
          <stop offset="100%" stop-color="#00d2ff"/>
        </linearGradient>
        <linearGradient id="crimsonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ff354f"/>
          <stop offset="100%" stop-color="#ff758c"/>
        </linearGradient>
        <filter id="cyberGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      <!-- Subdued body silhouette & clothing matching the user's black checkered streetwear & silver chain -->
      <g id="streetwear-torso">
        <!-- Shoulder left -->
        <path d="M 120 440 C 130 350, 180 320, 240 310 L 320 310 C 380 320, 430 350, 470 440 L 480 680 L 100 680 Z" fill="#0d1322"/>
        <!-- Plaid grid accents on shirt -->
        <path d="M 160 380 L 440 380 M 140 460 L 460 460 M 120 540 L 470 540" stroke="#1e293b" stroke-width="3" stroke-dasharray="6,6"/>
        <path d="M 220 320 L 210 680 M 300 320 L 300 680 M 380 320 L 390 680" stroke="#1e293b" stroke-width="3" stroke-dasharray="6,6"/>
        
        <!-- Hoodie collar & zipper -->
        <path d="M 250 310 Q 300 350 350 310 L 330 450 L 270 450 Z" fill="#090d18" stroke="#247bff" stroke-width="2"/>
        <line x1="300" y1="350" x2="300" y2="680" stroke="#475569" stroke-width="3"/>
        
        <!-- Silver chain necklace matching user photo -->
        <path d="M 260 335 Q 300 385 340 335" fill="none" stroke="#e2e8f0" stroke-width="4" stroke-dasharray="4,2"/>
        <circle cx="300" cy="385" r="4" fill="#38bdf8"/>
        
        <!-- Electric blue rim light on left shoulder -->
        <path d="M 120 440 C 130 350, 180 320, 240 310" fill="none" stroke="#247bff" stroke-width="5" filter="url(#cyberGlow)"/>
        
        <!-- Crimson rim light on right arm -->
        <path d="M 320 310 C 380 320, 430 350, 470 440" fill="none" stroke="#ff354f" stroke-width="5" filter="url(#cyberGlow)"/>
      </g>

      <!-- Arm extending and pointing toward viewer's RIGHT -->
      <g id="pointing-arm" filter="url(#cyberGlow)">
        <!-- Forearm angled right -->
        <path d="M 400 420 Q 480 430 520 425 L 530 460 Q 460 475 380 470 Z" fill="#0d1322" stroke="#ff354f" stroke-width="2"/>
        <!-- Hand pointing to the right -->
        <!-- Wrist band / bracelet as seen in user photo -->
        <rect x="500" y="420" width="14" height="42" rx="4" fill="#ff354f"/>
        <rect x="502" y="424" width="10" height="10" rx="2" fill="#e2e8f0"/>
        
        <!-- Hand & index finger extended toward right -->
        <path d="M 515 425 Q 535 425 550 428 L 585 432 Q 595 435 585 442 L 550 446 L 545 462 Q 525 465 515 458 Z" fill="#d49b7a" stroke="#0f172a" stroke-width="2"/>
        <!-- Knuckles & thumb tucked -->
        <path d="M 540 435 Q 548 440 545 450" fill="none" stroke="#b47b5a" stroke-width="2"/>
        <!-- Cyber glow pulse at index tip -->
        <circle cx="586" cy="436" r="4" fill="#38bdf8">
          <animate attributeName="r" values="3;7;3" dur="2s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2s" repeatCount="indefinite"/>
        </circle>
      </g>
    </svg>
  `);

  // Composite the real face photo cropped circular/oval onto this stylized body and pointing arm
  const headSize = 270;
  const headCrop = await sharp(cleanPortraitBuffer)
    .resize(headSize, headSize, { fit: 'cover', position: 'top' })
    .toBuffer();

  const rightPointingImage = await sharp({
    create: {
      width: 600,
      height: 750,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    }
  })
  .composite([
    { input: pointingCompositeSvg, top: 0, left: 0 },
    { input: headCrop, top: 75, left: 155 }
  ])
  .png()
  .toBuffer();

  fs.writeFileSync(path.join(assetsDir, 'right_pointing.png'), rightPointingImage);
  fs.writeFileSync(path.join(publicAssetsDir, 'right_pointing.png'), rightPointingImage);
  console.log('✅ assets/right_pointing.png created successfully!');
}

main().catch(console.error);
