async function addCostomer(type = "Insert", ID = 0) {
  let nameKharidar = document.getElementById("nameKharidar");
  let eghtesadiKharidar = document.getElementById("eghtesadiKharidar");
  let sabtKharidar = document.getElementById("sabtKharidar");
  let ostanKharidar = document.getElementById("ostanKharidar");
  let sharestanKharidar = document.getElementById("sharestanKharidar");
  let shahrKharidar = document.getElementById("shahrKharidar");
  let postiKharidar = document.getElementById("postiKharidar");
  let idKharidar = document.getElementById("idKharidar");
  let telfonKharidar = document.getElementById("telfonKharidar");
  let neshaniKharidar = document.getElementById("neshaniKharidar");

  let input_data = {
    BuyerID: idKharidar.value,
    BuyerName: nameKharidar.value,
    BuyerEconomicNumber: eghtesadiKharidar.value,
    BuyerRegistrationNumber: sabtKharidar.value,
    BuyerPhone: telfonKharidar.value,
    BuyerZipCode: postiKharidar.value,
    BuyerProvince: ostanKharidar.value,
    BuyerState: sharestanKharidar.value,
    BuyerCity: shahrKharidar.value,
    BuyerAddress: neshaniKharidar.value,
  };

  if (type == "GetDataUpdate") {
    let inputdata2 = {
      BuyerID: ID,
    };
    let result = await GetData("/CustomersData", inputdata2);
    if (result && result[0]) {
      idKharidar.value = result[0].BuyerID;
      idKharidar.disabled = true;
      nameKharidar.value = result[0].BuyerName;
      eghtesadiKharidar.value = result[0].BuyerEconomicNumber;
      sabtKharidar.value = result[0].BuyerRegistrationNumber;
      telfonKharidar.value = result[0].BuyerPhone;
      postiKharidar.value = result[0].BuyerZipCode;
      ostanKharidar.value = result[0].BuyerProvince;
      sharestanKharidar.value = result[0].BuyerState;
      shahrKharidar.value = result[0].BuyerCity;
      neshaniKharidar.value = result[0].BuyerAddress;
      document
        .getElementById("save")
        .setAttribute("onclick", 'addCostomer("Update")');
    } else {
      alert("این ایدی یافت نشد");
    }
  } else {
    let update = false;
    let url = "/addCostomer";
    if (type == "Update") {
      update = true;
      url = "/UpdateCostomer";
    }
    if (validation_addCostomer(input_data)) {
      let result = await insertData(url, input_data, update);
      if (result === true) {
        window.location.href = "/customers";
      }
    }
  }
}

function validation_addCostomer(input_data) {
  if (input_data.BuyerID == "" || input_data.BuyerID <= 0) {
    alert("شناسه ملی خریدار را وارد کنید");
    return false;
  } else if (
    input_data.BuyerEconomicNumber == "" ||
    input_data.BuyerEconomicNumber <= 0
  ) {
    alert(" شماره اقتصادی خریدار را وارد کنید");
    return false;
  } else if (
    input_data.BuyerRegistrationNumber == "" ||
    input_data.BuyerRegistrationNumber <= 0
  ) {
    alert("شماره ثبت خریدار را وارد کنید");
    return false;
  } else if (
    input_data.BuyerZipCode == "" ||
    input_data.BuyerZipCode <= 0 ||
    input_data.BuyerZipCode.length != 10
  ) {
    alert("کد پستی خریدار را به شکل صحیح وارد کنید");
    return false;
  }
  return true;
}

SearchforID();
async function SearchforID() {
  let params = new URLSearchParams(window.location.search);
  let id = params.get("Id");
  if (!isNaN(id) && id) {
    await addCostomer("GetDataUpdate", id);
  }
}
