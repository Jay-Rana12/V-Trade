const http = require('http');

const profiles = [];

const types = ['Dealer', 'Retailer', 'Distributor'];
const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad'];

let idCounter = 9000;

types.forEach(type => {
    for (let i = 1; i <= 6; i++) {
        const city = cities[i % cities.length];
        profiles.push({
            id: (idCounter++).toString(),
            company_name: `${city} ${type}s Network ${i}`,
            owner_name: `Owner Name ${i}`,
            email_address: `contact${i}@${city.toLowerCase()}${type.toLowerCase()}s.com`,
            mobile_number: `+91 98${Math.floor(Math.random() * 100000000).toString().padStart(8, '0')}`,
            whatsapp_number: `+91 98${Math.floor(Math.random() * 100000000).toString().padStart(8, '0')}`,
            company_address: `${Math.floor(Math.random() * 100)}, Industrial Area, ${city}, India`,
            about_company: `Leading ${type} in ${city} region specializing in premium stainless steel and hotelware products. Providing bulk supply and B2B services.`,
            profile_type: type,
            status: 'active',
            website: `www.${city.toLowerCase()}${type.toLowerCase()}s.com`
        });
    }
});

const postData = JSON.stringify({ profiles });

const options = {
    hostname: 'localhost',
    port: 5001,
    path: '/api/profiles/bulk',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
    }
};

const req = http.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });
    res.on('end', () => {
        console.log('Response:', data);
    });
});

req.on('error', (e) => {
    console.error(`Problem with request: ${e.message}`);
});

req.write(postData);
req.end();
