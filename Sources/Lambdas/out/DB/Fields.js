"use strict";
var customersFields = ['email', 'firstname', 'lastname', 'phonenumber', 'address_ref'];
var addressesFields = ['delivery_point_barcode', 'city', 'street', 'num', 'zipcode'];
function getFields(tableName) {
    return eval(tableName + 'Fields');
}
exports.getFields = getFields;
