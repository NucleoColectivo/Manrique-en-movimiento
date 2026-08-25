import https from 'https';

const images = [
  "https://images.unsplash.com/photo-1544257121-667793d9a11a",
  "https://images.unsplash.com/photo-1620060935510-b98a13511eb4",
  "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb",
  "https://images.unsplash.com/photo-1497633762265-9d179a990aa6",
  "https://images.unsplash.com/photo-1473186578172-c141e6798cf4",
  "https://images.unsplash.com/photo-1550745165-9bc0b252726f"
];

images.forEach(img => {
  https.get(img, (res) => {
    console.log(img, res.statusCode);
  }).on('error', (e) => {
    console.error(e);
  });
});
