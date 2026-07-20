export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#f7f1e8] dark:bg-[#0b1220] pt-20">
      <section className="container-main py-20">
        <div className="max-w-3xl rounded-[32px] bg-white dark:bg-secondary-900 p-10 shadow-sm">
          <p className="text-sm uppercase tracking-[0.24em] text-secondary-500 dark:text-secondary-400">Contact module</p>
          <h1 className="mt-4 text-5xl font-bold text-secondary-900 dark:text-white">China travel partnership contact</h1>
          <p className="mt-6 text-lg leading-8 text-secondary-700 dark:text-secondary-200">
            This placeholder contact page gives the MVP a complete navigation loop and can later connect to forms, CRM routing, or partner inquiries.
          </p>
          <div className="mt-8 space-y-3 text-secondary-700 dark:text-secondary-200">
            <p>Email: hello@chinatravel.guide</p>
            <p>Phone: +86 10 8888 2026</p>
            <p>Base: Beijing, China</p>
          </div>
        </div>
      </section>
    </div>
  );
}
