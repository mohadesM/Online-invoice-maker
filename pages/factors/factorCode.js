let counter = 1;
let ItemsProductsjsonArr = [];
let factorDataJson = {
  AllTotalAmount: 0,
  AllAmountOfDiscount: 0,
  AllTotalAmountAfterDiscount: 0,
  AllTaxesAndDuties: 0,
  AllSumOfTotalAmount: 0,
};
var input_idKharidar = document.getElementById("idKharidar");
if (input_idKharidar) {
  input_idKharidar.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      fillBuyer(input_idKharidar.value);
    }
  });
  input_idKharidar.addEventListener("change", function (event) {
    fillBuyer(0, true);
  });
  // input_idKharidar.addEventListener("blur", function () {
  //   fillBuyer(input_idKharidar.value);
  // });
}
var input_idFroshande = document.getElementById("idFroshande");
if (input_idFroshande) {
  input_idFroshande.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      fillSeller(input_idFroshande.value);
    }
  });
  input_idFroshande.addEventListener("change", function (event) {
    fillSeller(0, true);
  });
  // input_idFroshande.addEventListener("blur", function () {
  //   fillSeller(input_idFroshande.value);
  // });
}
var input_IdKala = document.getElementById("IdKala");
if (input_IdKala) {
  input_IdKala.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      fillProductItem(input_IdKala.value);
    }
  });
  input_IdKala.addEventListener("change", function (event) {
    fillProductItem(0, true);
  });
  // input_IdKala.addEventListener("blur", function () {
  //   fillProductItem(input_IdKala.value);
  // });
}
function addItem() {
  let sharhKala = document.getElementById("sharhKala");
  let IdKala = document.getElementById("IdKala");
  let tedadKala = document.getElementById("tedadKala");
  let vahedKala = document.getElementById("vahedKala");
  let mablaghvahed = document.getElementById("mablaghvahed");
  let takhfif = document.getElementById("takhfif");
  let maliat = document.getElementById("maliat");
  let mablaghKol = Number(tedadKala.value) * Number(mablaghvahed.value);
  let mablaghKol_takhfif = mablaghKol - Number(takhfif.value);
  let mablaghKol_maliat = mablaghKol_takhfif + Number(maliat.value);

  let invoiceItems = document.getElementById("invoice-items");

  let objItem = {
    ProductID: Number(IdKala.value),
    ProductDes: sharhKala.value,
    ProductNumber: Number(tedadKala.value),
    ProductUnit: vahedKala.value,
    ProductUnitAmount: Number(mablaghvahed.value),
    ProductTotalAmount: mablaghKol,
    ProductAmountOfDiscount: Number(takhfif.value),
    ProductTotalAmountAfterDiscount: mablaghKol_takhfif,
    ProductTaxesAndDuties: Number(maliat.value),
    ProductSumOfTotalAmount: mablaghKol_maliat,
  };
  if (validation_addProductItem(objItem)) {
    ItemsProductsjsonArr.push(objItem);
    let dataArray = Object.values(objItem);

    let row = invoiceItems.insertRow();
    row.insertCell().innerHTML = `<input type="checkbox" name="removeItem"  value="${counter}"> ${counter}`;
    dataArray.forEach((item) => {
      let col = row.insertCell();
      col.textContent = item;
    });

    fillProductItem(0, true);
    IdKala.value = "";
    counter += 1;

    Calculation_totalAmounts(ItemsProductsjsonArr);
  }
}

function removeItem() {
  let inputs = document.querySelectorAll('input[name="removeItem"]:checked');
  let indexArr = Array.from(inputs).map((input) => Number(input.value) - 1);
  let data = [];
  ItemsProductsjsonArr.forEach((element, index) => {
    if (!indexArr.includes(index)) {
      data.push(element);
    }
  });
  ItemsProductsjsonArr = data;
  fillProductTable(ItemsProductsjsonArr);
}

