export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#f7f1e8] dark:bg-[#0b1220] pt-20">
      <section className="container-main py-20">
        <div className="max-w-3xl rounded-[32px] bg-white dark:bg-secondary-900 p-10 shadow-sm">
          <p className="text-sm uppercase tracking-[0.24em] text-secondary-500 dark:text-secondary-400">Contact</p>
          <h1 className="mt-4 text-5xl font-bold text-secondary-900 dark:text-white">Plan better China journeys together</h1>
          <p className="mt-6 text-lg leading-8 text-secondary-700 dark:text-secondary-200">
            Contact the project team with questions about destination content,
            booking partnerships, or corrections to the travel guides.
          </p>
          <div className="mt-8 space-y-3 text-secondary-700 dark:text-secondary-200">
            <p>
              Email:{' '}
              <a className="font-semibold text-primary hover:underline" href="mailto:sales@cchinaroute.com">
                sales@cchinaroute.com
              </a>
            </p>
            <p>
              Phone:{' '}
              <a className="font-semibold text-primary hover:underline" href="tel:+85684971668">
                +856 84971668
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
