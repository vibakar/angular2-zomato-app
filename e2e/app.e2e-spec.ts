import { ZomatoAppPage } from './app.po';

describe('zomato-app App', () => {
  let page: ZomatoAppPage;

  beforeEach(() => {
    page = new ZomatoAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
