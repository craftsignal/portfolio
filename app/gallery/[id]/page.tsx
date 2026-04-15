import Link from "next/link";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function GalleryArtworkPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <div className="gallery-route flex min-h-dvh flex-col items-center justify-center bg-neutral-950 px-6 text-neutral-100">
      <p className="font-mono text-sm text-neutral-500">Placeholder detail</p>
      <h1 className="mt-3 font-serif text-3xl italic text-white">
        Artwork {id}
      </h1>
      <p className="mt-4 max-w-md text-center text-neutral-400">
        Replace this route with a real viewer or CMS-driven page when your
        son&apos;s exports are ready.
      </p>
      <Link
        href="/gallery"
        className="mt-10 text-sm font-medium text-white underline underline-offset-4"
      >
        ← World view
      </Link>
    </div>
  );
}
