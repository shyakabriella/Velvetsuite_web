const fs = require('fs');
const html = fs.readFileSync('about.html', 'utf8');
const sections = html.split(/<section|<div class="[^"]*elementor-section[^"]*"/gi);
for (let i = 0; i < Math.min(10, sections.length); i++) {
    console.log(`\n\n--- SECTION ${i} ---`);
    console.log(sections[i].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').substring(0, 1000));
}