function fillProductTable(jsonArr) {
  ItemsProductsjsonArr = [];
  let invoiceItems = document.getElementById("invoice-items");
  invoiceItems.innerHTML = "";
  counter = 1;
  jsonArr.forEach((item) => {
    if (item.FactorSerialNumber) {
      delete item.FactorSerialNumber;
    }
    ItemsProductsjsonArr.push(item);
    let row = invoiceItems.insertRow();
    if (window.location.href.indexOf("/printFactor") > 0) {
      row.insertCell().textContent = counter;
    } else {
      row.insertCell().innerHTML = `<input type="checkbox" name="removeItem"  value="${counter}"> ${counter}`;
    }
    row.insertCell().textContent = item.ProductID;
    row.insertCell().textContent = item.ProductDes;
    row.insertCell().textContent = item.ProductNumber;
    row.insertCell().textContent = item.ProductUnit;
    row.insertCell().textContent = item.ProductUnitAmount;
    row.insertCell().textContent = item.ProductTotalAmount;
    row.insertCell().textContent = item.ProductAmountOfDiscount;
    row.insertCell().textContent = item.ProductTotalAmountAfterDiscount;
    row.insertCell().textContent = item.ProductTaxesAndDuties;
    row.insertCell().textContent = item.ProductSumOfTotalAmount;
    counter += 1;
  });
  Calculation_totalAmounts(jsonArr);
}

function Calculation_totalAmounts(jsonArr) {
  let AllTotalAmount = jsonArr.reduce(
    (total, item) => total + Number(item.ProductTotalAmount),
    0
  );
  let AllAmountOfDiscount = jsonArr.reduce(
    (total, item) => total + Number(item.ProductAmountOfDiscount),
    0
  );
  let AllTotalAmountAfterDiscount = jsonArr.reduce(
    (total, item) => total + Number(item.ProductTotalAmountAfterDiscount),
    0
  );
  let AllTaxesAndDuties = jsonArr.reduce(
    (total, item) => total + Number(item.ProductTaxesAndDuties),
    0
  );
  let AllSumOfTotalAmount = jsonArr.reduce(
    (total, item) => total + Number(item.ProductSumOfTotalAmount),
    0
  );
  factorDataJson.AllTotalAmount = AllTotalAmount;
  factorDataJson.AllAmountOfDiscount = AllAmountOfDiscount;
  factorDataJson.AllTotalAmountAfterDiscount = AllTotalAmountAfterDiscount;
  factorDataJson.AllTaxesAndDuties = AllTaxesAndDuties;
  factorDataJson.AllSumOfTotalAmount = AllSumOfTotalAmount;

  document.getElementById("totalmablaghkol").textContent = AllTotalAmount;
  document.getElementById("totaltakhfif").textContent = AllAmountOfDiscount;
  document.getElementById("totalmablaghkolbatakhfif").textContent =
    AllTotalAmountAfterDiscount;
  document.getElementById("totalmaliat").textContent = AllTaxesAndDuties;
  document.getElementById("totalmablaghkolBaMaliat").textContent =
    AllSumOfTotalAmount;
}

function validation_addProductItem(input_data) {
  if (input_data.ProductID === "" || input_data.ProductID <= 0) {
    alert("کد کالا باید مقدار داشته باشد");
    return false;
  } else if (input_data.ProductNumber === "" || input_data.ProductNumber <= 0) {
    alert("تعداد کالا باید مقدار داشته باشد");
    return false;
  } else if (
    input_data.ProductUnitAmount === "" ||
    input_data.ProductUnitAmount <= 0
  ) {
    alert("مبلغ واحد باید مقدار داشته باشد");
    return false;
  } else if (Number(input_data.ProductAmountOfDiscount) < 0) {
    alert("تخفیف  باید عدد مثبت باشد");
    return false;
  } else if (Number(input_data.ProductTaxesAndDuties) < 0) {
    alert("مالیات و عوارض  باید عدد مثبت باشد");
    return false;
  }
  return true;
}

