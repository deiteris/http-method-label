import { fixture, assert, nextFrame } from '@open-wc/testing';
import * as sinon from 'sinon';
import '../http-method-label.js';

/* eslint-disable no-plusplus */

describe('<http-method-label>', () => {
  function listTargets(first) {
    const elements = [first];
    let target = first;
    const val = true;
    while (val) {
      const next = target && target.nextElementSibling;
      if (next) {
        elements.push(next);
        target = next;
      } else {
        break;
      }
    }
    return elements;
  }

  it('Has unique colors', async () => {
    const first = await fixture(`<http-method-label method="get"></http-method-label>
    <http-method-label method="POST"></http-method-label>
    <http-method-label method="Put"></http-method-label>
    <http-method-label method="delete"></http-method-label>
    <http-method-label method="patch"></http-method-label>
    <http-method-label method="test"></http-method-label>`);
    const elements = listTargets(first);
    const colors = [];
    for (let i = 0, len = elements.length; i < len; i++) {
      colors.push(getComputedStyle(elements[i]).color);
    }
    const filteredArray = elements.filter((item, pos) => {
      return elements.indexOf(item) === pos;
    });
    assert.equal(elements.length, filteredArray.length);
  });

  it('Has unique background colors', async () => {
    const first = await fixture(`<http-method-label method="get"></http-method-label>
    <http-method-label method="POST"></http-method-label>
    <http-method-label method="Put"></http-method-label>
    <http-method-label method="delete"></http-method-label>
    <http-method-label method="patch"></http-method-label>
    <http-method-label method="test"></http-method-label>`);
    const elements = listTargets(first);
    const colors = [];
    for (let i = 0, len = elements.length; i < len; i++) {
      colors.push(getComputedStyle(elements[i]).backgroundColor);
    }
    const filteredArray = elements.filter((item, pos) => {
      return elements.indexOf(item) === pos;
    });
    assert.equal(elements.length, filteredArray.length);
  });

  it('Sets title attribute on label change', async () => {
    const element = await fixture(
      `<http-method-label method="get"></http-method-label>`
    );
    assert.isTrue(element.hasAttribute('title'), 'Has title attribute');
    assert.equal(element.getAttribute('title'), 'get');
  });

  it('Removes title attribute', async () => {
    const element = await fixture(
      `<http-method-label method="get"></http-method-label>`
    );
    element.method = undefined;
    assert.isFalse(element.hasAttribute('title'));
  });

  it('Sets arial-label attribute on label change', async () => {
    const element = await fixture(
      `<http-method-label method="get"></http-method-label>`
    );
    assert.isTrue(
      element.hasAttribute('aria-label'),
      'Has arial-label attribute'
    );
    assert.equal(element.getAttribute('aria-label'), 'get');
  });

  it('Removes arial-label attribute', async () => {
    const element = await fixture(
      `<http-method-label method="get"></http-method-label>`
    );
    element.method = undefined;
    assert.isFalse(element.hasAttribute('aria-label'));
  });

  it('updates rendered label when method change', async () => {
    const element = await fixture(
      `<http-method-label method="get"></http-method-label>`
    );
    element.method = 'post';
    await nextFrame();
    await nextFrame();
    assert.include(element.shadowRoot.innerHTML.trim(), '</style>post');
  });

  it('ignores update when method value is the same', async () => {
    const element = await fixture(
      `<http-method-label method="get"></http-method-label>`
    );
    const spy = sinon.spy(element, '_updateAccessibility');
    element.method = 'get';
    assert.isFalse(spy.called);
  });

  it('can be initialized manually', () => {
    const element = document.createElement('http-method-label');
    element.method = 'get';
  });

  describe('AsyncAPI methods', () => {
    it('Has unique colors', async () => {
      const first = await fixture(`<http-method-label method="publish"></http-method-label>
      <http-method-label method="SUBSCRIBE"></http-method-label>`);
      const elements = listTargets(first);
      const colors = [];
      for (let i = 0, len = elements.length; i < len; i++) {
        colors.push(getComputedStyle(elements[i]).color);
      }
      const filteredArray = elements.filter((item, pos) => {
        return elements.indexOf(item) === pos;
      });
      assert.equal(elements.length, filteredArray.length);
    });

    it('Has unique background colors', async () => {
      const first = await fixture(`<http-method-label method="publish"></http-method-label>
      <http-method-label method="SUBSCRIBE"></http-method-label>`);
      const elements = listTargets(first);
      const colors = [];
      for (let i = 0, len = elements.length; i < len; i++) {
        colors.push(getComputedStyle(elements[i]).backgroundColor);
      }
      const filteredArray = elements.filter((item, pos) => {
        return elements.indexOf(item) === pos;
      });
      assert.equal(elements.length, filteredArray.length);
    });
  })
});
