async function login() {
  let username = document.getElementById("username_karbar");
  let password = document.getElementById("password_karbar");
  let input_data = { email: username.value, password: password.value };
  let result = await GetData("/loginMain", input_data);
  if (result) {
    if (result.usernameValid === true && result.passwordValide === true) {
      window.location.href = "/";
    } else if (result.usernameValid === false) {
      alert("این ایمیل در سامانه وجود ندارد");
    } else if (result.passwordValide === false) {
      alert("رمز عبور وارد شده صحیح نمی باشد");
    }
  }
}

async function signup() {
  let username = document.getElementById("username_karbar_signup");
  let password = document.getElementById("password_karbar_signup");
  let input_data = { email: username.value, password: password.value };
  let result = await GetData("/singUp", input_data);
  if (result) {
    if (result.errCode) alert("این ایمیل در سامانه وجود از قبل وجود دارد");
    else if (result.usernameValid === true && result.passwordValide === true) {
      window.location.href = "/userInfo";
    } else if (result.usernameValid === false) {
      alert("این ایمیل در سامانه وجود ندارد");
    } else if (result.passwordValide === false) {
      alert("رمز عبور وارد شده صحیح نمی باشد");
    }
  }
  console.log(result);
}
