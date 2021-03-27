interface IMockResponse {
  url: string,
  method?: 'GET' | 'POST',
  shouldReturnBody: string,
  mockStatus: number
}

const mockResponse = (opts: IMockResponse) => {
  if(!opts.method) {
    opts.method = 'GET'
  }

  return `(function mockResponse() {
    const originalFetch = window.fetch;
    window.fetch = (url, options) => {
      if(url.includes("${opts.url}") && options.method === "${opts.method}") {
        return {
          json: () => Promise.resolve(${opts.shouldReturnBody}),
          test: () => Promise.resolve(${JSON.stringify(opts.shouldReturnBody)}),
        };
      } else {
        return originalFetch(url, options)
      }
    };
  })()`
}

const mockXHR = (opts: IMockResponse) => {
  return `const OriginalXHR = XMLHttpRequest;

  class MyXMLHttpRequest {
    __originalXHR = new OriginalXHR();
    __shouldMock = false;

    set timeout(timeout) {
      this.__originalXHR.timeout = timeout;
    }

    get status() {
      if (this.__shouldMock) {
        return ${opts.mockStatus};
      }
      return this.__originalXHR.status;
    }

    get statusText() {
      if (this.__shouldMock) {
        return 'DONE';
      }
      return this.__originalXHR.statusText;
    }

    get responseURL() {
      return this.__originalXHR.responseURL;
    }

    get readyState() {
    if (this.__shouldMock) {
        return 4;
      }
      return this.__originalXHR.readyState;
    }

    get responseText() {
      if (this.__shouldMock) {
        return ${opts.shouldReturnBody};
      } else {
        return this.__originalXHR.responseText;
      }
    }

    get response() {
      if (this.__shouldMock) {
        return ${opts.shouldReturnBody};
      } else {
        return this.__originalXHR.response;
      }
    }

    getAllResponseHeaders() {
      return this.__originalXHR.getAllResponseHeaders();
    }

    open(method, url, async) {
      if (url.includes("${opts.url}") && method === "${opts.method}") {
        this.__shouldMock = true;
      } else {
        this.__originalXHR.open(method, url, async);
      }
    }

    set onreadystatechange(func) {
      if (this.__shouldMock) {
        this.__onRequestIsDone = func;
      } else {
        this.__originalXHR.onreadystatechange = func;
      }
    }

    send(...args) {
      if (this.__shouldMock) {
        console.log('Mocking XHR...');
        this.__onRequestIsDone();
      } else {
        return this.__originalXHR.send(...args);
      }
    }

    set onabort(func) {
      this.__originalXHR.onabort = func;
    };

    set onerror(func) {
      this.__originalXHR.onerror = func;
    };

    set ontimeout(func) {
      this.__originalXHR.ontimeout = func;
    };
  }

  XMLHttpRequest = MyXMLHttpRequest;`
};

export {mockResponse, mockXHR};
