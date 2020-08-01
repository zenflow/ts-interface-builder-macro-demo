import { MathDemo } from "../components/MathDemo";

export default function Home() {
  return (
    <main>
      <h1>
        Demo of <code>ts-interface-builder/macro</code>
      </h1>
      <p>
        Start with <code>pages/api/math.ts</code> on (
        <a
          href="https://github.com/zenflow/ts-interface-builder-macro-demo/blob/master/pages/api/math.ts"
          target="_blank"
        >
          GitHub
        </a>
        {" or "}
        <a
          href="https://codesandbox.io/embed/github/zenflow/ts-interface-builder-macro-demo/tree/main/?module=%2Fpages%2Fapi%2Fmath.ts&hidenavigation=1&fontsize=14"
          target="_blank"
        >
          codesandbox.io
        </a>
        ) to see what's happening.
      </p>
      <MathDemo />
    </main>
  );
}
