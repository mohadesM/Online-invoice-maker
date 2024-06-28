async function addUserInfo(type = "Insert", ID = 0) {
  let nameFroshande = document.getElementById("nameFroshande");
  let eghtesadiFroshande = document.getElementById("eghtesadiFroshande");
  let ostanFroshande = document.getElementById("ostanFroshande");
  let shahrestanFroshande = document.getElementById("shahrestanFroshande");
  let shahrFroshande = document.getElementById("shahrFroshande");
  let postiFroshande = document.getElementById("postiFroshande");
  let idFroshande = document.getElementById("idFroshande");
  let telfonFroshande = document.getElementById("telfonFroshande");
  let neshaniFroshande = document.getElementById("neshaniFroshande");

  let input_data = {
    SellerName: nameFroshande.value,
    SellerEconomicNumber: eghtesadiFroshande.value,
    SellerID: idFroshande.value,
    SellerZipCode: postiFroshande.value,
    SellerProvince: ostanFroshande.value,
    SellerState: shahrestanFroshande.value,
    SellerCity: shahrFroshande.value,
    SellerPhone: telfonFroshande.value,
    SellerAddress: neshaniFroshande.value,
  };

  if (type == "GetDataUpdate") {
    let inputdata2 = {
      BuyerID: ID,
    };
    let result = await GetData("/SellerData", inputdata2);
    if (result && result[0]) {
      nameFroshande.value = result[0].SellerName;
      eghtesadiFroshande.value = result[0].SellerEconomicNumber;
      idFroshande.value = result[0].SellerID;
      idFroshande.disabled = true;
      postiFroshande.value = result[0].SellerZipCode;
      ostanFroshande.value = result[0].SellerProvince;
      shahrestanFroshande.value = result[0].SellerState;
      shahrFroshande.value = result[0].SellerCity;
      telfonFroshande.value = result[0].SellerPhone;
      neshaniFroshande.value = result[0].SellerAddress;

      document
        .getElementById("save")
        .setAttribute("onclick", 'addUserInfo("Update")');
    } else {
      alert("این ایدی یافت نشد");
    }
  } else {
    let update = false;
    let url = "/addUserInfo";
    if (type == "Update") {
      update = true;
      url = "/UpdateUserInfo";
    }
    if (validation_addUserInfo(input_data)) {
      let result = await insertData(url, input_data, update);
      if (result === true) {
        window.location.href = "/";
      }
    }
  }
}

function validation_addUserInfo(input_data) {
  return true;
}

SearchforID();
async function SearchforID() {
  let params = new URLSearchParams(window.location.search);
  let id = params.get("Id");
  if (!isNaN(id) && id) {
    await addUserInfo("GetDataUpdate", id);
  }
}
