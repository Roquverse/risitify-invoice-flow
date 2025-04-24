import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

const Support = () => {
  const faqItems = [
    {
      question: "How do I get started with Risitify?",
      answer:
        "Getting started with Risitify is easy! Simply sign up for an account, complete your business profile, and you can start creating professional invoices right away. Our onboarding process will guide you through customizing your invoice templates, setting up tax rates, and connecting your preferred payment methods.",
    },
    {
      question: "What payment methods are supported?",
      answer:
        "Risitify supports a wide range of payment methods including credit/debit cards, bank transfers, PayPal, and other popular digital payment solutions. You can enable multiple payment options to make it convenient for your clients to pay invoices.",
    },
    {
      question: "How secure is my business data?",
      answer:
        "We take security seriously at Risitify. All your data is encrypted using industry-standard protocols, and we employ multiple layers of security measures to protect your business information. We regularly perform security audits and maintain compliance with data protection regulations.",
    },
    {
      question: "Can I customize my invoice templates?",
      answer:
        "Yes! Risitify offers fully customizable invoice templates. You can add your logo, change colors, modify layouts, and include custom fields. You can also save multiple templates for different types of services or clients.",
    },
    {
      question: "How does automatic payment reminders work?",
      answer:
        "Our automatic payment reminder system helps you get paid faster. You can set up customized reminder schedules, and Risitify will automatically send professional follow-up emails to your clients before and after payment due dates. You can also track when clients view invoices.",
    },
    {
      question: "What reports and analytics are available?",
      answer:
        "Risitify provides comprehensive reporting tools including income reports, tax summaries, client statements, and payment analytics. You can track your business performance, monitor payment trends, and export reports for accounting purposes.",
    },
    {
      question: "Is there a mobile app available?",
      answer:
        "Yes, Risitify offers mobile apps for both iOS and Android devices. You can create and send invoices, track payments, and manage your business on the go. The mobile app syncs seamlessly with your web account.",
    },
    {
      question: "What kind of customer support do you offer?",
      answer:
        "We provide 24/7 customer support through multiple channels including live chat, email, and phone. Our dedicated support team is always ready to help you with any questions or issues you might have. We also maintain an extensive knowledge base with tutorials and guides.",
    },
  ];

  return (
    <section className="w-full py-16 bg-white">
      <div className="max-w-[1000px] mx-auto px-6 md:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Support & FAQ</h1>
          <p className="text-xl text-gray-600">
            Find answers to common questions about Risitify
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-12">
          <div className="relative max-w-xl mx-auto">
            <input
              type="text"
              placeholder="Search for answers..."
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#84ebdb] focus:border-transparent"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* FAQ Accordion */}
        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqItems.map((item, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-gray-50 rounded-lg border border-gray-200"
            >
              <AccordionTrigger className="px-6 py-4 hover:bg-gray-100 rounded-lg text-left">
                <span className="text-lg font-semibold">{item.question}</span>
              </AccordionTrigger>
              <AccordionContent className="px-6 py-4">
                <p className="text-gray-600 leading-relaxed">{item.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Contact Support Section */}
        <div className="mt-16 text-center bg-[#84ebdb]/10 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-4">Still need help?</h2>
          <p className="text-gray-600 mb-6">
            Our support team is available 24/7 to assist you
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-[#84ebdb] text-[#0A2722] font-semibold hover:bg-[#84ebdb]/90 transition-colors">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              Start Live Chat
            </button>
            <button className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-[#84ebdb] text-[#0A2722] font-semibold hover:bg-[#84ebdb]/10 transition-colors">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Email Support
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Support;
