function traverseDom(element, cb) {
  //cb(element)
  let elem = element.firstElementChild;
  while (elem) {
    traverseDom(elem, cb);
    elem = elem.nextElementSibling;
  }
}