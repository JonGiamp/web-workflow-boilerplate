setTimeout(('click', () => {
  // Lazy Loading
  import('@js/log').then(({ default: log }) => {
    log('Salut');
  });
}), 10000);
