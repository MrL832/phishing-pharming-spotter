export interface Email {
  id: string;
  sender: string;
  fromAddress: string;
  subject: string;
  body: string;
  date: string;
  isPhishing: boolean;
  type: 'phishing' | 'blagging' | 'safe';
  explanation: string;
}

export const emails: Email[] = [
  {
    id: 'e1',
    sender: 'IT Support',
    fromAddress: 'it.support@micros0ft-helpdesk.co.uk',
    subject: 'URGENT: Critical Server Issue - Password Required',
    body: 'Hi, I am Dave from IT support. We are currently experiencing a critical server failure. We need your account password urgently to bypass the lockout and restore the system. Please reply immediately with your current password. Failure to do so may result in permanent data loss.',
    date: '10:42 AM',
    isPhishing: true,
    type: 'blagging',
    explanation: 'This is a classic blagging attempt (social engineering). IT support will NEVER ask for your password. Notice the fake email address "micros0ft" instead of "microsoft", and the false sense of urgency designed to make you panic and act without thinking.'
  },
  {
    id: 'e2',
    sender: 'NatWest Security',
    fromAddress: 'alerts@natwest-secure.xyz',
    subject: 'ACCOUNT SUSPENDED: Verify immediately',
    body: 'Dear Customer,\n\nYour NatWest account has been suspended due to unusual activity. You must verify your identity immediately to unlock your funds.\n\nClick here to verify: http://natwest-secure.xyz/login\n\nRegards,\nNatWest Security Team',
    date: '09:15 AM',
    isPhishing: true,
    type: 'phishing',
    explanation: 'This is a phishing email. The sender domain "natwest-secure.xyz" is not the real NatWest domain. The link provided is also fake and does not use HTTPS. Banks do not send emails demanding immediate clicks to avoid account suspension.'
  },
  {
    id: 'e3',
    sender: 'HM Revenue & Customs',
    fromAddress: 'refunds@hmrc-tax.net',
    subject: 'HMRC TAX REFUND: Action Required',
    body: 'Dear Taxpayer,\n\nOur records indicate that you are owed a tax refund of £342.50 from the previous fiscal year.\n\nClick here to claim your refund: http://hmrc-refund.net/claim\n\nPlease submit your bank details within 24 hours to process the payment.',
    date: 'Yesterday',
    isPhishing: true,
    type: 'phishing',
    explanation: 'This is a phishing attempt. HMRC will never send notifications of a tax rebate or ask you to disclose personal or payment information by email. The URL is suspicious and not a gov.uk domain.'
  },
  {
    id: 'e4',
    sender: 'Principal Smith',
    fromAddress: 'principal.smith@school-admin-portal.com',
    subject: 'URGENT: Student Records Needed',
    body: 'I need the complete student record database exported and emailed to me immediately for an urgent board meeting. Please attach the CSV file to this email as soon as possible.',
    date: 'Yesterday',
    isPhishing: true,
    type: 'blagging',
    explanation: 'This is a blagging attack known as "CEO fraud" or "whaling", where the attacker impersonates a person of authority. Notice the suspicious from-address that doesn\'t match the school\'s actual domain, and the urgent request to bypass standard security protocols.'
  },
  {
    id: 'e5',
    sender: 'Netflix Billing',
    fromAddress: 'billing@netfl1x-support.com',
    subject: 'Your Netflix account will be deleted!',
    body: 'Hi,\n\nWe could not process your latest payment. Your account will be permanently deleted in 24 hours unless you update your payment information.\n\nConfirm your payment at: http://netfl1x-billing.com\n\nThanks,\nThe Netflix Team',
    date: '2 Days Ago',
    isPhishing: true,
    type: 'phishing',
    explanation: 'Phishing attack. Look closely at the domain name: "netfl1x" uses a number "1" instead of the letter "i". It creates fake urgency by threatening to delete your account in 24 hours.'
  },
  {
    id: 'e6',
    sender: 'Apple Rewards',
    fromAddress: 'prizes@giveaway-winner-2024.com',
    subject: 'You have won an iPhone 15 Pro!',
    body: 'Congratulations! You have been selected as the winner of our weekly gadget giveaway! You have won a brand new iPhone 15 Pro.\n\nClaim your prize now at: http://bit.ly/win-iphone-2024\n\nJust pay a small £2.99 shipping fee to receive your device.',
    date: 'Oct 12',
    isPhishing: true,
    type: 'phishing',
    explanation: 'Phishing/Scam. If it sounds too good to be true, it is. The attacker wants you to enter your credit card details for the "shipping fee" and will steal your card information.'
  },
  {
    id: 'e7',
    sender: 'School Newsletter',
    fromAddress: 'newsletter@schoolname.sch.uk',
    subject: 'Weekly School Newsletter - October',
    body: 'Dear Students and Parents,\n\nPlease find attached this week\'s school newsletter detailing the upcoming science fair, sports day results, and half-term dates.\n\nBest wishes,\nSchool Administration',
    date: 'Oct 11',
    isPhishing: false,
    type: 'safe',
    explanation: 'This is a legitimate email. The sender address matches the school\'s official domain, there is no urgent call to action, and it does not ask for sensitive personal information.'
  },
  {
    id: 'e8',
    sender: 'Sarah Jenkins',
    fromAddress: 'sarah.j.09@gmail.com',
    subject: 'Maths homework help?',
    body: 'Hey! Are you stuck on question 4 of the maths homework? I can\'t figure out how to solve the quadratic equation. Let me know if you want to compare answers later!',
    date: 'Oct 10',
    isPhishing: false,
    type: 'safe',
    explanation: 'This is a safe email from a known contact. It contains normal conversational context and no suspicious links or requests for data.'
  },
  {
    id: 'e9',
    sender: 'Google',
    fromAddress: 'no-reply@accounts.google.com',
    subject: 'Google Password Reset Request',
    body: 'We received a request to reset the password for your Google Account. If you made this request, click the link below to reset your password:\n\nhttps://myaccount.google.com/signin/recovery\n\nIf you did not request a password reset, you can safely ignore this email.',
    date: 'Oct 09',
    isPhishing: false,
    type: 'safe',
    explanation: 'This is a legitimate security email. The domain is officially google.com, it uses a secure HTTPS link, and it explicitly states that you can ignore it if you didn\'t request it (no false urgency).'
  },
  {
    id: 'e10',
    sender: 'School Administration',
    fromAddress: 'admin@schoolname.sch.uk',
    subject: 'Reminder: Geography Field Trip Permission Slips',
    body: 'This is a reminder that permission slips for the Year 10 Geography field trip to the coast are due next Friday. Please ensure your parents have signed the form provided in class.',
    date: 'Oct 08',
    isPhishing: false,
    type: 'safe',
    explanation: 'Legitimate email. Sent from the official school domain, discussing a known school event, and asking for a physical form rather than clicking a suspicious digital link.'
  }
];
