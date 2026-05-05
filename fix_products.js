const fs = require('fs');

const file = 'products.html';
let content = fs.readFileSync(file, 'utf8');

const target = `        header.page-header {
            background: linear-gradient(135deg, rgba(10, 37, 64, 0.88) 0%, rgba(10, 37, 64, 0.65) 100%);
        }

        .page-header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: url('images/kitchenware_steel.png') center/cover no-repeat;
            z-index: -2;
        }`;

const replace = `        .page-header {
            background: linear-gradient(135deg, rgba(10, 37, 64, 0.88) 0%, rgba(10, 37, 64, 0.65) 100%);
            height: 320px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            text-align: center;
        }

        .page-header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: url('images/kitchenware_steel.png') center/cover no-repeat;
            z-index: -2;
        }

        .page-header h1 {
            font-size: 5rem;
            font-family: 'Poppins', sans-serif;
            font-weight: 900;
            margin-bottom: 20px;
            color: #ffffff;
            letter-spacing: -3px;
            line-height: 1;
            text-transform: uppercase;
            text-shadow: 0 20px 50px rgba(0,0,0,0.4);
        }

        .page-header p {
            font-size: 1.3rem;
            max-width: 800px;
            margin: 0 auto;
            color: rgba(255,255,255,0.95);
            font-weight: 500;
            line-height: 1.6;
            background: rgba(255,255,255,0.1);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            padding: 12px 30px;
            border-radius: 100px;
            border: 1px solid rgba(255,255,255,0.2);
            display: inline-block;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }

        @media (max-width: 768px) {
            .page-header h1 { font-size: 3rem; letter-spacing: -1px; }
            .page-header p { font-size: 1.1rem; padding: 10px 20px; }
        }`;

// Replace ignoring line ending type
const normalizedContent = content.replace(/\r\n/g, '\n');
const normalizedTarget = target.replace(/\r\n/g, '\n');

if (normalizedContent.includes(normalizedTarget)) {
    content = normalizedContent.replace(normalizedTarget, replace.replace(/\r\n/g, '\n'));
    fs.writeFileSync(file, content);
    console.log("Success!");
} else {
    console.log("Target not found!");
}
