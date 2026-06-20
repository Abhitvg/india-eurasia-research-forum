const fs = require('fs');

// Read the JSON file
const contentPath = './src/data/content.json';
const content = JSON.parse(fs.readFileSync(contentPath, 'utf8'));

// 1. Add the 5th article if it doesn't exist
const fifthArticle = {
  id: 'special-research-note-gupta',
  title: 'Special Research Note: Eurasian Stability',
  type: 'Working Papers',
  date: 'December 2025',
  author: 'Dr. Pravesh Kumar Gupta',
  description: 'A comprehensive working paper assessing the economic achievements and integration challenges of the EAEU over the past decade.',
  image: '/images/publications/StockImage_SpecialResearchNote.jpeg',
  content: `
    <p>Drawing inspiration from the deep historical linkages and intellectual traditions that have connected societies across the Eurasian landmass, this research note explores the civilisational, cultural and intellectual linkages between India and the wider Eurasian region.</p>
    
    <h3 class="text-lg font-bold text-[#1B3B5F] mt-8 mb-4">A Multidimensional Approach</h3>
    <p>Eurasia is becoming one of the most consequential geopolitical spaces of the twenty-first century. At IERF, we aim to foster a deeper understanding of the region’s evolving dynamics from a distinctly Indian perspective. Our long-term vision is to become a leading India-origin academic platform that promotes research and publications on all aspects of Eurasian political, economic, and socio-cultural developments.</p>
    
    <p>The Volga to Ganga Dialogues is our flagship platform dedicated to these explorations. It brings together scholars, diplomats, artists and practitioners to engage in reflective conversations that transcend geopolitics, fostering mutual understanding and people-to-people connections.</p>
  `,
  authorImage: '/images/publications/rashtrapati-bhawan.webp'
};

if (!content.publications.find(p => p.id === 'special-research-note-gupta')) {
  content.publications.push(fifthArticle);
}

// 2. Change link colors from text-[#E87722] to text-black
content.publications.forEach(pub => {
  if (pub.content) {
    // Replace class="text-[#E87722] hover:underline font-bold" with class="text-black hover:underline font-bold"
    pub.content = pub.content.replace(/class="text-\[#E87722\] hover:underline font-bold"/g, 'class="text-black hover:underline font-bold"');
    pub.content = pub.content.replace(/class="text-\[#E87722\]/g, 'class="text-black');
  }
});

fs.writeFileSync(contentPath, JSON.stringify(content, null, 2));
console.log('Updated content.json');
