import { EmailSendApplicationFrontEndPage } from './app.po';

describe('email-send-application-front-end App', function() {
  let page: EmailSendApplicationFrontEndPage;

  beforeEach(() => {
    page = new EmailSendApplicationFrontEndPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
