import fs from 'fs';
import path from 'path';
import { generateSitemapXml, generateRobotsTxt, getAllSitemapEntries, getSitemapStats } from '../src/lib/sitemapGenerator';

function run() {
  const stats = getSitemapStats();
  const xmlContent = generateSitemapXml(stats.entries);
  const robotsContent = generateRobotsTxt();

  const publicDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // 1. Write public/sitemap.xml
  const sitemapPath = path.join(publicDir, 'sitemap.xml');
  fs.writeFileSync(sitemapPath, xmlContent, 'utf-8');

  // 2. Write public/robots.txt
  const robotsPath = path.join(publicDir, 'robots.txt');
  fs.writeFileSync(robotsPath, robotsContent, 'utf-8');

  console.log(`\n======================================================`);
  console.log(`🚀 [MUCO Labs SEO Engine] Generated Sitemap & Robots`);
  console.log(`======================================================`);
  console.log(`Total URLs Indexed: ${stats.totalUrls}`);
  console.log(`Category Breakdown:`);
  Object.entries(stats.breakdown).forEach(([cat, count]) => {
    console.log(`  • ${cat.padEnd(22)}: ${count} routes`);
  });
  console.log(`\nFiles Generated:`);
  console.log(`  ✓ ${sitemapPath} (${(Buffer.byteLength(xmlContent) / 1024).toFixed(2)} KB)`);
  console.log(`  ✓ ${robotsPath} (${Buffer.byteLength(robotsContent)} Bytes)`);

  // Also mirror to dist if built
  const distDir = path.join(process.cwd(), 'dist');
  if (fs.existsSync(distDir)) {
    const distSitemapPath = path.join(distDir, 'sitemap.xml');
    const distRobotsPath = path.join(distDir, 'robots.txt');
    fs.writeFileSync(distSitemapPath, xmlContent, 'utf-8');
    fs.writeFileSync(distRobotsPath, robotsContent, 'utf-8');
    console.log(`  ✓ Mirrored to dist/sitemap.xml & dist/robots.txt`);
  }
  console.log(`======================================================\n`);
}

run();
