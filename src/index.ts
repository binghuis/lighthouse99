import fs from "fs";
import lighthouse from "lighthouse";
import * as chromeLauncher from "chrome-launcher";

async function main(url: string) {
  const chrome = await chromeLauncher.launch({ chromeFlags: ["--headless"] });

  const runnerResult = await lighthouse(url, {
    logLevel: "info",
    output: "html",
    onlyCategories: ["performance"],
    port: chrome.port,
  });

  if (!runnerResult) {
    return;
  }

  // `.report` is the HTML report as a string
  const reportHtml = runnerResult.report;

  fs.writeFileSync(
    "lhreport.html",
    typeof reportHtml === "string" ? reportHtml : reportHtml.join("\n")
  );

  // `.lhr` is the Lighthouse Result as a JS object
  console.log(`网站 ${runnerResult.lhr.finalDisplayedUrl} 性能测试完成`);

  if (
    !runnerResult.lhr.categories["performance"] ||
    !runnerResult.lhr.categories["performance"].score
  ) {
    return;
  }

  const score = runnerResult.lhr.categories["performance"].score * 100;

  console.log(`性能分数: ${score}`);

  await chrome.kill();
}

main("https://better-use-of-react.vercel.app/").catch(console.error);
