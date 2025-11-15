import Loading from "@/components/Loading";

export default function GlobalLoading() {
  // This server component is shown while a server-rendered route is still loading.
  return <Loading fullScreen message={"Loading page..."} />;
}
