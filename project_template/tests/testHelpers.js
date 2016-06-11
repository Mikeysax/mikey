import jsdomGlobal from 'jsdom-global';
import jsdom from 'jsdom';
import localStorage from 'localStorage';
import chai from 'chai';
import chaiImmutable from 'chai-immutable';
import chaiEnzyme from 'chai-enzyme';

const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
const win = doc.defaultView;
win.localStorage = localStorage
global.document = doc;
global.window = win;
jsdomGlobal()
propagateToGlobal(win)


function propagateToGlobal (window) {
  for (let key in window) {
    if (!window.hasOwnProperty(key)) continue
    if (key in global) continue

    global[key] = window[key]
  }
}

chai.use(chaiImmutable);
chai.use(chaiEnzyme());
