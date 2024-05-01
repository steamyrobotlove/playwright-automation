import { Page } from 'playwright';

interface TestExtensions {
    expect: PlaywrightTest.Expect;
    test: PlaywrightTest.Test;
    getUrl: GetUrlFunction;
    aTagsHrefs: GetATagsHrefsFunction;
}

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

interface TestStateExtension {
    getUrl: (page: Page, use: (page: Page) => Promise<void>) => Promise<void>;
    aTagsHrefs: (context: TestContext,) => Promise<void>;
}

interface TestContext {
    // page: PlaywrightPage.Page;
    // use: PlaywrightPage.Use;
}

interface PlaywrightTest {
    Expect: PlaywrightTest.Expect;
    Test: TestWithExtend;
}

interface TestWithExtend {
    extend: (extensions: { [key: string]: Function}) => void;
}

declare module '@playwright/test' {
    interface TestState extends TestStateExtension{}
}

declare global {
    // namespace PlaywrightPage {
    //     interface Page{}
    //     interface Use{
    //     }
    // }

    namespace PlaywrightTest {
        interface Expect {
            // Specific "Expect" code
        }

        interface Test {
            // Specific "Test" code
        }
    }
}

export { TestExtensions, TestStateExtension, TestContext };