import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

const TermsOfService: React.FC = () => {
  const lastUpdated = "February 3, 2026" // Updated

  return (
    <>
      <Helmet>
        <title>Terms of Service | Vrontis MUN</title>
        <meta name="description" content="Terms of Service for Vrontis Model United Nations Conference" />
      </Helmet>

      <div className="min-h-screen py-24 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-heading text-aegis-brown mb-4">
              Terms of Service
            </h1>
            <p className="text-aegis-off-white/70 text-sm">
              Last Updated: {lastUpdated}
            </p>
          </div>

          {/* Content */}
          <div className="bg-aegis-black/40 rounded-2xl border border-aegis-brown/20 p-8 sm:p-12 space-y-10">

            {/* Preamble */}
            <section>
              <h2 className="text-2xl font-heading text-aegis-white mb-4">1. Preamble and Definitions</h2>
              <div className="text-aegis-off-white space-y-4 text-sm leading-relaxed">
                <p>
                  These Terms of Service ("Agreement" or "Terms") constitute a legally binding agreement between Vrontis Model United Nations ("Vrontis MUN," "the Organizers," "we," "us," or "our") and the individual or entity ("Participant," "Delegate," "Registrant," "you," or "your") accessing, registering for, or participating in the Vrontis Model United Nations Conference ("Conference" or "Event").
                </p>
                <p>
                  By registering for, attending, or participating in the Conference in any capacity, you hereby expressly acknowledge, accept, and agree to be bound by these Terms in their entirety, without limitation or qualification. If you are registering on behalf of a minor, you represent and warrant that you are the legal guardian or parent of such minor and have the legal authority to bind the minor to these Terms.
                </p>
                <p>
                  These Terms shall be governed by and construed in accordance with the laws of the Republic of India, including but not limited to the Indian Contract Act, 1872, the Consumer Protection Act, 2019, and any other applicable statutes, rules, and regulations.
                </p>
              </div>
            </section>

            {/* Eligibility */}
            <section>
              <h2 className="text-2xl font-heading text-aegis-white mb-4">2. Eligibility and Registration</h2>
              <div className="text-aegis-off-white space-y-4 text-sm leading-relaxed">
                <p>
                  2.1. Participation in the Conference is open to students currently enrolled in recognized educational institutions, subject to verification at the sole discretion of the Organizers.
                </p>
                <p>
                  2.2. Registration shall be deemed complete only upon (a) submission of all requisite information and documentation, (b) receipt of full payment of applicable registration fees, and (c) issuance of written confirmation by the Organizers.
                </p>
                <p>
                  2.3. The Organizers reserve the unilateral right to accept, reject, or cancel any registration at their sole and absolute discretion, with or without cause, and without any obligation to provide reasons therefor.
                </p>
                <p>
                  2.4. All information provided during registration must be accurate, complete, and current. Provision of false, misleading, or incomplete information shall constitute a material breach of these Terms and may result in immediate termination of your participation without refund.
                </p>
              </div>
            </section>

            {/* Fees and Payment */}
            <section>
              <h2 className="text-2xl font-heading text-aegis-white mb-4">3. Registration Fees and Payment Terms</h2>
              <div className="text-aegis-off-white space-y-4 text-sm leading-relaxed">
                <p>
                  3.1. Registration fees, as published on the official Vrontis MUN website or communicated through official channels, are payable in Indian Rupees (INR) and are exclusive of any applicable taxes, duties, or levies unless otherwise expressly stated.
                </p>
                <p>
                  3.2. Payment must be made through approved payment methods as specified by the Organizers. All payments are subject to verification and clearance before registration is confirmed.
                </p>
                <p>
                  3.3. The Organizers may, at their sole discretion, offer early bird discounts, group discounts, or other promotional pricing, subject to specific terms and conditions that shall apply in addition to these Terms.
                </p>
              </div>
            </section>

            {/* Refund Policy - Key Section */}
            <section className="border-2 border-aegis-brown/40 rounded-xl p-6 bg-aegis-brown/5">
              <h2 className="text-2xl font-heading text-aegis-white mb-4">
                4. Refund and Cancellation Policy
              </h2>
              <div className="text-aegis-off-white space-y-4 text-sm leading-relaxed">
                <p className="font-semibold text-aegis-brown">
                  IMPORTANT: PLEASE READ THIS SECTION CAREFULLY BEFORE REGISTERING.
                </p>
                <p>
                  4.1. <span className="font-semibold text-aegis-white">General No-Refund Policy:</span> Subject to the provisions of Clause 4.5 and applicable law, all registration fees paid to Vrontis MUN are non-refundable. Once payment has been received and processed by the Organizers, no refund, whether full, partial, or pro-rata, shall ordinarily be issued.
                </p>
                <p>
                  4.2. <span className="font-semibold text-aegis-white">Scope of Non-Refundable Circumstances:</span> Without prejudice to the generality of Clause 4.1, registration fees shall not be refunded for reasons including but not limited to: personal circumstances; scheduling conflicts; inability to attend due to third-party obligations or approvals; logistical or travel-related impediments; changes in financial circumstances; withdrawal of intent to participate; dissatisfaction with any allocation, assignment, or aspect of the Conference; delays, postponements, rescheduling, or modifications to the Conference by the Organizers; partial attendance; technical difficulties affecting participation; or disciplinary actions under these Terms.
                </p>
                <p>
                  4.3. <span className="font-semibold text-aegis-white">Non-Transferability of Registration:</span> Registrations are strictly non-transferable. A registered Participant may not assign, transfer, sell, or otherwise dispose of their registration to any other individual or entity without the prior written consent of the Organizers, which may be granted or withheld at their absolute discretion.
                </p>
                <p>
                  4.4. <span className="font-semibold text-aegis-white">Conference Cancellation by Organizers:</span> In the unlikely event that the Organizers are compelled to cancel the Conference in its entirety and no rescheduled date is announced, the Organizers may, at their sole discretion, offer registered Participants either (a) a credit for a future Vrontis MUN event of equivalent value, or (b) a refund of the registration fee, less any non-recoverable expenses already incurred. The decision regarding the form and amount of any such compensation shall rest exclusively with the Organizers.
                </p>
                <p>
                  4.5. <span className="font-semibold text-aegis-white">Discretionary Refunds:</span> Notwithstanding the foregoing provisions, the Organizers reserve the right, in their sole and absolute discretion, to issue full or partial refunds in exceptional circumstances as may be announced or communicated by the Organizers from time to time. Any such discretionary refund shall not constitute a waiver of this policy nor establish any precedent for future refund requests.
                </p>
                <p>
                  4.6. <span className="font-semibold text-aegis-white">Acknowledgment:</span> By completing registration, you expressly acknowledge that you have read, understood, and agree to be bound by this Refund and Cancellation Policy, and you waive any right to dispute or contest the application of this policy except as expressly provided herein.
                </p>
              </div>
            </section>

            {/* Code of Conduct */}
            <section>
              <h2 className="text-2xl font-heading text-aegis-white mb-4">5. Code of Conduct and Participant Obligations</h2>
              <div className="text-aegis-off-white space-y-4 text-sm leading-relaxed">
                <p>
                  5.1. Participants shall at all times conduct themselves in a manner consistent with the dignity, decorum, and professional standards expected of a Model United Nations conference.
                </p>
                <p>
                  5.2. Participants shall refrain from any behaviour that is discriminatory, harassing, abusive, threatening, defamatory, obscene, or otherwise objectionable on the basis of race, ethnicity, nationality, religion, gender, sexual orientation, disability, or any other protected characteristic.
                </p>
                <p>
                  5.3. The following conduct is expressly prohibited and shall constitute grounds for immediate expulsion without refund:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Plagiarism or academic dishonesty in position papers, resolutions, or other submissions;</li>
                  <li>Possession or consumption of alcohol, tobacco products, or any controlled substances on Conference premises;</li>
                  <li>Physical altercations, violence, or threats of violence;</li>
                  <li>Sexual harassment or misconduct of any nature;</li>
                  <li>Damage to Conference property or venue facilities;</li>
                  <li>Disruption of Conference proceedings or obstruction of other Participants;</li>
                  <li>Unauthorized recording, photography, or streaming of Conference sessions;</li>
                  <li>Any violation of applicable laws or regulations.</li>
                </ul>
                <p>
                  5.4. The Organizers reserve the right to remove or expel any Participant who, in their sole judgment, violates these Terms or the Code of Conduct, without any obligation to provide a refund or compensation.
                </p>
              </div>
            </section>

            {/* Intellectual Property */}
            <section>
              <h2 className="text-2xl font-heading text-aegis-white mb-4">6. Intellectual Property Rights</h2>
              <div className="text-aegis-off-white space-y-4 text-sm leading-relaxed">
                <p>
                  6.1. All intellectual property rights in materials provided by the Organizers, including but not limited to study guides, background guides, rules of procedure, and Conference branding, remain the exclusive property of Vrontis MUN.
                </p>
                <p>
                  6.2. By submitting position papers, draft resolutions, working papers, or any other materials, Participants grant Vrontis MUN a non-exclusive, royalty-free, perpetual, irrevocable license to use, reproduce, modify, publish, and distribute such materials for educational and promotional purposes.
                </p>
                <p>
                  6.3. Participants warrant that any materials submitted are original works or that they have obtained all necessary permissions and licenses for any third-party content incorporated therein.
                </p>
              </div>
            </section>

            {/* Photography and Media */}
            <section>
              <h2 className="text-2xl font-heading text-aegis-white mb-4">7. Photography, Videography, and Media Release</h2>
              <div className="text-aegis-off-white space-y-4 text-sm leading-relaxed">
                <p>
                  7.1. By registering for and attending the Conference, Participants grant Vrontis MUN the irrevocable right and permission to record, photograph, and video their likeness, voice, and participation.
                </p>
                <p>
                  7.2. Vrontis MUN may use such media for promotional, educational, and archival purposes across all media platforms, including but not limited to websites, social media, print publications, and broadcast media, without any requirement for further consent, payment, or attribution.
                </p>
                <p>
                  7.3. Participants waive any right to inspect, approve, or claim compensation for the use of such media.
                </p>
              </div>
            </section>

            {/* Liability */}
            <section>
              <h2 className="text-2xl font-heading text-aegis-white mb-4">8. Limitation of Liability and Indemnification</h2>
              <div className="text-aegis-off-white space-y-4 text-sm leading-relaxed">
                <p>
                  8.1. TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, VRONTIS MUN, ITS ORGANIZERS, OFFICERS, DIRECTORS, EMPLOYEES, VOLUNTEERS, AND AGENTS SHALL NOT BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR IN CONNECTION WITH PARTICIPATION IN THE CONFERENCE.
                </p>
                <p>
                  8.2. Without limiting the foregoing, Vrontis MUN shall not be liable for:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Personal injury, illness, or death occurring during or in connection with the Conference;</li>
                  <li>Loss, theft, or damage to personal property;</li>
                  <li>Any acts or omissions of third parties, including venue operators, caterers, or transportation providers;</li>
                  <li>Technical failures or interruptions affecting online or hybrid components;</li>
                  <li>Any delay, postponement, or cancellation of the Conference.</li>
                </ul>
                <p>
                  8.3. Participants agree to indemnify, defend, and hold harmless Vrontis MUN and its associated parties from and against any and all claims, damages, losses, liabilities, costs, and expenses (including reasonable legal fees) arising from their participation in the Conference or any breach of these Terms.
                </p>
              </div>
            </section>

            {/* Data Protection */}
            <section>
              <h2 className="text-2xl font-heading text-aegis-white mb-4">9. Data Protection and Privacy</h2>
              <div className="text-aegis-off-white space-y-4 text-sm leading-relaxed">
                <p>
                  9.1. Personal data collected during registration and participation shall be processed in accordance with applicable data protection laws, including the Information Technology Act, 2000, and the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011.
                </p>
                <p>
                  9.2. By registering, Participants consent to the collection, storage, processing, and use of their personal data for purposes related to the Conference, including communication, logistics, and administration.
                </p>
                <p>
                  9.3. For details on data handling practices, please refer to our Privacy Policy available on the Vrontis MUN website.
                </p>
              </div>
            </section>

            {/* Force Majeure */}
            <section>
              <h2 className="text-2xl font-heading text-aegis-white mb-4">10. Force Majeure</h2>
              <div className="text-aegis-off-white space-y-4 text-sm leading-relaxed">
                <p>
                  10.1. Vrontis MUN shall not be held liable for any failure or delay in performance of its obligations under these Terms if such failure or delay results from circumstances beyond its reasonable control, including but not limited to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Natural disasters, epidemics, pandemics, or public health emergencies;</li>
                  <li>Acts of war, terrorism, civil unrest, or armed conflict;</li>
                  <li>Governmental orders, regulations, or restrictions;</li>
                  <li>Strikes, lockouts, or labour disputes;</li>
                  <li>Failure of utilities or telecommunications infrastructure;</li>
                  <li>Any other event beyond the reasonable control of the Organizers.</li>
                </ul>
                <p>
                  10.2. In the event of force majeure, the Organizers may, at their sole discretion, postpone, reschedule, modify, or cancel the Conference without any liability to provide refunds or compensation.
                </p>
              </div>
            </section>

            {/* Dispute Resolution */}
            <section>
              <h2 className="text-2xl font-heading text-aegis-white mb-4">11. Dispute Resolution and Governing Law</h2>
              <div className="text-aegis-off-white space-y-4 text-sm leading-relaxed">
                <p>
                  11.1. These Terms shall be governed by and construed in accordance with the laws of India, without regard to conflict of law principles.
                </p>
                <p>
                  11.2. Any dispute, controversy, or claim arising out of or relating to these Terms or the Conference shall be resolved through good-faith negotiations between the parties.
                </p>
                <p>
                  11.3. If the dispute cannot be resolved through negotiation within thirty (30) days, either party may submit the dispute to binding arbitration in accordance with the Arbitration and Conciliation Act, 1996, as amended. The seat of arbitration shall be New Delhi, India, and the proceedings shall be conducted in English.
                </p>
                <p>
                  11.4. Subject to Clause 11.3, the courts of New Delhi, India, shall have exclusive jurisdiction over any matters arising out of or in connection with these Terms.
                </p>
              </div>
            </section>

            {/* Amendments */}
            <section>
              <h2 className="text-2xl font-heading text-aegis-white mb-4">12. Amendments and Modifications</h2>
              <div className="text-aegis-off-white space-y-4 text-sm leading-relaxed">
                <p>
                  12.1. Vrontis MUN reserves the right to modify, amend, or update these Terms at any time without prior notice.
                </p>
                <p>
                  12.2. Continued participation in the Conference after any such modification shall constitute acceptance of the revised Terms.
                </p>
                <p>
                  12.3. It is the Participant's responsibility to review these Terms periodically for any changes.
                </p>
              </div>
            </section>

            {/* Severability */}
            <section>
              <h2 className="text-2xl font-heading text-aegis-white mb-4">13. Severability and Waiver</h2>
              <div className="text-aegis-off-white space-y-4 text-sm leading-relaxed">
                <p>
                  13.1. If any provision of these Terms is found to be invalid, illegal, or unenforceable by a court of competent jurisdiction, such invalidity shall not affect the validity of the remaining provisions, which shall continue in full force and effect.
                </p>
                <p>
                  13.2. The failure of Vrontis MUN to enforce any right or provision of these Terms shall not constitute a waiver of such right or provision unless acknowledged and agreed to in writing.
                </p>
              </div>
            </section>

            {/* Entire Agreement */}
            <section>
              <h2 className="text-2xl font-heading text-aegis-white mb-4">14. Entire Agreement</h2>
              <div className="text-aegis-off-white space-y-4 text-sm leading-relaxed">
                <p>
                  14.1. These Terms, together with the Privacy Policy and any other policies or rules published by Vrontis MUN, constitute the entire agreement between the parties with respect to the subject matter hereof and supersede all prior or contemporaneous understandings, agreements, representations, and warranties, whether written or oral.
                </p>
              </div>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-2xl font-heading text-aegis-white mb-4">15. Contact Information</h2>
              <div className="text-aegis-off-white space-y-4 text-sm leading-relaxed">
                <p>
                  For questions, concerns, or communications regarding these Terms, please contact:
                </p>
                <div className="bg-aegis-brown/10 rounded-lg p-4 border border-aegis-brown/20">
                  <p className="font-semibold text-aegis-white">Vrontis Model United Nations</p>
                  <p>Email: <a href="mailto:vrontismun@gmail.com" className="text-aegis-brown hover:underline">vrontismun@gmail.com</a></p>
                  <p>Instagram: <a href="https://instagram.com/vrontis.mun" target="_blank" rel="noopener noreferrer" className="text-aegis-brown hover:underline">@vrontis.mun</a></p>
                </div>
              </div>
            </section>

            {/* Acknowledgment */}
            <section className="border-t border-aegis-brown/20 pt-8">
              <div className="text-aegis-off-white space-y-4 text-sm leading-relaxed text-center">
                <p className="italic">
                  BY REGISTERING FOR, ATTENDING, OR PARTICIPATING IN VRONTIS MODEL UNITED NATIONS, YOU ACKNOWLEDGE THAT YOU HAVE READ, UNDERSTOOD, AND AGREE TO BE BOUND BY THESE TERMS OF SERVICE IN THEIR ENTIRETY.
                </p>
              </div>
            </section>

            {/* Back Link */}
            <div className="text-center pt-6">
              <Link
                to="/"
                className="inline-flex items-center text-aegis-brown hover:text-aegis-brown/80 transition-colors duration-300"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Return to Home
              </Link>
            </div>

          </div>
        </motion.div>
      </div>
    </>
  )
}

export default TermsOfService
