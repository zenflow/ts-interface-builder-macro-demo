import { MathOutput } from "../pages/api/math";

export function MathDemoOutput(props: {
  output: MathOutput | Error | undefined;
}) {
  const { output } = props;
  if (!output) {
    return <h3>Loading...</h3>;
  }
  if (output instanceof Error) {
    return (
      <>
        <h3>Error deserializing server response</h3>
        <pre>{String(output)}</pre>
      </>
    );
  }
  if ("error" in output) {
    return (
      <>
        <h3>400 Client Error</h3>
        <pre>{output.error}</pre>
      </>
    );
  }
  return (
    <h3>
      {output.operation === "multiply"
        ? `${output.factors.join(" * ")} = ${output.product}`
        : `${output.dividend} / ${output.divisor} = ${output.quotient}`}
    </h3>
  );
}
