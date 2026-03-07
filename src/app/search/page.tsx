import { SearchApp } from "@/components/search-app";
import decisionsData from "@/data/decisions.json";

export default function SearchPage() {
  return <SearchApp decisions={decisionsData} />;
}
