import { DetailedService } from '../data/servicesData';
import { LocationData, ServiceLocationCombo, ProjectItem } from '../types';
import { CourseItem } from '../data/coursesData';
import { BlogPost } from '../data/blogData';

export interface OgCardOptions {
  title: string;
  subtitle?: string;
  categoryBadge?: string;
  locationTag?: string;
  priceTag?: string;
  features?: string[];
  themeColor?: 'cyan' | 'indigo' | 'emerald' | 'amber' | 'purple';
  backgroundImageUrl?: string;
  brandSubtitle?: string;
}

export interface OgThemePalette {
  primaryGlow: string;
  secondaryGlow: string;
  accent: string;
  accentText: string;
  borderGlow: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
}

const THEME_PALETTES: Record<string, OgThemePalette> = {
  cyan: {
    primaryGlow: 'rgba(6, 182, 212, 0.35)',
    secondaryGlow: 'rgba(14, 165, 233, 0.25)',
    accent: '#06b6d4',
    accentText: '#22d3ee',
    borderGlow: 'rgba(6, 182, 212, 0.45)',
    badgeBg: 'rgba(6, 182, 212, 0.15)',
    badgeBorder: 'rgba(6, 182, 212, 0.4)',
    badgeText: '#67e8f9'
  },
  indigo: {
    primaryGlow: 'rgba(99, 102, 241, 0.35)',
    secondaryGlow: 'rgba(168, 85, 247, 0.25)',
    accent: '#6366f1',
    accentText: '#818cf8',
    borderGlow: 'rgba(99, 102, 241, 0.45)',
    badgeBg: 'rgba(99, 102, 241, 0.15)',
    badgeBorder: 'rgba(99, 102, 241, 0.4)',
    badgeText: '#a5b4fc'
  },
  emerald: {
    primaryGlow: 'rgba(16, 185, 129, 0.35)',
    secondaryGlow: 'rgba(5, 150, 105, 0.25)',
    accent: '#10b981',
    accentText: '#34d399',
    borderGlow: 'rgba(16, 185, 129, 0.45)',
    badgeBg: 'rgba(16, 185, 129, 0.15)',
    badgeBorder: 'rgba(16, 185, 129, 0.4)',
    badgeText: '#6ee7b7'
  },
  amber: {
    primaryGlow: 'rgba(245, 158, 11, 0.35)',
    secondaryGlow: 'rgba(217, 119, 6, 0.25)',
    accent: '#f59e0b',
    accentText: '#fbbf24',
    borderGlow: 'rgba(245, 158, 11, 0.45)',
    badgeBg: 'rgba(245, 158, 11, 0.15)',
    badgeBorder: 'rgba(245, 158, 11, 0.4)',
    badgeText: '#fcd34d'
  },
  purple: {
    primaryGlow: 'rgba(168, 85, 247, 0.35)',
    secondaryGlow: 'rgba(236, 72, 153, 0.25)',
    accent: '#a855f7',
    accentText: '#c084fc',
    borderGlow: 'rgba(168, 85, 247, 0.45)',
    badgeBg: 'rgba(168, 85, 247, 0.15)',
    badgeBorder: 'rgba(168, 85, 247, 0.4)',
    badgeText: '#d8b4fe'
  }
};

// In-memory cache for rendered data URLs
const OG_CACHE = new Map<string, string>();

/**
 * Loads an external image URL safely with CORS support
 */
function loadImage(src: string): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') return resolve(null);
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

/**
 * Wraps text into multiple lines given a max width on canvas context
 */
function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = words[0] || '';

  for (let i = 1; i < words.length; i++) {
    const word = words[i];
    const width = ctx.measureText(`${currentLine} ${word}`).width;
    if (width < maxWidth) {
      currentLine += ` ${word}`;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }
  if (currentLine) {
    lines.push(currentLine);
  }
  return lines;
}

/**
 * Draws rounded rectangle path on canvas
 */
function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

/**
 * Core Canvas Drawing Engine:
 * Generates a high-resolution 1200 x 630 px Open Graph social sharing card
 */
