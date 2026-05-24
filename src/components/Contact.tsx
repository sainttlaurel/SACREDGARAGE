import { motion } from 'framer-motion'
import { Mail, Phone, MapPin } from 'lucide-react'

const Contact = () => {
  return (
    <section id="contact" className="py-32 bg-background-soft">
      <div className="container-luxury">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div>
              <p className="label-small mb-4">Get In Touch</p>
              <h2 className="heading-section mb-6">
                Let's Talk Cars & Parts
              </h2>
              <p className="text-lg text-foreground-muted">
                Interested in any of our vehicles or parts? Have questions about trade-ins? 
                Send us a message and we'll get back to you ASAP.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center flex-shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="label-small mb-2">Phone / Viber</p>
                  <a href="tel:+639123456789" className="text-lg hover:text-motorsport-red transition-colors">
                    +63 912 345 6789
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center flex-shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="label-small mb-2">Email / Messenger</p>
                  <a href="mailto:hrvdcartrading@gmail.com" className="text-lg hover:text-motorsport-red transition-colors">
                    hrvdcartrading@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center flex-shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="label-small mb-2">Location</p>
                  <p className="text-lg">
                    Quezon City<br />
                    Metro Manila, Philippines
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="card-luxury p-8"
          >
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="label-small block mb-3">First Name</label>
                  <input
                    type="text"
                    className="w-full bg-background border border-border px-4 py-3 focus:outline-none focus:border-foreground transition-colors"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="label-small block mb-3">Last Name</label>
                  <input
                    type="text"
                    className="w-full bg-background border border-border px-4 py-3 focus:outline-none focus:border-foreground transition-colors"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label className="label-small block mb-3">Email</label>
                <input
                  type="email"
                  className="w-full bg-background border border-border px-4 py-3 focus:outline-none focus:border-foreground transition-colors"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="label-small block mb-3">Phone</label>
                <input
                  type="tel"
                  className="w-full bg-background border border-border px-4 py-3 focus:outline-none focus:border-foreground transition-colors"
                  placeholder="+1 (234) 567-890"
                />
              </div>

              <div>
                <label className="label-small block mb-3">Message</label>
                <textarea
                  rows={5}
                  className="w-full bg-background border border-border px-4 py-3 focus:outline-none focus:border-foreground transition-colors resize-none"
                  placeholder="Tell us about your dream vehicle or the parts you're looking for..."
                />
              </div>

              <motion.button
                type="submit"
                className="btn-primary w-full"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Send Inquiry
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
