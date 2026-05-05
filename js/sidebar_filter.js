// js/sidebar_filter.js
// Modern Filter Drawer System for GlobalTrade India

(function () {
    function initFilterDrawer() {
        // Detect if we are on a business page
        const isBusinessPage = !!document.querySelector('.network-grid') || ['manufacturers', 'wholesalers', 'retailers', 'distributors', 'dealers', 'traders', 'importers', 'exporters'].some(p => window.location.pathname.toLowerCase().includes(p));

        if (isBusinessPage) return; 

        // 1. Force Cleanup of Legacy Sidebar elements if they exist
        const oldSidebar = document.getElementById('universal-sidebar');
        if (oldSidebar) oldSidebar.remove();
        const oldWrapper = document.querySelector('.results-container');
        if (oldWrapper) {
            const mainContent = document.getElementById('main-results-area');
            if (mainContent) {
                oldWrapper.parentNode.insertBefore(mainContent, oldWrapper);
            }
            oldWrapper.remove();
        }

        // 2. Build Drawer HTML
        const drawerHtml = `
            <div class="filter-overlay" id="filter-overlay">
                <div class="filter-drawer">
                    <div class="filter-drawer-header">
                        <h2><i class="fa-solid fa-sliders"></i> Refine Search</h2>
                        <button class="btn-close-filter" id="close-filter-drawer">
                            <i class="fa-solid fa-xmark"></i>
                        </button>
                    </div>
                    
                    <div class="filter-drawer-content">
                        <!-- LOCATION FILTER -->
                        <div class="sidebar-box">
                            <div class="sidebar-box-header">LOCATION</div>
                            <select id="location-filter" class="ts-filter-input" style="width:100%; padding:10px; border-radius:8px; border:1px solid #e2e8f0; background:white;">
                                <option value="">All Locations</option>
                            </select>

                        </div>

                        <!-- Categories -->
                        <div class="sidebar-box">
                            <div class="sidebar-box-header">CATEGORIES</div>
                            <ul class="filter-list" id="category-filters">
                                <label class="filter-item"><input type="checkbox" value="2"> Hotelware</label>
                                <label class="filter-item"><input type="checkbox" value="3"> Houseware</label>
                                <label class="filter-item"><input type="checkbox" value="1"> Kitchenware</label>
                                <label class="filter-item"><input type="checkbox" value="5"> Raw Materials</label>
                                <label class="filter-item"><input type="checkbox" value="4"> Tube & Pipes</label>
                            </ul>
                        </div>

                        <!-- Material Grade -->
                        <div class="sidebar-box">
                            <div class="sidebar-box-header">MATERIAL GRADE</div>
                            <select id="material-grade-filter" class="ts-filter-input" style="width:100%; padding:10px; border-radius:8px; border:1px solid #e2e8f0; background:white;">
                                <option value="">All Grades</option>
                                <option value="200 Series">200 Series</option>
                                <option value="304 Grade">304 Grade</option>
                                <option value="316 Grade">316 Grade</option>
                                <option value="410 Grade">410 Grade</option>
                                <option value="Premium">Premium</option>
                            </select>
                        </div>

                        <!-- Available Sizes -->
                        <div class="sidebar-box">
                            <div class="sidebar-box-header">AVAILABLE SIZES</div>
                            <select id="size-filter" class="ts-filter-input" style="width:100%; padding:10px; border-radius:8px; border:1px solid #e2e8f0; background:white;">
                                <option value="">All Sizes</option>
                                <option value="Small">Small</option>
                                <option value="Medium">Medium</option>
                                <option value="Large">Large</option>
                                <option value="Standard">Standard</option>
                                <option value="Custom">Custom</option>
                            </select>
                        </div>

                        <!-- No Of Pieces -->
                        <div class="sidebar-box">
                            <div class="sidebar-box-header">NO OF PIECES</div>
                            <select id="pieces-filter" class="ts-filter-input" style="width:100%; padding:10px; border-radius:8px; border:1px solid #e2e8f0; background:white;">
                                <option value="">Any</option>
                                <option value="Single">Single Piece</option>
                                <option value="Set of 2">Set of 2</option>
                                <option value="Set of 3">Set of 3</option>
                                <option value="Set of 6">Set of 6</option>
                                <option value="Bulk">Bulk</option>
                            </select>
                        </div>
                        
                        <!-- Brands -->
                        <div class="sidebar-box">
                            <div class="sidebar-box-header">BRANDS</div>
                            <div style="position:relative; margin-bottom: 15px;">
                                <input type="text" id="brand-search-input" class="ts-filter-input" placeholder="Search brand..." style="padding-left:15px !important;">
                            </div>
                            <ul class="filter-list" id="brand-filters" style="max-height: 200px; overflow-y: auto; padding-right: 5px;">
                                <!-- Dynamically filled -->
                            </ul>
                        </div>

                        <!-- Price Range -->
                        <div class="sidebar-box">
                            <div class="sidebar-box-header">MAX PRICE</div>
                            <div class="price-range-container">
                                <div class="range-label" style="font-weight:700; color:#0A2540; margin-bottom:10px;">
                                    Up to <span id="price-val" style="color:#f26b43;">₹1,00,000</span>
                                </div>
                                <input type="range" id="price-slider" min="0" max="100000" step="500" value="100000" style="width:100%; accent-color:#f26b43;">
                            </div>
                        </div>
                    </div>

                    <div class="filter-drawer-footer">
                        <button class="ts-btn-detail" id="apply-filters" style="width:100%; height:50px;">
                            Apply Filters
                        </button>
                    </div>
                </div>
            </div>
        `;

        // Inject Drawer into Body
        if (!document.getElementById('filter-overlay')) {
            document.body.insertAdjacentHTML('beforeend', drawerHtml);
        }

        // Initialize Listeners
        setupDrawerLogic();
    }

    function setupDrawerLogic() {
        const overlay = document.getElementById('filter-overlay');
        const closeBtn = document.getElementById('close-filter-drawer');
        const applyBtn = document.getElementById('apply-filters');

        window.toggleFilterDrawer = function() {
            overlay.classList.toggle('active');
            if (overlay.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
                
                // Pre-check category based on page if none checked
                const path = window.location.pathname.toLowerCase();
                const catCheckboxes = document.querySelectorAll('#category-filters input[type="checkbox"]');
                const anyChecked = Array.from(catCheckboxes).some(c => c.checked);
                
                if (!anyChecked) {
                    let catId = '';
                    if (path.includes('kitchenware')) catId = '1';
                    else if (path.includes('horeca') || path.includes('hotelware')) catId = '2';
                    else if (path.includes('houseware')) catId = '3';
                    else if (path.includes('tubes-pipes') || path.includes('tube-pipe')) catId = '4';
                    else if (path.includes('raw-materials') || path.includes('raw-material')) catId = '5';
                    
                    if (catId) {
                        const target = document.querySelector(`#category-filters input[value="${catId}"]`);
                        if (target) target.checked = true;
                    }
                }

                fillBrandsDynamically();
                fillLocationsDynamically();
            } else {
                document.body.style.overflow = '';
            }
        };

        // Add listeners to category checkboxes to update brands list
        const catContainer = document.getElementById('category-filters');
        if (catContainer) {
            catContainer.addEventListener('change', (e) => {
                if (e.target.type === 'checkbox') {
                    fillBrandsDynamically();
                }
            });
        }

        async function fillLocationsDynamically() {
            const locSelect = document.getElementById('location-filter');
            if (!locSelect) return;
            try {
                const res = await fetch(`http://localhost:5001/api/locations?_cb=${Date.now()}`);
                if (res.ok) {
                    const data = await res.json();
                    const locs = data.data || [];
                    const currentVal = locSelect.value;
                    locSelect.innerHTML = '<option value="">All Locations</option>';
                    locSelect.innerHTML += locs.map(l => `<option value="${l}">${l}</option>`).join('');
                    if (currentVal) locSelect.value = currentVal;
                }
            } catch (err) { console.error("Sidebar locations failed:", err); }
        }


        closeBtn.onclick = window.toggleFilterDrawer;
        overlay.onclick = (e) => { if (e.target === overlay) window.toggleFilterDrawer(); };

        // Attach to the "Filter" button in the top bar
        // We need to wait for main.js to inject the top bar
        const checkFilterBtn = setInterval(() => {
            const filterBtn = document.querySelector('.ts-filter-bar .ts-btn-enquire');
            if (filterBtn) {
                filterBtn.onclick = (e) => {
                    e.preventDefault();
                    window.toggleFilterDrawer();
                };
                clearInterval(checkFilterBtn);
            }
        }, 500);

        // Slider label update
        const priceSlider = document.getElementById('price-slider');
        if (priceSlider) {
            priceSlider.oninput = function() {
                document.getElementById('price-val').textContent = `₹${parseInt(this.value).toLocaleString()}`;
            };
        }

        // Apply filters button
        applyBtn.onclick = () => {
            window.toggleFilterDrawer();
            // Trigger filtering logic in main.js if needed, 
            // or just rely on the existing loadProductPage(1)
            if (window.loadProductPage) window.loadProductPage(1);
        };

        // Removed Products / Businesses Tab Toggle Logic as Businesses btn is removed


        function switchMainTabs(type) {
            const tsGrids = document.querySelectorAll('.ts-grid');
            const networkGrids = document.querySelectorAll('.network-grid');
            if (type === 'businesses') {
                tsGrids.forEach(g => g.style.display = 'none');
                networkGrids.forEach(g => g.style.display = 'grid');
            } else {
                tsGrids.forEach(g => g.style.display = 'grid');
                networkGrids.forEach(g => g.style.display = 'none');
            }
        }
    }

    async function fillBrandsDynamically() {
        const brandList = document.getElementById('brand-filters');
        if (!brandList) return;

        try {
            // Get selected categories from checkboxes
            const selectedCats = Array.from(document.querySelectorAll('#category-filters input:checked')).map(cb => cb.value);
            let categoriesParam = selectedCats.join(',');

            // If none checked, fallback to page-based detection (as a backup, though pre-check handles it)
            if (!categoriesParam) {
                const path = window.location.pathname.toLowerCase();
                if (path.includes('kitchenware')) categoriesParam = '1';
                else if (path.includes('horeca') || path.includes('hotelware')) categoriesParam = '2';
                else if (path.includes('houseware')) categoriesParam = '3';
                else if (path.includes('tubes-pipes') || path.includes('tube-pipe')) categoriesParam = '4';
                else if (path.includes('raw-materials') || path.includes('raw-material')) categoriesParam = '5';
            }

            // Build URL with params
            const fetchUrl = new URL('http://localhost:5001/api/brands');
            fetchUrl.searchParams.append('limit', '1000');
            if (categoriesParam) {
                fetchUrl.searchParams.append('categories', categoriesParam);
            }
            fetchUrl.searchParams.append('_cb', Date.now());

            const res = await fetch(fetchUrl.toString());
            if (res.ok) {
                const data = await res.json();
                const brands = data.data || [];
                
                if (brands.length > 0) {
                    brandList.innerHTML = brands.map(b => `
                        <label class="filter-item">
                            <input type="checkbox" value="${b.id}"> 
                            <span>${b.name || b.company_name}</span>
                        </label>
                    `).join('');

                    // Add brand search logic
                    const searchInput = document.getElementById('brand-search-input');
                    if (searchInput) {
                        searchInput.oninput = function() {
                            const val = this.value.toLowerCase();
                            const items = brandList.querySelectorAll('.filter-item');
                            items.forEach(item => {
                                const text = item.textContent.toLowerCase();
                                item.style.display = text.includes(val) ? 'flex' : 'none';
                            });
                        };
                    }
                } else {
                    brandList.innerHTML = '<li style="color:#64748b; font-size:0.9rem; padding:10px;">No brands found for selected category</li>';
                }
            }
        } catch (err) {
            console.error("Failed to fetch brands:", err);
            brandList.innerHTML = '<li style="color:red; font-size:0.8rem; padding:10px;">Error loading brands</li>';
        }
    }

    // Run on load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initFilterDrawer);
    } else {
        initFilterDrawer();
    }
})();
