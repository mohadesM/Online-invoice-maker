async function addProduct(type = "Insert", ID = 0) {
  let sharhKala = document.getElementById("sharhKala");
  let IdKala = document.getElementById("IdKala");
  let tedadKala = document.getElementById("tedadKala");
  let vahedKala = document.getElementById("vahedKala");
  let mablaghvahed = document.getElementById("mablaghvahed");
  let takhfif = document.getElementById("takhfif");
  let maliat = document.getElementById("maliat");

  let input_data = {
    ProductID: IdKala.value,
    ProductDes: sharhKala.value,
    ProductNumber: tedadKala.value,
    ProductUnit: vahedKala.value,
    ProductUnitAmount: mablaghvahed.value,
    ProductAmountOfDiscount: takhfif.value,
    ProductTaxesAndDuties: maliat.value,
  };
  if (type == "GetDataUpdate") {
    let inputdata2 = {
      ProductID: ID,
    };
    let result = await GetData("/ProductsData", inputdata2);
    if (result && result[0]) {
      IdKala.value = result[0].ProductID;
      IdKala.disabled = true;
      sharhKala.value = result[0].ProductDes;
      tedadKala.value = result[0].ProductNumber;
      vahedKala.value = result[0].ProductUnit;
      mablaghvahed.value = result[0].ProductUnitAmount;
      takhfif.value = result[0].ProductAmountOfDiscount;
      maliat.value = result[0].ProductTaxesAndDuties;
      document
        .getElementById("save")
        .setAttribute("onclick", 'addProduct("Update")');
    } else {
      alert("این ایدی یافت نشد");
    }
  } else {
    let update = false;
    let url = "/addProduct";
    if (type == "Update") {
      update = true;
      url = "/UpdateProducts";
    }
    if (validation_addProduct(input_data)) {
      let result = await insertData(url, input_data, update);
      if (result === true) {
        window.location.href = "/products";
      }
    }
  }
}

function validation_addProduct(input_data) {
  if (input_data.ProductID == "" || input_data.ProductID <= 0) {
    alert("کد کالا باید مقدار داشته باشد");
    return false;
  } 
  else if (input_data.ProductNumber == "" || input_data.ProductNumber <= 0) {
    alert("تعداد کالا باید مقدار داشته باشد و بیشتر از 0 باشد");
    return false;
  } 
  else if (!(input_data.ProductDes.length > 0)) {
    alert("شرح کالا یا خدمات نمیتواند خالی باشد");
    return false;
  } 
  else if (
    input_data.ProductUnitAmount == "" ||
    input_data.ProductUnitAmount < 0
  ) {
    alert("مبلغ واحد باید مقدار داشته باشد");
    return false;
  } 
  // else if (
  //   input_data.ProductAmountOfDiscount == "" ||
  //   input_data.ProductAmountOfDiscount < 0
  // ) {
  //   alert("تخفیف  باید مقدار داشته باشد");
  //   return false;
  // } else if (
  //   input_data.ProductTaxesAndDuties == "" ||
  //   input_data.ProductTaxesAndDuties < 0
  // ) {
  //   alert("مالیات و عوارض  باید مقدار داشته باش");
  //   return false;
  // }
  return true;
}

SearchforID();
async function SearchforID() {
  let params = new URLSearchParams(window.location.search);
  let id = params.get("Id");
  if (!isNaN(id) && id) {
    await addProduct("GetDataUpdate", id);
  }
}
