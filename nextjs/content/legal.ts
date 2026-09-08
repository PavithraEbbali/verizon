/**
 * The nine footer policy documents.
 *
 * Copy is written once with `{{token}}` placeholders and rendered through
 * `renderTokens` from `lib/site.ts`, so entity name, address, phone number and
 * email addresses come from `OPERATOR`/`PHONE` and never from this file.
 *
 * These are original starting templates, not legal advice. Have counsel review
 * and adapt them to your jurisdiction before publication.
 */

export interface LegalDoc {
  title: string;
  updated: string;
  description: string;
  /** HTML body. Tokens are substituted at render time. */
  body: string;
}

export const legal: Record<string, LegalDoc> = {
  privacy: {
    title: "Privacy Policy",
    updated: "September 7, 2026",
    description:
      "How {{entity}}, an independent authorized retailer of Verizon® services, collects, uses, and protects personal information.",
    body: `
      <p>{{entity}} ("we," "us," or "our") is an independent authorized retailer of Verizon® services. We are not Verizon Communications Inc. This policy describes what we collect when you call our order line or use this website, why we collect it, and the choices you have.</p>

      <h2>1. Information we collect</h2>
      <ul>
        <li><strong>Order information you give us on the phone</strong> — your name, service address, contact phone number, and email, so an agent can check availability and place a Verizon order.</li>
        <li><strong>Service interest</strong> — the internet, TV, mobile, or home phone products you ask about.</li>
        <li><strong>Website usage data</strong> — basic analytics such as pages viewed and referring source, collected through cookies and similar technologies. See our <a href="/legal/cookies">Cookies</a> notice.</li>
        <li><strong>Call records</strong> — where calls are recorded for quality and training, you are notified at the start of the call.</li>
      </ul>
      <p>We do not collect payment card numbers on this website. This site has no checkout and no account login.</p>

      <h2>2. How we use it</h2>
      <ul>
        <li>To confirm Verizon service availability for your exact address.</li>
        <li>To place and track the new Verizon order you asked us to place.</li>
        <li>To contact you about that order, subject to our <a href="/legal/tcpa">TCPA</a> policy.</li>
        <li>To meet our record-keeping and legal obligations as an authorized retailer.</li>
      </ul>

      <h2>3. How we share it</h2>
      <p>We share order information with Verizon, because Verizon is the party that provisions and bills the service you are ordering. Once your order is submitted, Verizon processes your information under its own privacy policy and your account relationship is with Verizon. We also use service providers (telephony, analytics, CRM) bound by confidentiality obligations, and we disclose information where required by law. <strong>We do not sell your personal information.</strong> See <a href="/legal/do-not-sell">Do Not Sell or Share My Personal Information</a>.</p>

      <h2>4. Your choices</h2>
      <p>Depending on where you live, you may have the right to access, correct, delete, or limit the use of your personal information, and to opt out of certain sharing. To exercise these rights, email <a href="mailto:{{privacyEmail}}">{{privacyEmail}}</a> or call {{phone}}. We respond within the timeframes applicable law requires, and we will not discriminate against you for exercising a right.</p>

      <h2>5. Retention and security</h2>
      <p>We keep order information only as long as needed for the purpose described here or as required by law, then delete or de-identify it. We use administrative, technical, and physical safeguards to protect it. No method of transmission or storage is perfectly secure.</p>

      <h2>6. Children</h2>
      <p>Our services are intended for adults who can enter into a service agreement. We do not knowingly collect personal information from children under 13.</p>

      <h2>7. Changes</h2>
      <p>We may update this policy. The "last updated" date above shows the latest revision, and material changes are posted on this page.</p>

      <h2>8. Contact</h2>
      <p>{{entity}}, {{address}} · <a href="mailto:{{privacyEmail}}">{{privacyEmail}}</a> · {{phone}}</p>
    `,
  },

  terms: {
    title: "Terms of Use",
    updated: "September 7, 2026",
    description:
      "The terms governing your use of the {{entity}} website and order line.",
    body: `
      <p>These terms govern your use of this website and our order line, both operated by {{entity}}, an independent authorized retailer of Verizon® services. By using either, you agree to them.</p>

      <h2>1. What we are</h2>
      <p>{{entity}} is an independent business authorized to sell Verizon® services. <strong>We are not Verizon Communications Inc.</strong> We do not provide the underlying network service. When you order through us, your service agreement, your account, and your bill are with Verizon.</p>

      <h2>2. What this website is for</h2>
      <p>This site describes Verizon services we are authorized to sell and provides a phone number for placing new orders. It is informational. It is not an offer of service, and submitting a ZIP code on this site does not create an order, a reservation, or a service commitment.</p>

      <h2>3. Pricing and availability</h2>
      <p>All pricing, speeds, promotional terms, channel counts, and equipment terms shown here are set by Verizon and are subject to change by Verizon without notice to us. Rates shown assume Auto Pay with paperless billing where stated and exclude taxes, government fees, and surcharges. Availability varies by exact service address. The controlling terms are those Verizon presents to you at the point of order.</p>

      <h2>4. Acceptable use</h2>
      <p>Do not use this site to attempt unauthorized access, to interfere with its operation, to scrape it at a rate that degrades service, or for any unlawful purpose.</p>

      <h2>5. Intellectual property</h2>
      <p>The {{brand}} name, this site's design, and its original text are owned by {{entity}}. Third-party marks appearing here belong to their owners; see <a href="/legal/trademarks">Trademarks</a>.</p>

      <h2>6. Disclaimer and limitation of liability</h2>
      <p>This website is provided "as is" without warranties of any kind. To the fullest extent permitted by law, {{entity}} is not liable for any loss arising from reliance on information presented here. See our <a href="/legal/disclaimer">Disclaimer</a>.</p>

      <h2>7. Changes to these terms</h2>
      <p>We may revise these terms. Continued use of the site after a revision constitutes acceptance of it.</p>

      <h2>8. Contact</h2>
      <p>{{entity}}, {{address}} · <a href="mailto:{{legalEmail}}">{{legalEmail}}</a> · {{phone}}</p>
    `,
  },

  "do-not-sell": {
    title: "Do Not Sell or Share My Personal Information",
    updated: "September 7, 2026",
    description:
      "Your right to opt out of the sale or sharing of personal information by {{entity}}.",
    body: `
      <p>Certain state privacy laws give you the right to opt out of the "sale" or "sharing" of your personal information, including sharing for cross-context behavioral advertising.</p>

      <h2>1. Our position</h2>
      <p><strong>{{entity}} does not sell your personal information for money.</strong> We share order information with Verizon because Verizon is the party that provisions the service you asked us to order — that is a service transaction, not a sale.</p>

      <h2>2. Advertising technologies</h2>
      <p>Where this site uses advertising or analytics cookies, some state laws may treat that as "sharing" for cross-context behavioral advertising. You can opt out at any time using the methods below.</p>

      <h2>3. How to opt out</h2>
      <ul>
        <li>Email <a href="mailto:{{privacyEmail}}">{{privacyEmail}}</a> with the subject line "Do Not Sell or Share."</li>
        <li>Call {{phone}} and tell the agent you are making an opt-out request.</li>
        <li>Enable a Global Privacy Control signal in your browser. We honor GPC signals where required.</li>
        <li>Decline non-essential cookies where a consent banner is presented.</li>
      </ul>
      <p>We do not require you to create an account to submit a request. An authorized agent may submit on your behalf with proof of authorization.</p>

      <h2>4. Verification and response</h2>
      <p>We may ask for information sufficient to verify that the request comes from you or your authorized agent. We respond within the timeframe applicable law requires. We will not discriminate against you for exercising this right.</p>

      <h2>5. Your other rights</h2>
      <p>Rights of access, correction, deletion, and limitation are described in our <a href="/legal/privacy">Privacy Policy</a>.</p>

      <h2>6. Contact</h2>
      <p>{{entity}}, {{address}} · <a href="mailto:{{privacyEmail}}">{{privacyEmail}}</a> · {{phone}}</p>
    `,
  },

  tcpa: {
    title: "TCPA Policy",
    updated: "September 7, 2026",
    description:
      "How {{entity}} obtains consent for calls and texts, and how to opt out.",
    body: `
      <p>{{entity}} complies with the Telephone Consumer Protection Act (TCPA) and related regulations. This policy explains how we obtain consent to contact you and how to withdraw it.</p>

      <h2>1. Consent</h2>
      <p>When you call our order line, or provide your number and agree to be contacted, you consent to receive calls and text messages from {{entity}} about your order at the number you provided — including through automated technology. <strong>Consent is not a condition of purchase.</strong> Standard message and data rates may apply.</p>

      <h2>2. What we send</h2>
      <ul>
        <li>Responses to your availability and pricing questions.</li>
        <li>Order status, installation scheduling, and appointment reminders.</li>
        <li>Occasional offers, only where you have separately agreed to receive them.</li>
      </ul>

      <h2>3. How to opt out</h2>
      <p>Reply <strong>STOP</strong> to any text message from us to stop texts. Reply <strong>HELP</strong> for help. To stop calls, tell the agent you want to be added to our internal do-not-call list, or email <a href="mailto:{{optOutEmail}}">{{optOutEmail}}</a>. Opting out of marketing does not stop transactional messages about an order you actively placed.</p>

      <h2>4. Frequency and records</h2>
      <p>Message frequency varies with your interactions with us. We maintain records of consent and of opt-out requests, and we honor opt-outs promptly. We do not sell your phone number to third parties for their marketing.</p>

      <h2>5. Call recording</h2>
      <p>Calls to our order line may be recorded or monitored for quality and training. Where recording occurs, you are notified at the start of the call.</p>

      <h2>6. Carrier notice</h2>
      <p>Carriers are not liable for delayed or undelivered messages.</p>

      <h2>7. Contact</h2>
      <p><a href="mailto:{{optOutEmail}}">{{optOutEmail}}</a> · {{phone}} · {{entity}}, {{address}}</p>
    `,
  },

  trademarks: {
    title: "Trademarks",
    updated: "September 7, 2026",
    description:
      "Trademark and brand-usage notice for {{entity}}, an independent authorized retailer of Verizon® services.",
    body: `
      <h2>1. Verizon marks</h2>
      <p>{{trademark}} Fios TV, Fios Digital Voice, 5G Home Internet, and myPlan are likewise marks of Verizon or its affiliates.</p>

      <h2>2. How we use them</h2>
      <p>{{entity}} uses the Verizon marks solely to identify the genuine Verizon products and services we are authorized to sell, in accordance with the brand-usage guidelines applicable to our retailer authorization. We display our own {{brand}} wordmark as the operator of this site; we do not present the Verizon logo as our own identity.</p>

      <h2>3. No affiliation or endorsement implied</h2>
      <p>{{entity}} is an <strong>independent authorized retailer</strong> and is <strong>not</strong> Verizon Communications Inc. Use of the Verizon marks does not imply that Verizon produced, reviewed, or endorsed this website. Verizon is not responsible for the content of this site.</p>

      <h2>4. Other trademarks</h2>
      <p>Disney+, Hulu, ESPN+, Netflix, Max, Apple One, Apple Music, Apple TV+, Apple Arcade, and iCloud+ are trademarks of their respective owners. Their appearance here identifies services available as Verizon myPlan perks and does not indicate sponsorship or partnership.</p>

      <h2>5. Our own brand</h2>
      <p>The {{brand}} name, this site's design, and its original text are owned by {{entity}} and may not be reused without permission.</p>

      <h2>6. Rights-holder enquiries</h2>
      <p>If you are a rights holder with a question about how a mark appears here, email <a href="mailto:{{legalEmail}}">{{legalEmail}}</a> and we will respond promptly.</p>
    `,
  },

  accessibility: {
    title: "Accessibility",
    updated: "September 7, 2026",
    description:
      "{{entity}}'s commitment to making this website usable by everyone, and how to report a barrier.",
    body: `
      <p>{{entity}} works to make this website usable by everyone, including people who use assistive technology.</p>

      <h2>1. Standard we aim for</h2>
      <p>We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA. That covers colour contrast, keyboard operability, text alternatives, and content that adapts without loss of information.</p>

      <h2>2. Measures we have taken</h2>
      <ul>
        <li>Semantic headings and landmark regions throughout the page.</li>
        <li>Full keyboard operability, with a visible focus indicator on every interactive element.</li>
        <li>Prices announced to screen readers as complete sentences rather than as fragmented visual pieces.</li>
        <li>Motion limited to brief entrance transitions, all of which are disabled when your system requests reduced motion.</li>
        <li>Text alternatives on meaningful images; decorative graphics hidden from assistive technology.</li>
        <li>The order line itself, which is an accessible route to everything on this page — call {{phone}} and an agent will read out any information you need.</li>
      </ul>

      <h2>3. Known limitations</h2>
      <p>Third-party content we embed may not fully meet our standard. We work with those providers to improve it.</p>

      <h2>4. Report a barrier</h2>
      <p>If any part of this site blocks you, tell us and we will fix it. Email <a href="mailto:{{email}}">{{email}}</a> or call {{phone}} ({{hours}}). Please describe the page and what you were trying to do. We aim to acknowledge accessibility reports within five business days.</p>

      <h2>5. Formal complaints</h2>
      <p>If our response does not resolve the issue, write to {{entity}}, {{address}}.</p>
    `,
  },

  cookies: {
    title: "Cookies",
    updated: "September 7, 2026",
    description:
      "How {{entity}} uses cookies and similar technologies, and how to control them.",
    body: `
      <p>This notice explains how {{entity}} uses cookies on this website. Read it alongside our <a href="/legal/privacy">Privacy Policy</a>.</p>

      <h2>1. What cookies are</h2>
      <p>Cookies are small text files stored on your device when you visit a site. Similar technologies include pixels, local storage, and tags.</p>

      <h2>2. Categories we use</h2>
      <ul>
        <li><strong>Strictly necessary</strong> — required for the site to function and to remember your cookie choices. These cannot be switched off.</li>
        <li><strong>Analytics</strong> — aggregate measurement of which pages are viewed and how the site performs.</li>
        <li><strong>Advertising</strong> — where enabled, these measure the effectiveness of advertising that brought you here. We set these only with consent where consent is required.</li>
      </ul>

      <h2>3. Call tracking</h2>
      <p>Tap-to-call links on this site carry a tracking attribute so we can measure which sections of the page lead to calls. This measures the interaction with the page. It does not record the content of your call; call recording is covered by our <a href="/legal/tcpa">TCPA Policy</a>.</p>

      <h2>4. Third-party cookies</h2>
      <p>Analytics and advertising providers we use may set their own cookies under their own policies. We do not control cookies set by external sites you reach through links here.</p>

      <h2>5. Managing cookies</h2>
      <p>Control and delete cookies through your browser settings, and update your choices in any consent banner we present. Blocking some cookies may affect how the site works. To opt out of advertising-related sharing, see <a href="/legal/do-not-sell">Do Not Sell or Share My Personal Information</a>.</p>

      <h2>6. Global Privacy Control</h2>
      <p>We honor GPC browser signals where applicable law requires it.</p>

      <h2>7. Contact</h2>
      <p><a href="mailto:{{privacyEmail}}">{{privacyEmail}}</a></p>
    `,
  },

  disclaimer: {
    title: "Disclaimer",
    updated: "September 7, 2026",
    description:
      "Legal disclaimer for {{entity}} — independence from Verizon, accuracy, and pricing.",
    body: `
      <h2>1. Independent retailer</h2>
      <p>{{entity}} is an <strong>independent authorized retailer</strong> of Verizon® services. We are a separate business and are <strong>not</strong> Verizon Communications Inc., nor are we owned or operated by Verizon. References to Verizon products describe services Verizon offers and that we are authorized to sell. Verizon is not responsible for the content of this website.</p>

      <h2>2. This line is for new orders</h2>
      <p>Our order line places new Verizon orders. If you are already a Verizon customer with a billing question, a service outage, or an account change, contact Verizon customer support directly. We cannot access your existing Verizon account.</p>

      <h2>3. Accuracy of information</h2>
      <p>Plans, pricing, promotions, speed tiers, channel counts, and equipment terms are set by Verizon and can change at any time without notice. Figures on this site are presented for general information and were accurate to the best of our knowledge on the date shown above. The controlling terms are those Verizon provides at the point of order.</p>

      <h2>4. Pricing</h2>
      <p>Prices exclude taxes, government fees, and surcharges unless expressly stated. Advertised rates generally require Auto Pay with paperless billing and may require an eligible Verizon mobile plan on the same account. Post-promotional rates are disclosed in the fine-print table on our home page. Final pricing is confirmed by Verizon when your order is placed.</p>

      <h2>5. Speed and coverage claims</h2>
      <p>Statements about fiber, 5G Ultra Wideband, speeds, and coverage describe Verizon's network as published by Verizon. Actual performance varies by address, equipment, in-home wiring, and network conditions. Fios speeds are tier maximums; 5G Home speeds are typical ranges.</p>

      <h2>6. Limitation of liability</h2>
      <p>To the fullest extent permitted by law, {{entity}} is not liable for loss arising from reliance on information on this site, which is provided "as is" without warranties of any kind.</p>

      <h2>7. Contact</h2>
      <p><a href="mailto:{{email}}">{{email}}</a> · {{phone}}</p>
    `,
  },

  contact: {
    title: "Contact",
    updated: "September 7, 2026",
    description:
      "How to reach {{entity}} — order line, email, and registered business address.",
    body: `
      <h2>1. New Verizon orders</h2>
      <p>Call <strong>{{phone}}</strong>. {{hours}}. Trained sales agents on the order line will confirm availability for your exact address and place the order with Verizon.</p>

      <h2>2. Already a Verizon customer?</h2>
      <p>For billing questions, outages, plan changes, or anything on an existing account, <strong>contact Verizon customer support directly</strong>. Our line is exclusively for new orders and cannot access your Verizon account.</p>

      <h2>3. Email</h2>
      <ul>
        <li>General enquiries — <a href="mailto:{{email}}">{{email}}</a></li>
        <li>Privacy and data rights — <a href="mailto:{{privacyEmail}}">{{privacyEmail}}</a></li>
        <li>Marketing opt-out — <a href="mailto:{{optOutEmail}}">{{optOutEmail}}</a></li>
        <li>Legal and trademark — <a href="mailto:{{legalEmail}}">{{legalEmail}}</a></li>
      </ul>

      <h2>4. Registered business address</h2>
      <p>{{entity}}<br />{{address}}</p>
      <p>This is our registered business address for correspondence. It is not a retail store, and service is not sold or installed at this location.</p>

      <h2>5. Accessibility</h2>
      <p>To report an accessibility barrier on this site, see our <a href="/legal/accessibility">Accessibility</a> statement.</p>
    `,
  },
};

export const legalSlugs = Object.keys(legal);
