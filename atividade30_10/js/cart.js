// Carrinho simples com persistência em localStorage
(function(){
  const STORAGE_KEY = 'tintasCart_v1';
  const cartToggle = document.getElementById('cart-toggle');
  const cartCountEl = document.querySelector('.cart-count');
  const cartItemsEl = document.querySelector('.cart-items');
  const subtotalEl = document.querySelector('.subtotal');
  const totalEl = document.querySelector('.total-price');
  const shippingEl = document.querySelector('.shipping');

  let cart = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

  function formatBRL(v){
    return v.toLocaleString('pt-BR', {style:'currency', currency:'BRL'});
  }

  function parsePrice(text){
    // recebe 'R$ 89,90' -> retorna number 89.9
    if(!text) return 0;
    const num = text.replace(/[R$\s\.]/g,'').replace(',','.')
    return parseFloat(num) || 0;
  }

  function save(){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }

  function updateCartCount(){
    const totalQty = cart.reduce((s,i)=>s + i.qty, 0);
    cartCountEl.textContent = totalQty;
  }

  function calcTotals(){
    const subtotal = cart.reduce((s,i)=> s + (i.qty * i.price), 0);
    const shipping = subtotal > 0 ? 25.00 : 0.00; // regra simples
    const total = subtotal + shipping;
    subtotalEl.textContent = formatBRL(subtotal);
    shippingEl.textContent = formatBRL(shipping);
    totalEl.textContent = formatBRL(total);
  }

  function renderCart(){
    cartItemsEl.innerHTML = '';
    if(cart.length === 0){
      cartItemsEl.innerHTML = '<li class="empty">Seu carrinho está vazio.</li>';
    }
    cart.forEach(item => {
      const li = document.createElement('li');
      li.className = 'cart-item';
      li.innerHTML = `
        <div class="ci-left"><span class="ci-swatch" style="background:${item.color || '#ddd'}"></span></div>
        <div class="ci-body">
          <div style="display:flex;justify-content:space-between;align-items:center">
            <strong>${item.name}</strong>
            <button class="remove" data-id="${item.id}" aria-label="Remover">✕</button>
          </div>
          <div style="display:flex;justify-content:space-between;gap:8px;align-items:center;margin-top:6px">
            <div class="qty-controls">
              <button class="qty-decrease" data-id="${item.id}">−</button>
              <span class="qty">${item.qty}</span>
              <button class="qty-increase" data-id="${item.id}">+</button>
            </div>
            <div class="ci-price">${formatBRL(item.price * item.qty)}</div>
          </div>
        </div>
      `;
      cartItemsEl.appendChild(li);
    });

    // attach listeners for remove/qty
    cartItemsEl.querySelectorAll('.remove').forEach(btn => {
      btn.addEventListener('click', e => {
        const id = e.currentTarget.dataset.id;
        cart = cart.filter(i=> i.id !== id);
        save(); renderCart(); updateCartCount(); calcTotals();
      });
    });

    cartItemsEl.querySelectorAll('.qty-increase').forEach(btn => {
      btn.addEventListener('click', e=>{
        const id = e.currentTarget.dataset.id;
        const it = cart.find(i=>i.id===id);
        if(it){ it.qty++; save(); renderCart(); updateCartCount(); calcTotals(); }
      });
    });
    cartItemsEl.querySelectorAll('.qty-decrease').forEach(btn => {
      btn.addEventListener('click', e=>{
        const id = e.currentTarget.dataset.id;
        const it = cart.find(i=>i.id===id);
        if(it){ it.qty = Math.max(1, it.qty-1); save(); renderCart(); updateCartCount(); calcTotals(); }
      });
    });
  }

  function idFromName(name){
    return name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');
  }

  function addToCartFromCard(cardEl){
    const nameEl = cardEl.querySelector('h3');
    const priceEl = cardEl.querySelector('.price');
    const swatchEl = cardEl.querySelector('.swatch');
    const name = nameEl ? nameEl.textContent.trim() : 'Produto';
    const price = priceEl ? parsePrice(priceEl.textContent.trim()) : 0;
    // tenta obter cor do style --color ou background
    let color = '';
    if(swatchEl){
      const cs = getComputedStyle(swatchEl);
      color = cs.getPropertyValue('--color').trim() || cs.backgroundColor || '';
    }
    const id = idFromName(name);
    const existing = cart.find(i=>i.id===id);
    if(existing){ existing.qty += 1; }
    else{ cart.push({id,name,price,qty:1,color}); }
    save(); renderCart(); updateCartCount(); calcTotals();
    // abrir o drawer visualmente
    const toggle = document.getElementById('cart-toggle');
    if(toggle){ toggle.checked = true; }
  }

  // hook add-to-cart buttons
  document.addEventListener('DOMContentLoaded', ()=>{
    document.querySelectorAll('.add-to-cart').forEach(btn=>{
      btn.addEventListener('click', e=>{
        const card = e.currentTarget.closest('.card');
        if(card) addToCartFromCard(card);
      });
    });

    // render inicial
    updateCartCount(); renderCart(); calcTotals();
  });

})();
