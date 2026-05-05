async function testApi() {
    try {
        const response = await fetch('http://localhost:5001/api/blogs?limit=100');
        const data = await response.json();
        console.log('API RESPONSE COUNT:', data.data.length);
        console.log('API DATA:', JSON.stringify(data.data.map(b => ({id: b.id, title: b.title})), null, 2));
    } catch (err) {
        console.error('API Error:', err);
    }
}
testApi();
