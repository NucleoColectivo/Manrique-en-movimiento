import https from 'https';

const images = [
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30",
  "https://images.unsplash.com/photo-1518281361980-b26bfd556770",
  "https://images.unsplash.com/photo-1563293780-e8f3ee824c9c",
  "https://images.unsplash.com/photo-1533158307587-828f0a76ef46"
];

images.forEach(img => {
  https.get(img, (res) => {
    console.log(img, res.statusCode);
  }).on('error', (e) => {
    console.error(e);
  });
});