export async function renderOgCardToCanvas(
  options: OgCardOptions,
  canvas?: HTMLCanvasElement
): Promise<HTMLCanvasElement> {
  const WIDTH = 1200;
  const HEIGHT = 630;

  const targetCanvas = canvas || (typeof document !== 'undefined' ? document.createElement('canvas') : null);
  if (!targetCanvas) {
    throw new Error('Canvas API is not available in this environment');
  }

  targetCanvas.width = WIDTH;
  targetCanvas.height = HEIGHT;
  const ctx = targetCanvas.getContext('2d');
  if (!ctx) {
    throw new Error('Failed to obtain 2D canvas context');
  }

  const theme = THEME_PALETTES[options.themeColor || 'cyan'] || THEME_PALETTES.cyan;

  // 1. Deep Space Tech Background Gradient
  const bgGrad = ctx.createLinearGradient(0, 0, WIDTH, HEIGHT);
  bgGrad.addColorStop(0, '#030712');
  bgGrad.addColorStop(0.5, '#070f26');
  bgGrad.addColorStop(1, '#020617');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // 2. Optional Background Image Compositing with Alpha Blend
  if (options.backgroundImageUrl) {
    try {
      const bgImg = await loadImage(options.backgroundImageUrl);
      if (bgImg) {
        ctx.save();
        ctx.globalAlpha = 0.18;
        ctx.drawImage(bgImg, 0, 0, WIDTH, HEIGHT);
        ctx.restore();
      }
    } catch {
      // Graceful fallback to pure vector background
    }
  }

  // 3. Cyber Grid Matrix overlay
  ctx.save();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.035)';
  ctx.lineWidth = 1;
  const gridSize = 40;
  for (let x = 0; x < WIDTH; x += gridSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, HEIGHT);
    ctx.stroke();
  }
  for (let y = 0; y < HEIGHT; y += gridSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(WIDTH, y);
    ctx.stroke();
  }
  ctx.restore();

  // 4. Ambient Glowing Radial Flares
  // Top-left primary aura
  const flare1 = ctx.createRadialGradient(180, 140, 10, 180, 140, 360);
  flare1.addColorStop(0, theme.primaryGlow);
  flare1.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = flare1;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // Bottom-right secondary aura
  const flare2 = ctx.createRadialGradient(WIDTH - 180, HEIGHT - 140, 10, WIDTH - 180, HEIGHT - 140, 380);
  flare2.addColorStop(0, theme.secondaryGlow);
  flare2.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = flare2;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // 5. Outer Futuristic Glassmorphic Frame (Margin: 36px)
  const pad = 36;
  const frameW = WIDTH - pad * 2;
  const frameH = HEIGHT - pad * 2;

  // Frame backdrop fill
  ctx.save();
  roundRect(ctx, pad, pad, frameW, frameH, 24);
  ctx.fillStyle = 'rgba(10, 17, 38, 0.72)';
  ctx.fill();

  // Frame glowing border
  ctx.strokeStyle = theme.borderGlow;
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.restore();

  // 6. Corner Cyber Accents (HUD Brackets)
  ctx.save();
  ctx.strokeStyle = theme.accent;
  ctx.lineWidth = 3.5;
  const cornerSize = 22;

  // Top-Left corner
  ctx.beginPath();
  ctx.moveTo(pad + 14, pad + 14 + cornerSize);
  ctx.lineTo(pad + 14, pad + 14);
  ctx.lineTo(pad + 14 + cornerSize, pad + 14);
  ctx.stroke();

  // Top-Right corner
  ctx.beginPath();
  ctx.moveTo(WIDTH - pad - 14 - cornerSize, pad + 14);
  ctx.lineTo(WIDTH - pad - 14, pad + 14);
  ctx.lineTo(WIDTH - pad - 14, pad + 14 + cornerSize);
  ctx.stroke();

  // Bottom-Left corner
  ctx.beginPath();
  ctx.moveTo(pad + 14, HEIGHT - pad - 14 - cornerSize);
  ctx.lineTo(pad + 14, HEIGHT - pad - 14);
  ctx.lineTo(pad + 14 + cornerSize, HEIGHT - pad - 14);
  ctx.stroke();

  // Bottom-Right corner
  ctx.beginPath();
  ctx.moveTo(WIDTH - pad - 14 - cornerSize, HEIGHT - pad - 14);
  ctx.lineTo(WIDTH - pad - 14, HEIGHT - pad - 14);
  ctx.lineTo(WIDTH - pad - 14, HEIGHT - pad - 14 - cornerSize);
  ctx.stroke();
  ctx.restore();

  // 7. Header Brand Identity: MUCO Labs Emblem & Title
  const contentX = pad + 40;
  const contentY = pad + 40;

  // Logo Icon: Glowing Hexagonal Cyber Box
  ctx.save();
  const iconX = contentX;
  const iconY = contentY;
  const iconSize = 44;
  roundRect(ctx, iconX, iconY, iconSize, iconSize, 10);
  ctx.fillStyle = theme.badgeBg;
  ctx.fill();
  ctx.strokeStyle = theme.accent;
  ctx.lineWidth = 2;
  ctx.stroke();

  // Inner Geometric Cross/Sparkle
  ctx.strokeStyle = theme.accentText;
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(iconX + iconSize / 2, iconY + 10);
  ctx.lineTo(iconX + iconSize / 2, iconY + iconSize - 10);
  ctx.moveTo(iconX + 10, iconY + iconSize / 2);
  ctx.lineTo(iconX + iconSize - 10, iconY + iconSize / 2);
  ctx.stroke();
  ctx.restore();

  // Brand Name & Tagline
  ctx.save();
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 22px "Inter", "Segoe UI", system-ui, sans-serif';
  ctx.fillText('MUCO LABS', iconX + iconSize + 16, iconY + 22);

  ctx.fillStyle = '#94a3b8';
  ctx.font = '600 12px "Inter", "Segoe UI", system-ui, sans-serif';
  ctx.letterSpacing = '1px';
  ctx.fillText(options.brandSubtitle || 'ENTERPRISE AI & SOFTWARE ENGINEERING HQ', iconX + iconSize + 16, iconY + 39);
  ctx.restore();

  // Header Right: Category / Domain Badge
  if (options.categoryBadge) {
    ctx.save();
    ctx.font = 'bold 12px "Inter", "Segoe UI", system-ui, sans-serif';
    const badgeText = options.categoryBadge.toUpperCase();
    const badgeMetrics = ctx.measureText(badgeText);
    const badgeW = badgeMetrics.width + 28;
    const badgeH = 32;
    const badgeX = WIDTH - pad - 40 - badgeW;
    const badgeY = contentY + 6;

    roundRect(ctx, badgeX, badgeY, badgeW, badgeH, 16);
    ctx.fillStyle = theme.badgeBg;
    ctx.fill();
    ctx.strokeStyle = theme.badgeBorder;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = theme.badgeText;
    ctx.fillText(badgeText, badgeX + 14, badgeY + 20);
    ctx.restore();
  }

  // 8. Location or Subtitle Tag (if present)
  let currentY = contentY + 80;

  if (options.locationTag) {
    ctx.save();
    ctx.font = 'bold 14px "Inter", "Segoe UI", system-ui, sans-serif';
    const locText = `📍 ${options.locationTag}`;
    const locMetrics = ctx.measureText(locText);
    const locW = locMetrics.width + 24;
    const locH = 28;

    roundRect(ctx, contentX, currentY, locW, locH, 8);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.16)';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.fillStyle = '#e2e8f0';
    ctx.fillText(locText, contentX + 12, currentY + 19);
    ctx.restore();
    currentY += 46;
  }

  // 9. Main Hero Headline (Auto-Scaling Typography with Line Wrapping)
  ctx.save();
  const maxTitleWidth = frameW - 80;
  let titleFontSize = 46;
  ctx.font = `900 ${titleFontSize}px "Inter", "Segoe UI", system-ui, sans-serif`;

  let lines = wrapText(ctx, options.title, maxTitleWidth);
  if (lines.length > 3) {
    titleFontSize = 38;
    ctx.font = `900 ${titleFontSize}px "Inter", "Segoe UI", system-ui, sans-serif`;
    lines = wrapText(ctx, options.title, maxTitleWidth);
  }

  const lineHeight = titleFontSize * 1.18;
  lines.slice(0, 3).forEach((line, index) => {
    // Subtle glow on first line
    if (index === 0) {
      ctx.shadowColor = theme.accent;
      ctx.shadowBlur = 12;
      ctx.fillStyle = '#ffffff';
    } else {
      ctx.shadowBlur = 0;
      ctx.fillStyle = '#f8fafc';
    }
    ctx.fillText(line, contentX, currentY + titleFontSize);
    currentY += lineHeight;
  });
  ctx.restore();

  // 10. Subtitle / Value Proposition Description
  if (options.subtitle) {
    ctx.save();
    ctx.fillStyle = '#94a3b8';
    ctx.font = '500 18px "Inter", "Segoe UI", system-ui, sans-serif';
    const subLines = wrapText(ctx, options.subtitle, maxTitleWidth);
    const subLineHeight = 26;
    currentY += 8;
    subLines.slice(0, 2).forEach((line) => {
      ctx.fillText(line, contentX, currentY + 18);
      currentY += subLineHeight;
    });
    ctx.restore();
  }

  // 11. Bottom Status Bar (Pills & Verification Credentials)
  const bottomY = HEIGHT - pad - 60;

  // Feature / Tech Stack Chips
  if (options.features && options.features.length > 0) {
    ctx.save();
    let chipX = contentX;
    ctx.font = 'bold 12px "Inter", "Segoe UI", system-ui, sans-serif';

    options.features.slice(0, 4).forEach((feat) => {
      const featMetrics = ctx.measureText(feat);
      const chipW = featMetrics.width + 20;
      const chipH = 28;

      if (chipX + chipW < WIDTH - pad - 300) {
        roundRect(ctx, chipX, bottomY, chipW, chipH, 6);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.06)';
        ctx.fill();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.fillStyle = '#cbd5e1';
        ctx.fillText(feat, chipX + 10, bottomY + 18);
        chipX += chipW + 10;
      }
    });
    ctx.restore();
  }

  // Price Tag Highlight Chip (if specified)
  if (options.priceTag) {
    ctx.save();
    ctx.font = 'bold 13px "Inter", "Segoe UI", system-ui, sans-serif';
    const pText = `⚡ ${options.priceTag}`;
    const pMetrics = ctx.measureText(pText);
    const pW = pMetrics.width + 22;
    const pH = 28;
    const pX = contentX;
    const pY = bottomY - 36;

    roundRect(ctx, pX, pY, pW, pH, 6);
    ctx.fillStyle = theme.badgeBg;
    ctx.fill();
    ctx.strokeStyle = theme.accent;
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.fillStyle = theme.accentText;
    ctx.fillText(pText, pX + 11, pY + 19);
    ctx.restore();
  }

  // Bottom Right: Canonical URL & Verified Origin Badge
  ctx.save();
  const domainText = 'mucolabs.com';
  ctx.font = 'bold 16px "Inter", "Segoe UI", system-ui, sans-serif';
  const domainMetrics = ctx.measureText(domainText);
  const domainX = WIDTH - pad - 40 - domainMetrics.width;

  ctx.fillStyle = '#38bdf8';
  ctx.fillText(domainText, domainX, bottomY + 20);

  ctx.fillStyle = '#64748b';
  ctx.font = '600 11px "Inter", "Segoe UI", system-ui, sans-serif';
  const verifiedText = 'VERIFIED ENTERPRISE PROFILE';
  const verifiedMetrics = ctx.measureText(verifiedText);
  ctx.fillText(verifiedText, WIDTH - pad - 40 - verifiedMetrics.width, bottomY + 2);
  ctx.restore();

  return targetCanvas;
}

