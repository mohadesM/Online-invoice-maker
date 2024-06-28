async function GetData(address, inputdata = null) {
  let data;
  if (inputdata != null) data = inputdata;
  else data = {};
  let result;
  await fetch(address, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Success:", data);
      if (data.errCode) {
        alert(`${data.errCode} - ` + data.errMsg);
        if ((data.errCode = 1000)) {
          window.location.href = `/login`;
        }
      } else {
        result = data;
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      //   alert("خطا");
    });
  return result;
}

async function insertData(address, inputdata = null, update = false) {
  let result = await GetData(address, inputdata);
  if (result) {
    if (result.errCode) {
      alert(`${result.errCode} - ` + result.errMsg);
    } else if (update === true && result.succ === true) {
      alert("با موفقیت اپدیت شد");
      return result.succ;
    } else if (result.succ === true) {
      alert("با موفقیت درج شد");
      return result.succ;
    }
  }
  return false;
}

async function deleteData(address, inputdata = null) {
  let result = await GetData(address, inputdata);
  if (result) {
    if (result.errCode) {
      alert(`${result.errCode} - ` + result.errMsg);
    } else if (result.succ === true) {
      alert("با موفقیت حذف شد");
      return result.succ;
    }
  }
  return false;
}

counter = 1;
async function fillTableForm(
  tabalBodyID,
  postAddress,
  namesJson,
  IdRemoveAndEdit,
  tableName = "Error",
  UpdateUrl = "Error"
) {
  let tableBody = document.getElementById(tabalBodyID);
  let dataArray = await GetData(postAddress);
  tableBody.innerHTML = "";
  if (dataArray.length > 0) {
    dataArray.forEach((item) => {
      let row = tableBody.insertRow();
      let radif = row.insertCell();

      namesJson.forEach((nameJson) => {
        let td = row.insertCell();
        td.textContent = item[nameJson];
      });

      let editFormtd = row.insertCell();
      let deleteFormtd = row.insertCell();
      let editForm = `<button class='btn btn-warning' onclick='editForm(${item[IdRemoveAndEdit]},"${UpdateUrl}")'>ویرایش</button>`;
      let deleteForm = `<button class='btn btn-danger' onclick='deleteForm(${item[IdRemoveAndEdit]},"${tableName}")'>حذف</button>`;

      // Populate the cells with data
      radif.textContent = counter;
      editFormtd.innerHTML = editForm;
      deleteFormtd.innerHTML = deleteForm;
      counter += 1;
    });
  }
}

async function deleteForm(tableIdforRemove, tableName) {
  if (confirm("برا حذف مطمئن هستید؟")) {
    let input_data = { tableName: tableName, tableId: tableIdforRemove };
    let result = await deleteData("/deleteOfTable", input_data);
    if (result === true) {
      window.location.reload();
    }
    console.log(tableIdforRemove, tableName);
  }
}

async function editForm(tableIdforEdit, UpdateUrl) {
  window.location.href = `${UpdateUrl}?Id=${tableIdforEdit}`;
}

userInfo();
let isLogin = false;
async function userInfo() {
  let result = await GetData("/getUserInfo");
  if (result.nameUser) {
    let login = document.getElementById("login");
    if (login) {
      login.innerHTML = `<i class="fa fa-user" aria-hidden="true"></i> ${result.nameUser}
      <ul class="dropdown-menu">
          <li><a class="dropdown-item" href="/userInfo?Id=${result.SellerID}">ویرایش مشخصات</a></li>
          <li><a class="dropdown-item" href="/logout">خروج از سامانه</a></li>
      </ul>`;
      isLogin = true;
    }
  }
}

var input_login = document.getElementById("login");
if (input_login) {
  input_login.addEventListener("click", function (event) {
    if (isLogin === false) {
      window.location.href = "/login";
    }
  });
}
