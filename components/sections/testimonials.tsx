'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { SectionHeading } from '@/components/section-heading';
import { fadeUp, stagger } from '@/components/anim';

const testimonials = [
  {
    name: 'Sarah Mitchell',
    role: 'CEO, BrightPath Consulting',
    image:
      'https://images.pexels.com/photos/33680700/pexels-photo-33680700.jpeg?auto=compress&cs=tinysrgb&h=200&w=200',
    quote:
      'Fredrick transformed our reporting process. The dashboards he built gave us real-time visibility into our KPIs and saved our team 15+ hours every week. Truly exceptional work.',
    rating: 5,
  },
  {
    name: 'James Okonkwo',
    role: 'Founder, Nexa Digital',
    image:
      'https://images.pexels.com/photos/28442318/pexels-photo-28442318.jpeg?auto=compress&cs=tinysrgb&h=200&w=200',
    quote:
      'The GoHighLevel automation Fredrick set up completely changed how we handle leads. Our conversion rate jumped 40% and the whole pipeline runs on autopilot now.',
    rating: 5,
  },
  {
    name: 'Amara Johnson',
    role: 'Marketing Director, Lumen Co.',
    image:
      'https://images.pexels.com/photos/8312669/pexels-photo-8312669.jpeg?auto=compress&cs=tinysrgb&h=200&w=200',
    quote:
      'Our new website is stunning, fast, and actually converts. Fredrick understood our brand instantly and delivered something that exceeded every expectation.',
    rating: 5,
  },
  {
    name: 'David Chen',
    role: 'COO, Meridian Group',
    image:
      'https://images.pexels.com/photos/5308640/pexels-photo-5308640.jpeg?auto=compress&cs=tinysrgb&h=200&w=200',
    quote:
      'Working with Fredrick was effortless. Clear communication, on-time delivery, and the analytics solution he built became central to our decision-making process.',
    rating: 5,
  },
  {
    name: 'Priya Sharma',
    role: 'Operations Lead, Vertex Labs',
    image:
      'https://images.pexels.com/photos/13392786/pexels-photo-13392786.png?auto=compress&cs=tinysrgb&h=200&w=200',
    quote:
      'The workflow automation Fredrick implemented eliminated so many manual tasks. Our team can finally focus on strategy instead of data entry. Highly recommend.',
    rating: 5,
  },
  {
    name: 'Marcus Williams',
    role: 'Owner, Apex Realty',
    image:
      'https://images.pexels.com/photos/37273005/pexels-photo-37273005.png?auto=compress&cs=tinysrgb&h=200&w=200',
    quote:
      'From the website to the CRM automation, Fredrick delivered a complete digital transformation. Our lead response time went from days to minutes. Incredible ROI.',
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="section-pad relative">
      <div className="container-max">
        <SectionHeading
          eyebrow="Testimonials"
          title="What clients say about working with me"
          description="Real feedback from business owners and leaders who've worked with me across analytics, development, and automation."
        />

        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-16 columns-1 gap-6 sm:columns-2 lg:columns-3"
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              variants={fadeUp}
              className="card-glow group mb-6 break-inside-avoid rounded-3xl border border-border/60 bg-card/40 p-7 backdrop-blur-md transition-colors hover:border-primary/40"
            >
              <Quote className="h-8 w-8 text-primary/30" />
              <p className="mt-4 text-sm leading-relaxed text-foreground/90">
                "{t.quote}"
              </p>
              <div className="mt-5 flex items-center gap-3">
                <img
                  src={t.image}
                  alt={t.name}
                  loading="lazy"
                  className="h-11 w-11 rounded-full object-cover ring-2 ring-primary/20"
                />
                <div className="flex-1">
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-3.5 w-3.5 fill-primary text-primary"
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
