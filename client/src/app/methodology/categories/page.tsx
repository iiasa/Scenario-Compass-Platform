import ClimateCategoriesContainer from "@/containers/climate-categories-container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SCI Climate categorization",
};

export default function ClimateCategoriesPage() {
  return <ClimateCategoriesContainer />;
}
