"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/utils/footer";
import  { useState } from "react";


const TermOfServiceTabPage = () => {
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
          Terms of Service
        </h1>
        <h2 className="text-center mt-2  text-[#7f8ea4] text-lg font-sans">
          Your Privacy Matters
        </h2>
      </header>

      <section className="bg-white   p-4 h-auto">
        <div className="text-sm  ml-2 mr-2 font-sans lg:text-left lg:ml-32 lg:mr-32  text-gray-700 ">
          <p className="mt-10 text-lg mb-2">
            <strong>Last updated November 25, 2021</strong>
          </p>

          <p className="mt-3 text-xl">
            <strong>AGREEMENT TO TERMS</strong>
          </p>

          <p className="mt-3 mb-3">
            These Terms of Use constitute a legally binding agreement made
            between you, whether personally or on behalf of an entity
            (&quot;you&quot;) and Firolab Innovations Private Limited, doing
            business as Graficto (
            <strong>
              &quot;Graficto&quot;, &quot;we&quot;, &quot;us&quot;, or
              &quot;our&quot;
            </strong>
            ), concerning your access to and use of the{" "}
            <a target="_blank" rel="noopener" href="#">
              https://graficto.com
            </a>
            website as well as any other media form, media channel, mobile
            website or mobile application related, linked, or otherwise
            connected thereto (collectively, the &quot;Site&quot;). We are
            registered in Sri Lanka and have our registered office at Kurunega,
            Sri Lanka. You agree that by accessing the Site, you have read,
            understood, and agree to be bound by all of these Terms of Use. IF
            YOU DO NOT AGREE WITH ALL OF THESE TERMS OF USE, THEN YOU ARE
            EXPRESSLY PROHIBITED FROM USING THE SITE AND YOU MUST DISCONTINUE
            USE IMMEDIATELY.
          </p>
          <p className="mt-3 mb-3">
            Supplemental terms and conditions or documents that may be posted on
            the Site from time to time are hereby expressly incorporated herein
            by reference. We reserve the right, in our sole discretion, to make
            changes or modifications to these Terms of Use from time to time. We
            will alert you about any changes by updating the &quot;Last
            updated&quot; date of these Terms of Use, and you waive any right to
            receive specific notice of each such change. Please ensure that you
            check the applicable Terms every time you use our Site so that you
            understand which Terms apply. You will be subject to, and will be
            deemed to have been made aware of and to have accepted, the changes
            in any revised Terms of Use by your continued use of the Site after
            the date such revised Terms of Use are posted.
          </p>
          <p className="mt-3 mb-3">
            The information provided on the Site is not intended for
            distribution to or use by any person or entity in any jurisdiction
            or country where such distribution or use would be contrary to law
            or regulation or which would subject us to any registration
            requirement within such jurisdiction or country. Accordingly, those
            persons who choose to access the Site from other locations do so on
            their own initiative and are solely responsible for compliance with
            local laws, if and to the extent local laws are applicable.
          </p>
          <p className="mt-3 mb-3">
            The Site is not tailored to comply with industry-specific
            regulations (Health Insurance Portability and Accountability Act
            (HIPAA), Federal Information Security Management Act (FISMA), etc.),
            so if your interactions would be subjected to such laws, you may not
            use this Site. You may not use the Site in a way that would violate
            the Gramm-Leach-Bliley Act (GLBA).
          </p>
          <p className="mt-3 mb-3">
            The Site is intended for users who are at least 13 years of age. All
            users who are minors in the jurisdiction in which they reside
            (generally under the age of 18) must have the permission of, and be
            directly supervised by, their parent or guardian to use the Site. If
            you are a minor, you must have your parent or guardian read and
            agree to these Terms of Use prior to you using the Site.
          </p>

          <p className="mt-3 text-xl">
            <strong>INTELLECTUAL PROPERTY RIGHTS</strong>
          </p>
          <p className="mt-3 mb-3">
            Unless otherwise indicated, the Site is our proprietary property and
            all source code, databases, functionality, software, website
            designs, audio, video, text, photographs, and graphics on the Site
            (collectively, the &quot;Content&quot;) and the trademarks, service
            marks, and logos contained therein (the &quot;Marks&quot;) are owned
            or controlled by us or licensed to us, and are protected by
            copyright and trademark laws and various other intellectual property
            rights and unfair competition laws of the United States,
            international copyright laws, and international conventions. The
            Content and the Marks are provided on the Site &quot;AS IS&quot; our
            information and personal use only. Except as expressly provided in
            these Terms of Use, no part of the Site and no Content or Marks may
            be copied, reproduced, aggregated, republished, uploaded, posted,
            publicly displayed, encoded, translated, transmitted, distributed,
            sold, licensed, or otherwise exploited for any commercial purpose
            whatsoever, without our express prior written permission.
          </p>
          <p className="mt-3 mb-3">
            Provided that you are eligible to use the Site, you are granted a
            limited license to access and use the Site and to download or print
            a copy of any Content you have created for your personal or
            commercial use. We reserve all rights not expressly granted to you
            in and to the Site, the Content and the Marks.
          </p>

          <p className="mt-3 text-xl">
            <strong>USER REPRESENTATIONS</strong>
          </p>
          <p className="mt-3 mb-3">
            By using the Site, you represent and warrant that: (1) all
            registration information you submit will be true, accurate, current,
            and complete; (2) you will maintain the accuracy of such information
            and promptly update such registration information as necessary; (3)
            you have the legal capacity and you agree to comply with these Terms
            of Use; (4) you are not under the age of 13; (5) you are not a minor
            in the jurisdiction in which you reside, or if a minor, you have
            received parental permission to use the Site; (6) you will not
            access the Site through automated or non-human means, whether
            through a bot, script or otherwise; (7) you will not use the Site
            for any illegal or unauthorized purpose; and (8) your use of the
            Site will not violate any applicable law or regulation.
          </p>
          <p className="mt-3 mb-3">
            If you provide any information that is untrue, inaccurate, not
            current, or incomplete, we have the right to suspend or terminate
            your account and refuse any and all current or future use of the
            Site (or any portion thereof).
          </p>

          <p className="mt-3 text-xl">
            <strong>USER REGISTRATION</strong>
          </p>
          <p className="mt-3 mb-3">
            You may be required to register with the Site. You agree to keep
            your password confidential and will be responsible for all use of
            your account and password. We reserve the right to remove, reclaim,
            or change a username you select if we determine, in our sole
            discretion, that such username is inappropriate, obscene, or
            otherwise objectionable.
          </p>

          <p className="mt-3 mb-3 text-xl">
            <strong>FEES AND PAYMENT</strong>
          </p>
          <p className="mt-3 mb-3">
            You are required to subscribe to a premium account to access our
            complete set of features, for which you are required to pay
            applicable fees. You agree to provide current, complete, and
            accurate purchase and account information for all purchases made via
            the Site. You further agree to promptly update account and payment
            information, including email address, payment method, and payment
            card expiration date, so that we can complete your transactions and
            contact you as needed. We bill you through an online billing account
            for purchases made via the Site. Sales tax will be added to the
            price of purchases as deemed required by us. We may change prices at
            any time. All payments shall be in U.S. dollars.
          </p>
          <p className="mt-3 mb-3">
            You agree to pay all charges or fees at the prices then in effect
            for your purchases, and you authorize us to charge your chosen
            payment provider for any such amounts upon making your purchase. If
            your purchase is subject to recurring charges, then you consent to
            our charging your payment method on a recurring basis without
            requiring your prior approval for each recurring charge, until you
            notify us of your cancellation.
          </p>
          <p className="mt-3 mb-3">
            We reserve the right to change this price list and institute new
            charges with prior notice. Your continued use of the service means
            you accept all new or increased charges.
          </p>

          <p className="mt-3 mb-3 text-xl">
            <strong>CANCELLATION</strong>
          </p>
          <p className="mt-3 mb-3">
            All purchases are non-refundable. You can cancel your subscription
            at any time by logging into your account. Your cancellation will
            take effect at the end of the current paid term.
          </p>
          <p className="mt-3 mb-3">
            If you are unsatisfied with our services, please email us at
            hello@graficto.com.
          </p>

          <p className="mt-3 mb-3 text-xl">
            <strong>PROHIBITED ACTIVITIES </strong>
          </p>
          <p className="mt-3 mb-4">
            You may not access or use the Site for any purpose other than that
            for which we make the Site available. The Site may not be used in
            connection with any commercial endeavors except those that are
            specifically endorsed or approved by us.
          </p>
          <p className="mt-3 mb-4">As a user of the Site, you agree not to:</p>
          <p className="mt-3 mb-4">
            1. Systematically retrieve data or other content from the Site to
            create or compile, directly or indirectly, a collection,
            compilation, database, or directory without written permission from
            us.
          </p>
          <p className="mt-3 mb-4">
            2. Trick, defraud, or mislead us and other users, especially in any
            attempt to learn sensitive account information such as user
            passwords.
          </p>
          <p className="mt-3 mb-4">
            3. Circumvent, disable, or otherwise interfere with security-related
            features of the Site, including features that prevent or restrict
            the use or copying of any Content or enforce limitations on the use
            of the Site and/or the Content contained therein.
          </p>
          <p className="mt-3 mb-4">
            4. Disparage, tarnish, or otherwise harm, in our opinion, us and/or
            the Site.
          </p>
          <p className="mt-3 mb-4">
            5. Use any information obtained from the Site in order to harass,
            abuse, or harm another person
          </p>
          <p className="mt-3 mb-4">
            6. Make improper use of our support services or submit false reports
            of abuse or misconduct.
          </p>
          <p className="mt-3 mb-4">
            7. Use the Site in a manner inconsistent with any applicable laws or
            regulations.
          </p>
          <p className="mt-3 mb-4">
            8. Engage in unauthorized framing of or linking to the Site.
          </p>
          <p className="mt-3 mb-4">
            9. Upload or transmit (or attempt to upload or to transmit) viruses,
            Trojan horses, or other material, including excessive use of capital
            letters and spamming (continuous posting of repetitive text), that
            interferes with any party’s uninterrupted use and enjoyment of the
            Site or modifies, impairs, disrupts, alters, or interferes with the
            use, features, functions, operation, or maintenance of the Site.
          </p>
          <p className="mt-3 mb-4">
            10. Engage in any automated use of the system, such as using scripts
            to send comments or messages, or using any data mining, robots, or
            similar data gathering and extraction tools.
          </p>
          <p className="mt-3 mb-4">
            11. Delete the copyright or other proprietary rights notice from any
            Content.
          </p>
          <p className="mt-3 mb-4">
            12. Attempt to impersonate another user or person or use the
            username of another user.
          </p>
          <p className="mt-3 mb-4">
            13. Upload or transmit (or attempt to upload or to transmit) any
            material that acts as a passive or active information collection or
            transmission mechanism, including without limitation, clear graphics
            interchange formats ( &quot;gifs &quot;), 1×1 pixels, web bugs, cookies, or
            other similar devices (sometimes referred to as  &quot;spyware &quot; or
              &quot;passive collection mechanisms &quot; or  &quot;pcms &quot;).
          </p>
          <p className="mt-3 mb-4">
            14. Interfere with, disrupt, or create an undue burden on the Site
            or the networks or services connected to the Site.
          </p>
          <p className="mt-3 mb-4">
            15. Harass, annoy, intimidate, or threaten any of our employees or
            agents engaged in providing any portion of the Site to you.
          </p>
          <p className="mt-3 mb-4">
            16. Attempt to bypass any measures of the Site designed to prevent
            or restrict access to the Site, or any portion of the Site.
          </p>
          <p className="mt-3 mb-4">
            17. Copy or adapt the Site’s software, including but not limited to
            PHP, HTML, JavaScript, or other code.
          </p>
          <p className="mt-3 mb-4">
            18. Except as permitted by applicable law, decipher, decompile,
            disassemble, or reverse engineer any of the software comprising or
            in any way making up a part of the Site.
          </p>
          <p className="mt-3 mb-4">
            19. Except as may be the result of standard search engine or
            Internet browser usage, use, launch, develop, or distribute any
            automated system, including without limitation, any spider, robot,
            cheat utility, scraper, or offline reader that accesses the Site, or
            using or launching any unauthorized script or other software.
          </p>
          <p className="mt-3 mb-4">
            20 Make any unauthorized use of the Site, including collecting
            usernames and/or email addresses of users by electronic or other
            means for the purpose of sending unsolicited email, or creating user
            accounts by automated means or under false pretenses.
          </p>

          <p className="mt-3 mb-3 text-xl">
            <strong>SUBMISSIONS</strong>
          </p>

          <p className="mt-3 mb-3">
            You acknowledge and agree that any questions, comments, suggestions,
            ideas, feedback, or other information regarding the Site
            ( &quot;Submissions &quot;) provided by you to us are non-confidential and shall
            become our sole property. We shall own exclusive rights, including
            all intellectual property rights, and shall be entitled to the
            unrestricted use and dissemination of these Submissions for any
            lawful purpose, commercial or otherwise, without acknowledgment or
            compensation to you. You hereby waive all moral rights to any such
            Submissions, and you hereby warrant that any such Submissions are
            original with you or that you have the right to submit such
            Submissions. You agree there shall be no recourse against us for any
            alleged or actual infringement or misappropriation of any
            proprietary right in your Submissions.
          </p>
          <p className="mt-3 mb-3 text-xl">
            <strong>THIRD-PARTY WEBSITES AND CONTENT</strong>
          </p>
          <p className="mt-3 mb-3">
            The Site may contain (or you may be sent via the Site) links to
            other websites ( &quot;Third-Party Websites &quot;) as well as articles,
            photographs, text, graphics, pictures, designs, music, sound, video,
            information, applications, software, and other content or items
            belonging to or originating from third parties ( &quot;Third-Party
            Content &quot;). Such Third-Party Websites and Third-Party Content are not
            investigated, monitored, or checked for accuracy, appropriateness,
            or completeness by us, and we are not responsible for any
            Third-Party Websites accessed through the Site or any Third-Party
            Content posted on, available through, or installed from the Site,
            including the content, accuracy, offensiveness, opinions,
            reliability, privacy practices, or other policies of or contained in
            the Third-Party Websites or the Third-Party Content. Inclusion of,
            linking to, or permitting the use or installation of any Third-Party
            Websites or any Third-Party Content does not imply approval or
            endorsement thereof by us. If you decide to leave the Site and
            access the Third-Party Websites or to use or install any Third-Party
            Content, you do so at your own risk, and you should be aware these
            Terms of Use no longer govern. You should review the applicable
            terms and policies, including privacy and data gathering practices,
            of any website to which you navigate from the Site or relating to
            any applications you use or install from the Site. Any purchases you
            make through Third-Party Websites will be through other websites and
            from other companies, and we take no responsibility whatsoever in
            relation to such purchases which are exclusively between you and the
            applicable third party. You agree and acknowledge that we do not
            endorse the products or services offered on Third-Party Websites and
            you shall hold us harmless from any harm caused by your purchase of
            such products or services. Additionally, you shall hold us harmless
            from any losses sustained by you or harm caused to you relating to
            or resulting in any way from any Third-Party Content or any contact
            with Third-Party Websites.
          </p>
          <p className="mt-3 mb-3 text-xl">
            <strong>SITE MANAGEMENT</strong>
          </p>
          <p className="mt-3 mb-3">
            We reserve the right, but not the obligation, to: (1) monitor the
            Site for violations of these Terms of Use; (2) take appropriate
            legal action against anyone who, in our sole discretion, violates
            the law or these Terms of Use, including without limitation,
            reporting such user to law enforcement authorities; (3) in our sole
            discretion and without limitation, refuse, restrict access to, limit
            the availability of, or disable (to the extent technologically
            feasible) any of your Contributions or any portion thereof; (4) in
            our sole discretion and without limitation, notice, or liability, to
            remove from the Site or otherwise disable all files and content that
            are excessive in size or are in any way burdensome to our systems;
            and (5) otherwise manage the Site in a manner designed to protect
            our rights and property and to facilitate the proper functioning of
            the Site.
          </p>
          <p className="mt-3 mb-3 text-xl">
            <strong>PRIVACY POLICY</strong>
          </p>
          <p className="mt-3 mb-3">
            We care about data privacy and security. By using the Site, you
            agree to be bound by our
            <a href="/privacy-policy">
              <strong className="text-blue-500"> Privacy Policy </strong>
            </a>
            posted on the Site, which is incorporated into these Terms of Use.
          </p>

          <p className="mt-3 mb-3 text-xl">
            <strong>COPYRIGHT INFRINGEMENTS</strong>
          </p>

          <p className="mt-3 mb-3">
            We respect the intellectual property rights of others. If you
            believe that any material available on or through the Site infringes
            upon any copyright you own or control, please immediately notify us
            using the contact information provided below (a  &quot;Notification &quot;). A
            copy of your Notification will be sent to the person who posted or
            stored the material addressed in the Notification. Please be advised
            that pursuant to applicable law you may be held liable for damages
            if you make material misrepresentations in a Notification. Thus, if
            you are not sure that material located on or linked to by the Site
            infringes your copyright, you should consider first contacting an
            attorney.
          </p>

          <p className="mt-3 mb-3 text-xl">
            <strong>TERM AND TERMINATION</strong>
          </p>
          <p className="mt-3 mb-3">
            These Terms of Use shall remain in full force and effect while you
            use the Site. WITHOUT LIMITING ANY OTHER PROVISION OF THESE TERMS OF
            USE, WE RESERVE THE RIGHT TO, IN OUR SOLE DISCRETION AND WITHOUT
            NOTICE OR LIABILITY, DENY ACCESS TO AND USE OF THE SITE (INCLUDING
            BLOCKING CERTAIN IP ADDRESSES), TO ANY PERSON FOR ANY REASON OR FOR
            NO REASON, INCLUDING WITHOUT LIMITATION FOR BREACH OF ANY
            REPRESENTATION, WARRANTY, OR COVENANT CONTAINED IN THESE TERMS OF
            USE OR OF ANY APPLICABLE LAW OR REGULATION. WE MAY TERMINATE YOUR
            USE OR PARTICIPATION IN THE SITE OR DELETEYOURACCOUNT AND ANY
            CONTENT OR INFORMATION THAT YOU POSTED AT ANY TIME, WITHOUT WARNING,
            IN OUR SOLE DISCRETION.
          </p>

          <p className="mt-3 mb-3 text-xl">
            <strong>MODIFICATIONS AND INTERRUPTIONS</strong>
          </p>

          <p className="mt-3 mb-3">
            We reserve the right to change, modify, or remove the contents of
            the Site at any time or for any reason at our sole discretion
            without notice. However, we have no obligation to update any
            information on our Site. We also reserve the right to modify or
            discontinue all or part of the Site without notice at any time. We
            will not be liable to you or any third party for any modification,
            price change, suspension, or discontinuance of the Site.
          </p>
          <p className="mt-3 mb-3">
            We cannot guarantee the Site will be available at all times. We may
            experience hardware, software, or other problems or need to perform
            maintenance related to the Site, resulting in interruptions, delays,
            or errors. We reserve the right to change, revise, update, suspend,
            discontinue, or otherwise modify the Site at any time or for any
            reason without notice to you. You agree that we have no liability
            whatsoever for any loss, damage, or inconvenience caused by your
            inability to access or use the Site during any downtime or
            discontinuance of the Site. Nothing in these Terms of Use will be
            construed to obligate us to maintain and support the Site or to
            supply any corrections, updates, or releases in connection
            therewith.
          </p>

          <p className="mt-3 mb-3 text-xl">
            <strong>GOVERNING LAW</strong>
          </p>

          <p className="mt-3 mb-3">
            These Terms shall be governed by and defined following the laws of
            Sri Lanka. Firolab Innovations Private Limited and yourself
            irrevocably consent that the courts of Sri Lanka shall have
            exclusive jurisdiction to resolve any dispute which may arise in
            connection with these terms.
          </p>

          <p className="mt-3 mb-3 text-xl">
            <strong>DISCLAIMER</strong>
          </p>

          <p className="mt-3 mb-3">
            THE SITE IS PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU AGREE
            THAT YOUR USE OF THE SITE AND OUR SERVICES WILL BE AT YOUR SOLE
            RISK. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL
            WARRANTIES, EXPRESS OR IMPLIED, IN CONNECTION WITH THE SITE AND YOUR
            USE THEREOF, INCLUDING, WITHOUT LIMITATION, THE IMPLIED WARRANTIES
            OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
            NON-INFRINGEMENT. WE MAKE NO WARRANTIES OR REPRESENTATIONS ABOUT THE
            ACCURACY OR COMPLETENESS OF THE SITE’S CONTENT OR THE CONTENT OF ANY
            WEBSITES LINKED TO THE SITE AND WE WILL ASSUME NO LIABILITY OR
            RESPONSIBILITY FOR ANY (1) ERRORS, MISTAKES, OR INACCURACIES OF
            CONTENT AND MATERIALS, (2) PERSONAL INJURY OR PROPERTY DAMAGE, OF
            ANY NATURE WHATSOEVER, RESULTING FROM YOUR ACCESS TO AND USE OF THE
            SITE, (3) ANY UNAUTHORIZED ACCESS TO OR USE OF OUR SECURE SERVERS
            AND/OR ANY AND ALL PERSONAL INFORMATION AND/OR FINANCIAL INFORMATION
            STORED THEREIN, (4) ANY INTERRUPTION OR CESSATION OF TRANSMISSION TO
            OR FROM THE SITE, (5) ANY BUGS, VIRUSES, TROJAN HORSES, OR THE LIKE
            WHICH MAY BE TRANSMITTED TO OR THROUGH THE SITE BY ANY THIRD PARTY,
            AND/OR (6) ANY ERRORS OR OMISSIONS IN ANY CONTENT AND MATERIALS OR
            FOR ANY LOSS OR DAMAGE OF ANY KIND INCURRED AS A RESULT OF THE USE
            OF ANY CONTENT POSTED, TRANSMITTED, OR OTHERWISE MADE AVAILABLE VIA
            THE SITE. WE DO NOT WARRANT, ENDORSE, GUARANTEE, OR ASSUME
            RESPONSIBILITY FOR ANY PRODUCT OR SERVICE ADVERTISED OR OFFERED BY A
            THIRD PARTY THROUGH THE SITE, ANY HYPERLINKED WEBSITE, OR ANY
            WEBSITE OR MOBILE APPLICATION FEATURED IN ANY BANNER OR OTHER
            ADVERTISING, AND WE WILL NOT BE A PARTY TO OR IN ANY WAY BE
            RESPONSIBLE FOR MONITORING ANY TRANSACTION BETWEEN YOU AND ANY
            THIRD-PARTY PROVIDERS OF PRODUCTS OR SERVICES. AS WITH THE PURCHASE
            OF A PRODUCT OR SERVICE THROUGH ANY MEDIUM OR IN ANY ENVIRONMENT,
            YOU SHOULD USE YOUR BEST JUDGMENT AND EXERCISE CAUTION WHERE
            APPROPRIATE.
          </p>

          <p className="mt-3 mb-3 text-xl">
            <strong>INDEMNIFICATION</strong>
          </p>

          <p className="mt-3 mb-3">
            You agree to defend, indemnify, and hold us harmless, including our
            subsidiaries, affiliates, and all of our respective officers,
            agents, partners, and employees, from and against any loss, damage,
            liability, claim, or demand, including reasonable attorneys’ fees
            and expenses, made by any third party due to or arising out of: (1)
            your Contributions; (2) use of the Site; (3) breach of these Terms
            of Use; (4) any breach of your representations and warranties set
            forth in these Terms of Use; (5) your violation of the rights of a
            third party, including but not limited to intellectual property
            rights; or (6) any overt harmful act toward any other user of the
            Site with whom you connected via the Site. Notwithstanding the
            foregoing, we reserve the right, at your expense, to assume the
            exclusive defense and control of any matter for which you are
            required to indemnify us, and you agree to cooperate, at your
            expense, with our defense of such claims. We will use reasonable
            efforts to notify you of any such claim, action, or proceeding which
            is subject to this indemnification upon becoming aware of it.
          </p>

          <p className="mt-3 mb-3 text-xl">
            <strong>CONTACT US</strong>
          </p>

          <p className="mt-3 mb-10">
            In order to resolve a complaint regarding the Site or to receive
            further information regarding use of the Site, please contact us
            <strong>hello@graficto.com.</strong>
          </p>
        </div>
      </section>

      <Footer></Footer>
    </div>
  );
};

export default TermOfServiceTabPage;
