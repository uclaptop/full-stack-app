/**
 * Universal product helper to resolve and normalize image paths,
 * handle fallbacks for legacy/broken upload URLs, and sanitize prices.
 */

export function resolveProductImage(imgUrl?: string, productName: string = ''): string {
  if (!imgUrl || typeof imgUrl !== 'string' || imgUrl.trim() === '') {
    return getFallbackForName(productName);
  }

  const trimmed = imgUrl.trim();

  // If it's a valid external URL (e.g. Amazon, Supabase, Cloudinary, Imgur)
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }

  // If it's an ephemeral / broken legacy uploads path from previous server runs
  if (trimmed.startsWith('/uploads/') || trimmed.includes('1786887')) {
    return getFallbackForName(productName);
  }

  // Normalize filenames with double spaces or uppercase into clean public paths
  const lower = trimmed.toLowerCase();
  if (lower.includes('5580')) return '/dell-latitude-5580.png';
  if (lower.includes('7540') || lower.includes('7480')) return '/dell-latitude-7540.png';
  if (lower.includes('5420') || lower.includes('7420') || lower.includes('5410')) return '/dell-latitude-5420.png';
  if (lower.includes('5400')) return '/dell-latitude-5400.png';
  if (lower.includes('5490') || lower.includes('5470')) return '/dell-latitude-5490.png';
  if (lower.includes('3570')) return '/dell-latitude-3570.png';
  if (lower.includes('3400')) return '/dell-latitude-3400.png';
  if (lower.includes('3480')) return '/dell-latitude-3480.png';
  if (lower.includes('5530')) return '/dell-precision-5530.png';
  if (lower.includes('640') || lower.includes('650') || lower.includes('probook')) return '/hp-probook-640-g5.png';
  if (lower.includes('840 g3') || lower.includes('820 g3')) return '/hp-elitebook-840-g3.png';
  if (lower.includes('840 g5')) return '/hp-elitebook-840-g5.png';
  if (lower.includes('745')) return '/hp-elitebook-745-g6.png';
  if (lower.includes('t490') || lower.includes('thinkpad')) return '/t490.png';

  // Ensure leading slash and URL-encode single spaces
  const cleanPath = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
  return encodeURI(cleanPath);
}

function getFallbackForName(name: string): string {
  const lower = (name || '').toLowerCase();
  if (lower.includes('5580')) return '/dell-latitude-5580.png';
  if (lower.includes('7480') || lower.includes('7540')) return '/dell-latitude-7540.png';
  if (lower.includes('5420') || lower.includes('7420') || lower.includes('5410')) return '/dell-latitude-5420.png';
  if (lower.includes('5400')) return '/dell-latitude-5400.png';
  if (lower.includes('5490') || lower.includes('5470')) return '/dell-latitude-5490.png';
  if (lower.includes('3570') || lower.includes('3580')) return '/dell-latitude-3570.png';
  if (lower.includes('3400')) return '/dell-latitude-3400.png';
  if (lower.includes('3480')) return '/dell-latitude-3480.png';
  if (lower.includes('5530')) return '/dell-precision-5530.png';
  if (lower.includes('640') || lower.includes('650') || lower.includes('probook')) return '/hp-probook-640-g5.png';
  if (lower.includes('820') || lower.includes('840 g3')) return '/hp-elitebook-840-g3.png';
  if (lower.includes('840 g5')) return '/hp-elitebook-840-g5.png';
  if (lower.includes('745')) return '/hp-elitebook-745-g6.png';
  if (lower.includes('thinkpad') || lower.includes('t490')) return '/t490.png';
  if (lower.includes('mac') || lower.includes('apple')) return '/dell-latitude-5420.png';

  return '/hp-probook-640-g5.png';
}

export function resolveProductPrice(priceRaw: any, name: string = ''): number {
  const num = Number(priceRaw);
  if (!isNaN(num) && num > 1000) return num;

  const lower = (name || '').toLowerCase();
  if (lower.includes('5530') || lower.includes('precision')) return 39999;
  if (lower.includes('7420') || lower.includes('7540')) return 35432;
  if (lower.includes('5420') || lower.includes('5410')) return 33895;
  if (lower.includes('t490') || lower.includes('650')) return 29795;
  if (lower.includes('840 g5')) return 27999;
  if (lower.includes('5580')) return 26566;
  if (lower.includes('5400') || lower.includes('5490')) return 25999;
  if (lower.includes('745')) return 23499;
  if (lower.includes('840 g3') || lower.includes('820')) return 18620;
  if (lower.includes('3570') || lower.includes('3400') || lower.includes('3480')) return 16499;

  return 24999;
}

export function resolveProductMrp(mrpRaw: any, price: number, name: string = ''): number {
  const num = Number(mrpRaw);
  if (!isNaN(num) && num > price) return num;

  const lower = (name || '').toLowerCase();
  if (lower.includes('5530')) return 98000;
  if (lower.includes('5420') || lower.includes('7420')) return 86000;
  if (lower.includes('t490') || lower.includes('650')) return 81000;
  if (lower.includes('840 g5')) return 79000;
  if (lower.includes('5580')) return 76000;
  if (lower.includes('5400') || lower.includes('5490')) return 74000;
  if (lower.includes('745')) return 68000;
  if (lower.includes('820') || lower.includes('840 g3')) return 54000;
  if (lower.includes('3570')) return 48000;

  return Math.round(price * 2.2);
}
