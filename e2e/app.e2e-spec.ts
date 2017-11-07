import { SurveyClientPage } from './app.po';

describe('survey-client App', () => {
  let page: SurveyClientPage;

  beforeEach(() => {
    page = new SurveyClientPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
