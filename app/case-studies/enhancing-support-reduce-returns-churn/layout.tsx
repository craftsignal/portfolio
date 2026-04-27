export default function CaseStudyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="min-h-full font-sans">{children}</div>;
}
