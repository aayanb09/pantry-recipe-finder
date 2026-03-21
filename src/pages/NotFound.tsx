const NotFound = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="max-w-md rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Page Not Found
        </p>
        <h1 className="mb-3 text-3xl font-bold">This page is not in the recipe library.</h1>
        <p className="mb-6 text-muted-foreground">
          Head back to the finder to browse recipes by ingredient.
        </p>
        <a href="/" className="inline-flex rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground transition-opacity hover:opacity-90">
          Back to Recipe Finder
        </a>
      </div>
    </div>
  );
};

export default NotFound;
