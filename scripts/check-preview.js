async function check() {
  const urls = [
    'http://localhost:4173/',
    'http://localhost:4173/studio',
    'http://localhost:4173/arena',
    'http://localhost:4173/arena/results',
    'http://localhost:4173/learn'
  ];
  for (const url of urls) {
    try {
      const res = await fetch(url);
      console.log(`${url} -> Status ${res.status} (${res.headers.get('content-type')})`);
    } catch (err) {
      console.error(`${url} -> Error: ${err.message}`);
    }
  }
}
check();
