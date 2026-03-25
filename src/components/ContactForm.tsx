"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import AnimatedButton from "./AnimatedButton";
import { m } from "framer-motion";
import confetti from "canvas-confetti";
import SectionEyebrow from "./SectionEyebrow";

const messengerOptions = ["Telegram", "WhatsApp", "Instagram", "Email"] as const;
type MessengerType = typeof messengerOptions[number];

const serviceOptions = [
  "AI Web Development",
  "Custom Models",
  "AI Creatives",
  "Telegram Automation",
  "Data Analysis",
  "Team Training",
];

function getMessengerLabel(type: MessengerType) {
  switch (type) {
    case "Telegram": return "Your @username";
    case "WhatsApp": return "Your phone number";
    case "Instagram": return "Your @handle";
    case "Email": return "Your email address";
    default: return "Your contact";
  }
}

type FormValues = {
  name: string;
  messenger_type: MessengerType;
  contactInfo: string;
  brief: string;
};

interface FormFieldProps {
  label: string;
  error?: string;
  children: React.ReactNode;
  fullWidth?: boolean;
}

function FormField({ label, error, children, fullWidth }: FormFieldProps) {
  return (
    <div className={`flex flex-col gap-2 relative group ${fullWidth ? "md:col-span-2" : ""}`}>
      <label className="text-[12px] font-bold tracking-widest text-t-caption uppercase">{label}</label>
      {children}
      <m.div 
        className="absolute bottom-0 left-0 right-0 h-[1px] bg-primary origin-center scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300"
      />
      {error && <span className="text-[12px] text-red-500 mt-1">{error}</span>}
    </div>
  );
}

interface ServiceTagProps {
  srv: string;
  isSelected: boolean;
  onClick: () => void;
}

function ServiceTag({ srv, isSelected, onClick }: ServiceTagProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-6 py-2.5 rounded-full border text-[13px] font-medium transition-all duration-200 ${
        isSelected 
          ? "border-primary bg-primary/10 text-t-primary" 
          : "border-border text-t-body hover:border-accent-blue/30 hover:text-t-primary"
      }`}
    >
      {srv}
    </button>
  );
}

export default function ContactForm() {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormValues>({
    defaultValues: { messenger_type: "Telegram" }
  });
  const selectedMessenger = watch("messenger_type");

  const toggleService = (srv: string) => {
    setSelectedServices(prev => 
      prev.includes(srv) ? prev.filter(s => s !== srv) : [...prev, srv]
    );
  };

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    const payload = {
      name: data.name,
      messenger_type: data.messenger_type,
      messenger_contact: data.contactInfo,
      services: selectedServices,
      brief: data.brief
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" }
      });
      if (res.ok) {
        setSuccess(true);
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#005DFF', '#FFFFFF']
        });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative py-section bg-background overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10">
        <m.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-24"
        >
          <SectionEyebrow>Inquiry</SectionEyebrow>
          <h2 className="text-h2 md:text-h1 mb-6 text-t-primary text-left">Get in Touch</h2>
          <p className="text-body md:text-body-lg text-t-body max-w-2xl leading-relaxed">
            Ready to scale your operations with specialized AI systems?
          </p>
        </m.div>

        <form onSubmit={handleSubmit(onSubmit)} className="relative z-10 w-full border border-white/10 bg-white/[0.02] rounded-2xl p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 md:gap-x-16 gap-y-8 mb-12">
            <FormField label="Full Name" error={errors.name?.message}>
              <input 
                {...register("name", { required: "Name is required" })}
                className="bg-transparent border-0 border-b border-white/15 py-4 text-white text-[16px] outline-none transition-colors duration-200 focus:border-white/40 w-full"
                placeholder="John Doe"
              />
            </FormField>

            <FormField label="Preferred Channel">
              <select
                {...register("messenger_type")}
                className="bg-transparent border-0 border-b border-white/15 py-4 text-white text-[16px] outline-none appearance-none cursor-pointer w-full"
              >
                {messengerOptions.map(opt => (
                  <option key={opt} value={opt} className="bg-background">{opt}</option>
                ))}
              </select>
            </FormField>

            <FormField label={getMessengerLabel(selectedMessenger)} error={errors.contactInfo?.message} fullWidth>
              <input 
                {...register("contactInfo", { required: "Contact info is required" })}
                className="bg-transparent border-0 border-b border-white/15 py-4 text-white text-[16px] outline-none transition-colors duration-200 focus:border-white/40 w-full"
                placeholder="Contact details..."
              />
            </FormField>

            <FormField label="Project Brief" fullWidth>
              <textarea
                {...register("brief")}
                rows={1}
                className="bg-transparent border-0 border-b border-white/15 py-4 text-white text-[16px] outline-none resize-none overflow-hidden transition-colors duration-200 focus:border-white/40 min-h-[56px] w-full"
                placeholder="Briefly describe your objectives..."
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = 'auto';
                  target.style.height = target.scrollHeight + 'px';
                }}
              />
            </FormField>
          </div>

          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-6">
              <label className="text-[12px] font-bold tracking-widest text-t-caption uppercase text-left">Select Systems</label>
              <div className="flex flex-wrap gap-3">
                {serviceOptions.map((srv) => (
                  <ServiceTag 
                    key={srv}
                    srv={srv}
                    isSelected={selectedServices.includes(srv)}
                    onClick={() => toggleService(srv)}
                  />
                ))}
              </div>
            </div>

            <div className="w-full pt-4">
              {success ? (
                <div className="w-full h-14 flex items-center justify-center bg-primary/10 border border-primary/30 rounded-lg text-white font-bold tracking-wide">
                  INITIATED SUCCESSFULLY
                </div>
              ) : (
                <AnimatedButton
                  type="submit"
                  disabled={loading}
                  className="w-full h-14 uppercase text-[14px] tracking-widest"
                >
                  {loading ? "Transmitting..." : "Send Request"}
                </AnimatedButton>
              )}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
