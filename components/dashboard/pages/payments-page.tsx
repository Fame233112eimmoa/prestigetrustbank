"use client";

import Link from "next/link";

import { ActivityList } from "@/components/dashboard/activity-list";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { ExternalTransferForm } from "@/components/dashboard/external-transfer-form";
import { PaymentForm } from "@/components/dashboard/payment-form";
import { SummaryCard } from "@/components/dashboard/summary-card";
import { TransferForm } from "@/components/dashboard/transfer-form";
import { useDashboard } from "@/components/dashboard/dashboard-provider";
import { ReceiptIcon, WalletIcon } from "@/components/icons";
import { formatCurrency } from "@/lib/dashboard-data";

const secondaryActionClass =
  "inline-flex items-center justify-center rounded-full border border-[var(--color-line)] px-5 py-3 text-sm font-semibold text-[var(--color-navy-950)]";

export function PaymentsPage() {
  const { accounts, state, transferRecipients } = useDashboard();

  const paymentActivity = state.activities
    .filter((item) => item.kind === "transfer" || item.kind === "payment")
    .slice(0, 6);

  return (
    <div className="space-y-8">
      <DashboardHeader
        eyebrow="Payments"
        title="Payments"
        description="Transfer funds, send money, and pay bills."
        actions={
          <Link href="/dashboard/support" className={secondaryActionClass}>
            Need Payment Help?
          </Link>
        }
      />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        <SummaryCard
          label="Checking Balance"
          value={formatCurrency(accounts.checking.availableBalance)}
          detail="Available for payments"
          icon={WalletIcon}
        />
        <SummaryCard
          label="Savings Balance"
          value={formatCurrency(accounts.savings.availableBalance)}
          detail="Available for transfers"
          icon={ReceiptIcon}
          accent="gold"
        />
        <SummaryCard
          label="Transfer Destinations"
          value={transferRecipients.length.toString()}
          detail="Saved users and banks"
          icon={WalletIcon}
        />
      </div>

      <div className="grid gap-8 2xl:grid-cols-[minmax(0,1.08fr)_400px]">
        <div className="space-y-8">
          <div className="grid gap-6 xl:grid-cols-2">
            <TransferForm />
            <ExternalTransferForm />
          </div>

          <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_360px]">
            <PaymentForm />
            <ActivityList title="Payment Activity" items={paymentActivity} />
          </div>
        </div>

        <div className="space-y-6 2xl:sticky 2xl:top-8 2xl:self-start">
          <section className="panel rounded-[2.25rem] p-6 sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-gold)]">
              Transfer Directory
            </p>
            <h2 className="mt-4 text-[2rem] font-semibold leading-tight text-[var(--color-navy-950)]">
              Clients and payees
            </h2>
            <div className="mt-7 space-y-6">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-slate-500)]">
                  Saved Users
                </p>
                <div className="mt-4 space-y-4">
                  {transferRecipients
                    .filter((recipient) => recipient.type === "User")
                    .map((recipient) => (
                      <div
                        key={recipient.id}
                        className="rounded-[1.6rem] bg-[var(--color-surface-soft)] px-5 py-5"
                      >
                        <p className="font-semibold text-[var(--color-slate-950)]">
                          {recipient.name}
                        </p>
                        <p className="mt-1 text-sm text-[var(--color-slate-700)]">
                          {recipient.email}
                        </p>
                        <p className="mt-1 text-sm text-[var(--color-slate-700)]">
                          {recipient.destinationLabel}
                        </p>
                      </div>
                    ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-slate-500)]">
                  Saved Banks
                </p>
                <div className="mt-4 space-y-4">
                  {transferRecipients
                    .filter((recipient) => recipient.type === "Bank")
                    .map((recipient) => (
                      <div
                        key={recipient.id}
                        className="rounded-[1.6rem] bg-[var(--color-surface-soft)] px-5 py-5"
                      >
                        <p className="font-semibold text-[var(--color-slate-950)]">
                          {recipient.name}
                        </p>
                        <p className="mt-1 text-sm text-[var(--color-slate-700)]">
                          {recipient.bankName} • Routing {recipient.routingNumber}
                        </p>
                        <p className="mt-1 text-sm text-[var(--color-slate-700)]">
                          Account {recipient.destinationLabel}
                        </p>
                      </div>
                    ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-slate-500)]">
                  Bill Pay
                </p>
                <div className="mt-4 space-y-4">
                  {state.billers.map((biller) => (
                    <div
                      key={biller.id}
                      className="rounded-[1.6rem] bg-[var(--color-surface-soft)] px-5 py-5"
                    >
                      <p className="font-semibold text-[var(--color-slate-950)]">
                        {biller.name}
                      </p>
                      <p className="mt-1 text-sm text-[var(--color-slate-700)]">
                        {biller.category} • {biller.reference}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="panel rounded-[2.25rem] bg-[var(--color-navy-950)] p-6 sm:p-7 text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-gold-soft)]">
              Transfer Status
            </p>
            <h2 className="mt-4 text-[1.9rem] font-semibold leading-tight">
              Funds ready
            </h2>
            <div className="mt-7 grid gap-4 sm:grid-cols-2 2xl:grid-cols-1">
              <div className="rounded-[1.6rem] border border-white/10 bg-white/6 px-5 py-5">
                <p className="text-xs uppercase tracking-[0.16em] text-slate-300">
                  Checking
                </p>
                <p className="mt-3 text-2xl font-semibold">
                  {formatCurrency(accounts.checking.availableBalance)}
                </p>
              </div>
              <div className="rounded-[1.6rem] border border-white/10 bg-white/6 px-5 py-5">
                <p className="text-xs uppercase tracking-[0.16em] text-slate-300">
                  Savings
                </p>
                <p className="mt-3 text-2xl font-semibold">
                  {formatCurrency(accounts.savings.availableBalance)}
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
