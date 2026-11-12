import EvaluationContainer from "@/containers/evaluation-container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Scenario Evaluation",
};

export default function EvaluationPage() {
  return <EvaluationContainer />;
}
