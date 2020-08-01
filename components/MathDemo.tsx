import { useState } from "react";
import { checkers, MathOutput } from "../pages/api/math";
import { MathDemoOutput } from "./MathDemoOutput";
import { MathDemoInput } from "./MathDemoInput";

export function MathDemo() {
  const [output, setOutput] = useState<MathOutput | Error | undefined>();
  const handleInput = (input: string) => {
    setOutput(undefined);
    callMath(input).then(setOutput);
  };
  return (
    <>
      <h2>Input</h2>
      <MathDemoInput onInput={handleInput} />
      <h2>Output</h2>
      <MathDemoOutput output={output} />
    </>
  );
}

async function callMath(input: string): Promise<MathOutput | Error> {
  let parsed: any;
  try {
    const response = await fetch("/api/math", { method: "POST", body: input });
    const responseBody = await response.text();
    parsed = JSON.parse(responseBody);
    checkers.MathOutput.setReportedPath("parsed");
    checkers.MathOutput.check(parsed);
    return parsed as MathOutput;
  } catch (error) {
    error.message += `\n\nparsed = ${JSON.stringify(parsed, null, 2)}`;
    return error as Error;
  }
}
