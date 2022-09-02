export let validation = {
  checkEmpty: function (name, value, callBack) {
    if (value.length === 0) {
      callBack(`${name.toUpperCase()} cannot be empty`);
      return false;
    } else {
      callBack(null);
      return true;
    }
  },
  checkDuplicate: function (value, dsnv, idError, message) {
    var index = dsnv.findIndex(function (nv) {
      return value == nv.username;
    });
    if (index == -1) {
      document.getElementById(idError).style.display = "none";
      return true;
    } else {
      document.getElementById(idError).style.display = "inline-block";
      document.getElementById(idError).innerText = message;
      return false;
    }
  },
  checkStringLength: function (name, value, min, max, callBack) {
    if (value.length < min || value.length > max) {
      callBack(`Length of ${name} must be between ${min} and ${max}`);
      return false;
    } else {
      callBack(null);
      return true;
    }
  },
  checkNumber: function (value, idError, subject) {
    const numbers = /^\d+$/;
    if (value.match(numbers)) {
      document.getElementById(idError).style.display = "none";
      return true;
    } else {
      document.getElementById(idError).style.display = "inline-block";
      document.getElementById(idError).innerText = `${subject} phải là số`;
      return false;
    }
  },
  checkDate: function (value, idError) {
    const dateFormat =
      /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;
    if (value.match(dateFormat)) {
      document.getElementById(idError).style.display = "none";
      return true;
    } else {
      document.getElementById(idError).style.display = "inline-block";
      document.getElementById(
        idError
      ).innerText = `Định dạng ngày phải là dd/mm/yyyy, từ năm 1900 đến nắm 2099`;
      return false;
    }
  },
  checkValue: function (value, idError, message, min, max) {
    if (value < min || value > max) {
      document.getElementById(idError).style.display = "inline-block";
      document.getElementById(idError).innerText = message;
      return false;
    } else {
      document.getElementById(idError).style.display = "none";
      return true;
    }
  },
  checkName: function (value, idError, message) {
    const letters =
      /^[A-Za-zỳọáầảấờễàạằệếýộậốũứĩõúữịỗìềểẩớặòùồợãụủíỹắẫựỉỏừỷởóéửỵẳẹèẽổẵẻỡơôưăêâđỲỌÁẦẢẤỜỄÀẠẰỆẾÝỘẬỐŨỨĨÕÚỮỊỖÌỀỂẨỚẶÒÙỒỢÃỤỦÍỸẮẪỰỈỎỪỶỞÓÉỬỴẲẸÈẼỔẴẺỠƠÔƯĂÊÂĐ' ]+$/;
    if (value.match(letters)) {
      document.getElementById(idError).style.display = "none";
      return true;
    } else {
      document.getElementById(idError).style.display = "inline-block";
      document.getElementById(idError).innerText = message;
      return false;
    }
  },
  checkEmail: function (value, idError, message) {
    const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (emailFormat.test(value)) {
      document.getElementById(idError).style.display = "none";
      return true;
    } else {
      document.getElementById(idError).style.display = "inline-block";
      document.getElementById(idError).innerText = message;
      return false;
    }
  },
  checkPassword: function (value, idError, message) {
    const matKhauFormat =
      /^(?=.*\d)(?=.*[A-Z])(?=.*[@$!%*#?&])([a-zA-Z0-9@$!%*#?&]){6,10}$/;
    if (value.match(matKhauFormat)) {
      document.getElementById(idError).style.display = "none";
      return true;
    } else {
      document.getElementById(idError).style.display = "inline-block";
      document.getElementById(idError).innerText = message;
      return false;
    }
  },
  checkPosition: function (value, idError, message) {
    if (value == "Sếp" || value == "Trưởng phòng" || value == "Nhân viên") {
      document.getElementById(idError).style.display = "none";
      return true;
    } else {
      document.getElementById(idError).style.display = "inline-block";
      document.getElementById(idError).innerText = message;
      return false;
    }
  },
};
