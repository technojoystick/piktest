const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export default (async function showResults(values) {
  await sleep(500);
  console.log(values);
  // console.log(`Data:\n\n${JSON.stringify(values, null, 2)}`);
});