/// <reference path="../../typings/index.d.ts" />
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const DynamoDBAsync_1 = require('./DynamoDBAsync');
const Fields_1 = require('../DB/Fields');
const Helpers_1 = require('../Helpers/Helpers');
class DynamoDBManager {
    constructor() {
        this._db = new DynamoDBAsync_1.DynamoDBAsync();
    }
    // TODO: keep create and get consistent, either check for protential errors or not at all
    create(tableName, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            let k = Fields_1.getFields(tableName)[0];
            let readKey = {};
            readKey[k] = Helpers_1.tryFind(payload, k, undefined);
            let r = yield this._db.get({
                TableName: tableName,
                Key: readKey
            });
            if (r && r.Item)
                throw `${readKey[k] || 'Item'} already exists.`;
            else {
                let item = {};
                for (let e of Fields_1.getFields(tableName))
                    item[e] = Helpers_1.tryFind(payload, e, undefined);
                return this._db.create({
                    TableName: tableName,
                    Item: item
                });
            }
        });
    }
    get(tableName, payload) {
        return this._db.get({
            TableName: tableName,
            Key: Helpers_1.tryFind(payload, 'key', {})
        });
    }
    update(tableName, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            let params = {
                TableName: tableName,
                Key: Helpers_1.tryFind(payload, 'key', {})
            };
            let r = yield this._db.get(params);
            if (!r || !r.Item) {
                throw `${params.Key[0] || 'Item'} does not exist.`;
            }
            else {
                r = r.Item;
                let attributes = {};
                for (let e of Fields_1.getFields(tableName)) {
                    let v = Helpers_1.tryFind(payload, e, false);
                    if (v && r[e] !== v) {
                        attributes[e] = {
                            Action: "PUT",
                            Value: v
                        };
                    }
                }
                return this._db.update({
                    TableName: tableName,
                    Key: Helpers_1.tryFind(payload, 'key', {}),
                    AttributeUpdates: attributes
                });
            }
        });
    }
    delete(tableName, payload) {
        return this._db.delete({
            TableName: tableName,
            Key: Helpers_1.tryFind(payload, 'key', {})
        });
    }
    find(tableName, payload) {
        return this._db.find({
            TableName: tableName,
            FilterExpression: Helpers_1.tryFind(payload, 'expression', undefined),
            ExpressionAttributeValues: Helpers_1.tryFind(payload, 'values', undefined)
        });
    }
}
exports.DynamoDBManager = DynamoDBManager;
