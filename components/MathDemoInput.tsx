import { FormEvent, useEffect } from "react";

export function MathDemoInput(props: { onInput: (input: string) => void }) {
  useEffect(() => props.onInput(defaultPreset), []);

  function handleSubmit(event: FormEvent): void {
    event.preventDefault();
    const input = event.currentTarget.querySelector("textarea")!.value;
    props.onInput(input);
  }

  function handlePresetClick(event: FormEvent): void {
    const { textContent, parentElement } = event.currentTarget;
    const presetName = textContent!;
    const presetValue = (inputPresets as any)[presetName];
    const textarea = parentElement!.querySelector("textarea")!;
    textarea.value = formatJson(presetValue);
  }

  return (
    <form onSubmit={handleSubmit}>
      <strong>Presets: </strong>
      {Object.keys(inputPresets).map((key) => (
        <button key={key} onClick={handlePresetClick} children={key} />
      ))}
      <textarea name="json" rows={8} defaultValue={defaultPreset} />
      <button type="submit">Submit</button>
    </form>
  );
}

const inputPresets = {
  "happy 1": {
    operation: "multiply",
    factors: [3, 4],
  },
  "invalid request": {
    operation: "multiply",
    factors: [3, 4, null],
  },
  "happy 2": {
    operation: "divide",
    dividend: 1,
    divisor: 3,
  },
  "invalid response": {
    operation: "divide",
    dividend: 1,
    divisor: 0,
  },
};

const defaultPreset = formatJson(inputPresets["happy 1"]);

function formatJson(input: any): string {
  return JSON.stringify(input, null, 2);
}
