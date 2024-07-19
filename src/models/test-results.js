export class TestResults {
    constructor(testName, testStatus, testMessage, testItems) {
        this.testName = testName;
        this.testStatus = testStatus;
        this.testMessage = testMessage;
        this.testItems = testItems;
    }
}