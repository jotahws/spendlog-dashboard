export default function Layout({
  details,
  children,
}: {
  details: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <>
      <div>{children}</div>
      <div>{details}</div>
    </>
  );
}
