import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Request account deletion | FCI Seller',
  description:
    'How to request deletion of your FCI Seller account and associated personal data.',
  robots: { index: false, follow: true },
};

const requestHref =
  'mailto:fashioncityinidia18@gmail.com?subject=Account%20deletion%20request%20-%20FCI%20Seller&body=Please%20delete%20my%20FCI%20Seller%20account.%0A%0ARegistered%20email%3A%20%0ARegistered%20phone%20(with%20country%20code)%3A%20';

export default function DeleteAccountPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900 dark:bg-zinc-950 dark:text-zinc-100 sm:py-16">
      <article className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:p-10">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-teal-700 dark:text-teal-400">
          FCI Seller · Fashion City India Ltd
        </p>
        <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
          Request account deletion
        </h1>
        <p className="mt-4 leading-7 text-slate-600 dark:text-zinc-300">
          You can request deletion of your FCI Seller account and associated
          personal data without signing in to the app.
        </p>

        <section className="mt-8" aria-labelledby="request-steps">
          <h2 id="request-steps" className="text-xl font-bold">
            How to request deletion
          </h2>
          <ol className="mt-3 list-decimal space-y-2 pl-6 leading-7 text-slate-600 dark:text-zinc-300">
            <li>
              Email{' '}
              <a className="font-semibold text-teal-800 underline dark:text-teal-300" href={requestHref}>
                fashioncityinidia18@gmail.com
              </a>{' '}
              with the subject <strong>Account deletion request – FCI Seller</strong>,
              or use the button below.
            </li>
            <li>Include the email address and phone number registered to your account.</li>
            <li>We may contact you to verify account ownership before processing the request.</li>
          </ol>
          <a
            className="mt-5 inline-flex min-h-11 items-center justify-center rounded-lg bg-teal-700 px-5 py-3 font-bold text-white transition hover:bg-teal-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
            href={requestHref}
          >
            Email an account deletion request
          </a>
          <p className="mt-3 text-sm text-slate-500 dark:text-zinc-400">
            Do not send your password, one-time code, or full card or bank details.
          </p>
        </section>

        <section className="mt-9" aria-labelledby="data-deleted">
          <h2 id="data-deleted" className="text-xl font-bold">Data deleted</h2>
          <p className="mt-3 leading-7 text-slate-600 dark:text-zinc-300">
            After we verify and process your request, we delete your account profile
            (including name, email, phone number, and profile image), saved addresses,
            cart and wishlist data, account credentials and identifiers, notification
            tokens, and other personal data associated with the account from active
            systems, unless a retention exception below applies.
          </p>
        </section>

        <section className="mt-9" aria-labelledby="data-retained">
          <h2 id="data-retained" className="text-xl font-bold">Data we may retain</h2>
          <p className="mt-3 leading-7 text-slate-600 dark:text-zinc-300">
            Order, invoice, refund, and related accounting records may be retained
            for up to eight financial years where required by applicable company
            accounting rules, or longer if a legal hold or other legal obligation
            applies. We restrict retained records to that purpose and delete or
            de-identify them when the retention requirement ends. This does not
            prevent deletion of the rest of your account data.
          </p>
        </section>

        <aside className="mt-9 rounded-xl border-l-4 border-teal-700 bg-slate-50 p-4 dark:bg-zinc-800/60">
          <strong>Need help?</strong> Contact Fashion City India Ltd at{' '}
          <a className="font-semibold text-teal-800 underline dark:text-teal-300" href="mailto:fashioncityinidia18@gmail.com">
            fashioncityinidia18@gmail.com
          </a>{' '}
          or <a className="font-semibold underline" href="tel:+919601511596">+91 96015 11596</a>.
        </aside>

        <footer className="mt-8 border-t border-slate-200 pt-5 text-sm text-slate-500 dark:border-zinc-800 dark:text-zinc-400">
          FCI Seller · Fashion City India Ltd · Ahmedabad, Gujarat, India
        </footer>
      </article>
    </main>
  );
}
