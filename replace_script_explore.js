const fs = require('fs');
const file = 'blog.html';
let content = fs.readFileSync(file, 'utf8');

// The replacement logic:
let counter = 1;
content = content.replace(/<a href="#" class="kw-view-btn">Explore <i class="fa-solid fa-arrow-right"><\/i><\/a>/g, (match) => {
    let newStr = `<a href="javascript:void(0)" class="kw-view-btn" onclick="openModal('p${counter}')">Explore <i class="fa-solid fa-arrow-right"></i></a>`;
    counter++;
    return newStr;
});

fs.writeFileSync(file, content);
console.log('Replaced ' + (counter - 1) + ' Explore buttons.');
