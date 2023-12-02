"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchHelper = void 0;
const searchHelper = (query) => {
    let objectSearch = {
        keyword: "",
    };
    if (query.keyword) {
        objectSearch.keyword = query.keyword;
        const regex = new RegExp(objectSearch.keyword, "i");
        objectSearch.regex = regex;
    }
    return objectSearch;
};
exports.searchHelper = searchHelper;
