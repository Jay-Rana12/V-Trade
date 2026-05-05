// fix_pages.js - run with: node fix_pages.js
const fs = require('fs');
const path = require('path');

const SCRIPT_BLOCK = `
    <!-- Modal Target -->
    <div id="product-modal-placeholder"></div>

    <!-- Scripts -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
    <script src="js/products_data.js"></script>
    <script src="js/main.js"></script>
    <script src="js/three-bg.js"></script>
    <script src="js/animations.js"></script>
    <script src="js/nav_animations.js"></script>
    <script src="js/modal_system.js"></script>
    <script src="js/sidebar_filter.js"></script>
</body>
</html>`;

const pages = [
  { file: 'kitchenware.html', cat: 'Kitchenware', header: 'Global <span class="text-gradient">Export</span> Collection', sub: 'Browse our curated range of world-class stainless steel kitchenware products.' },
  { file: 'horeca.html', cat: 'Horeca', header: 'Horeca <span class="text-gradient">Professional</span> Line', sub: 'Engineered for high-volume durability and sophisticated presentation.' },
  { file: 'houseware.html', cat: 'Houseware', header: 'Houseware <span class="text-gradient">Premium</span> Line', sub: 'Superior durability and elegant design for refined living spaces.' },
  { file: 'tubes-pipes.html', cat: 'Tubes & Pipes', header: 'Industrial <span class="text-gradient">Tubes & Pipes</span>', sub: 'Precision-engineered stainless steel tubes and pipes for global industrial needs.' },
  { file: 'raw-materials.html', cat: 'Raw Materials', header: 'Premium <span class="text-gradient">Raw Materials</span>', sub: 'High-grade SS coils, sheets, and billets sourced from certified manufacturers.' },
];

const GRID_PLACEHOLDER = `
            <!-- Dynamic Product Grid Placeholder -->
            <div class="ts-grid" id="main-product-grid">
                <div style="grid-column: 1 / -1; text-align: center; padding: 120px 20px; background: white; border-radius: 20px; border: 1px dashed #e2e8f0;">
                    <i class="fa-solid fa-sync fa-spin" style="font-size: 3.5rem; color: #2563eb; margin-bottom: 25px;"></i>
                    <h2 style="color: #0A2540; font-family: 'Poppins', sans-serif;">Synchronizing Global Database...</h2>
                    <p style="color: #64748b; font-size: 1.1rem; max-width: 500px; margin: 10px auto;">Connecting to IndiaTrade server to fetch the latest export-grade inventory.</p>
                </div>
            </div>

            <!-- Pagination Bar -->
            <div id="product-pagination-bar" class="pagination-container"></div>`;

pages.forEach(({ file }) => {
  const fp = path.join(__dirname, file);
  let html = fs.readFileSync(fp, 'utf8');

  // 1) Find the .ts-grid opening in the product section and replace everything inside the section's container with our placeholder
  // We'll find the section.section-padding that contains .ts-grid and replace from <div class="ts-grid"> to </section>
  // Strategy: find "<!-- Product Grid" comment and replace until </section>
  
  // Find product grid section start (look for .ts-grid anywhere)
  const tsGridMatch = html.match(/<div class="ts-grid"[\s\S]*?<\/section>/);
  if (tsGridMatch) {
    const sectionHeader = html.match(/<div class="section-header"[\s\S]*?<\/div>\s*<\/div>/);
    // Replace the ts-grid block and everything until closing section
    html = html.replace(/<div class="ts-grid"[\s\S]*?<\/section>/, 
      GRID_PLACEHOLDER + '\n        </div>\n    </section>');
  }

  // 2) Fix the script block at end - remove everything from first </body> onwards and replace with clean scripts
  const firstBodyClose = html.indexOf('</body>');
  if (firstBodyClose !== -1) {
    html = html.substring(0, firstBodyClose);
  }
  
  // Remove old script tags that may exist
  html = html.replace(/<script src="js\/main\.js[^"]*"><\/script>/g, '');
  html = html.replace(/<script src="js\/modal_system\.js[^"]*"><\/script>/g, '');
  html = html.replace(/<script src="js\/sidebar_filter\.js[^"]*"><\/script>/g, '');
  html = html.replace(/<script src="js\/three-bg\.js[^"]*"><\/script>/g, '');
  html = html.replace(/<script src="js\/animations\.js[^"]*"><\/script>/g, '');
  html = html.replace(/<script src="js\/nav_animations\.js[^"]*"><\/script>/g, '');
  html = html.replace(/<script src="js\/products_data\.js[^"]*"><\/script>/g, '');
  html = html.replace(/<script src="https:\/\/cdnjs[\s\S]*?><\/script>/g, '');

  // Remove old div modal remnants
  html = html.replace(/\s*<!-- Modal handled by[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>/g, '');
  html = html.replace(/<div id="product-modal-placeholder"><\/div>/g, '');
  html = html.replace(/<!-- Modal Target[\s\S]*?<\/div>/g, '');

  // Trim trailing whitespace/blank lines at end
  html = html.trimEnd();

  html += SCRIPT_BLOCK;

  fs.writeFileSync(fp, html, 'utf8');
  console.log(`✅ Fixed: ${file}`);
});

console.log('\n🚀 All category pages updated!');
