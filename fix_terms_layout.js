const fs = require('fs');
let content = fs.readFileSync('terms.html', 'utf8');

// 1. Make the page-header shorter so content shows faster
content = content.replace(
    'header.page-header {\n            background: linear-gradient(135deg, rgba(10, 37, 64, 0.92) 0%, rgba(10, 37, 64, 0.7) 100%);\n        }',
    'header.page-header {\n            background: linear-gradient(135deg, rgba(10, 37, 64, 0.92) 0%, rgba(10, 37, 64, 0.7) 100%);\n            min-height: 160px !important;\n            padding: 30px 0 !important;\n        }'
);

// 2. Simplify: remove the large dark intro card that pushes content down
// Replace it with a compact intro paragraph at the top of the content
const oldIntroCard = `            <!-- Intro Card -->
            <div style="background: linear-gradient(135deg, #0A2540, #1a3a5c); border-radius: 20px; padding: 40px 45px; margin-bottom: 60px; position: relative; overflow: hidden;">
                <div style="position: absolute; right: -40px; top: -40px; width: 250px; height: 250px; border-radius: 50%; background: rgba(242,107,67,0.08); pointer-events: none;"></div>
                <p style="color: #F26B43; font-weight: 700; font-size: 0.78rem; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 10px;">VIBRANT INDIA TRADE</p>
                <h2 style="color: #fff; font-size: 1.8rem; font-weight: 800; margin-bottom: 16px;">Vibrant India Trade Terms of Service</h2>
                <p style="color: #94a3b8; line-height: 1.8; font-size: 0.95rem; max-width: 800px; margin-bottom: 16px;">
                    Welcome to Vibrant India Trade — a premium online B2B inquiry-based model for the architectural &amp; interior products industry. This platform connects buyers and suppliers seamlessly.
                </p>
                <p style="color: #94a3b8; line-height: 1.8; font-size: 0.95rem; max-width: 800px; margin-bottom: 16px;">
                    This website (VIBRANT INDIA TRADE) is an online platform and a service provided by <strong style="color: #fff;">VIBRANT INDIA TRADE Private Limited</strong> — a company incorporated in Ahmedabad, Gujarat. The domain <strong style="color: #fff;">www.vibrantindiatrade.in</strong> is owned by VIBRANT INDIA TRADE, which reserves all copyright to the domain.
                </p>
                <p style="color: #94a3b8; line-height: 1.8; font-size: 0.95rem; max-width: 800px;">
                    Vibrant India Trade includes categories such as Manufacturers, OEM Companies, Importers, Exporters, Trading Companies, Dealers, Distributors, Showroom Owners, Builders, Architects, Interior Designers, and other entities belonging to the architectural and interior products industry.
                </p>
            </div>`;

const newIntroCard = `            <!-- Intro Summary -->
            <div style="background: #f0f9ff; border-left: 5px solid #F26B43; border-radius: 0 12px 12px 0; padding: 28px 32px; margin-bottom: 50px;">
                <h2 style="color: #0A2540; font-size: 1.5rem; font-weight: 800; margin-bottom: 14px;">Vibrant India Trade Terms of Service</h2>
                <p style="color: #475569; line-height: 1.8; font-size: 0.95rem; margin-bottom: 12px;">
                    Welcome to Vibrant India Trade — a premium online B2B inquiry-based model for the architectural &amp; interior products industry, connecting buyers and suppliers seamlessly.
                </p>
                <p style="color: #475569; line-height: 1.8; font-size: 0.95rem; margin-bottom: 12px;">
                    This website is provided by <strong style="color: #0A2540;">VIBRANT INDIA TRADE Private Limited</strong> (incorporated in Ahmedabad, Gujarat). The domain <strong style="color: #0A2540;">www.vibrantindiatrade.in</strong> is owned by VIBRANT INDIA TRADE, which reserves all copyright.
                </p>
                <p style="color: #475569; line-height: 1.8; font-size: 0.95rem; margin-bottom: 12px;">
                    Vibrant India Trade includes business categories of Manufacturers, OEM Companies, Importers, Exporters, Trading Companies, Dealers, Distributors, Showroom Owners, Builders, Architects, Interior Designers, and other entities belonging to the architectural and interior products industry.
                </p>
                <p style="color: #475569; line-height: 1.8; font-size: 0.95rem;">
                    Any individual or business entity under any of these categories can register on VIBRANT INDIA TRADE and utilize the services provided under these terms and conditions.
                </p>
            </div>`;

content = content.replace(oldIntroCard, newIntroCard);

fs.writeFileSync('terms.html', content);
console.log('terms.html updated - shorter header and compact intro.');
