const { test, expect } = require('@playwright/test');

const errors = new WeakMap();
test.beforeEach(async ({ page }) => {
  errors.set(page, []);
  page.on('pageerror', error => errors.get(page).push(error.message));
  // Functional checks are independent of the font CDN. Visual QA uses real fonts.
  await page.route('https://fonts.googleapis.com/**', route => route.fulfill({ body: '', contentType: 'text/css' }));
  await page.emulateMedia({ reducedMotion: 'reduce' });
});
test.afterEach(async ({ page }) => {
  expect(errors.get(page)).toEqual([]);
});

async function navigate(page, hash) {
  await page.evaluate(hash => { location.hash = hash; }, hash);
  await expect.poll(() => page.evaluate(() => location.hash)).toBe(hash);
}

async function addTee(page) {
  await page.goto('/#/product/tee-heritage-script');
  await page.getByRole('button', { name: 'M', exact: true }).click();
  await page.getByRole('button', { name: 'Add to Preview Cart', exact: true }).click();
  await expect(page.getByRole('dialog', { name: 'Shopping cart' })).toBeVisible();
}

test('search, nested filters, sorting and reset', async ({ page }) => {
  await page.goto('/');
  const cards = page.locator('#productGrid .card');
  await expect(cards).toHaveCount(20);
  await page.locator('[data-dept="Women"]').click();
  await expect(cards).toHaveCount(9);
  await expect(page.locator('[data-dept="Women"]')).toBeFocused();
  await page.locator('[data-cat="Swim"]').click();
  await expect(cards).toHaveCount(3);
  await page.locator('[data-cat="Sets"]').click();
  await expect(cards).toHaveCount(2);
  await page.getByRole('button', { name: 'Reset filters' }).click();
  await page.getByRole('searchbox').fill('heritage');
  await expect(cards).toHaveCount(3);
  await page.getByRole('searchbox').fill('no-such-design');
  await expect(page.getByRole('heading', { name: 'No pieces found.' })).toBeVisible();
  await page.getByRole('button', { name: 'Explore All Pieces' }).click();
  await expect(cards).toHaveCount(20);
  await page.getByLabel('Sort', { exact: true }).selectOption('price-low');
  await expect(cards.first()).toContainText('Heritage Sticker Pack');
  await page.getByLabel('Sort', { exact: true }).selectOption('price-high');
  await expect(cards.first()).toContainText('UTC Crest Hoodie');
  await expect(cards.last()).toContainText('Price at launch');
  await page.getByLabel('Sort', { exact: true }).selectOption('name');
  const names = await cards.locator('.card__name').allTextContents();
  expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b)));
  for (const [department, count] of [['men', 9], ['women', 9], ['accessories', 2], ['swim', 3]]) {
    await navigate(page, '#/shop/' + department);
    await expect(cards).toHaveCount(count);
  }
});

