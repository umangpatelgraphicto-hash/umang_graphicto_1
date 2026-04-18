"use client"
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/utils/footer";
import  { useState } from "react";


const PrivacyPolicyTabPage = () => {
   const [isDropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="bg-white">
      <header className="bg-gray-100 pb-20 w-full">
      <div className="container  mx-auto flex flex-col md:flex-row  justify-between px-4 md:px-28 py-4 relative">
        <div className="flex justify-between ">
          <Image src="/logo/logo.png" alt="Logo" width={180} height={100} />
         
          <button
            onClick={() => setDropdownOpen(!isDropdownOpen)}
            className="md:hidden ml-4 text-gray-700 hover:text-blue-600"
          >
            <Image src="/icon/dropdown.png" alt="Menu" width={20} height={20} />
          </button>
        </div>

      
        {isDropdownOpen && (
          <div className="absolute left-0 right-0 bg-white shadow-lg rounded-md mt-2 z-10 p-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg text-blue-500 font-bold"><Image src="/logo/logo.png" alt="logo" width={100} height={60}></Image></h3>
              <button onClick={() => setDropdownOpen(false)}>
                <Image src="/icon/dropdown.png"  alt="Close" width={20} height={20} />
              </button>
            </div>
            <nav className="flex flex-col items-center mt-2">
              <Link href="/templateshome" className="block w-full text-gray-700 hover:bg-gray-200 px-2 py-1 text-center">
                Templates
              </Link>
              <Link href="/pricing" className="block w-full text-gray-700 hover:bg-gray-200 px-2 py-1 text-center">
                Pricing
              </Link>
              <Link href="/blog" className="block w-full text-gray-700 hover:bg-gray-200 px-2 py-1 text-center">
                Blog
              </Link>
              <div className="flex flex-col mt-2">
                <Link
                  href="/login"
                  className="block w-full text-sm font-extrabold text-blue-500 border border-blue-600 rounded-full hover:bg-blue-300 hover:text-blue-500 px-4 py-2 mb-2 text-center"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="block w-full text-sm font-extrabold text-white bg-blue-600 rounded-full hover:bg-blue-500 px-4 py-2 text-center"
                >
                  Signup
                </Link>
              </div>
            </nav>
          </div>
        )}

      
        <nav className="hidden md:flex flex-row items-center space-x-6 mt-4 md:mt-0">
          <Link href="/templateshome" className="text-gray-700 hover:text-blue-600 hover:border-b-2 hover:border-blue-600">
            Templates
          </Link>
          <Link href="/pricing" className="text-gray-700 hover:text-blue-600 hover:border-b-2 hover:border-blue-600">
            Pricing
          </Link>
          <Link href="/blog" className="text-gray-700 hover:text-blue-600 hover:border-b-2 hover:border-blue-600">
            Blog
          </Link>
          <div className="flex space-x-4">
            <Link
              href="/login"
              className="px-6 py-2 text-sm font-extrabold text-blue-500 border border-blue-600 rounded-full hover:bg-blue-300 hover:text-blue-500"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="px-6 py-2 text-sm font-extrabold text-white bg-blue-600 rounded-full hover:bg-blue-500"
            >
              Signup
            </Link>
          </div>
        </nav>
      </div>
        <h1 className="text-center mt-20 text-4xl font-sans text-[#444F60] ">
          {" "}
          Privacy Policy
        </h1>
        <h2 className="text-center mt-2  text-[#7f8ea4] text-lg font-sans">
          We Value Your Privacy
        </h2>
      </header>


      <section className="bg-white   p-4 h-auto">
        <div className="text-sm  ml-2 mr-2 font-sans lg:text-left lg:ml-32 lg:mr-32  text-gray-700 ">
          <p className="mt-10 mb-2">
            Thank you for choosing to be part of our community at Firolab Innovations Private Limited,
            doing business as Graficto (<strong>Graficto</strong>, &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;).
            We are committed to protecting your personal information and your right to privacy.
            If you have any questions or concerns about this privacy notice or our practices with regard
            to your personal information, please contact us at <a href="mailto:hello@graficto.com" className="text-blue-500 hover:underline">hello@graficto.com</a>.
          </p>

          <p className="mt-3 mb-3">This privacy notice describes how we might use your information if you:</p>
          <ul className="pl-3">
            <li> • Visit our website at  <a target="_blank" rel="noopener" href="/intro"><strong className="text-blue-500">https://graficto.com</strong></a></li>
            <li className="mt-1"> • Engage with us in other related ways ― including any sales, marketing, or events</li>
          </ul>
          <p className="mt-3 mb-3">In this privacy notice, if we refer to:</p>
          <ul className="pl-3">
            <li>
              • &quot;<strong>Website</strong>&quot;, we are referring to any website of ours that references or links to this policy
            </li>

            <li className="mt-1">
              • &quot;<strong>Services</strong>&quot;, we are referring to our Website, and other related services, including any sales, marketing, or events
            </li>

          </ul>
          <p className="mt-3 mb-3">The purpose of this privacy notice is to explain to you in the clearest way possible what information we collect, how we use it, and what rights you have in relation to it. If there are any terms in this privacy notice that you do not agree with, please discontinue use of our Services immediately.</p>
          <p className="mt-5 mb-3"><strong>Please read this privacy notice carefully, as it will help you understand what we do with the information that we collect.</strong></p>
          <p className="mt-3 text-xl"><strong>1. WHAT INFORMATION DO WE COLLECT?</strong></p>
          <p className="mt-3 mb-3 font-semibold">Personal information you disclose to us</p>
          <p className="mt-3 mb-3">We collect personal information that you voluntarily provide to us when you register on the Website, express an interest in obtaining information about us or our products and Services, when you participate in activities on the Website or otherwise when you contact us.</p>
          <p className="mt-3 mb-3">The personal information that we collect depends on the context of your interactions with us and the Website, the choices you make and the products and features you use. The personal information we collect may include the following:</p>
          <p className="mt-3 mb-3"><strong>Personal Information Provided by You.</strong>We collect names; email addresses; passwords; billing addresses; debit/credit card numbers; and other similar information.</p>
          <p className="mt-3 mb-3"><strong>Payment Data.</strong>We may collect data necessary to process your payment if you make purchases, such as your payment instrument number (such as a credit card number), and the security code associated with your payment instrument. All payment data is stored by Paddle. You may find their privacy notice link(s) here: <a target="_blank" rel="noopener" href="https://paddle.com/privacy/"><strong className="text-blue-500">https://paddle.com/privacy/</strong></a></p>
          <p className="mt-3 mb-3">
            <strong>Social Media Login Data.</strong> We may provide you with the option to register with us using your existing social media account details, like your Facebook, Twitter or other social media account. If you choose to register in this way, we will collect the information described in the section called <strong>&quot;HOW DO WE HANDLE YOUR SOCIAL LOGINS?&quot;</strong> below.
          </p>

          <p className="mt-3 mb-3">All personal information that you provide to us must be true, complete and accurate, and you must notify us of any changes to such personal information.</p>
          <p className="mt-3 mb-3"><strong>Information automatically collected</strong></p>
          <p className="mt-3 mb-3">We automatically collect certain information when you visit, use or navigate the Website. This information does not reveal your specific identity (like your name or contact information) but may include device and usage information, such as your IP address, browser and device characteristics, operating system, language preferences, referring URLs, device name, country, location, information about how and when you use our Website and other technical information. This information is primarily needed to maintain the security and operation of our Website, and for our internal analytics and reporting purposes.</p>
          <p className="mt-4 mb-3">The information we collect includes:</p>
          <ul className="pl-3">
            <li>
              • Log and Usage Data. Log and usage data is service-related, diagnostic, usage, and performance information our servers automatically collect when you access or use our Website and which we record in log files. Depending on how you interact with us, this log data may include your IP address, device information, browser type and settings, and information about your activity in the Website, device event information (such as system activity, error reports (sometimes called &#39;crash dumps&#39;) and hardware settings).
            </li>

            <li className="mt-1"> • Device Data. We collect device data such as information about your computer, phone, tablet or other device you use to access the Website. Depending on the device used, this device data may include information such as your IP address (or proxy server), device and application identification numbers, location, browser type, hardware model Internet service provider and/or mobile carrier, operating system and system configuration information.</li>
          </ul>
          <p className="mt-3 text-xl"><strong>2. HOW DO WE USE YOUR INFORMATION?</strong></p>
          <p className="mt-3 mb-3"><strong>In Short:</strong> We process your information for purposes based on legitimate business interests, the fulfillment of our contract with you, compliance with our legal obligations, and/or your consent.</p>
          <li>
            • <strong>To facilitate account creation and logon process.</strong> If you choose to link your account with us to a third-party account (such as your Google or Facebook account), we use the information you allowed us to collect from those third parties to facilitate account creation and logon process for the performance of the contract. See the section below headed <strong>&quot;HOW DO WE HANDLE YOUR SOCIAL LOGINS?&quot;</strong> for further information.
          </li>

          <p className="mt-3 mb-3">We use the information we collect or receive:</p>
          <ul className="pl-3">
            <li> • <strong>To facilitate account creation and logon process.</strong> If you choose to link your account with us to a third-party account (such as your Google or Facebook account), we use the information you allowed us to collect from those third parties to facilitate account creation and logon process for the performance of the contract. See the section below headed <strong>&quot;HOW DO WE HANDLE YOUR SOCIAL LOGINS?&quot; </strong> for further information. </li>
            <li className="mt-1"> • <strong>Request feedback.</strong> We may use your information to request feedback and to contact you about your use of our Website.</li>
            <li className="mt-1"> • <strong>To manage user accounts. </strong> We may use your information for the purposes of managing our account and keeping it in working order.</li>
            <li className="mt-1"> • <strong>To send administrative information to you.</strong>We may use your personal information to send you product, service and new feature information and/or information about changes to our terms, conditions, and policies. </li>
            <li className="mt-1"> • <strong>To protect our Services. </strong> We may use your information as part of our efforts to keep our Website safe and secure (for example, for fraud monitoring and prevention). </li>
            <li className="mt-1"> • <strong>To enforce our terms, conditions and policies for business purposes, to comply with legal and regulatory requirements or in connection with our contract.</strong> </li>
            <li className="mt-1"> • <strong>To respond to legal requests and prevent harm.</strong>If we receive a subpoena or other legal request, we may need to inspect the data we hold to determine how to respond. </li>
            <li className="mt-1"> • <strong>Fulfill and manage your orders.</strong> We may use your information to fulfill and manage your orders, payments, returns, and exchanges made through the Website.</li>
            <li className="mt-1"> • <strong>To deliver and facilitate delivery of services to the user.</strong> We may use your information to provide you with the requested service.</li>
            <li className="mt-1"> • <strong>To respond to user inquiries/offer support to users.</strong>We may use your information to respond to your inquiries and solve any potential issues you might have with the use of our Services. </li>
            <li className="mt-1"> • <strong>To send you marketing and promotional communications. </strong>We and/or our third-party marketing partners may use the personal information you send to us for our marketing purposes, if this is in accordance with your marketing preferences. For example, when expressing an interest in obtaining information about us or our Website, subscribing to marketing or otherwise contacting us, we will collect personal information from you. You can opt-out of our marketing emails at any time (see the  <strong>&quot;WHAT ARE YOUR PRIVACY RIGHTS?&quot;</strong>below). </li>
            <li className="mt-1"> • <strong>Deliver targeted advertising to you. </strong> We may use your information to develop and display personalized content and advertising (and work with third parties who do so) tailored to your interests and/or location and to measure its effectiveness. </li>
            <li className="mt-1"> • <strong>For other business purposes. </strong> We may use your information for other business purposes, such as data analysis, identifying usage trends, determining the effectiveness of our promotional campaigns and to evaluate and improve our Website, products, marketing and your experience. We may use and store this information in aggregated and anonymized form so that it is not associated with individual end users and does not include personal information.
            </li>
          </ul>


          <p className="mt-3 text-xl"><strong>3. WILL YOUR INFORMATION BE SHARED WITH ANYONE?</strong></p>
          <p className="mt-3 mb-3"><strong>In Short:</strong>  We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations. </p>
          <p className="mt-3 mb-3">We may process or share your data that we hold based on the following legal basis:</p>
          <ul className="pl-3">
            <li> • <strong>Consent:</strong> We may process your data if you have given us specific consent to use your personal information for a specific purpose.</li>
            <li className="mt-1"> • <strong>Legitimate Interests: </strong>  We may process your data when it is reasonably necessary to achieve our legitimate business interests.</li>
            <li className="mt-1"> • <strong>Legal Obligations: </strong> We may disclose your information where we are legally required to do so in order to comply with applicable law, governmental requests, a judicial proceeding, court order, or legal process, such as in response to a court order or a subpoena (including in response to public authorities to meet national security or law enforcement requirements).</li>
            <li className="mt-1"> • <strong>Vital Interests: </strong> We may disclose your information where we believe it is necessary to investigate, prevent, or take action regarding potential violations of our policies, suspected fraud, situations involving potential threats to the safety of any person and illegal activities, or as evidence in litigation in which we are involved. </li>
          </ul>


          <p className="mt-4 mb-3">More specifically, we may need to process your data or share your personal information in the following situations:</p>
          <ul className="pl-3">
            <li> • <strong>Business Transfers.</strong> We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</li>
            <li className="mt-1"> • <strong>Vendors, Consultants and Other Third-Party Service Providers.</strong> We may share your data with third-party vendors, service providers, contractors or agents who perform services for us or on our behalf and require access to such information to do that work. Examples include: payment processing, data analysis, email delivery, hosting services, customer service and marketing efforts. We may allow selected third parties to use tracking technology on the Website, which will enable them to collect data on our behalf about how you interact with our Website over time. This information may be used to, among other things, analyze and track data, determine the popularity of certain content, pages or features, and better understand online activity. Unless described in this notice, we do not share, sell, rent or trade any of your information with third parties.</li>
          </ul>

          <p className="mt-3 text-xl"><strong>4. WHO WILL YOUR INFORMATION BE SHARED WITH?</strong></p>
          <p className="mt-3 mb-3"><strong>In Short:</strong>We only share information with the following categories of third parties.</p>
          <p className="mt-3 mb-3">We only share and disclose your information with the following categories of third parties. If we have processed your data based on your consent and you wish to revoke your consent, please contact us using the contact details provided in the section below titled  <strong>&quot;HOW CAN YOU CONTACT US ABOUT THIS NOTICE?&quot;.</strong></p>

          <ul className="pl-3">
            <li> • Data Analytics Services</li>
            <li className="mt-1"> • Performance Monitoring Tools  </li>
            <li className="mt-1"> • Payment Processors </li>
            <li className="mt-1"> • Communication & Collaboration Tools </li>
          </ul>

          <p className="mt-3 text-xl"><strong>5. HOW DO WE HANDLE YOUR SOCIAL LOGINS?     </strong></p>
          <p className="mt-3 mb-3"><strong>In Short:</strong> If you choose to register or log in to our services using a social media account, we may have access to certain information about you.  </p>
          <p className="mt-3 mb-3">Our Website offers you the ability to register and login using your third-party social media account details (like your Facebook or Google logins). Where you choose to do this, we will receive certain profile information about you from your social media provider. The profile information we receive is usually limited to name and email address. We will use the information we receive only for the purposes that are described in this privacy notice or that are otherwise made clear to you on the relevant Website.</p>

          <p className="mt-3 text-xl"><strong>6. HOW LONG DO WE KEEP YOUR INFORMATION?  </strong></p>
          <p className="mt-3 mb-3"><strong>In Short:</strong>  We keep your information for as long as necessary to fulfill the purposes outlined in this privacy notice unless otherwise required by law. </p>
          <p className="mt-3 mb-3">We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy notice, unless a longer retention period is required or permitted by law (such as tax, accounting or other legal requirements). No purpose in this notice will require us keeping your personal information for longer than the period of time in which users have an account with us.</p>
          <p className="mt-3 mb-3">When we have no ongoing legitimate business need to process your personal information, we will either delete or anonymize such information, or, if this is not possible (for example, because your personal information has been stored in backup archives), then we will securely store your personal information and isolate it from any further processing until deletion is possible.</p>

          <p className="mt-3 text-xl"><strong>7. HOW DO WE KEEP YOUR INFORMATION SAFE?</strong></p>
          <p className="mt-3 mb-3"><strong>In Short:</strong>We aim to protect your personal information through a system of organizational and technical security measures.  </p>
          <p className="mt-3 mb-3">We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorized third parties will not be able to defeat our security, and improperly collect, access, steal, or modify your information. Although we will do our best to protect your personal information, transmission of personal information to and from our Website is at your own risk. You should only access the Website within a secure environment.</p>



          <p className="mt-3 text-xl"><strong>8. WHAT ARE YOUR PRIVACY RIGHTS?</strong></p>
          <p className="mt-3 mb-3"><strong>In Short:</strong>You may review, change, or terminate your account at any time. </p>
          <p className="mt-3 mb-3">In some regions (like the EEA and UK), you have certain rights under applicable data protection laws. These may include the right (i) to request access and obtain a copy of your personal information, (ii) to request rectification or erasure; (iii) to restrict the processing of your personal information; and (iv) if applicable, to data portability. In certain circumstances, you may also have the right to object to the processing of your personal information. To make such a request, please use the contact details provided below. We will consider and act upon any request in accordance with applicable data protection laws.</p>
          <p className="mt-3 mb-3">If we are relying on your consent to process your personal information, you have the right to withdraw your consent at any time. Please note however that this will not affect the lawfulness of the processing before its withdrawal, nor will it affect the processing of your personal information conducted in reliance on lawful processing grounds other than consent.</p>
          <p className="mt-3 mb-3">If you are a resident in the EEA or UK and you believe we are unlawfully processing your personal information, you also have the right to complain to your local data protection supervisory authority. You can find their contact details here: <a target="_blank" rel="noopener" href="https://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.htm"><strong className="text-blue-500">https://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.htm</strong></a>.</p>
          <p className="mt-3 mb-3">If you are a resident in Switzerland, the contact details for the data protection authorities are available here: <a target="_blank" rel="noopener" href="https://www.edoeb.admin.ch/edoeb/en/home.html"><strong className="text-blue-500">https://www.edoeb.admin.ch/home.html</strong></a></p>
          <p className="mt-3 mb-3">California Civil Code Section 1798.83, also known as the &quot;Shine The Light&quot; law, permits our users who are California residents to request and obtain from us, once a year and free of charge, information about categories of personal information (if any) we disclosed to third parties for direct marketing purposes and the names and addresses of all third parties with which we shared personal information in the immediately preceding calendar year. If you are a California resident and would like to make such a request, please submit your request in writing to us using the contact information provided below.</p>
          <p className="mt-3 mb-3">If you are under 18 years of age, reside in California, and have a registered account with the Website, you have the right to request removal of unwanted data that you publicly post on the Website. To request removal of such data, please contact us using the contact information provided below, and include the email address associated with your account and a statement that you reside in California. We will make sure the data is not publicly displayed on the Website, but please be aware that the data may not be completely or comprehensively removed from all our systems (e.g. backups, etc.).</p>
          <p className="mt-3 mb-3">If you have questions or comments about your privacy rights, you may email us at hello@graficto.com.</p>

          <p className="mt-3  text-lg mb-3"><strong>Account Information</strong></p>
          <p className="mt-3 mb-3">If you would at any time like to review or change the information in your account or terminate your account, you can:</p>

          <ul className="pl-3">
            <li> • Contact us using the contact information provided.</li>
            <li className="mt-1"> • Log in to your account settings and update your user account.  </li>
          </ul>

          <p className="mt-3 mb-3 ">Upon your request to terminate your account, we will deactivate or delete your account and information from our active databases. However, we may retain some information in our files to prevent fraud, troubleshoot problems, assist with any investigations, enforce our Terms of Use and/or comply with applicable legal requirements.</p>
          <p className="mt-3 mb-3"> <strong>Opting out of email marketing: </strong> You can unsubscribe from our marketing email list at any time by clicking on the unsubscribe link in the emails that we send or by contacting us using the details provided below. You will then be removed from the marketing email list — however, we may still communicate with you, for example to send you service-related emails that are necessary for the administration and use of your account, to respond to service requests, or for other non-marketing purposes.</p>


          <p className="mt-3 text-xl"><strong>9. DO WE MAKE UPDATES TO THIS NOTICE? </strong></p>
          <p className="mt-3 mb-3"><strong>In Short:</strong>Yes, we will update this notice as necessary to stay compliant with relevant laws. </p>
          <p className="mt-3 mb-3">We may update this privacy notice from time to time. The updated version will be indicated by an updated &quot;Revised&quot; date and the updated version will be effective as soon as it is accessible. If we make material changes to this privacy notice, we may notify you either by prominently posting a notice of such changes or by directly sending you a notification. We encourage you to review this privacy notice frequently to be informed of how we are protecting your information.</p>


          <p className="mt-3 text-xl"><strong>10. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?  </strong></p>
          <p className="mt-3 mb-10">If you have questions or comments about this notice, you may email us at hello@graficto.com. </p>



        </div>
      </section>


      <Footer></Footer>
    </div>
  );
};

export default PrivacyPolicyTabPage;