/**
 * Generates an Open Graph card and returns a base64 PNG Data URL
 */
export async function generateOgCardDataUrl(
  options: OgCardOptions,
  canvas?: HTMLCanvasElement
): Promise<string> {
  const cacheKey = JSON.stringify(options);
  if (OG_CACHE.has(cacheKey)) {
    return OG_CACHE.get(cacheKey)!;
  }

  const cvs = await renderOgCardToCanvas(options, canvas);
  const dataUrl = cvs.toDataURL('image/png', 0.95);
  OG_CACHE.set(cacheKey, dataUrl);
  return dataUrl;
}

/**
 * Generates an Open Graph card as a downloadable Blob
 */
export async function generateOgCardBlob(options: OgCardOptions): Promise<Blob> {
  const cvs = await renderOgCardToCanvas(options);
  return new Promise((resolve, reject) => {
    cvs.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error('Failed to generate image blob'));
    }, 'image/png', 0.95);
  });
}

/**
 * Helper to download the generated OG card directly
 */
export async function downloadOgCard(options: OgCardOptions, filename?: string): Promise<void> {
  const blob = await generateOgCardBlob(options);
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename || `mucolabs-og-${options.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.png`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ============================================================================
// CONVENIENCE GENERATORS FOR SPECIFIC DATA TYPES
// ============================================================================

/**
 * Generates a dynamic OG Card for a Service x Location Combination
 */
export async function generateServiceLocationOgImage(
  combo: ServiceLocationCombo
): Promise<string> {
  return generateOgCardDataUrl({
    title: `${combo.serviceName} in ${combo.locationName}`,
    subtitle: combo.localizedSummary || combo.metaDescription,
    categoryBadge: 'Service × Regional Hub',
    locationTag: `${combo.locationName} • Tamil Nadu`,
    priceTag: combo.startingPrice,
    features: combo.targetIndustries.slice(0, 4),
    themeColor: 'cyan',
    brandSubtitle: `LOCAL SEO & ENTERPRISE IT • ${combo.locationName.toUpperCase()}`
  });
}

/**
 * Generates a dynamic OG Card for a Regional Location Hub
 */
export async function generateLocationOgImage(
  location: LocationData
): Promise<string> {
  return generateOgCardDataUrl({
    title: `${location.name} Technology Hub`,
    subtitle: location.overview || location.headline,
    categoryBadge: 'Regional Technology Hub',
    locationTag: `${location.name} (${location.pincode}) • ${location.district} District`,
    priceTag: 'Local Engineering & AI Delivery',
    features: location.majorIndustries.map((i) => i.name).slice(0, 4),
    themeColor: 'emerald',
    backgroundImageUrl: location.heroImage,
    brandSubtitle: `KONGU CORRIDOR REGIONAL HUB • PIN ${location.pincode}`
  });
}

/**
 * Generates a dynamic OG Card for an IT Service
 */
export async function generateServiceOgImage(
  service: DetailedService
): Promise<string> {
  return generateOgCardDataUrl({
    title: service.title,
    subtitle: service.tagline || service.description,
    categoryBadge: 'Enterprise IT Solution',
    locationTag: 'Erode HQ • Global Delivery',
    priceTag: 'Custom Architecture & SLA',
    features: service.technologies.slice(0, 4),
    themeColor: 'indigo',
    brandSubtitle: 'MUCO LABS CORE ENGINEERING'
  });
}

/**
 * Generates a dynamic OG Card for a Course/Bootcamp
 */
export async function generateCourseOgImage(
  course: CourseItem
): Promise<string> {
  return generateOgCardDataUrl({
    title: course.title,
    subtitle: `${course.duration} Intensive Bootcamp • Mentored by Industry Practitioners`,
    categoryBadge: 'Way2Me Tech Bootcamp',
    locationTag: 'Way2Me Academy × MUCO Labs',
    priceTag: `${course.level} Level • ${course.duration}`,
    features: course.technologies.slice(0, 4),
    themeColor: 'amber',
    brandSubtitle: 'WAY2ME ACADEMY × MUCO LABS'
  });
}

/**
 * Generates a dynamic OG Card for a Portfolio Case Study
 */
export async function generateProjectOgImage(
  project: ProjectItem
): Promise<string> {
  return generateOgCardDataUrl({
    title: project.title,
    subtitle: `${project.category} for ${project.client} • Full Production Deployment`,
    categoryBadge: 'Client Case Study',
    locationTag: project.client,
    priceTag: project.category,
    features: project.techStack.slice(0, 4),
    themeColor: 'purple',
    backgroundImageUrl: project.image,
    brandSubtitle: 'PRODUCTION CLIENT DELIVERABLE'
  });
}

/**
 * Generates a dynamic OG Card for a Technical Blog Article
 */
export async function generateBlogPostOgImage(
  post: BlogPost
): Promise<string> {
  return generateOgCardDataUrl({
    title: post.title,
    subtitle: post.excerpt,
    categoryBadge: `Tech Guide • ${post.category}`,
    locationTag: `By ${post.author.name} (${post.readTime})`,
    features: post.keywords.slice(0, 4),
    themeColor: 'cyan',
    backgroundImageUrl: post.image,
    brandSubtitle: 'MUCO LABS ENGINEERING BLOG'
  });
}
