// assets/js/app.js
// Dashboard client script — fixed and hardened (CSRF, authReady, better errors)

document.addEventListener('DOMContentLoaded', () => {
  const baseApi = window.__BASE_URL ? window.__BASE_URL + '/api' : '../api';

  // ---- helpers ----
  const $ = sel => document.querySelector(sel);
  const $$ = sel => Array.from(document.querySelectorAll(sel));

  const setText = (sel, val) => { const el = $(sel); if (el) el.textContent = val; };
  const setHtml = (sel, val) => { const el = $(sel); if (el) el.innerHTML = val; };
  const setValue = (sel, val) => { const el = $(sel); if (el) el.value = val; };
  const setSrc = (sel, val) => { const el = $(sel); if (el) el.src = val; };

  // Fix image path for admin panel (since it's in public/ but images are in root assets/)
  function fixImagePath(path) {
    if (!path) return '';
    if (path.startsWith('http')) return path; // Absolute URL

    // Free Join uploads are stored in 'assets/uploads/free_...' in the project root.
    // The Admin Panel is in 'public/', so we need '../' to reach them.
    if (path.includes('assets/uploads/free_')) {
      return '../' + path;
    }

    // Other uploads (brands, products) are stored in 'public/assets/uploads/',
    // so 'assets/uploads/...' resolves correctly relative to 'public/'.
    return path;
  }

  function showAlert(msg, type = 'success', timeout = 5000) {
    const container = $('#alerts');
    if (!container) return console.log(type, msg);
    const div = document.createElement('div');
    div.className = `alert alert-${type} alert-dismissible fade show`;
    div.setAttribute('role', 'alert');
    div.innerHTML = `${msg} <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>`;
    container.appendChild(div);
    if (timeout > 0) {
      setTimeout(() => {
        try {
          const bsAlert = bootstrap.Alert.getInstance(div) || new bootstrap.Alert(div);
          bsAlert.close();
        } catch (e) {
          if (div && div.parentNode) div.parentNode.removeChild(div);
        }
      }, timeout);
    }
  }

  // Promise that resolves when auth check completes (so we don't send POSTs before token present)
  let _resolveAuthReady;
  const authReady = new Promise((res) => { _resolveAuthReady = res; });

  async function fetchWithCsrf(url, opts = {}) {
    opts = Object.assign({ credentials: 'include' }, opts);
    opts.headers = opts.headers || {};

    const method = (opts.method || 'GET').toUpperCase();
    if (method !== 'GET') {
      await authReady; // ensure auth token presence resolved
      if (window.__CSRF_TOKEN) {
        opts.headers['X-CSRF-Token'] = window.__CSRF_TOKEN;
      }
      opts.headers['X-Requested-With'] = opts.headers['X-Requested-With'] || 'XMLHttpRequest';
    }
    return fetch(url, opts);
  }

  // robust JSON/text parse
  async function parseApiResponse(res) {
    if (!res) return null;
    const contentType = res.headers && res.headers.get ? (res.headers.get('content-type') || '') : '';
    try {
      if (contentType.indexOf('application/json') !== -1) {
        return await res.json();
      } else {
        const text = await res.text();
        try { return JSON.parse(text); } catch (e) { return text; }
      }
    } catch (err) {
      console.warn('parseApiResponse failed', err);
      return null;
    }
  }

  // normalize product object keys
  function normalizeProduct(p) {
    if (!p) return null;
    return {
      id: p.id ?? p.product_id ?? null,
      name: p.name ?? p.title ?? p.product_name ?? '',
      image_path: p.image_path ?? p.image ?? p.img ?? '',
      company_name: p.company_name ?? p.company ?? p.brand_name ?? '',
      company_logo: p.company_logo ?? p.logo_path ?? p.logo ?? p.brand_logo ?? '',
      brand_id: p.brand_id ?? p.brand ?? null,
      category_id: (p.category_id !== undefined && p.category_id !== null) ? p.category_id : '',
      size: p.size ?? '',
      quantity: (p.quantity !== undefined && p.quantity !== null) ? p.quantity : 0,
      price: (p.price !== undefined && p.price !== null) ? p.price : 0,
      description: p.description ?? '',
      top_category: p.top_category ?? '',
      material: p.material ?? '',
      tags: p.tags ?? '',
      min_order_qty: (p.min_order_qty !== undefined && p.min_order_qty !== null) ? parseInt(p.min_order_qty) : 1,
      unit: p.unit ?? '',
      status: p.status ?? 'active',
      weight: p.weight ?? '',
      dimensions: p.dimensions ?? '',
      specifications: p.specifications ?? '',
      additional_notes: p.additional_notes ?? '',
      category_name: (p.category_name === 'Hotelware' ? 'Horeca' : (p.category_name ?? ''))
    };
  }

  // auth check and set tokens
  (async function authCheck() {
    try {
      const res = await fetch(`${baseApi}/admin_auth.php?action=status`, { credentials: 'include' });
      const j = await parseApiResponse(res) || {};
      if (!j || !j.logged_in) {
        // redirect to login
        window.location.href = 'login.html';
        _resolveAuthReady(true);
        return;
      }
      window.__CSRF_TOKEN = j.csrf_token || window.__CSRF_TOKEN || '';
      window.__ADMIN_ROLE = j.role || window.__ADMIN_ROLE || 'editor';
      _resolveAuthReady(true);
      if ((window.__ADMIN_ROLE || 'editor') !== 'superadmin') {
        document.body.classList.add('role-editor');
      }
    } catch (err) {
      console.error('auth check failed', err);
      _resolveAuthReady(true); // resolve so UI actions don't hang
      try { window.location.href = 'login.html'; } catch (e) { }
    }
  })();

  // navigation tabs
  // navigation tabs
  function showSection(tab) {
    if (!tab) tab = 'dashboard';
    ['dashboard', 'products', 'brands', 'free', 'users', 'data'].forEach(t => {
      const el = document.getElementById(t + 'Section');
      if (el) el.classList.toggle('d-none', t !== tab);
    });
    document.querySelectorAll('.nav-link[data-tab]').forEach(n => n.classList.toggle('active', n.dataset.tab === tab));

    // Update URL hash without jumping
    if (history.pushState) {
      history.pushState(null, null, '#' + tab);
    } else {
      location.hash = '#' + tab;
    }

    // Scroll to the top of the page elegantly
    window.scrollTo({ top: 0, behavior: 'auto' });
  }
  document.querySelectorAll('.nav-link[data-tab]').forEach(n => {
    n.addEventListener('click', e => { e.preventDefault(); showSection(n.dataset.tab); });
  });

  // Initial section based on hash or default to dashboard
  const initialTab = location.hash ? location.hash.replace('#', '') : 'dashboard';
  showSection(['dashboard', 'products', 'brands', 'free', 'users', 'data'].includes(initialTab) ? initialTab : 'dashboard');

  // ---------- Form Reset Listeners for "Add" Buttons ----------
  $('#btnAddBrand')?.addEventListener('click', () => {
    const form = $('#brandForm');
    if (form) form.reset();
    const modalEl = document.getElementById('brandModal');
    if (modalEl) {
      delete modalEl.dataset.editId;
      const title = modalEl.querySelector('.modal-title');
      if (title) title.innerHTML = '<i class="fas fa-building me-2"></i>Add Brand';
      const preview = document.getElementById('brandLogoPreview');
      if (preview) { preview.src = ''; preview.style.display = 'none'; }
    }
  });

  $('#btnAddProduct')?.addEventListener('click', () => {
    const form = $('#productForm');
    if (form) {
      form.reset();
      setValue('#productId', '');
      const selectedFiles = $('#selectedFiles');
      if (selectedFiles) selectedFiles.innerHTML = '';
      const specContainer = $('#specificationsContainer');
      if (specContainer) {
        specContainer.innerHTML = `
          <div class="spec-row input-group">
            <input type="text" class="form-control spec-key" placeholder="Key (e.g., Color)">
            <input type="text" class="form-control spec-value" placeholder="Value (e.g., Red)">
            <button type="button" class="btn btn-outline-danger remove-spec" title="Remove">
              <i class="fas fa-times"></i>
            </button>
          </div>
        `;
        // Re-attach remove handler to the default row
        specContainer.querySelector('.remove-spec').addEventListener('click', function () {
          this.closest('.spec-row').remove();
        });
      }
    }
    const modalEl = document.getElementById('productModal');
    if (modalEl) {
      const title = modalEl.querySelector('.modal-title');
      if (title) title.innerHTML = '<i class="fas fa-box me-2"></i>Add Product';
    }
  });

  $('#btnAddFree')?.addEventListener('click', () => {
    const form = $('#freeForm');
    if (form) form.reset();
    setValue('#freeId', '');
    const modalEl = document.getElementById('freeModal');
    if (modalEl) {
      const title = modalEl.querySelector('.modal-title');
      if (title) title.innerHTML = '<i class="fas fa-user-plus me-2"></i>Add Free Joiner';
    }
  });

  $('#btnAddUser')?.addEventListener('click', () => {
    const form = $('#userForm');
    if (form) form.reset();
    setValue('#userId', '');
    const modalEl = document.getElementById('userModal');
    if (modalEl) {
      const title = modalEl.querySelector('.modal-title');
      if (title) title.innerHTML = '<i class="fas fa-user-plus me-2"></i>Add User';
    }
  });

  $('#btnAddProfile')?.addEventListener('click', () => {
    const form = $('#profileForm');
    if (form) form.reset();
    setValue('#profileId', '');
    const modalEl = document.getElementById('profileModal');
    if (modalEl) {
      const title = modalEl.querySelector('.modal-title');
      if (title) title.innerHTML = '<i class="fas fa-address-card me-2"></i>Add Profile';
    }
  });

  // optional 3D logo
  (function init3D() {
    const canvas = document.getElementById('logo3d');
    if (!canvas || typeof THREE === 'undefined') return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.z = 3;
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    renderer.setSize(36, 36);
    const geo = new THREE.TorusGeometry(.6, 0.2, 16, 60);
    const mat = new THREE.MeshNormalMaterial();
    const tor = new THREE.Mesh(geo, mat);
    scene.add(tor);
    (function anim() { tor.rotation.x += 0.01; tor.rotation.y += 0.02; renderer.render(scene, camera); requestAnimationFrame(anim); })();
  })();

  // brands and categories cache
  let BRANDS_CACHE = [];
  // Image cache: stores the latest image_path for a product ID after drag-and-drop
  const QUICK_IMAGE_CACHE = {};
  let CATEGORIES = [
    { id: 1, name: 'Kitchenware' },
    { id: 2, name: 'Horeca' },
    { id: 3, name: 'Houseware' },
    { id: 4, name: 'Tube & Pipes' },
    { id: 5, name: 'Raw Materials' },
  ];

  // ---------- Loaders ----------
  async function loadBrands() {
    const brandSelect = $('#brandSelect');
    try {
      let brands = BRANDS_CACHE;
      if (!brands || brands.length === 0) {
        const r = await fetch(`${baseApi}/brands.php`, { credentials: 'include' });
        const resp = await parseApiResponse(r);
        brands = Array.isArray(resp) ? resp : (resp && resp.data ? resp.data : []);
        BRANDS_CACHE = brands; // Cache the brands
      }

      if (brandSelect) {
        brandSelect.innerHTML = '<option value="">-- select company --</option>';
        brands.forEach(b => brandSelect.appendChild(Object.assign(document.createElement('option'), { value: b.id, textContent: b.company_name || b.name || '' })));
      }
      // brands list card view
      const list = $('#brandsList');
      if (list) {
        list.innerHTML = '';
        brands.forEach(b => {
          const col = document.createElement('div'); col.className = 'col-md-4';
          const logo = b.logo_path ?? b.logo ?? b.logo_url ?? '';
          col.innerHTML = `
            <div class="card h-100">
              <div class="card-body d-flex align-items-start gap-3">
                <img src="${logo ? fixImagePath(escapeHtml(logo)) : 'assets/images/default-company.svg'}" style="height:56px;width:56px;object-fit:contain;margin-right:12px" alt="">
                <div class="flex-fill">
                  <div class="fw-bold">${escapeHtml(b.company_name || b.name || '')}</div>
                  <div class="small text-muted">${escapeHtml(b.contact_phone || '')} • ${escapeHtml(b.gst || '')}</div>
                  <div class="mt-2">
                    <button class="btn btn-sm btn-outline-primary btnEditBrand" data-id="${b.id}">Edit</button>
                    <button class="btn btn-sm btn-outline-danger btnDelBrand" data-id="${b.id}">Delete</button>
                  </div>
                </div>
              </div>
            </div>
          `;
          list.appendChild(col);
        });

        // attach handlers
        list.querySelectorAll('.btnDelBrand').forEach(btn => {
          btn.addEventListener('click', async () => {
            const id = btn.dataset.id;
            if (!confirm('Delete brand?')) return;
            try {
              const body = new URLSearchParams({ id }).toString();
              const res = await fetchWithCsrf(`${baseApi}/brands.php`, {
                method: 'DELETE',
                credentials: 'include',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
                body
              });
              const j = await parseApiResponse(res) || {};
              if (j.success) { showAlert('Brand deleted', 'success'); BRANDS_CACHE = []; await loadBrands(); await loadProducts(); }
              else showAlert(j.error || (j.detail || 'Delete failed'), 'danger');
            } catch (err) { console.error(err); showAlert('Delete failed', 'danger'); }
          });
        });

        list.querySelectorAll('.btnEditBrand').forEach(btn => {
          btn.addEventListener('click', async () => {
            const id = btn.dataset.id;
            const r = await fetch(`${baseApi}/brands.php?id=${id}`, { credentials: 'include' });
            const b = await parseApiResponse(r) || {};

            if (!b || !b.id) return showAlert('Brand not found', 'danger');

            const form = $('#brandForm');
            if (form) {
              form.reset(); // clear first
              const setVal = (name, val) => {
                const el = form.querySelector(`[name="${name}"]`);
                if (el) el.value = val;
              };

              setVal('company_name', b.company_name || b.name || '');
              setVal('contact_email', b.contact_email || '');
              setVal('contact_phone', b.contact_phone || '');
              setVal('whatsapp_number', b.whatsapp_number || '');
              setVal('gst', b.gst || '');
              setVal('website_url', b.website_url || '');
              setVal('address', b.address || '');
              setVal('about', b.about || '');
              setVal('facebook_url', b.facebook_url || '');
              setVal('instagram_url', b.instagram_url || '');
              setVal('twitter_url', b.twitter_url || '');
              setVal('linkedin_url', b.linkedin_url || '');

              const preview = document.getElementById('brandLogoPreview');
              if (preview) {
                const logo = b.logo_path || b.logo || b.logo_url;
                if (logo) {
                  preview.src = logo;
                  preview.style.display = 'block';
                } else {
                  preview.src = '';
                  preview.style.display = 'none';
                }
              }
            }

            document.getElementById('brandModal').dataset.editId = id;
            document.querySelector('#brandModal .modal-title').innerHTML = '<i class="fas fa-building me-2"></i>Edit Brand';
            new bootstrap.Modal(document.getElementById('brandModal')).show();
          });
        });

      }
      setText('#statBrands', Array.isArray(brands) ? brands.length : 0);
      return brands;
    } catch (err) {
      console.error('loadBrands', err);
      showAlert('Could not load brands', 'danger');
    }
  }

  async function loadCategories() {
    const sel = $('#categorySelect');
    if (!sel) return;
    try {
      if (!CATEGORIES || CATEGORIES.length === 0 || CATEGORIES.length === 5) { // Assuming 5 is the initial static list size
        const res = await fetch(`${baseApi}/categories.php`, { credentials: 'include' });
        const resp = await parseApiResponse(res);
        CATEGORIES = Array.isArray(resp) ? resp : (resp && resp.data ? resp.data : []);
      }
      sel.innerHTML = '<option value="">-- select category --</option>';
      CATEGORIES.forEach(c => sel.appendChild(Object.assign(document.createElement('option'), { value: c.id, textContent: `${c.name}` })));
    } catch (err) { console.error('Error loading categories:', err); }
    return CATEGORIES;
  }

  async function loadProducts() {
    try {
      const r = await fetch(`${baseApi}/products.php`, { credentials: 'include' });
      const resp = await parseApiResponse(r);
      let products = [];
      if (Array.isArray(resp)) products = resp;
      else if (resp && Array.isArray(resp.data)) products = resp.data;
      else if (resp && resp.id) products = [resp];
      products = products.map(normalizeProduct);

      const wrap = $('#productCards');
      if (!wrap) return;
      wrap.innerHTML = '';
      if (!products.length) {
        wrap.innerHTML = '<div class="no-products p-3">No products yet.</div>';
        return;
      }
      products.forEach(p => {
        const col = document.createElement('div');
        col.className = 'product-card';
        col.dataset.id = p.id;
        const imageSrc = p.image_path ? fixImagePath(p.image_path) : 'assets/images/default-product.svg';
        const logoSrc = p.company_logo ? fixImagePath(p.company_logo) : 'assets/images/default-company.svg';
        col.innerHTML = `
          <div style="position:relative; overflow:hidden;">
            <img src="${escapeHtml(imageSrc)}" class="card-img-top" alt="${escapeHtml(p.name)}">
            <div class="logo-badge" style="position:absolute; left:12px; bottom:12px; background:rgba(255,255,255,0.9); padding:6px; border-radius:6px;">
              <img src="${escapeHtml(logoSrc)}" alt="company logo" style="height:36px; width:36px; object-fit:contain;">
            </div>
          </div>
          <div class="card-body">
            <div>
              <div class="product-title fw-bold">${escapeHtml(p.name)}</div>
              <div class="product-company text-muted">${escapeHtml(p.company_name || '')}</div>
            </div>
            <div class="card-actions mt-2 d-flex justify-content-between align-items-center">
              <div>
                <button class="btn btn-sm btn-primary btnView" data-id="${p.id}">View Details</button>
                <button class="btn btn-sm btn-outline-secondary btnEditProduct" data-id="${p.id}">Edit</button>
              </div>
              <div>
                <button class="btn btn-sm btn-outline-danger btnDelProduct" data-id="${p.id}">Delete</button>
              </div>
            </div>
          </div>
        `;
        wrap.appendChild(col);
        // Attach silent drag-and-drop on each card
        col.addEventListener('dragover', e => { e.preventDefault(); e.stopPropagation(); });
        col.addEventListener('dragleave', e => e.stopPropagation());
        col.addEventListener('drop', handleQuickImageDrop);
      });

      wrap.querySelectorAll('.btnView').forEach(btn => btn.addEventListener('click', onViewProduct));
      wrap.querySelectorAll('.btnDelProduct').forEach(btn => btn.addEventListener('click', onDeleteProduct));
      wrap.querySelectorAll('.btnEditProduct').forEach(btn => btn.addEventListener('click', onEditProduct));

      if ((window.__ADMIN_ROLE || 'editor') !== 'superadmin') {
        wrap.querySelectorAll('.btnDelProduct').forEach(b => b.remove());
      }

      setText('#statProducts', Array.isArray(products) ? products.length : 0);
      return products;
    } catch (err) {
      console.error('loadProducts', err);
      showAlert('Could not load products', 'danger');
    }
  }

  async function loadFree() {
    try {
      const r = await fetch(`${baseApi}/free_joiners.php`, { credentials: 'include' });
      const resp = await parseApiResponse(r);
      const list = Array.isArray(resp) ? resp : (resp && resp.data ? resp.data : []);
      const wrap = $('#freeTableWrap');
      if (!wrap) return;
      wrap.innerHTML = `<div class="table-responsive"><table class="table"><thead><tr><th>Name</th><th>Company</th><th>Mobile</th><th>GST</th><th>Logo</th><th>Actions</th></tr></thead><tbody></tbody></table></div>`;
      const tbody = wrap.querySelector('tbody');
      list.forEach(f => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${escapeHtml(f.full_name)}</td><td>${escapeHtml(f.company_name || '')}</td><td>${escapeHtml(f.mobile || '')}</td><td>${escapeHtml(f.gst || '')}</td><td><img src="${f.logo_path ? fixImagePath(escapeHtml(f.logo_path)) : 'assets/images/default-company.svg'}" style="height:40px; width:60px;object-fit:contain"></td><td>
          <button class="btn btn-sm btn-outline-primary btnViewFree" data-id="${f.id}">View</button>
          <button class="btn btn-sm btn-outline-secondary btnEditFree" data-id="${f.id}">Edit</button>
          <button class="btn btn-sm btn-outline-danger btnDelFree" data-id="${f.id}">Delete</button>
        </td>`;
        tbody.appendChild(tr);
      });

      tbody.querySelectorAll('.btnDelFree').forEach(b => b.addEventListener('click', async (evt) => {
        if (!confirm('Delete free joiner?')) return;
        const id = evt.currentTarget.dataset.id;
        try {
          const body = new URLSearchParams({ id }).toString();
          const res = await fetchWithCsrf(`${baseApi}/free_joiners.php`, {
            method: 'DELETE',
            credentials: 'include',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
            body
          });
          const j = await parseApiResponse(res) || {};
          if (j.success) { showAlert('Deleted', 'success'); await loadFree(); await loadProducts(); }
          else showAlert(j.error || j.detail || 'Delete failed', 'danger');
        } catch (err) { console.error(err); showAlert('Delete failed', 'danger'); }
      }));

      tbody.querySelectorAll('.btnViewFree').forEach(b => b.addEventListener('click', async (evt) => {
        const id = evt.currentTarget.dataset.id;
        const res = await fetch(`${baseApi}/free_joiners.php`, { credentials: 'include' });
        const arr = await parseApiResponse(res) || [];
        const listArr = Array.isArray(arr) ? arr : (arr && arr.data ? arr.data : []);
        const f = listArr.find(x => String(x.id) === String(id));
        if (!f) return showAlert('Not found', 'danger');
        alert(`Name: ${f.full_name}\nCompany: ${f.company_name}\nMobile: ${f.mobile}\nGST: ${f.gst}\nWhatsApp: ${f.whatsapp_number || 'N/A'}`);
      }));

      tbody.querySelectorAll('.btnEditFree').forEach(b => b.addEventListener('click', async (evt) => {
        const id = evt.currentTarget.dataset.id;
        try {
          const res = await fetch(`${baseApi}/free_joiners.php?id=${id}`, { credentials: 'include' });
          const f = await parseApiResponse(res);
          if (!f || !f.id) return showAlert('Free joiner not found', 'danger');

          const form = $('#freeForm');
          form.full_name.value = f.full_name || '';
          form.email.value = f.email || '';
          form.mobile.value = f.mobile || '';
          form.whatsapp_number.value = f.whatsapp_number || '';
          form.company_name.value = f.company_name || '';
          form.gst.value = f.gst || '';
          form.about.value = f.about || '';
          setValue('#freeId', f.id);

          const modalEl = document.getElementById('freeModal');
          const title = modalEl.querySelector('.modal-title');
          if (title) title.innerHTML = '<i class="fas fa-user-plus me-2"></i>Edit Free Joiner';
          new bootstrap.Modal(modalEl).show();
        } catch (err) {
          console.error(err);
          showAlert('Could not load details', 'danger');
        }
      }));

      setText('#statFree', Array.isArray(list) ? list.length : 0);
      return list;
    } catch (err) {
      console.error('loadFree', err);
      showAlert('Could not load free joiners', 'danger');
    }
  }

  async function loadUsers() {
    try {
      const r = await fetch(`${baseApi}/users.php`, { credentials: 'include' });
      const resp = await parseApiResponse(r);
      const users = Array.isArray(resp) ? resp : (resp && resp.data ? resp.data : []);
      const wrap = $('#usersTableWrap');
      if (!wrap) return;
      wrap.innerHTML = `<div class="table-responsive"><table class="table"><thead><tr><th>Full Name</th><th>Email</th><th>Phone</th><th>Actions</th></tr></thead><tbody></tbody></table></div>`;
      const tbody = wrap.querySelector('tbody');
      users.forEach(u => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${escapeHtml(u.full_name)}</td><td>${escapeHtml(u.email || '')}</td><td>${escapeHtml(u.phone || '')}</td><td>
          <button class="btn btn-sm btn-outline-primary btnViewUser" data-id="${u.id}">View</button>
          <button class="btn btn-sm btn-outline-secondary btnEditUser" data-id="${u.id}">Edit</button>
          <button class="btn btn-sm btn-outline-danger btnDelUser" data-id="${u.id}">Delete</button>
        </td>`;
        tbody.appendChild(tr);
      });

      tbody.querySelectorAll('.btnDelUser').forEach(b => b.addEventListener('click', async (evt) => {
        if (!confirm('Delete user?')) return;
        const id = evt.currentTarget.dataset.id;
        try {
          const body = new URLSearchParams({ id }).toString();
          const res = await fetchWithCsrf(`${baseApi}/users.php`, {
            method: 'DELETE',
            credentials: 'include',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
            body
          });
          const j = await parseApiResponse(res) || {};
          if (j.success) { showAlert('User deleted', 'success'); await loadUsers(); } else showAlert(j.error || j.detail || 'Delete failed', 'danger');
        } catch (err) { console.error(err); showAlert('Delete failed', 'danger'); }
      }));

      tbody.querySelectorAll('.btnEditUser').forEach(b => b.addEventListener('click', async (evt) => {
        const id = evt.currentTarget.dataset.id;
        try {
          const res = await fetch(`${baseApi}/users.php?id=${id}`, { credentials: 'include' });
          const u = await parseApiResponse(res);
          if (!u || !u.id) return showAlert('User not found', 'danger');

          const form = $('#userForm');
          form.full_name.value = u.full_name || '';
          form.email.value = u.email || '';
          form.phone.value = u.phone || '';
          if (form.role) form.role.value = u.role || 'viewer';
          setValue('#userId', u.id);

          const modalEl = document.getElementById('userModal');
          const title = modalEl.querySelector('.modal-title');
          if (title) title.innerHTML = '<i class="fas fa-user-plus me-2"></i>Edit User';
          new bootstrap.Modal(modalEl).show();
        } catch (err) {
          console.error(err);
          showAlert('Could not load user', 'danger');
        }
      }));

      setText('#statUsers', Array.isArray(users) ? users.length : 0);
      return users;
    } catch (err) {
      console.error('loadUsers', err);
      showAlert('Could not load users', 'danger');
    }
  }

  async function loadProfiles() {
    const wrap = $('#profilesTableWrap');
    if (!wrap) return;

    try {
      const res = await fetch(`${baseApi}/profiles.php`, { credentials: 'include' });
      const data = await parseApiResponse(res);

      if (data && data.error) {
        wrap.innerHTML = `<div class="alert alert-danger mx-3"><i class="fas fa-exclamation-triangle me-2"></i>Error: ${data.error}</div>`;
        return;
      }

      const profiles = Array.isArray(data) ? data : (data && data.data ? data.data : []);

      if (profiles.length === 0) {
        wrap.innerHTML = `<div class="text-center py-5 text-muted"><i class="fas fa-folder-open fa-3x mb-3 opacity-50"></i><p>No business profiles found yet.</p></div>`;
        return;
      }

      let html = `<div class="table-responsive"><table class="table table-hover align-middle mb-0">
        <thead class="bg-light">
          <tr>
            <th class="ps-4">Company Details</th>
            <th>Type</th>
            <th>Contact Info</th>
            <th class="text-end pe-4">Actions</th>
          </tr>
        </thead>
        <tbody>`;

      profiles.forEach(p => {
        html += `
          <tr>
            <td class="ps-4">
              <div class="fw-bold text-dark">${escapeHtml(p.company_name)}</div>
              <div class="small text-secondary">${escapeHtml(p.owner_name || 'No Owner Listed')}</div>
            </td>
            <td><span class="badge bg-soft-primary text-primary px-3 rounded-pill">${escapeHtml(p.profile_type)}</span></td>
            <td>
              <div class="small fw-semibold"><i class="fas fa-phone-alt text-muted me-2" style="width:14px"></i>${escapeHtml(p.contact_number || 'N/A')}</div>
              <div class="small text-muted mt-1"><i class="fas fa-envelope text-muted me-2" style="width:14px"></i>${escapeHtml(p.email_address || 'N/A')}</div>
            </td>
            <td class="text-end pe-4">
              <div class="btn-group">
                <button class="btn btn-sm btn-outline-info btnEditProfile" data-id="${p.id}" title="Edit"><i class="fas fa-edit"></i></button>
                <button class="btn btn-sm btn-outline-danger btnDelProfile ms-1" data-id="${p.id}" title="Delete"><i class="fas fa-trash-alt"></i></button>
              </div>
            </td>
          </tr>
        `;
      });

      html += `</tbody></table></div>`;
      wrap.innerHTML = html;

      // Attach events
      wrap.querySelectorAll('.btnDelProfile').forEach(btn => {
        btn.onclick = async (e) => {
          if (!confirm('Permanently delete this business profile?')) return;
          const id = e.currentTarget.dataset.id;
          try {
            const formData = new FormData();
            formData.append('id', id);
            formData.append('_action', 'delete');
            const res = await fetchWithCsrf(`${baseApi}/profiles.php`, { method: 'POST', body: formData });
            const j = await parseApiResponse(res);
            if (j && j.success) {
              showAlert('Profile deleted successfully', 'success');
              await loadProfiles();
              if (typeof updateStats === 'function') updateStats();
            } else {
              showAlert(j?.error || 'Could not delete profile', 'danger');
            }
          } catch (err) {
            console.error(err);
            showAlert('Deletion failed', 'danger');
          }
        };
      });

      wrap.querySelectorAll('.btnEditProfile').forEach(btn => {
        btn.onclick = async (e) => {
          const id = e.currentTarget.dataset.id;
          try {
            const res = await fetch(`${baseApi}/profiles.php?id=${id}`, { credentials: 'include' });
            const p = await parseApiResponse(res);
            if (!p || !p.id) return showAlert('Profile details not found', 'danger');

            const form = $('#profileForm');
            if (!form) return;
            form.reset();

            // Populate form
            Object.keys(p).forEach(key => {
              const el = form.querySelector(`[name="${key}"]`);
              if (el) {
                if (el.type === 'checkbox') el.checked = parseInt(p[key]) === 1;
                else el.value = p[key] || '';
              }
            });

            const modalEl = document.getElementById('profileModal');
            const titleEl = modalEl?.querySelector('.modal-title');
            if (titleEl) titleEl.innerHTML = '<i class="fas fa-edit me-2"></i>Edit Business Profile';

            const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
            modal.show();
          } catch (err) {
            console.error(err);
            showAlert('Error loading profile data', 'danger');
          }
        };
      });

    } catch (err) {
      console.error('loadProfiles error:', err);
      wrap.innerHTML = `<div class="alert alert-warning mx-3"><i class="fas fa-exclamation-circle me-2"></i>Could not connect to profiles API. ${err.message}</div>`;
    }
  }

  // ---------- Product handlers ----------
  async function onViewProduct(e) {
    const id = e.currentTarget.dataset.id;
    try {
      const res = await fetch(`${baseApi}/products.php?id=${encodeURIComponent(id)}`, { credentials: 'include' });
      const raw = await parseApiResponse(res);
      let p = null;
      if (!raw) return showAlert('No product data', 'danger');
      if (Array.isArray(raw)) p = raw[0];
      else if (raw && raw.id) p = raw;
      else if (raw && Array.isArray(raw.data)) p = raw.data[0];
      else if (raw && raw.data && !Array.isArray(raw.data)) p = raw.data;
      p = normalizeProduct(p);
      if (!p) return showAlert('No product data', 'danger');

      setText('#detailTitle', p.name || 'Product');
      setText('#detailTitle2', p.name || '');
      setSrc('#detailImage', p.image_path || 'assets/images/default-product.svg');
      setSrc('#detailCompanyLogo', p.company_logo || 'assets/images/default-company.svg');
      setText('#detailCompanyName', p.company_name || '');
      setText('#detailCompanyContact', '');
      setHtml('#detailDescription', p.description || 'No description available');

      // Stats Row
      setText('#detailCategory', p.category_name || '—');
      setText('#detailSize', p.size || '—');
      setText('#detailQuantity', (p.quantity !== undefined && p.quantity !== null) ? p.quantity : '—');
      setText('#detailUnit', p.unit || '—');
      setText('#detailPrice', (p.price !== undefined && p.price !== null) ? parseFloat(p.price).toFixed(2) : '0.00');
      setText('#detailMinOrder', p.min_order_qty || '1');
      setText('#detailStatus', p.status || 'Active');
      setText('#detailWeight', p.weight ? `${p.weight} kg` : '—');
      setText('#detailDimensions', p.dimensions || '—');

      const topCatMap = {
        'new_arrival': 'New Arrival',
        'trending': 'Trending',
        'top_selling': 'Top Selling'
      };
      setText('#detailTopCategory', topCatMap[p.top_category] || '—');

      // Material Badge
      setText('#materialText', `Material: ${p.material || 'N/A'}`);

      // Product Tags
      const tagsContainer = $('#productTags');
      if (tagsContainer) {
        tagsContainer.innerHTML = '';
        const tags = p.tags ? p.tags.split(',').map(t => t.trim()).filter(t => t !== '') : [];
        if (tags.length > 0) {
          tags.forEach(tag => {
            const span = document.createElement('span');
            span.className = 'product-tag';
            span.textContent = tag;
            tagsContainer.appendChild(span);
          });
        } else {
          tagsContainer.innerHTML = '<span class="text-muted small">No tags available</span>';
        }
      }

      // Specifications list
      const specUl = $('#detailSpecs');
      const noSpecs = $('#noSpecs');
      if (specUl) {
        specUl.innerHTML = '';
        let specs = [];
        try {
          if (typeof p.specifications === 'string' && p.specifications.trim() !== '' && p.specifications.trim() !== 'null') {
            specs = JSON.parse(p.specifications);
          } else if (Array.isArray(p.specifications)) {
            specs = p.specifications;
          }
        } catch (e) { console.warn('Spec parse error', e); }

        if (Array.isArray(specs) && specs.length > 0) {
          if (noSpecs) noSpecs.classList.add('d-none');
          specs.forEach(s => {
            const li = document.createElement('li');
            li.innerHTML = `<span class="spec-key">${escapeHtml(s.key)}</span><span class="spec-value">${escapeHtml(s.value)}</span>`;
            specUl.appendChild(li);
          });
        } else {
          if (noSpecs) noSpecs.classList.remove('d-none');
        }
      }

      setHtml('#detailAdditionalNotes', p.additional_notes || 'No additional notes');
      const notesSec = $('#additionalNotesSection');
      if (notesSec) {
        // We always show the section but with "No additional notes" if empty, per UI design
        notesSec.classList.remove('d-none');
      }

      // match contact via free joiners
      let contactHtml = '<small class="text-muted">No direct contact (Free joiner not linked)</small>';
      try {
        const resF = await fetch(`${baseApi}/free_joiners.php`, { credentials: 'include' });
        const fjRaw = await parseApiResponse(resF);
        const fj = Array.isArray(fjRaw) ? fjRaw : (fjRaw && fjRaw.data ? fjRaw.data : []);
        const match = (fj || []).find(x => (x.company_name || '').toLowerCase() === (p.company_name || '').toLowerCase());
        if (match) {
          const mobile = match.mobile || match.whatsapp_number || match.contact_phone || '';
          contactHtml = '';
          if (mobile) contactHtml += `<a class="btn btn-outline-primary me-2" href="tel:${mobile}">Call</a>`;
          if (match.whatsapp_number) contactHtml += `<a class="btn btn-success" target="_blank" href="https://wa.me/${match.whatsapp_number.replace(/[^0-9]/g, '')}">WhatsApp</a>`;
        }
      } catch (err) { /* ignore */ }
      setHtml('#contactButtons', contactHtml);

      const modalEl = document.getElementById('productDetailModal');
      const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
      modal.show();
    } catch (err) {
      console.error(err);
      showAlert('Could not load product details', 'danger');
    }
  }

  async function onDeleteProduct(e) {
    const id = e.currentTarget.dataset.id;
    if (!confirm('Delete product?')) return;
    try {
      const body = new URLSearchParams({ id }).toString();
      const res = await fetchWithCsrf(`${baseApi}/products.php`, {
        method: 'DELETE',
        credentials: 'include',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
        body
      });
      const j = await parseApiResponse(res) || {};
      if (j.success) { showAlert('Product deleted', 'success'); await loadProducts(); }
      else showAlert(j.error || j.detail || 'Delete failed', 'danger');
    } catch (err) {
      console.error(err);
      showAlert('Delete failed', 'danger');
    }
  }

  async function onEditProduct(e) {
    const id = e.currentTarget.dataset.id;
    if (!id) return;
    try {
      // 1. Reset form and clear dynamic areas
      const form = $('#productForm');
      if (form) {
        form.reset();
        setValue('#productId', '');
        const selectedFiles = $('#selectedFiles');
        if (selectedFiles) selectedFiles.innerHTML = '';
        const specContainer = $('#specificationsContainer');
        if (specContainer) specContainer.innerHTML = '';
      }

      // 2. Fetch all required data in parallel BEFORE opening or setting values
      const [prodRes, brands, categories] = await Promise.all([
        fetch(`${baseApi}/products.php?id=${encodeURIComponent(id)}`, { credentials: 'include' }).then(parseApiResponse),
        loadBrands(),
        loadCategories()
      ]);

      let p = null;
      if (Array.isArray(prodRes)) p = prodRes[0];
      else if (prodRes && prodRes.id) p = prodRes;
      else if (prodRes && Array.isArray(prodRes.data)) p = prodRes.data[0];
      else p = prodRes;

      if (!p) return showAlert('Product not found', 'danger');
      p = normalizeProduct(p);

      // 3. Bind basic fields
      setValue('#productId', p.id);
      setValue('#productName', p.name);
      setValue('#productSize', p.size);
      setValue('#productQuantity', p.quantity);
      setValue('#productPrice', p.price);
      setValue('#productDescription', p.description);

      // 4. Bind dropdowns
      setValue('#productUnit', p.unit || '');
      setValue('#productStatus', p.status || 'active');
      setValue('#productTopCategory', p.top_category || '');

      // 5. Bind specified extra fields
      setValue('#productWeight', p.weight || '');
      setValue('#productMaterial', p.material || '');
      setValue('#productDimensions', p.dimensions || '');
      setValue('#productAdditionalNotes', p.additional_notes || '');
      setValue('#productTagsInput', p.tags || '');
      setValue('#productMinOrderQty', p.min_order_qty || 1);

      // 6. Bind dynamic dropdowns (already loaded)
      setValue('#brandSelect', p.brand_id || '');
      setValue('#categorySelect', p.category_id || '');

      // 7. Reconstruct Specification Rows
      const specContainer = $('#specificationsContainer');
      if (specContainer) {
        let specs = [];
        try {
          if (typeof p.specifications === 'string' && p.specifications.trim() !== '' && p.specifications.trim() !== 'null') {
            specs = JSON.parse(p.specifications);
          } else if (Array.isArray(p.specifications)) {
            specs = p.specifications;
          }
        } catch (err) {
          console.warn('Spec parse error', err);
        }

        if (Array.isArray(specs) && specs.length > 0) {
          specs.forEach(s => {
            const row = document.createElement('div');
            row.className = 'spec-row input-group mt-2';
            row.innerHTML = `
              <input type="text" class="form-control spec-key" value="${escapeHtml(s.key || '')}" placeholder="Key">
              <input type="text" class="form-control spec-value" value="${escapeHtml(s.value || '')}" placeholder="Value">
              <button type="button" class="btn btn-outline-danger remove-spec"><i class="fas fa-times"></i></button>
            `;
            specContainer.appendChild(row);
            row.querySelector('.remove-spec').addEventListener('click', () => row.remove());
          });
        } else {
          // Default empty row if none exist
          const row = document.createElement('div');
          row.className = 'spec-row input-group mt-2';
          row.innerHTML = `
            <input type="text" class="form-control spec-key" placeholder="Key (e.g., Color)">
            <input type="text" class="form-control spec-value" placeholder="Value (e.g., Red)">
            <button type="button" class="btn btn-outline-danger remove-spec"><i class="fas fa-times"></i></button>
          `;
          specContainer.appendChild(row);
          row.querySelector('.remove-spec').addEventListener('click', () => row.remove());
        }
      }

      // 8. Product Gallery — show current image thumbnail with delete button
      const selFiles = $('#selectedFiles');
      if (selFiles) {
        const cachedPath = QUICK_IMAGE_CACHE[p.id] || '';
        const currentPath = cachedPath || p.image_path || '';
        renderGalleryThumbnail(selFiles, currentPath, p.id);
      }

      // 9. Show Modal
      const modalEl = document.getElementById('productModal');
      const title = modalEl.querySelector('.modal-title');
      if (title) title.innerHTML = '<i class="fas fa-box me-2"></i>Edit Product';
      bootstrap.Modal.getOrCreateInstance(modalEl).show();
    } catch (err) {
      console.error('onEditProduct error', err);
      showAlert('Error loading product details', 'danger');
    }
  }

  // ---------- Create / Save handlers ----------
  $('#saveBrand')?.addEventListener('click', async () => {
    const form = $('#brandForm'); const fd = new FormData(form);
    const modalEl = document.getElementById('brandModal');
    const editId = modalEl.dataset.editId ? modalEl.dataset.editId : null;
    if (editId) fd.append('id', editId), fd.append('_action', 'update');
    try {
      // Do not set Content-Type header when sending FormData
      const res = await fetchWithCsrf(`${baseApi}/brands.php`, { method: 'POST', body: fd });
      const j = await parseApiResponse(res) || {};
      if (j.success) {
        showAlert(editId ? 'Brand updated' : 'Brand added', 'success');
        form.reset();
        delete modalEl.dataset.editId;
        bootstrap.Modal.getInstance(modalEl)?.hide();
        await loadBrands();
      } else {
        console.error('brands.php error', j);
        showAlert(j.error || j.detail || 'Brand save failed', 'danger');
      }
    } catch (err) { console.error(err); showAlert('Brand save failed', 'danger'); }
  });

  $('#saveProduct')?.addEventListener('click', async () => {
    // Collect dynamic specifications
    const specs = [];
    $$('.spec-row').forEach(row => {
      const kEl = row.querySelector('.spec-key');
      const vEl = row.querySelector('.spec-value');
      const k = kEl ? kEl.value.trim() : '';
      const v = vEl ? vEl.value.trim() : '';
      if (k || v) specs.push({ key: k, value: v });
    });
    const specInp = $('#specificationsInput');
    if (specInp) specInp.value = JSON.stringify(specs);

    const form = $('#productForm');
    if (!form) return;
    const fd = new FormData(form);
    const id = $('#productId').value;
    if (id) fd.append('id', id), fd.append('_action', 'update');
    try {
      const res = await fetchWithCsrf(`${baseApi}/products.php`, { method: 'POST', body: fd });
      const j = await parseApiResponse(res) || {};
      if (j.success) {
        showAlert(id ? 'Product updated' : 'Product created', 'success');
        form.reset();
        $('#productId').value = '';
        bootstrap.Modal.getInstance(document.getElementById('productModal'))?.hide();
        await loadProducts();
        await updateStats();
      } else {
        console.error('products.php error', j);
        showAlert(j.error || j.detail || 'Save failed. Check server logs.', 'danger');
      }
    } catch (err) { console.error(err); showAlert('Save failed', 'danger'); }
  });

  $('#saveFree')?.addEventListener('click', async () => {
    const form = $('#freeForm'); const fd = new FormData(form);
    const id = $('#freeId').value;
    if (id) fd.append('id', id), fd.append('_action', 'update');
    try {
      const res = await fetchWithCsrf(`${baseApi}/free_joiners.php`, { method: 'POST', body: fd });
      const j = await parseApiResponse(res) || {};
      if (j.success) {
        showAlert(id ? 'Free joiner updated' : 'Free joiner added', 'success');
        form.reset();
        setValue('#freeId', '');
        bootstrap.Modal.getInstance(document.getElementById('freeModal'))?.hide();
        await loadFree();
        await updateStats();
      }
      else { console.error('free_joiners.php error', j); showAlert(j.error || j.detail || 'Save failed', 'danger'); }
    } catch (err) { console.error(err); showAlert('Save failed', 'danger'); }
  });

  $('#saveUser')?.addEventListener('click', async () => {
    const form = $('#userForm'); const fd = new FormData(form);
    const id = $('#userId').value;
    if (id) fd.append('id', id), fd.append('_action', 'update');
    try {
      const res = await fetchWithCsrf(`${baseApi}/users.php`, { method: 'POST', body: fd });
      const j = await parseApiResponse(res) || {};
      if (j.success) {
        showAlert(id ? 'User updated' : 'User created', 'success');
        form.reset();
        setValue('#userId', '');
        bootstrap.Modal.getInstance(document.getElementById('userModal'))?.hide();
        await loadUsers();
        await updateStats();
      }
      else { console.error('users.php error', j); showAlert(j.error || j.detail || 'Create user failed', 'danger'); }
    } catch (err) { console.error(err); showAlert('Create user failed', 'danger'); }
  });

  // ---------- Helper to refresh the dashboard stats ----------
  async function updateStats() {
    try {
      const [prodsRaw, brandsRaw, freeRaw, usersRaw] = await Promise.all([
        fetch(`${baseApi}/products.php`, { credentials: 'include' }).then(parseApiResponse),
        fetch(`${baseApi}/brands.php`, { credentials: 'include' }).then(parseApiResponse),
        fetch(`${baseApi}/free_joiners.php`, { credentials: 'include' }).then(parseApiResponse),
        fetch(`${baseApi}/users.php`, { credentials: 'include' }).then(parseApiResponse)
      ]);
      // Guard: only use array responses; ignore error objects
      const prods = Array.isArray(prodsRaw) ? prodsRaw : (prodsRaw && Array.isArray(prodsRaw.data) ? prodsRaw.data : null);
      const brands = Array.isArray(brandsRaw) ? brandsRaw : (brandsRaw && Array.isArray(brandsRaw.data) ? brandsRaw.data : null);
      const free = Array.isArray(freeRaw) ? freeRaw : (freeRaw && Array.isArray(freeRaw.data) ? freeRaw.data : null);
      const users = Array.isArray(usersRaw) ? usersRaw : (usersRaw && Array.isArray(usersRaw.data) ? usersRaw.data : null);

      if (prods !== null) setText('#statProducts', prods.length);
      if (brands !== null) setText('#statBrands', brands.length);
      if (free !== null) setText('#statFree', free.length);
      if (users !== null) setText('#statUsers', users.length);
    } catch (err) { console.error('updateStats', err); /* silent fail */ }
  }

  // ---------- Utilities ----------
  function escapeHtml(s) {
    if (!s && s !== 0) return '';
    return String(s).replace(/[&<>"'`]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;', '`': '&#96;' }[c]));
  }

  // Initial reset for Add Product button
  document.querySelector('[data-bs-target="#productModal"]')?.addEventListener('click', () => {
    const form = $('#productForm');
    if (form) {
      form.reset();
      setValue('#productId', '');
      const selectedFiles = $('#selectedFiles');
      if (selectedFiles) selectedFiles.innerHTML = '';
      const specContainer = $('#specificationsContainer');
      if (specContainer) {
        specContainer.innerHTML = `
          <div class="spec-row input-group mt-2">
            <input type="text" class="form-control spec-key" placeholder="Key (e.g., Color)">
            <input type="text" class="form-control spec-value" placeholder="Value (e.g., Red)">
            <button type="button" class="btn btn-outline-danger remove-spec" title="Remove">
              <i class="fas fa-times"></i>
            </button>
          </div>
        `;
        specContainer.querySelector('.remove-spec').addEventListener('click', (e) => e.target.closest('.spec-row').remove());
      }
    }
  });

  // Initial reset for Add Profile buttons
  ['#btnAddProfile', '#btnNavbarAddProfile'].forEach(sel => {
    $(sel)?.addEventListener('click', () => {
      const form = $('#profileForm');
      if (form) {
        form.reset();
        setValue('#profileId', '');
        const modalEl = document.getElementById('profileModal');
        const title = modalEl.querySelector('.modal-title');
        if (title) title.innerHTML = '<i class="fas fa-address-card me-2"></i>Add Professional Profile';
      }
    });
  });

  // logout fallback
  $('#btnLogout')?.addEventListener('click', async (e) => {
    e.preventDefault();
    try {
      await fetchWithCsrf(`${baseApi}/admin_auth.php?action=logout`, { method: 'POST' });
    } catch (e) { /* ignore */ }
    window.location.href = 'login.html';
  });

  // ============================================================
  // Drag-and-Drop: silent hidden feature on product cards
  // ============================================================
  async function handleQuickImageDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    const card = e.currentTarget;
    const files = e.dataTransfer.files;
    if (!files || files.length === 0) return;
    const file = files[0];
    if (!file.type.startsWith('image/')) {
      showAlert('Please drop an image file.', 'warning');
      return;
    }
    const productId = card.dataset.id;
    if (!productId) return;

    const fd = new FormData();
    fd.append('id', productId);
    fd.append('_action', 'update_image');
    fd.append('image', file);

    try {
      const res = await fetchWithCsrf(`${baseApi}/products.php`, { method: 'POST', body: fd });
      const j = await parseApiResponse(res) || {};
      if (j.success && j.image_path) {
        // Update card image
        const img = card.querySelector('.card-img-top');
        if (img) img.src = fixImagePath(j.image_path);
        // Subtle glow
        if (typeof gsap !== 'undefined') {
          gsap.fromTo(card, { boxShadow: '0 0 0 4px #0057ff' }, { boxShadow: '0 8px 20px rgba(0,0,0,0.06)', duration: 0.8 });
        }
        // Store in cache
        QUICK_IMAGE_CACHE[productId] = j.image_path;
        // If Edit modal is open for this product, refresh gallery
        const editEl = document.getElementById('productModal');
        const openId = $('#productId')?.value;
        if (editEl && editEl.classList.contains('show') && openId === String(productId)) {
          const sf = $('#selectedFiles');
          if (sf) renderGalleryThumbnail(sf, j.image_path, productId);
        }
        showAlert('Image updated!', 'success');
      } else {
        showAlert(j.error || 'Upload failed', 'danger');
      }
    } catch (err) {
      console.error('Quick drop error:', err);
      showAlert('Upload error.', 'danger');
    }
  }

  // Render a thumbnail with delete button into a container element
  function renderGalleryThumbnail(container, imagePath, productId) {
    if (!imagePath) {
      container.innerHTML = `<p class="text-muted small mb-0"><i class="fas fa-image me-1"></i>No saved image. Upload one above.</p>`;
      return;
    }
    const src = fixImagePath(imagePath);
    container.innerHTML = `
      <div class="gallery-item">
        <img src="${src}" onerror="this.src='assets/images/default-product.svg'">
        <button type="button" class="remove-btn" id="btnRemoveSavedImg" title="Delete image">
          <i class="fas fa-times"></i>
        </button>
        <div class="px-1 py-1 bg-primary text-white position-absolute bottom-0 w-100 opacity-75 text-center" style="font-size:9px">Current Image</div>
        <input type="hidden" name="existing_image" value="${imagePath}">
      </div>
    `;
    // Attach delete handler
    document.getElementById('btnRemoveSavedImg')?.addEventListener('click', async () => {
      if (!confirm('Delete this image?')) return;
      const pid = String(productId || '').trim();
      if (!pid || pid === '0') { showAlert('Invalid product ID.', 'danger'); return; }
      try {
        const fd = new FormData();
        fd.append('id', pid);
        fd.append('_action', 'remove_image');
        const res = await fetchWithCsrf(`${baseApi}/products.php`, { method: 'POST', body: fd });
        const j = await parseApiResponse(res) || {};
        if (j.success) {
          delete QUICK_IMAGE_CACHE[pid];
          container.innerHTML = `<p class="text-muted small mb-0"><i class="fas fa-image me-1"></i>No saved image. Upload one above.</p>`;
          // Reset card image in grid
          const card = document.querySelector(`.product-card[data-id="${pid}"]`);
          if (card) {
            const img = card.querySelector('.card-img-top');
            if (img) img.src = 'assets/images/default-product.svg';
          }
          showAlert('Image deleted.', 'success');
        } else {
          showAlert(j.error || 'Could not delete image', 'danger');
        }
      } catch (err) {
        showAlert('Error deleting image.', 'danger');
      }
    });
  }

  // Previews for NEWLY selected files
  function renderNewFilesPreview(container, files, inputEl) {
    // We clear ONLY the new file previews, keep existing image if any
    container.querySelectorAll('.new-file-preview').forEach(el => el.remove());

    if (files.length === 0) return;

    Array.from(files).forEach((file, index) => {
      if (!file.type.startsWith('image/')) return;
      const div = document.createElement('div');
      div.className = 'gallery-item new-file-preview';
      div.innerHTML = `
        <img src="" class="preview-img">
        <button type="button" class="remove-btn" title="Remove">
          <i class="fas fa-times"></i>
        </button>
        <div class="px-1 py-1 bg-dark text-white position-absolute bottom-0 w-100 opacity-75 text-center" style="font-size:9px">New</div>
      `;
      container.appendChild(div);

      const reader = new FileReader();
      reader.onload = e => { div.querySelector('.preview-img').src = e.target.result; };
      reader.readAsDataURL(file);

      div.querySelector('.remove-btn').addEventListener('click', () => {
        const dt = new DataTransfer();
        const currentFiles = inputEl.files;
        for (let i = 0; i < currentFiles.length; i++) {
          if (i !== index) dt.items.add(currentFiles[i]);
        }
        inputEl.files = dt.files;
        div.remove();
      });
    });
  }

  // Attach listener for Product Images input
  $('input[name="images[]"]')?.addEventListener('change', function () {
    const selFiles = $('#selectedFiles');
    if (selFiles) {
      renderNewFilesPreview(selFiles, this.files, this);
    }
  });

  // Drag and drop feedback for the modal upload box
  (function initModalDragDrop() {
    const wrapper = $('.file-upload-wrapper');
    if (!wrapper) return;
    const input = wrapper.querySelector('input[type="file"]');
    if (!input) return;

    ['dragover', 'dragenter'].forEach(sig => {
      wrapper.addEventListener(sig, e => {
        e.preventDefault();
        wrapper.classList.add('dragover');
      });
    });
    ['dragleave', 'dragend', 'drop'].forEach(sig => {
      wrapper.addEventListener(sig, e => {
        wrapper.classList.remove('dragover');
      });
    });
    // The input itself handles the 'drop' file selection via 'change' event
  })();

  // initial load
  (async function initialLoad() {
    const loaders = [
      { name: 'Brands', fn: loadBrands },
      { name: 'Categories', fn: loadCategories },
      { name: 'Products', fn: loadProducts },
      { name: 'Free Joiners', fn: loadFree },
      { name: 'Users', fn: loadUsers },
      { name: 'Profiles', fn: loadProfiles }
    ];

    for (const loader of loaders) {
      try {
        await loader.fn();
      } catch (err) {
        console.error(`Failed to load ${loader.name}:`, err);
      }
    }

    // Try to update stats if exists
    if (typeof updateStats !== 'undefined') { try { await updateStats(); } catch (e) { } }
    console.log("Initial load finished at " + new Date().toLocaleTimeString());
  })();

  // expose for debug / inline usage
  window.loadProducts = loadProducts;
  window.loadBrands = loadBrands;
  window.loadFree = loadFree;
  window.loadUsers = loadUsers;
  window.loadCategories = loadCategories;
  window.loadProfiles = loadProfiles;
  if (typeof updateStats !== 'undefined') window.updateStats = updateStats;

  $('#saveProfile')?.addEventListener('click', async () => {
    const btn = $('#saveProfile');
    btn.disabled = true;
    const originalText = btn.innerHTML;
    btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Saving...';

    try {
      const form = $('#profileForm');
      const formData = new FormData(form);
      const id = formData.get('id');
      formData.append('_action', id ? 'update' : 'create');

      const res = await fetchWithCsrf(`${baseApi}/profiles.php`, {
        method: 'POST',
        body: formData
      });

      const j = await parseApiResponse(res);
      if (j && j.success) {
        showAlert(id ? 'Profile successfully updated!' : 'Profile added successfully!', 'success');
        const m = bootstrap.Modal.getInstance(document.getElementById('profileModal'));
        if (m) m.hide();
        await loadProfiles();
      } else {
        showAlert(j?.error || 'Failed to save profile', 'danger');
      }
    } catch (err) {
      console.error(err);
      showAlert('An error occurred during saving the profile', 'danger');
    } finally {
      btn.disabled = false;
      btn.innerHTML = originalText;
    }
  });

});