async function addFactor(type = "Insert", ID = 0, print = false) {
  let typeTag = "value";
  if (window.location.href.indexOf("/printFactor") > 0) {
    typeTag = "innerText";
  }
  let sohmareSrial = document.getElementById("sohmareSrial");
  let year = document.getElementById("year");
  let mon = document.getElementById("mon");
  let day = document.getElementById("day");
  let idFroshande = document.getElementById("idFroshande");
  let nameKharidar = document.getElementById("nameKharidar");
  let idKharidar = document.getElementById("idKharidar");
  let Description = document.getElementById("Description");
  let Cash = document.querySelector('input[name="Cash"]:checked');

  if (type == "GetDataUpdate") {
    let inputdata = {
      SerialNumber: ID,
    };
    let result = await GetData("/factorsData", inputdata);
    if (result && result[0]) {
      sohmareSrial[typeTag] = result[0].SerialNumber;
      sohmareSrial.disabled = true;
      let result2 = await GetData("/ProductListData", inputdata);
      if (result2 && result2[0]) {
        fillProductTable(result2);
      }
      await fillBuyer(result[0].BuyerID);
      await fillSeller(result[0].SellerID);

      idFroshande[typeTag] = result[0].SellerID;
      idKharidar[typeTag] = result[0].BuyerID;
      nameKharidar[typeTag] = result[0].BuyerName;
      Description[typeTag] = result[0].Description;
      year[typeTag] = result[0].MyDate.split("/")[0];
      mon[typeTag] = result[0].MyDate.split("/")[1];
      day[typeTag] = result[0].MyDate.split("/")[2];
      document.querySelector(`input[value="${result[0].Cash}"]`).checked = true;
      if (!(window.location.href.indexOf("/printFactor") > 0)) {
        document
          .getElementById("save")
          .setAttribute("onclick", 'addFactor("Update")');
        document
          .getElementById("saveChap")
          .setAttribute("onclick", 'addFactor("Update",0,true)');
      }
    } else {
      alert("این ایدی یافت نشد");
    }
  } else {
    let update = false;
    let url = "/addFactor";
    if (type == "Update") {
      update = true;
      url = "/UpdateFactor";
    }
    let Date =
      year.value.toString() +
      "/" +
      mon.value.toString() +
      "/" +
      day.value.toString();

    factorDataJson.SerialNumber = sohmareSrial.value;
    factorDataJson.SellerID = idFroshande.value;
    factorDataJson.BuyerID = idKharidar.value;
    factorDataJson.BuyerName = nameKharidar.value;
    factorDataJson.MyDate = Date;
    factorDataJson.Cash = Cash.value;
    factorDataJson.Description = Description.value;
    factorDataJson.Products = ItemsProductsjsonArr;
    if (validation_addFactor(factorDataJson)) {
      let result = await insertData(url, factorDataJson, update);
      if (result === true) {
        if (print === false) {
          window.location.href = "/myfactors";
        } else {
          window.location.href = `/printFactor?Id=${factorDataJson.SerialNumber}`;
        }
      }
    }
  }
}

function validation_addFactor(input_data) {
  return true;
}

SearchforID();
async function SearchforID() {
  let params = new URLSearchParams(window.location.search);
  let id = params.get("Id");
  if (!isNaN(id) && id) {
    await addFactor("GetDataUpdate", id);
  }
}
//////////////////////////////////////////////////
async function fillBuyer(BuyerID, Clear = false) {
  let typeTag = "value";
  if (window.location.href.indexOf("/printFactor") > 0) {
    typeTag = "innerText";
  }
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
  if (Clear === false) {
    let result = await GetData("/CustomersData", { BuyerID: Number(BuyerID) });
    if (result && result[0]) {
      idKharidar[typeTag] = result[0].BuyerID;
      nameKharidar[typeTag] = result[0].BuyerName;
      eghtesadiKharidar[typeTag] = result[0].BuyerEconomicNumber;
      sabtKharidar[typeTag] = result[0].BuyerRegistrationNumber;
      telfonKharidar[typeTag] = result[0].BuyerPhone;
      postiKharidar[typeTag] = result[0].BuyerZipCode;
      ostanKharidar[typeTag] = result[0].BuyerProvince;
      sharestanKharidar[typeTag] = result[0].BuyerState;
      shahrKharidar[typeTag] = result[0].BuyerCity;
      neshaniKharidar[typeTag] = result[0].BuyerAddress;
    } else {
      alert("مشخصات خریدار یافت نشد");
    }
  } else {
    nameKharidar[typeTag] = "";
    eghtesadiKharidar[typeTag] = "";
    sabtKharidar[typeTag] = "";
    telfonKharidar[typeTag] = "";
    postiKharidar[typeTag] = "";
    ostanKharidar[typeTag] = "";
    sharestanKharidar[typeTag] = "";
    shahrKharidar[typeTag] = "";
    neshaniKharidar[typeTag] = "";
  }
}

