import https from 'https';

const images = [
  "https://images.unsplash.com/photo-1519699047748-de8e457a634e",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c",
  "https://images.unsplash.com/photo-1516321497487-e288fb19713f",
  "https://images.unsplash.com/photo-1544928147-79a2dbc1f389",
  "https://images.unsplash.com/photo-1473186578172-c141e6798cf4"
];

images.forEach(img => {
  https.get(img, (res) => {
    console.log(img, res.statusCode);
  }).on('error', (e) => {
    console.error(e);
  });
});
