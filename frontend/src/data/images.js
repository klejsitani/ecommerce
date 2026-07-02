// ===================================================================
// IMAGES.JS - Funksione ndihmese per fotot e produkteve
// Ky file gjeneron path-et e fotove ne menyre te sakte
// ===================================================================

// Path-i bazë per të gjitha fotot
// Vjen nga folder-i public/images/products/
const BASE_PATH = "/images/products";

// Foto coming-soon për produktet që s'kanë foto reale
const COMING_SOON = `${BASE_PATH}/coming-soon.avif`;

// -------------------------------------------------------------------
// getMainImage - Kthen path-in e fotos KRYESORE të një produkti
// Kjo perdoret te ProductCard (te Shop dhe Home)
// -------------------------------------------------------------------
// Argumenti: product = objekti i produktit nga products.json
// Kthen: string me path-in e fotos (ose coming-soon nese s'ka foto)
export function getMainImage(product) {
  // Nese produkti s'ka fushen 'images', kthe coming-soon
  if (!product.images || !product.images.colors || product.images.colors.length === 0) {
    return COMING_SOON;
  }

  // Marrim ngjyren e PARE nga lista
  const firstColor = product.images.colors[0];
  // Marrim formatin (avif ose jpg)
  const format = product.images.format;

  // Ndertojme path-in: /images/products/1/black-1.avif
  return `${BASE_PATH}/${product.id}/${firstColor.key}-1.${format}`;
}

// -------------------------------------------------------------------
// getImagesForColor - Kthen TE GJITHA fotot e nje ngjyre specifike
// Kjo perdoret te ProductDetail per galerinë
// -------------------------------------------------------------------
// Argumentet:
//   product = objekti i produktit
//   colorKey = key i ngjyres (p.sh. "black", "gray")
// Kthen: array me path-et (p.sh. ["/images/products/1/black-1.avif", ...])
export function getImagesForColor(product, colorKey) {
  // Nese s'ka foto, kthe array bosh
  if (!product.images || !product.images.colors) {
    return [];
  }

  // Gjej ngjyren ne liste
  const color = product.images.colors.find(c => c.key === colorKey);
  if (!color) return [];

  const format = product.images.format;
  const images = [];

  // Krijo array me te gjitha path-et (1, 2, 3, ..., count)
  for (let i = 1; i <= color.count; i++) {
    images.push(`${BASE_PATH}/${product.id}/${colorKey}-${i}.${format}`);
  }

  return images;
}

// -------------------------------------------------------------------
// hasImages - Kontrollon nese produkti ka foto reale
// -------------------------------------------------------------------
export function hasImages(product) {
  return product.images && product.images.colors && product.images.colors.length > 0;
}

// -------------------------------------------------------------------
// getPriceForColor - Kthen cmimin e nje ngjyre specifike
// Disa produkte (id 7, 13, 16) kane cmime te ndryshme per ngjyre
// -------------------------------------------------------------------
// Argumentet:
//   product = objekti i produktit
//   colorKey = key i ngjyres
// Kthen: numri (cmimi) - ose cmimi default i produktit
export function getPriceForColor(product, colorKey) {
  // Nese s'ka foto, kthe cmimin default
  if (!product.images || !product.images.colors) {
    return product.price;
  }

  // Gjej ngjyren
  const color = product.images.colors.find(c => c.key === colorKey);

  // Nese ngjyra ka 'price' specifik, perdore. Perndryshe perdor default-in
  if (color && typeof color.price === "number") {
    return color.price;
  }

  return product.price;
}