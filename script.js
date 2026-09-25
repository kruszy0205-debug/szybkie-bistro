// Szybkie Bistro — skrypty wspólne dla wszystkich podstron

// Menu na telefonie
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.main-nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
  });
}

// Cień pod nagłówkiem po przewinięciu strony
const header = document.querySelector('.site-header');
if (header) {
  const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

// Pasek postępu przewijania + przycisk „do góry” (dodawane automatycznie na każdej podstronie)
(() => {
  const progress = document.createElement('div');
  progress.className = 'scroll-progress';
  document.body.appendChild(progress);

  const toTop = document.createElement('button');
  toTop.type = 'button';
  toTop.className = 'to-top';
  toTop.setAttribute('aria-label', 'Przewiń do góry strony');
  toTop.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5"/><path d="M5 12l7-7 7 7"/></svg>';
  document.body.appendChild(toTop);
  toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  const update = () => {
    const doc = document.documentElement;
    const max = doc.scrollHeight - doc.clientHeight;
    const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
    progress.style.width = pct + '%';
    toTop.classList.toggle('is-visible', window.scrollY > 500);
  };
  update();
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
})();

// Animacje przy scrollowaniu: elementy „wjeżdżają” gdy pojawią się na ekranie
(() => {
  const targets = document.querySelectorAll(
    '.page-head, .hero .wrap > div, .board, .steps, .points, ' +
    '.menu-group, .price-block, .gallery, .contact-grid > div, .cta-band .wrap > *'
  );
  if (!targets.length) return;

  const staggerSelectors = '.steps, .points, .menu-items, .gallery';
  targets.forEach((el) => {
    if (el.matches(staggerSelectors) || el.querySelector(staggerSelectors)) {
      const inner = el.matches(staggerSelectors) ? el : el.querySelector(staggerSelectors);
      inner.classList.add('reveal-stagger');
    } else {
      el.classList.add('reveal');
    }
  });

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced || !('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal, .reveal-stagger').forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
  );
  document.querySelectorAll('.reveal, .reveal-stagger').forEach((el) => io.observe(el));
})();

// Galeria: powiększanie zdjęć
const lightbox = document.querySelector('#lightbox');
if (lightbox) {
  const img = lightbox.querySelector('img');
  const caption = lightbox.querySelector('p');
  document.querySelectorAll('.tile').forEach((tile) => {
    tile.addEventListener('click', () => {
      const src = tile.querySelector('img');
      img.src = src.src;
      img.alt = src.alt;
      caption.textContent = tile.dataset.caption || '';
      lightbox.showModal();
    });
  });
  lightbox.querySelector('.close').addEventListener('click', () => lightbox.close());
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) lightbox.close();
  });
}

// Formularz kontaktowy (działa z Formspree — patrz README.txt)
const form = document.querySelector('#kontakt-form');
if (form) {
  const status = document.querySelector('#form-status');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (form.action.includes('TWOJ_ID')) {
      status.textContent = 'Formularz nie jest jeszcze podłączony. Wstaw swój adres Formspree w atrybucie action formularza.';
      return;
    }
    status.textContent = 'Wysyłanie…';
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      if (!res.ok) throw new Error('bad response');
      form.reset();
      status.textContent = 'Dziękujemy! Odpowiemy najszybciej, jak się da.';
    } catch (err) {
      status.textContent = 'Nie udało się wysłać wiadomości. Zadzwoń lub napisz bezpośrednio na adres e-mail z tej strony.';
    }
  });
}


// Zamówienia online na stronie cennika
(() => {
  const orderForm = document.querySelector('#order-form');
  const productBox = document.querySelector('#order-products');
  if (!orderForm || !productBox) return;

  const rows = [...document.querySelectorAll('.price-table tbody tr')];
  const products = [];

  rows.forEach((row, index) => {
    const cells = row.querySelectorAll('td');
    if (cells.length < 2) return;

    const nameCell = cells[0];
    const priceCell = cells[1];
    const name = nameCell.childNodes[0]?.textContent?.trim() || nameCell.textContent.trim();
    const description = nameCell.querySelector('small')?.textContent?.trim() || '';
    const priceText = priceCell.textContent.replace(',', '.');
    const priceMatch = priceText.match(/(\d+(?:\.\d+)?)/);
    const price = priceMatch ? Number(priceMatch[1]) : 0;
    if (!name || !price) return;

    const id = `product-${index}`;
    products.push({ id, name, description, price });

    const item = document.createElement('div');
    item.className = 'order-product';
    item.innerHTML = `
      <div class="order-product-info">
        <strong>${escapeHtml(name)}</strong>
        ${description ? `<small>${escapeHtml(description)}</small>` : ''}
        <span>${formatMoney(price)}</span>
      </div>
      <div class="order-product-controls">
        <label for="${id}">Ilość</label>
        <input id="${id}" type="number" min="0" max="99" step="1" value="0" inputmode="numeric" data-product-id="${id}">
      </div>
    `;
    productBox.appendChild(item);
  });

  const totalEl = document.querySelector('#order-total');
  const detailsEl = document.querySelector('#order-details');
  const totalField = document.querySelector('#order-total-field');
  const statusEl = document.querySelector('#order-status');

  function escapeHtml(value) {
    return value.replace(/[&<>"']/g, char => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
    }[char]));
  }

  function formatMoney(value) {
    return value.toLocaleString('pl-PL', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' zł';
  }

  function getCart() {
    return products.map(product => {
      const input = document.querySelector(`#${product.id}`);
      const quantity = Math.max(0, Math.min(99, Number(input?.value || 0)));
      return { ...product, quantity };
    }).filter(item => item.quantity > 0);
  }

  function updateOrderSummary() {
    const cart = getCart();
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    totalEl.textContent = formatMoney(total);
    totalField.value = formatMoney(total);

    detailsEl.value = cart.length
      ? cart.map(item => `${item.name} — ${item.quantity} szt. × ${formatMoney(item.price)} = ${formatMoney(item.price * item.quantity)}`).join('\n')
      : '';

    statusEl.textContent = '';
    return { cart, total };
  }

  productBox.addEventListener('input', (event) => {
    if (event.target.matches('input[type="number"]')) updateOrderSummary();
  });

  orderForm.addEventListener('submit', (event) => {
    const { cart, total } = updateOrderSummary();

    if (!cart.length || total <= 0) {
      event.preventDefault();
      statusEl.textContent = 'Dodaj przynajmniej jedną pozycję do zamówienia.';
      productBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    statusEl.textContent = 'Wysyłanie zamówienia…';
  });

  updateOrderSummary();
})();
