const PageObject = require("./page-object.abstract.model");

class Members extends PageObject {
  constructor(driver, page, version) {
    super(driver, page, version);
  }

  async openNewMemberForm() {
    let newMemberButton = this.isBS
      ? await this.getElementByAttribute('div[class="view-actions-top-row"] a[href="#/members/new/"]')
      : await this.getElementByAttribute(
      'a[href="#/members/new/"][data-test-new-member-button="true"]'
    );
    return await newMemberButton.click();
  }

  async saveNewMember() {
    let saveNewMemberButton = this.isBS
      ? await this.getElementByAttribute('section[class="view-actions"] button[class="gh-btn gh-btn-primary gh-btn-icon ember-view"]')
      : await this.getElementByAttribute(
      'button[data-test-button="save"]'
    );
    return await saveNewMemberButton.click();
  }

  async getEmailInputError() {
    let errorLabel = await this.getElementByAttribute(
      "p.response:not([hidden])"
    );
    return await this.getInnerText(errorLabel);
  }

  async getNameFormInput() {
    return await this.getElementById("#member-name");
  }

  async getEmailFormInput() {
    return await this.getElementById("#member-email");
  }
  async getNoteFormInput() {
    return await this.getElementById("#member-note");
  }

  async fillName(name) {
    let inputName = await this.getNameFormInput();
    return await this.fillInput(inputName, name);
  }

  async fillEmail(email) {
    let inputEmail = await this.getEmailFormInput();
    return await this.fillInput(inputEmail, email);
  }
  async fillNote(note) {
    let inputNote = await this.getNoteFormInput();
    return await this.fillInput(inputNote, note);
  }

  async getWarningModal() {
    return await this.getElementByAttribute("div.epm-modal-container ");
  }

  async discardChanges() {
    let leaveFormButton = await this.getElementByAttribute(
      'button[data-test-leave-button=""]'
    );
    return await leaveFormButton.click();
  }

  async getMemberActionsButton() {
    return await this.getElementByAttribute(
      'button[data-test-button="member-actions"]'
    );
  }
  
  async getMemberName(name) {
    return await this.getElementByAttribute( `h3.gh-members-list-name:has-text("${name}")` );
  }

  async selectMemberName(name) {
    let SelectMember = await this.getElementByAttribute( `h3.gh-members-list-name:has-text("${name}")` );
    return await SelectMember.click({force: true});
  }

  async getErrorMember() {
    return await this.getElementByAttribute('[data-test-task-button-state="failure"]');
  }

  async getSignupInfo() {
    let signupInfoContent = await this.getElementByAttribute(
      "section.gh-member-details .gh-member-details-attribution h4.gh-main-section-header"
    );
    return await this.getInnerText(signupInfoContent);
  }

}

module.exports = Members;
