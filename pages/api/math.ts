import { NextApiRequest, NextApiResponse } from "next";
import { getCheckers } from "@zen_flow/ts-interface-builder/macro";

export const checkers = getCheckers();

export default handler;

function handler(req: NextApiRequest, res: NextApiResponse<MathOutput>) {
  let input: MathInput | undefined;

  try {
    const parsed = JSON.parse(req.body);
    checkers.MathInput.check(parsed);
    input = parsed as MathInput;
  } catch (error) {
    const clientError: ClientError = {
      error: `${error.name}: ${error.message}`,
    };
    res.status(400).json(clientError);
    return;
  }

  res.json(input.operation === "multiply" ? multiply(input) : divide(input));
}

export type MathInput = MultiplyInput | DivideInput;
export type MathOutput = ClientError | MultiplyOutput | DivideOutput;

export interface ClientError {
  error: string;
}

export interface MultiplyInput {
  operation: "multiply";
  factors: number[];
}

export interface MultiplyOutput extends MultiplyInput {
  product: number;
}

function multiply(input: MultiplyInput): MultiplyOutput {
  let product = 1;
  for (const factor of input.factors) {
    product *= factor;
  }
  return { ...input, product };
}

export interface DivideInput {
  operation: "divide";
  dividend: number;
  divisor: number;
}

export interface DivideOutput extends DivideInput {
  quotient: number;
}

function divide(input: DivideInput): DivideOutput {
  const quotient = input.dividend / input.divisor;
  return { ...input, quotient };
}
