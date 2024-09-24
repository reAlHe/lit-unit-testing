import { html, fixture, expect, elementUpdated } from '@open-wc/testing';
import sinon from 'sinon';
import '../src/SimpleGreeting.js';

describe('SimpleGreeting', () => {
  it('should render correct initial content', async () => {
    const el = await fixture(html`<simple-greeting></simple-greeting>`);
    const p = el.shadowRoot.querySelector('p');
    expect(p).to.exist;
    expect(p.textContent).to.equal('Hello, Somebody!');
    const input = el.shadowRoot.querySelector('input');
    expect(input).to.exist;
    expect(input.value).to.equal('Somebody');
    expect(input.disabled).to.be.true;
  });

  it('should update isEditable property when refresh button is clicked', async () => {
    const el = await fixture(html`<simple-greeting></simple-greeting>`);
    const stub = sinon.stub(window, 'fetch');
    stub.resolves({
      ok: true,
      json: async () => ({ isEditable: true }),
    });

    const button = el.shadowRoot.querySelector('button');
    const input = el.shadowRoot.querySelector('input');

    await button.click();

    await el.updateComplete;
    await elementUpdated(input);

    expect(el.isEditable).to.be.true;

    expect(input).to.exist;
    expect(input.value).to.equal('Somebody');
    expect(input.disabled).to.be.false;

    stub.restore();
  });

   it('should display updated value in title when field is edited', async () => {
     const el = await fixture(html`<simple-greeting></simple-greeting>`);
     const stub = sinon.stub(window, 'fetch');
     stub.resolves({
       ok: true,
       json: async () => ({ isEditable: true }),
     });

     const button = el.shadowRoot.querySelector('button');
     const input = el.shadowRoot.querySelector('input');
     const greeting = el.shadowRoot.querySelector('p');

     await button.click();

     await el.updateComplete;
     await elementUpdated(input);

     sendKeys(input, 'Alexander')

     await greeting.updateComplete;
     await elementUpdated(greeting);

     expect(greeting.textContent).to.equal('Hello, Alexander!');

     stub.restore();
   });

   function sendKeys(inputElement, value) {
     inputElement.value = value;
     inputElement.dispatchEvent(new Event('input'));
   }
});
