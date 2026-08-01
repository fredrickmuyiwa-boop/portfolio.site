'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Linkedin,
  Github,
  Mail,
  MessageCircle,
  Send,
  Loader2,
  CheckCircle2,
} from 'lucide-react';
import { SectionHeading } from '@/components/section-heading';
import { Reveal, fadeUp, stagger } from '@/components/anim';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { supabase } from '@/lib/supabase-client';
import { toast } from 'sonner';
import { siteConfig } from '@/lib/site';

const projectTypes = [
  'Business Analytics',
  'Web Development',
  'GoHighLevel Automation',
  'Multiple Services',
  'Not Sure Yet',
];

const budgets = [
  'Less than $1,000',
  '$1,000 - $5,000',
  '$5,000 - $10,000',
  '$10,000+',
  'Let\'s discuss',
];

const socials = [
  { icon: Linkedin, label: 'LinkedIn', href: siteConfig.linkedin },
  { icon: Github, label: 'GitHub', href: siteConfig.github },
  { icon: Mail, label: 'Email', href: `mailto:${siteConfig.email}` },
  { icon: MessageCircle, label: 'WhatsApp', href: 'https://wa.me/0000000000' },
];

export function Contact() {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    project_type: '',
    budget: '',
    message: '',
  });

  const update = (key: string, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill in your name, email, and message.');
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.from('contact_submissions').insert({
        name: form.name,
        email: form.email,
        company: form.company || null,
        project_type: form.project_type || null,
        budget: form.budget || null,
        message: form.message,
      });
      if (error) throw error;
      setDone(true);
      toast.success('Message sent! I\'ll get back to you within 24 hours.');
      setForm({ name: '', email: '', company: '', project_type: '', budget: '', message: '' });
    } catch {
      toast.error('Something went wrong. Please try again or email me directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section-pad relative">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/3 top-0 h-80 w-80 rounded-full bg-brand/20 blur-[130px]" />
        <div className="absolute right-1/4 bottom-0 h-80 w-80 rounded-full bg-brand-accent/20 blur-[130px]" />
      </div>
      <div className="container-max">
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something great together"
          description="Tell me about your project and I'll get back to you within 24 hours. Whether it's analytics, a website, or automation — I'm ready to help."
        />

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-5">
          {/* Form */}
          <Reveal className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="glass card-glow rounded-3xl p-8"
            >
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    placeholder="Your full name"
                    value={form.name}
                    onChange={(e) => update('name', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@company.com"
                    value={form.email}
                    onChange={(e) => update('email', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    placeholder="Your company (optional)"
                    value={form.company}
                    onChange={(e) => update('company', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="project_type">Project Type</Label>
                  <Select
                    value={form.project_type}
                    onValueChange={(v) => update('project_type', v)}
                  >
                    <SelectTrigger id="project_type">
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      {projectTypes.map((t) => (
                        <SelectItem key={t} value={t}>
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="budget">Budget</Label>
                  <Select
                    value={form.budget}
                    onValueChange={(v) => update('budget', v)}
                  >
                    <SelectTrigger id="budget">
                      <SelectValue placeholder="Select a budget range" />
                    </SelectTrigger>
                    <SelectContent>
                      {budgets.map((b) => (
                        <SelectItem key={b} value={b}>
                          {b}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell me about your project, goals, and timeline..."
                    value={form.message}
                    onChange={(e) => update('message', e.target.value)}
                    required
                    className="min-h-[140px]"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                size="lg"
                className="mt-6 w-full bg-brand-gradient text-white shadow-lg shadow-primary/25 hover:opacity-90"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : done ? (
                  <>
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Sent!
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </Reveal>

          {/* Info / Socials */}
          <motion.div
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="flex flex-col gap-6 lg:col-span-2"
          >
            <motion.div variants={fadeUp} className="glass rounded-3xl p-8">
              <h3 className="text-lg font-bold">Get in touch directly</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Prefer to reach out another way? I'm available on these platforms
                and always happy to talk.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card-glow group flex items-center gap-3 rounded-2xl border border-border/60 bg-card/40 p-4 transition-colors hover:border-primary/40"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-110">
                      <social.icon className="h-5 w-5" />
                    </span>
                    <span className="text-sm font-medium">{social.label}</span>
                  </a>
                ))}
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="glass rounded-3xl p-8">
              <h3 className="text-lg font-bold">What happens next?</h3>
              <div className="mt-4 space-y-4">
                {[
                  { step: '1', text: 'I review your message within 24 hours' },
                  { step: '2', text: 'We schedule a free consultation call' },
                  { step: '3', text: 'You receive a tailored proposal & quote' },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-3">
                    <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-brand-gradient text-xs font-bold text-white">
                      {item.step}
                    </span>
                    <p className="text-sm text-muted-foreground">{item.text}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
