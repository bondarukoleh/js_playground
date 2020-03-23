function easyAbortXMLHttpRequest() {
  const xhr = new XMLHttpRequest();
  const method = 'GET';
  const url = 'https://slowmo.glitch.me/5000';
  xhr.open(method, url, true);

  xhr.addEventListener('load', (r) => {
    console.log('Got response!');
  });

  setTimeout(() => {
    console.log('Aborting XMLHttpRequest request...');
    xhr.abort();
  }, 2000);
  xhr.send();
}

// easyAbortXMLHttpRequest();

function abortFetch() {
  const controller = new AbortController();
  const signal = controller.signal;

  fetch('https://slowmo.glitch.me/5000', {signal})
    .then(r => r.json())
    .then(response => {
      console.log('Got response!');
      console.log(response);
    })
    .catch(err => {
      if (err.name === 'AbortError') {
        console.log('Fetch request was aborted.');
      } else {
        console.error('Request failed!', err);
      }
    });


  setTimeout(() => {
    console.log('Aborting fetch request...');
    controller.abort();
  }, 2000);
}

abortFetch();