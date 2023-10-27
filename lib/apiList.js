const baseUrl = "/api/v1";

module.exports = {
    5: ["ALL_ACCESS"],
    1: ["/api/v1/po", "/api/v1/addBill", "/api/v1/fetchBills", "/api/v1/officers"],
    2: ["/api/v1/fetchBill/:zbtno", "/api/v1/updateBill/:zbtno", "/api/v1/certifyBill/:zbtno", "/api/v1/forwardToDepartment/:zbtno", "/api/v1/po/details/:poNo"],
    3: ["/api/v1/payment/add", "/api/v1/payment/update/:pId", "/api/v1/payment/delete/:pId", "/api/v1/payment/allPayments", "/api/v1/payment/addByXLS"],
}



/**
 * 1. VENDOR
 * 2. GRSE_DEPARTMENT
 * 3. GRSE_FINANCE
 * 4. GRSE_PAYMENT
 * 5. ADMIN
 */