async function fillSeller(SellerID, Clear = false) {
  let typeTag = "value";
  if (window.location.href.indexOf("/printFactor") > 0) {
    typeTag = "innerText";
  }
  let nameFroshande = document.getElementById("nameFroshande");
  let eghtesadiFroshande = document.getElementById("eghtesadiFroshande");
  let ostanFroshande = document.getElementById("ostanFroshande");
  let shahrestanFroshande = document.getElementById("shahrestanFroshande");
  let shahrFroshande = document.getElementById("shahrFroshande");
  let postiFroshande = document.getElementById("postiFroshande");
  let idFroshande = document.getElementById("idFroshande");
  let telfonFroshande = document.getElementById("telfonFroshande");
  let neshaniFroshande = document.getElementById("neshaniFroshande");

  if (Clear === false) {
    let result = await GetData("/SellerData", {
      SellerID: Number(SellerID),
    });
    if (result && result[0]) {
      nameFroshande[typeTag] = result[0].SellerName;
      eghtesadiFroshande[typeTag] = result[0].SellerEconomicNumber;
      postiFroshande[typeTag] = result[0].SellerZipCode;
      ostanFroshande[typeTag] = result[0].SellerProvince;
      shahrestanFroshande[typeTag] = result[0].SellerState;
      shahrFroshande[typeTag] = result[0].SellerCity;
      telfonFroshande[typeTag] = result[0].SellerPhone;
      neshaniFroshande[typeTag] = result[0].SellerAddress;
    } else {
      alert("مشخصات فروشنده یافت نشد");
    }
  } else {
    nameFroshande[typeTag] = "";
    eghtesadiFroshande[typeTag] = "";
    ostanFroshande[typeTag] = "";
    shahrestanFroshande[typeTag] = "";
    shahrFroshande[typeTag] = "";
    postiFroshande[typeTag] = "";
    telfonFroshande[typeTag] = "";
    neshaniFroshande[typeTag] = "";
  }
}

async function fillProductItem(ProductID, Clear = false) {
  let sharhKala = document.getElementById("sharhKala");
  let IdKala = document.getElementById("IdKala");
  let tedadKala = document.getElementById("tedadKala");
  let vahedKala = document.getElementById("vahedKala");
  let mablaghvahed = document.getElementById("mablaghvahed");
  let takhfif = document.getElementById("takhfif");
  let maliat = document.getElementById("maliat");

  if (Clear === false) {
    let result = await GetData("/ProductsData", {
      ProductID: Number(ProductID),
    });
    if (result && result[0]) {
      sharhKala.value = result[0].ProductDes;
      tedadKala.value = result[0].ProductNumber;
      vahedKala.value = result[0].ProductUnit;
      mablaghvahed.value = result[0].ProductUnitAmount;
      takhfif.value = result[0].ProductAmountOfDiscount;
      maliat.value = result[0].ProductTaxesAndDuties;
    } else {
      alert("مشخصات کالا یافت نشد");
    }
  } else {
    sharhKala.value = "";
    tedadKala.value = "";
    vahedKala.value = "";
    mablaghvahed.value = "";
    takhfif.value = "";
    maliat.value = "";
  }
}
