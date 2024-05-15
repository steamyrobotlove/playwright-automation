import { Page } from 'playwright';

// Refs all interfaces for fixtures, unit tests
interface TestExtensions {
    expect: PlaywrightTest.Expect;
    test: PlaywrightTest.Test;
    getUrl: GetUrlFunction;
    aTagsHrefs: GetATagsHrefsFunction;
    printImgTagHrefs: PrintImgTagHrefsFunction;
}

// Begin Fixture Interfaces
export interface GetUrlFunction {
    (params: { page: Page }, use: (page: Page) => Promise<void>): Promise<void>;
    $$eval(selector: string, pageFunction: (elements: HTMLElement[]) => Object[]): Promise<any>;
    evaluate(pageFunction: (elements: HTMLElement[]) => Object[]): Promise<any>;
    goto(url: string): Promise<void>;
    url(): Promise<string>;
}

export interface GetAliasesFunction {
}

export interface GetATagsHrefsFunction {
    (params: { aTags: string[] }): Promise<string[]>;
}


// Begin Unit Test Interfaces
export interface PrintImgTagHrefsFunction {
    (params: {jsObject: Object}): Promise<Object>;
}

interface PlaywrightTest {
    Expect: PlaywrightTest.Expect;
    Test: TestWithExtend;
}

// Can output extra logic for existing interfaces (?)
interface TestWithExtend {
    extend: (extensions: { [key: string]: Function}) => void;
}

declare global {
    namespace PlaywrightTest {
        interface Expect {
            // Expect code (if needed)
        }

        interface Test {
            // Test code (if needed)
        }
    }
}

// Export interfaces
export { TestExtensions };

//
// ==============================================================================

// interface TestContext {
//     // page: PlaywrightPage.Page;
//     // use: PlaywrightPage.Use;
// }

// interface TestStateExtension {
//     getUrl: (page: Page, use: (page: Page) => Promise<void>) => Promise<void>;
//     aTagsHrefs: (context: TestContext,) => Promise<void>;
// }

// declare module '@playwright/test' {
//     interface TestState extends TestStateExtension{}
// }