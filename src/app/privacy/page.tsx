export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#f7f1e8] dark:bg-[#0b1220] pt-20">
      <section className="container-main py-20">
        <div className="max-w-3xl rounded-[32px] bg-white dark:bg-secondary-900 p-10 shadow-sm">
          <p className="text-sm uppercase tracking-[0.24em] text-secondary-500 dark:text-secondary-400">Privacy</p>
          <h1 className="mt-4 text-5xl font-bold text-secondary-900 dark:text-white">How account data is used</h1>
          <div className="mt-6 space-y-5 text-lg leading-8 text-secondary-700 dark:text-secondary-200">
            <p>
              The website uses Firebase Authentication to manage accounts and
              stores points, unlocked guides, and forum activity in Firestore.
            </p>
            <p>
              Authentication tokens are sent only to this application&apos;s
              protected API routes. They are verified on the server before any
              account or community data is changed.
            </p>
            <p>
              External booking links open third-party services. Their privacy
              policies apply after leaving this website.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
