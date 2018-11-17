import { BankfrontendPage } from './app.po';

describe('bankfrontend App', function() {
  let page: BankfrontendPage;

  beforeEach(() => {
    page = new BankfrontendPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
