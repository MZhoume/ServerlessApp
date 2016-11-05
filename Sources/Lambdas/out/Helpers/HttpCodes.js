"use strict";
(function (HttpCodes) {
    HttpCodes[HttpCodes["Continue"] = 100] = "Continue";
    HttpCodes[HttpCodes["SwitchingProtocols"] = 101] = "SwitchingProtocols";
    HttpCodes[HttpCodes["OK"] = 200] = "OK";
    HttpCodes[HttpCodes["Created"] = 201] = "Created";
    HttpCodes[HttpCodes["Accepted"] = 202] = "Accepted";
    HttpCodes[HttpCodes["NonAuthoritativeInformation"] = 203] = "NonAuthoritativeInformation";
    HttpCodes[HttpCodes["NoContent"] = 204] = "NoContent";
    HttpCodes[HttpCodes["ResetContent"] = 205] = "ResetContent";
    HttpCodes[HttpCodes["PartialContent"] = 206] = "PartialContent";
    HttpCodes[HttpCodes["MultipleChoices"] = 300] = "MultipleChoices";
    HttpCodes[HttpCodes["MovedPermanently"] = 301] = "MovedPermanently";
    HttpCodes[HttpCodes["Found"] = 302] = "Found";
    HttpCodes[HttpCodes["SeeOther"] = 303] = "SeeOther";
    HttpCodes[HttpCodes["NotModified"] = 304] = "NotModified";
    HttpCodes[HttpCodes["UseProxy"] = 305] = "UseProxy";
    HttpCodes[HttpCodes["TemporaryRedirect"] = 307] = "TemporaryRedirect";
    HttpCodes[HttpCodes["BadRequest"] = 400] = "BadRequest";
    HttpCodes[HttpCodes["Unauthorized"] = 401] = "Unauthorized";
    HttpCodes[HttpCodes["PaymentRequired"] = 402] = "PaymentRequired";
    HttpCodes[HttpCodes["Forbidden"] = 403] = "Forbidden";
    HttpCodes[HttpCodes["NotFound"] = 404] = "NotFound";
    HttpCodes[HttpCodes["MethodNotAllowed"] = 405] = "MethodNotAllowed";
    HttpCodes[HttpCodes["NotAcceptable"] = 406] = "NotAcceptable";
    HttpCodes[HttpCodes["ProxyAuthenticationRequired"] = 407] = "ProxyAuthenticationRequired";
    HttpCodes[HttpCodes["RequestTimeout"] = 408] = "RequestTimeout";
    HttpCodes[HttpCodes["InternalServerError"] = 500] = "InternalServerError";
    HttpCodes[HttpCodes["NotImplemented"] = 501] = "NotImplemented";
    HttpCodes[HttpCodes["BadGateway"] = 502] = "BadGateway";
    HttpCodes[HttpCodes["ServiceUnavailable"] = 503] = "ServiceUnavailable";
    HttpCodes[HttpCodes["GatewayTimeout"] = 504] = "GatewayTimeout";
    HttpCodes[HttpCodes["HTTPVersionNotSupported"] = 505] = "HTTPVersionNotSupported";
})(exports.HttpCodes || (exports.HttpCodes = {}));
var HttpCodes = exports.HttpCodes;
