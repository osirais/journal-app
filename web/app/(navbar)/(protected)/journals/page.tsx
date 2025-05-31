import { JournalsPage } from "@/components/journals/journals-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Journals"
};

export default function Page() {
  return <JournalsPage />;
}
