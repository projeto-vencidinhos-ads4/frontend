class FormSubmit {
  constructor(settings) {
    this.settings = settings;
    this.form = document.querySelector(settings.form);
    this.formButton = document.querySelector(settings.btn-create);

    if(this.form) {
      this.url = this.form.getAttribute("action");//é o endpoint do form action="endpoint"-> submit ->> linha 
    }
  }

  //msg sucesso
  displaySuccess() {
    this.form.innerHTML = this.settings.success;
  }

  //msg erro
  displayError() {
    this.form.innerHTML = this.settings.success;
  }

  getFormObject() {
    const formObject = {};
    const fields = this.form.querySelector("[name]");

    fields.forEach((field) => {
      formObject[field.getAttribute("name")] = field.value;
    });

    return formObject;
  }

  async sendForm() {
    try {
      await fetch(this.url, {
        method: "POST",
        headers: {
          "Content-Type":"application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(tthis.getFormObject()),
      });
      this.displaySuccess();
    } catch (error) {
      this.displayError();
      throw new Error(error);
  }
}

  init() {
    if(this.form) this.formButton.addEventListener("click",
      () => this.displaySuccess()
    );
  }
}

const formSubmit = new FormSubmit({
  form: "[data-form]",
  button: "[data-button]",
  success: "<h1 class='success'>Produto cadastrado!</h1>",
  error: "<h1 class='error'>Não foi possível cadastrar o usuário.</h1>"
});
formSubmit.init();