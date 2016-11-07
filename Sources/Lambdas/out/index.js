/// <reference path="../typings/index.d.ts" />
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const DynamoDBManager_1 = require('./DB/DynamoDBManager');
const Validator_1 = require('./Validation/Validator');
const AddressValidation_1 = require('./Validation/AddressValidation');
const Helpers_1 = require('./Helpers/Helpers');
const HttpCodes_1 = require('./Helpers/HttpCodes');
const Fields_1 = require('./DB/Fields');
function tcWrapper(method, callback) {
    try {
        method();
    }
    catch (err) {
        callback(Helpers_1.genLambdaError(HttpCodes_1.HttpCodes.BadRequest, err));
    }
}
function handler(event, context, callback) {
    let db = new DynamoDBManager_1.DynamoDBManager();
    let tableName = event.tableName;
    switch (event.operation) {
        // TODO: where to check the errors, here or dbmanager?
        case 'create':
            for (let r of Fields_1.getFieldsToCheck(tableName)) {
                if (!Validator_1.validate(event.payload, r)) {
                    callback(Helpers_1.genLambdaError(HttpCodes_1.HttpCodes.BadRequest, `${r} is not valid`));
                    return;
                }
            }
            tcWrapper(() => __awaiter(this, void 0, void 0, function* () { return callback(undefined, yield db.create(tableName, tableName === Fields_1.addressesTableName ? yield AddressValidation_1.requestValidAddr(event.payload) : event.payload)); }), callback);
            break;
        case 'read':
            tcWrapper(() => __awaiter(this, void 0, void 0, function* () { return callback(undefined, yield db.get(tableName, event.payload)); }), callback);
            break;
        case 'update':
            if (tableName === Fields_1.addressesTableName) {
                tcWrapper(() => __awaiter(this, void 0, void 0, function* () {
                    let addr = yield AddressValidation_1.requestValidAddr(event.payload);
                    let r = yield db.get(tableName, { key: { delivery_point_barcode: addr.delivery_point_barcode } });
                    if (!r || !r.Item) {
                        yield db.create(tableName, addr);
                    }
                    let email = Helpers_1.tryFind(event.payload, 'email', undefined);
                    r = yield db.get(Fields_1.customersTableName, { key: { email: email } });
                    if (r && r.Item) {
                        callback(undefined, yield db.update(Fields_1.customersTableName, { key: { email: email }, values: { delivery_point_barcode: addr.delivery_point_barcode } }));
                    }
                    else {
                        callback(Helpers_1.genLambdaError(HttpCodes_1.HttpCodes.BadRequest, `${email} does not exist`));
                    }
                }), callback);
            }
            else {
                tcWrapper(() => __awaiter(this, void 0, void 0, function* () { return callback(undefined, yield db.update(tableName, event.payload)); }), callback);
            }
            break;
        case 'delete':
            tcWrapper(() => __awaiter(this, void 0, void 0, function* () { return callback(undefined, yield db.delete(tableName, event.payload)); }), callback);
            break;
        case 'find':
            tcWrapper(() => __awaiter(this, void 0, void 0, function* () { return callback(undefined, yield db.find(tableName, event.payload)); }), callback);
            break;
        case 'getaddr':
            tcWrapper(() => __awaiter(this, void 0, void 0, function* () {
                let r = yield db.get(Fields_1.customersTableName, event.payload);
                if (r && r.Item) {
                    let barcode = r.Item.delivery_point_barcode;
                    callback(undefined, yield db.get(Fields_1.addressesTableName, { "key": { delivery_point_barcode: barcode } }));
                }
                else {
                    callback(Helpers_1.genLambdaError(HttpCodes_1.HttpCodes.BadRequest, `${Helpers_1.tryFind(event.payload, 'email', 'Customer')} does not exist`));
                }
            }), callback);
            break;
        default:
            callback(Helpers_1.genLambdaError(HttpCodes_1.HttpCodes.BadRequest, "Bad Request Path"));
            break;
    }
}
exports.handler = handler;
