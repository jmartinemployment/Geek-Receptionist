import { PLANS, formatMinutes, formatOverageRate } from "@/data/home/plans";

/** The home page's questions. The page shows them and the FAQPage schema is built from the same list, so the two cannot differ. */
export type Faq = { id: string; question: string; answer: string };

const planList = PLANS.map((plan) => `${plan.name} is $${plan.priceUsd} a month with ${formatMinutes(plan.minutes)} minutes`).join(". ");

export const FAQS: Faq[] = [
  {
    id: "faq-says-ai",
    question: "Does the receptionist tell callers it is an AI?",
    answer: "Yes. Geek-Receptionist tells every caller that it is an AI.",
  },
  {
    id: "faq-on-a-call",
    question: "What can it do on a call?",
    answer:
      "It answers the call, asks the questions you wrote for it, and answers simple questions about your business, such as your hours and the services you offer. With Google Calendar connected, it can check when you are free and book an appointment.",
  },
  {
    id: "faq-cost",
    question: "How much does it cost?",
    answer: `There are four plans. ${planList}. Each minute over a plan's minutes costs ${formatOverageRate()}.`,
  },
  {
    id: "faq-free-trial",
    question: "Is there a free trial?",
    answer: "No. The first month is paid up front through PayPal before the receptionist is set up.",
  },
  {
    id: "faq-extra-minutes",
    question: "What if I use more minutes than my plan includes?",
    answer: `Each minute over costs ${formatOverageRate()}. Each call is rounded up to the whole minute. Extra minutes are charged to your saved PayPal payment method after the month ends.`,
  },
  {
    id: "faq-who-can-sign-up",
    question: "Which businesses can sign up?",
    answer:
      "Businesses located in the United States. Healthcare, veterinary, securities broker-dealer, investment adviser, commodity futures or derivatives, Medicare sales and telemarketing businesses cannot sign up.",
  },
  {
    id: "faq-phone-number",
    question: "Do I get a new phone number?",
    answer: "Yes. During signup you choose an area code and your receptionist gets its own number.",
  },
];
