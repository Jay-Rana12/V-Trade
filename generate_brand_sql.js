const fs = require('fs');
const path = require('path');

const sqlFile = path.join(__dirname, 'admin/u728463759_Vitrade.sql');
const outputFile = path.join(__dirname, 'admin/brand.sql');
const brandLogoMap = require('./admin/src/brandLogoMap.json');

// Replicate the exact getLocalLogo logic
const getLocalLogo = (name) => {
    if (!name) return '';
    const n = name.toLowerCase();
    
    if (n.includes('tuv')) return 'brand_logo/tuv.svg';
    if (n.includes('shri') && n.includes('sam')) return 'brand_logo/shriandsam.png';
    if (n.includes('jodhana')) return 'brand_logo/Jodhanasteel.png';
    if (n.includes('vaya')) return 'brand_logo/vaya.png';
    if (n.includes('max') && n.includes('fresh')) return 'brand_logo/maxfreshlogo.webp';
    if (n.includes('bhalaria')) return 'brand_logo/bhalarialogo.webp';
    if (n.includes('garuda')) return 'brand_logo/garudalogo.png';
    
    const sanitized = n.replace(/[^a-z0-9]/g, '');
    if (brandLogoMap[sanitized]) return brandLogoMap[sanitized].replace(/^\//, ''); // Remove leading slash
    
    const firstWord = n.split(/[\s,.-]+/)[0];
    if (firstWord && firstWord.length > 2) {
        for (const key of Object.keys(brandLogoMap)) {
            if (key.startsWith(firstWord) || sanitized.startsWith(key) || key.startsWith(sanitized)) {
                return brandLogoMap[key].replace(/^\//, '');
            }
        }
    }
    return ''; // Return empty string if no match
};

let content = fs.readFileSync(sqlFile, 'utf8');

// Find all INSERT statements for app_brands
const regex = /INSERT INTO `app_brands`[^;]+;/g;
const inserts = content.match(regex);

if (!inserts) {
    console.error('Could not find any INSERT INTO `app_brands`');
    process.exit(1);
}

let processedLines = [];
let matchedCount = 0;
let totalBrands = 0;

for (const insertBlock of inserts) {
    const lines = insertBlock.split('\n');
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        
        // Check if this line is a data row like "(1, 'Name', ..."
        const rowMatch = line.match(/^\s*\(\d+,\s*'([^']+)'/);
        if (rowMatch) {
            totalBrands++;
            const brandName = rowMatch[1];
            const newLogoPath = getLocalLogo(brandName);
            
            line = line.replace(/'assets\/uploads\/brand_[^']+'/, newLogoPath ? `'${newLogoPath}'` : "''");
            if (newLogoPath) matchedCount++;
        }
        processedLines.push(line);
    }
    processedLines.push(''); // Add a blank line between inserts
}

// Create the final SQL
const header = `-- Extracted and Path-Updated brand.sql\n-- Total Brands Found: ${totalBrands}\n-- Total Brands Mapped to Local Logos: ${matchedCount}\n\nDROP TABLE IF EXISTS \`app_brands\`;\nCREATE TABLE \`app_brands\` (\n  \`id\` int(11) NOT NULL AUTO_INCREMENT,\n  \`name\` varchar(255) NOT NULL,\n  \`email\` varchar(255) DEFAULT NULL,\n  \`phone\` varchar(50) DEFAULT NULL,\n  \`whatsapp\` varchar(50) DEFAULT NULL,\n  \`gst\` varchar(50) DEFAULT NULL,\n  \`website\` varchar(255) DEFAULT NULL,\n  \`logo\` varchar(255) DEFAULT NULL,\n  \`address\` text DEFAULT NULL,\n  \`about\` text DEFAULT NULL,\n  \`fb\` varchar(255) DEFAULT NULL,\n  \`insta\` varchar(255) DEFAULT NULL,\n  \`twitter\` varchar(255) DEFAULT NULL,\n  \`linkedin\` varchar(255) DEFAULT NULL,\n  \`created_at\` timestamp DEFAULT current_timestamp(),\n  PRIMARY KEY (\`id\`)\n) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;\n\n`;

const finalSql = header + processedLines.join('\n');

fs.writeFileSync(outputFile, finalSql, 'utf8');
console.log(`Successfully created brand.sql with updated paths!`);
console.log(`Total Brands Processed: ${totalBrands}`);
console.log(`Matched logos for ${matchedCount} brands.`);
