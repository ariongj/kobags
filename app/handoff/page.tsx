import { notFound } from "next/navigation";

// Owner handoff bundles are delivered privately from deliverables/handoff.
// The production website must not publish its source and internal operations.
export default function Handoff() {
  notFound();
}
