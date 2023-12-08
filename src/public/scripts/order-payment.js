document.addEventListener("DOMContentLoaded", function () {
    const clickableItems = document.querySelectorAll(".clickable");

    clickableItems.forEach(function (item) {
        item.addEventListener("click", function () {
            // Remove "active" class from all clickable items
            clickableItems.forEach(function (item) {
                item.classList.remove("active");
            });

            // Add "active" class to the clicked item
            this.classList.add("active");
        });
    });
});

//Khi nhấn vào thêm tài khoản ngân hàng mới:
const addBankAccountBtn = document.querySelector(".addBankAccountBtn");
const redirect2AccountPage = () => {
    window.location.href = "/account/card";
};

addBankAccountBtn.addEventListener("click", redirect2AccountPage);

//Khi nhấn vào thêm thẻ tín dụng mới:
const addCreditCardBtn = document.querySelector(".addCreditCardBtn");
const redirect2AccountPagee = () => {
    window.location.href = "/account/card";
};

addCreditCardBtn.addEventListener("click", redirect2AccountPagee);

//Khi nhấn đổi lựa chọn của bạn:
const changeChoiceClick = document.querySelector(".change-choice");
changeChoiceClick.addEventListener("click", () => {
    window.location.href = "/search/detail";
});

//Khi nhấn chính sách bảo mật
const privacyPolicys = document.querySelectorAll(".privacy-policy");
privacyPolicys.forEach((privacyPolicy) => {
    privacyPolicy.addEventListener("click", () => {
        window.location.href = "/privacy-policy";
    });
});

//Khi nhấn điều khoản
const termUses = document.querySelectorAll(".term-use");
termUses.forEach((termUse) => {
    termUse.addEventListener("click", () => {
        window.location.href = "/terms-of-use";
    });
});

//Khi nhấn Kiểm tra lại thông tin
const checkInfo = document.querySelector(".check-info-booking");
checkInfo.addEventListener("click", () => {
    window.location.href = "/booking/information";
});
