"use client";

import { useState, type FormEvent } from "react";

import { MailIcon, MapPinIcon, PhoneIcon } from "@/components/icons";
import { PageSectionHeader } from "@/components/dashboard/page-section-header";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { useDashboard } from "@/components/dashboard/dashboard-provider";

const faqs = [
  {
    question: "When will I receive a response?",
    answer:
      "Messages are reviewed the same business day.",
  },
  {
    question: "Can I request statement or travel support here?",
    answer:
      "Yes. Use Secure Message or call Client Support.",
  },
  {
    question: "How do I contact my banker?",
    answer:
      "Contact your relationship manager by phone or Secure Message.",
  },
] as const;

type FeedbackState = {
  tone: "success" | "danger";
  message: string;
};

export function SupportPanel() {
  const { state, submitSupportMessage } = useDashboard();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [form, setForm] = useState({
    subject: "",
    message: "",
  });
  const [feedback, setFeedback] = useState<FeedbackState | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const result = submitSupportMessage(form);
    setFeedback({
      tone: result.ok ? "success" : "danger",
      message: result.message,
    });

    if (result.ok) {
      setForm({
        subject: "",
        message: "",
      });
    }
  }

  return (
    <section className="space-y-6">
      <div className="panel rounded-[2.25rem] p-6 sm:p-7">
        <PageSectionHeader
          eyebrow="Support"
          title="Contact support and review service requests."
        />

        <div className="mt-7 grid gap-7 2xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div className="space-y-5">
            <div className="rounded-[2rem] bg-[var(--color-navy-950)] px-6 py-6 text-white sm:px-7 sm:py-7">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-gold-soft)]">
                Client Support
              </p>
              <h3 className="mt-4 text-[1.9rem] font-semibold leading-tight">
                Contact Support
              </h3>
              <div className="mt-7 space-y-5 text-sm leading-7 text-slate-300">
                <div className="flex items-start gap-3">
                  <PhoneIcon className="mt-1 h-5 w-5 text-[var(--color-gold-soft)]" />
                  <div>
                    <p className="font-semibold text-white">Client support line</p>
                    <p>+44 20 7946 0134</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MailIcon className="mt-1 h-5 w-5 text-[var(--color-gold-soft)]" />
                  <div>
                    <p className="font-semibold text-white">Relationship manager</p>
                    <p>{state.user.relationshipManager}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPinIcon className="mt-1 h-5 w-5 text-[var(--color-gold-soft)]" />
                  <div>
                    <p className="font-semibold text-white">Primary branch</p>
                    <p>{state.user.branch}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-[var(--color-line)] p-6 sm:p-7">
              <h3 className="text-xl font-semibold text-[var(--color-navy-950)]">
                Frequently Asked Questions
              </h3>
              <div className="mt-6 space-y-4">
                {faqs.map((item, index) => (
                  <div
                    key={item.question}
                    className="rounded-[1.6rem] border border-[var(--color-line)]"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setOpenIndex((current) =>
                          current === index ? null : index
                        )
                      }
                      className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
                    >
                      <span className="font-semibold text-[var(--color-slate-950)]">
                        {item.question}
                      </span>
                      <span className="text-xl text-[var(--color-gold)]">
                        {openIndex === index ? "−" : "+"}
                      </span>
                    </button>
                    {openIndex === index ? (
                      <div className="border-t border-[var(--color-line)] px-5 py-5 text-sm leading-7 text-[var(--color-slate-700)]">
                        {item.answer}
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <form
              className="rounded-[2rem] border border-[var(--color-line)] p-6 sm:p-7"
              onSubmit={handleSubmit}
            >
              <h3 className="text-xl font-semibold text-[var(--color-navy-950)]">
                Send a Secure Message
              </h3>
              <p className="mt-2 text-sm leading-7 text-[var(--color-slate-700)]">
                We will reply through Secure Message.
              </p>

              {feedback ? (
                <div
                  className={`mt-6 rounded-[1.6rem] border px-5 py-4 text-sm ${
                    feedback.tone === "success"
                      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                      : "border-rose-200 bg-rose-50 text-rose-700"
                  }`}
                >
                  {feedback.message}
                </div>
              ) : null}

              <div className="mt-6 space-y-5">
                <label className="space-y-2.5">
                  <span className="block text-sm font-medium text-[var(--color-slate-950)]">
                    Subject
                  </span>
                  <input
                    type="text"
                    value={form.subject}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        subject: event.target.value,
                      }))
                    }
                    placeholder="Statement delivery preference"
                    className="w-full rounded-2xl border border-[var(--color-line)] bg-white px-5 py-3.5 text-[var(--color-navy-950)] outline-none focus:border-[rgba(200,164,93,0.55)] focus:ring-4 focus:ring-[rgba(200,164,93,0.12)]"
                  />
                </label>

                <label className="space-y-2.5">
                  <span className="block text-sm font-medium text-[var(--color-slate-950)]">
                    Message
                  </span>
                  <textarea
                    value={form.message}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        message: event.target.value,
                      }))
                    }
                    rows={6}
                    placeholder="Please provide the servicing details you would like our client support team to review."
                    className="w-full rounded-[1.6rem] border border-[var(--color-line)] bg-white px-5 py-4 text-[var(--color-navy-950)] outline-none focus:border-[rgba(200,164,93,0.55)] focus:ring-4 focus:ring-[rgba(200,164,93,0.12)]"
                  />
                </label>
              </div>

              <button
                type="submit"
                className="mt-6 inline-flex min-w-[180px] items-center justify-center rounded-full bg-[var(--color-navy-950)] px-5 py-3.5 text-sm font-semibold text-white"
              >
                Send Message
              </button>
            </form>

            <div className="rounded-[2rem] border border-[var(--color-line)] p-6 sm:p-7">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-xl font-semibold text-[var(--color-navy-950)]">
                  Ticket History
                </h3>
                <p className="text-sm text-[var(--color-slate-700)]">
                  {state.supportTickets.length} requests
                </p>
              </div>

              <div className="mt-6 space-y-4">
                {state.supportTickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    className="rounded-[1.6rem] bg-[var(--color-surface-soft)] px-5 py-5"
                  >
                    <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start sm:gap-6">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-3">
                          <p className="font-semibold text-[var(--color-slate-950)]">
                            {ticket.subject}
                          </p>
                          <StatusBadge
                            label={ticket.status}
                            tone={
                              ticket.status === "Resolved"
                                ? "success"
                                : ticket.status === "In Review"
                                  ? "info"
                                  : "warning"
                            }
                          />
                        </div>
                        <p className="mt-2 text-sm leading-7 text-[var(--color-slate-700)]">
                          {ticket.message}
                        </p>
                      </div>
                      <div className="text-sm text-[var(--color-slate-500)] sm:min-w-[118px] sm:text-right">
                        <p>{ticket.channel}</p>
                        <p className="mt-2">{ticket.updatedAt}</p>
                        <p className="mt-2 font-medium text-[var(--color-navy-950)]">
                          {ticket.id}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
