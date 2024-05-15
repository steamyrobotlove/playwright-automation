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
// const { test: playwrightTest, expect: playwrightExpect }: TestExtensions = require('@playwright/test');
const { test, expect } = require('../fixtures/fixtures');
test('Get img tags', (_a) => __awaiter(void 0, [_a], void 0, function* ({ imgTagsHrefs }) {
    const imgTags = Object.values(imgTagsHrefs);
    console.log(imgTags);
}));
//# sourceMappingURL=test.spec.js.map