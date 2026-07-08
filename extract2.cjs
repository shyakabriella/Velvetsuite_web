const fs = require('fs');
const html = fs.readFileSync('about.html', 'utf8');
const sections = html.split(/<section|<div class="[^"]*elementor-section[^"]*"/gi);
for (let i = 6; i < Math.min(12, sections.length); i++) {
    console.log(`\n\n--- SECTION ${i} ---`);
    // Print first 800 chars of HTML for the section
    console.log(sections[i].substring(0, 1500));
}
