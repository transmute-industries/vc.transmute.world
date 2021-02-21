export default (results: any) => {
  return {
    name: results.name,
    testResults: {
      numFailedTests: results.numFailedTests,
      numPassedTests: results.numPassedTests,
      numTotalTests: results.numTotalTests,
      testResults: results.testResults.map((result: any) => {
        return {
          numFailingTests: result.numFailingTests,
          numPassingTests: result.numPassingTests,
          testResults: result.testResults.map((result2: any) => {
            return {
              ancestorTitles: result2.ancestorTitles,
              failureDetails: result2.failureDetails,
              failureMessages: result2.failureMessages,
              fullName: result2.fullName,
              status: result2.status,
              title: result2.title,
            };
          }),
        };
      }),
    },
  };
};