test('saved designs persist and keep keyboard focus when removed', async ({ page }) => {
  await page.goto('/#shop');
  await page.locator('#productGrid [data-save="tee-heritage-script"]').click();
  await expect(page.locator('#savedCount')).toHaveText('1');
  await navigate(page, '#/product/tee-heritage-script');
  await expect(page.locator('.save-piece--pdp')).toHaveAttribute('aria-pressed', 'true');
  await page.reload();
  await expect(page.locator('.save-piece--pdp')).toHaveAttribute('aria-pressed', 'true');
  await navigate(page, '#/saved');
  await expect(page.locator('#productGrid .card')).toHaveCount(1);
  await page.locator('#productGrid [data-save="tee-heritage-script"]').click();
  await expect(page.getByRole('heading', { name: 'No saved pieces here yet.' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Explore All Pieces' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('#productGrid .card')).toHaveCount(20);
  await expect(page.getByRole('searchbox')).toBeFocused();
});

test('preview cart validates options, persists quantities and disables payment', async ({ page, context }) => {
  const payments = [];
  page.on('request', request => { if (/stripe|myshopify|\/checkout/.test(request.url())) payments.push(request.url()); });
  await page.goto('/#/product/tee-heritage-script');
  await page.locator('#addBtn').click();
  await expect(page.locator('#pdpHint')).toHaveText('Pick a size first.');
  await addTee(page);
  await expect(page.locator('#cartCount')).toHaveText('1');
  await expect(page.locator('#cartTotal')).toHaveText('$45');
  await expect(page.locator('#checkoutBtn')).toBeDisabled();
  await page.getByRole('button', { name: 'Increase quantity' }).click();
  await expect(page.locator('#cartTotal')).toHaveText('$90');
  await expect(page.getByRole('button', { name: 'Increase quantity' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('#cartCount')).toHaveText('3');
  await page.getByRole('button', { name: 'Decrease quantity' }).click();
  await page.reload();
  await page.getByRole('button', { name: 'Open cart' }).click();
  await expect(page.locator('#cartCount')).toHaveText('2');
  await expect(page.locator('#checkoutBtn')).toBeDisabled();
  await page.locator('#checkoutBtn').dispatchEvent('click');
  expect(context.pages()).toHaveLength(1);
  expect(payments).toEqual([]);
  await page.getByRole('button', { name: 'Remove', exact: true }).click();
  await expect(page.locator('#cartCount')).toHaveText('0');
  await expect(page.locator('#cartClose')).toBeFocused();
});

test('cart and lightbox trap focus and restore their trigger', async ({ page }) => {
  await addTee(page);
  await expect(page.locator('#cartClose')).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  await expect(page.getByRole('button', { name: 'Remove', exact: true })).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(page.locator('#cartClose')).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(page.locator('#addBtn')).toBeFocused();
  await expect(page.locator('#cartDrawer')).toBeHidden();
  await page.getByRole('button', { name: 'Open cart' }).click();
  if (test.info().project.name === 'desktop') {
    await page.locator('#cartScrim').click({ position: { x: 10, y: 100 } });
    await expect(page.locator('#cartDrawer')).toBeHidden();
  } else {
    await page.keyboard.press('Escape');
  }
  await navigate(page, '#lookbook');
  await page.locator('[data-look="0"]').click();
  await expect(page.getByRole('dialog', { name: 'Image preview' })).toBeVisible();
  await page.keyboard.press('Tab');
  await expect(page.locator('#lightboxClose')).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(page.locator('[data-look="0"]')).toBeFocused();
});

test('gallery keyboard controls and video work with reduced motion', async ({ page }) => {
  await page.goto('/#/product/tee-heritage-script');
  await page.getByRole('button', { name: 'View image 2', exact: true }).click();
  await expect(page.locator('.pdp__main img')).toHaveAttribute('src', 'images/tee-heritage-script-front.jpg');
  await expect(page.getByRole('button', { name: 'View image 2', exact: true })).toBeFocused();
  const video = page.locator('.pdp__video video');
  await video.scrollIntoViewIfNeeded();
  await expect.poll(() => video.evaluate(v => v.readyState)).toBeGreaterThanOrEqual(1);
  expect(await video.evaluate(v => ({ paused: v.paused, controls: v.controls, muted: v.muted, error: v.error })))
    .toEqual({ paused: true, controls: true, muted: true, error: null });
  await video.evaluate(v => v.play());
  await expect.poll(() => video.evaluate(v => v.currentTime)).toBeGreaterThan(0);
  await page.getByText('Fit & sizing', { exact: true }).click();
  await expect(page.locator('.product-faq details').first()).toHaveAttribute('open', '');
  await expect(page.locator('.related .card')).toHaveCount(3);
});

test('all nine concepts reject purchasing and restored cart entries', async ({ page }) => {
  await page.goto('/');
  const ids = await page.evaluate(() => PRODUCTS.filter(p => p.comingSoon).map(p => p.id));
  expect(ids).toHaveLength(9);
  await page.evaluate(() => localStorage.setItem('cart:uptown-cali', JSON.stringify(
    PRODUCTS.filter(p => p.comingSoon).map(p => ({ id: p.id, size: p.sizes[0], color: p.colors[0], qty: 1 }))
  )));
  await page.reload();
  await expect(page.locator('#cartCount')).toHaveText('0');
  for (const id of ids) {
    await navigate(page, '#/product/' + id);
    await expect(page.locator('.pdp__price')).toHaveText('Price at launch');
    await expect(page.getByRole('button', { name: 'Coming Soon', exact: true })).toBeDisabled();
    await expect(page.locator('#addBtn')).toHaveCount(0);
  }
  await expect(page.locator('#checkoutBtn')).toBeDisabled();
});

test('approved swim previews load throughout the storefront', async ({ page }) => {
  const previews = [
    ['women-golden-hour-triangle-swim-set', '07-golden-hour-triangle-night-model-front.webp', ['swim-set.webp', 'night-model-seated.webp']],
    ['women-midnight-chrome-bandeau-swim-set', '08-midnight-chrome-bandeau-night-model-front.webp', ['swim-set.webp', 'night-model-seated.webp', 'night-model-side.webp']],
    ['women-cali-sport-scoop-swim-set', '09-cali-sport-scoop-night-model-front.webp', ['swim-set.webp', 'night-model-seated.webp']]
  ];
  await page.goto('/#/shop/swim');
  await expect(page.locator('#productGrid .card')).toHaveCount(3);
  for (const [id, filename, gallery] of previews) {
    const src = 'images/norcal-lights/' + filename;
    const cardImage = page.locator('#productGrid img[src="' + src + '"]');
    await cardImage.scrollIntoViewIfNeeded();
    await expect.poll(() => cardImage.evaluate(img => img.complete && img.naturalWidth === 586)).toBe(true);
    await expect(cardImage).toHaveCSS('object-fit', 'contain');
    await navigate(page, '#/product/' + id);
    await expect(page.locator('.pdp__main img')).toHaveAttribute('src', src);
    await expect(page.locator('.pdp__main img')).toHaveCSS('object-fit', 'contain');
    await expect(page.locator('.pdp__thumb')).toHaveCount(gallery.length + 1);
    for (const [index, suffix] of gallery.entries()) {
      const gallerySrc = src.replace('night-model-front.webp', suffix);
      await page.getByRole('button', { name: 'View image ' + (index + 2), exact: true }).click();
      const galleryImage = page.locator('.pdp__main img');
      await expect(galleryImage).toHaveAttribute('src', gallerySrc);
      await expect.poll(() => galleryImage.evaluate(img => img.complete && img.naturalWidth > 0)).toBe(true);
      await expect(galleryImage).toHaveCSS('object-fit', 'contain');
    }
    await navigate(page, '#lookbook');
    await page.locator('.look').filter({ has: page.locator('img[src="' + src + '"]') }).click();
    await expect(page.locator('#lightbox img')).toHaveAttribute('src', src);
    await page.keyboard.press('Escape');
    await navigate(page, '#/shop/swim');
  }
  await navigate(page, '#/collections/norcal-lights');
  await expect(page.locator('#nl-swim .card')).toHaveCount(3);
  await expect(page.locator('.coll__hero-media img').last()).toHaveAttribute('src', 'images/norcal-lights/' + previews[1][1]);
  for (const [, filename] of previews) {
    const image = page.locator('#nl-swim img[src="images/norcal-lights/' + filename + '"]');
    await image.scrollIntoViewIfNeeded();
    await expect.poll(() => image.evaluate(img => img.complete && img.naturalWidth > 0)).toBe(true);
  }
});

test('retired Coast After Dark concept disappears from browsing and restored state', async ({ page }) => {
  const retired = 'women-coast-after-dark-one-piece-cover-up-set';
  await page.goto('/');
  await page.evaluate(id => {
    localStorage.setItem('saved:uptown-cali', JSON.stringify([id, 'tee-heritage-script']));
    localStorage.setItem('cart:uptown-cali', JSON.stringify([
      { id, size: 'M', color: 'Black / Red', qty: 1 }
    ]));
  }, retired);
  await page.reload();
  await expect(page.locator('#savedCount')).toHaveText('1');
  await expect(page.locator('#cartCount')).toHaveText('0');
  await expect(page.locator('a[href="#/product/' + retired + '"]')).toHaveCount(0);
  await expect(page.locator('img[src*="coast-after-dark"]')).toHaveCount(0);
  await expect(page.locator('.look')).toHaveCount(15);
  await page.locator('[data-dept="Women"]').click();
  await expect(page.locator('[data-cat="Cover-Ups"]')).toHaveCount(0);
  await navigate(page, '#/saved');
  await expect(page.locator('#productGrid .card')).toHaveCount(1);
  await expect(page.locator('#productGrid .card')).toContainText('Heritage Script Tee');
  await page.goto('/#/product/' + retired);
  await expect.poll(() => page.evaluate(() => location.hash)).toBe('#/');
  await expect(page.locator('#storeView')).toBeVisible();
  await expect(page.locator('#checkoutBtn')).toBeDisabled();
});

test('invalid storage is sanitized and blocked storage is handled honestly', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => {
    localStorage.setItem('cart:uptown-cali', JSON.stringify([
      null, {}, { id: 'missing' },
      { id: 'tee-heritage-script', size: 'M', color: 'Black', qty: -1 },
      { id: 'tee-heritage-script', size: 'XXXS', color: 'Black', qty: 1 },
      { id: 'tee-heritage-script', size: 'M', color: 'Black', qty: 2, key: 'forged' }
    ]));
    localStorage.setItem('saved:uptown-cali', JSON.stringify([null, {}, 'missing', 'tee-heritage-script', 'tee-heritage-script']));
  });
  await page.reload();
  await expect(page.locator('#cartCount')).toHaveText('2');
  await expect(page.locator('#savedCount')).toHaveText('1');
  await page.getByRole('button', { name: 'Open cart' }).click();
  await page.getByRole('button', { name: 'Remove', exact: true }).click();
  await expect(page.locator('#cartCount')).toHaveText('0');
  await page.evaluate(() => { localStorage.setItem('cart:uptown-cali', '{broken'); localStorage.setItem('saved:uptown-cali', '{}'); });
  await page.reload();
  await expect(page.locator('#cartCount')).toHaveText('0');
  await expect(page.locator('#savedCount')).toHaveText('0');
  await page.addInitScript(() => {
    Storage.prototype.getItem = Storage.prototype.setItem = function () { throw new DOMException('Blocked', 'SecurityError'); };
  });
  await page.reload();
  await page.locator('#productGrid [data-save="tee-heritage-script"]').click();
  await expect(page.locator('#toast')).toContainText("couldn't save");
  await expect(page.locator('#savedCount')).toHaveText('0');
  await addTee(page);
  await expect(page.locator('#cartCount')).toHaveText('1');
});

test('collection anchors work after leaving and returning in history', async ({ page }) => {
  await page.goto('/#/collections/norcal-lights');
  await page.locator('.coll__ctas a[href="#nl-apparel"]').click();
  await expect(page.locator('#nl-apparel')).toBeVisible();
  await page.locator('.brand').click();
  await expect(page.locator('#storeView')).toBeVisible();
  await page.goBack();
  await expect(page.locator('#nl-apparel')).toBeVisible();
  await expect(page.locator('#storeView')).toBeHidden();
  await expect(page).toHaveTitle('NorCal Lights — Uptown Cali Women');
});

test('newsletter stays off and catalog assets and legacy site load', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#newsletterForm')).toBeHidden();
  await expect(page.locator('#signupUnavailable')).toContainText('Email signup opens soon');
  await expect(page.locator('#contactEmail')).toBeHidden();
  await expect(page.locator('#socials a')).toHaveCount(0);
  await page.evaluate(() => document.querySelectorAll('img').forEach(img => { img.loading = 'eager'; }));
  await expect.poll(() => page.evaluate(() => [...document.images].filter(img => !img.complete || !img.naturalWidth).map(img => img.getAttribute('src')))).toEqual([]);
  await navigate(page, '#/collections/norcal-lights');
  await expect(page.locator('#collSignupForm')).toBeHidden();
  await expect(page.locator('#collFormMsg')).toContainText('Email signup opens soon');
  await expect(page.locator('#productView .card')).toHaveCount(9);
  await page.goto('/dj-jas/');
  await expect(page).toHaveTitle(/DJ Jas/i);
});

test('layouts fit phone, tablet and desktop widths', async ({ page }) => {
  const widths = test.info().project.name === 'desktop' ? [768, 1024, 1440] : [320, 390];
  for (const width of widths) {
    await page.setViewportSize({ width, height: 1000 });
    for (const hash of ['#/', '#/product/tee-heritage-script', '#/product/women-midnight-chrome-bandeau-swim-set', '#/collections/norcal-lights']) {
      await page.goto('/' + hash);
      await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
      const clipped = await page.locator('.hero__title:visible, .pdp__title:visible, .coll__title:visible').evaluateAll(elements =>
        elements.filter(el => el.scrollWidth > el.clientWidth + 1).map(el => el.textContent)
      );
      expect(clipped, width + ' ' + hash).toEqual([]);
    }
  }
});
