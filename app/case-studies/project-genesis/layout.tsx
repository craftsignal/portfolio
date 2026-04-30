export default function ProjectGenesisLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="min-h-full font-sans">{children}</div>;
}
