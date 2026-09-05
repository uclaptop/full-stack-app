/**
 * Universal product helper to resolve and normalize image paths,
 * handle fallbacks for legacy/broken upload URLs, sanitize prices,
 * and build structured multi-angle galleries.
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

export function getFallbackForName(name: string): string {
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

export function resolveProductGallery(product: any): string[] {
  if (!product) return ['/hp-probook-640-g5.png'];

  const name = product.name || '';
  const primary = resolveProductImage(product.image_url || product.image, name);
  const secondary = product.secondary_image_url || product.secondaryImage 
    ? resolveProductImage(product.secondary_image_url || product.secondaryImage, name) 
    : '';

  const rawGallery = product.gallery_images || product.galleryImages || '';
  const extraList = typeof rawGallery === 'string' && rawGallery.trim() !== ''
    ? rawGallery.split(',').map((s: string) => resolveProductImage(s.trim(), name)).filter(Boolean)
    : [];

  const combined = [primary, secondary, ...extraList].filter(Boolean);
  const unique = Array.from(new Set(combined));

  // If we only have 1 or 2 images, fill up with complementary view angles or repeat cleanly
  if (unique.length === 1) {
    return [unique[0], unique[0], unique[0], unique[0]];
  }
  if (unique.length === 2) {
    return [unique[0], unique[1], unique[0], unique[1]];
  }
  if (unique.length === 3) {
    return [unique[0], unique[1], unique[2], unique[0]];
  }

  return unique;
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

export function generateProductTags(product: any): string {
  const brand = product.brand || 'Dell';
  const name = product.name || '';
  const category = product.category || 'Laptop';
  
  return [
    `Affordable ${brand.toLowerCase()} ${category.toLowerCase()}`,
    `Business ${category.toLowerCase()} india`,
    `Universal Computers`,
    `Refurbished ${brand.toLowerCase()} ${category.toLowerCase()}`,
    `Refurbished ${category.toLowerCase()} with warranty`,
    `Renewed ${name.split(' ').slice(0, 3).join(' ').toLowerCase()}`,
    `Used ${brand.toLowerCase()} ${category.toLowerCase()}`
  ].join(', ');
}

export function generateWhatsAppOrderUrl(productName: string, price: number, whatsappNumber: string = '918712173339'): string {
  const text = encodeURIComponent(
    `Hello Universal Computers! I would like to order "${productName}" (Rs. ${price.toLocaleString('en-IN')}). Please provide payment & delivery details.`
  );
  return `https://wa.me/${whatsappNumber}?text=${text}`;
}
