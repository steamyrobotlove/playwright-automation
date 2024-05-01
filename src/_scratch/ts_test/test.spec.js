"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const { test, expect } = require('./fixtures');
// const { test: playwrightTest, expect: playwrightExpect }: TestExtensions = require('@playwright/test');
test('Validate aliases', ({ aTagsNoRedirectAliases }) => __awaiter(void 0, void 0, void 0, function* () {
    const aliases = Object.values(aTagsNoRedirectAliases);
    for (let alias of aliases) {
        const charToCount = "_";
        const regex = new RegExp(charToCount, 'g');
        const matches = alias.match(regex);
        const count = matches.length;
        console.log(count);
        if (!count === null && count == 11 || !alias.includes("footer")) {
            console.log(`There are 11 underscores in ${alias}, so it's a main content link!`);
        }
        else if (count == 11 && alias.includes("footer")) {
            console.log(`There are 11 underscores in ${alias}, and it's a footer link!`);
        }
        else if (count == 3) {
            console.log(`There are 3 underscores in ${alias}, so this is a footer link.`);
        }
        else {
            console.log(`This alias is weird: ${alias}`);
        }
        // console.log(alias);
    }
}));
//# sourceMappingURL=test.spec.js.map