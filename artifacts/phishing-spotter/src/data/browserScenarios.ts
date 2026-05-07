export interface BrowserScenario {
  id: string;
  url: string;
  realUrl: string;
  isSecure: boolean;
  isPhishing: boolean;
  content: {
    title: string;
    logo?: string;
    description: string;
    hasForm: boolean;
  };
  certificate: {
    issuedTo: string;
    issuedBy: string;
    valid: boolean;
  };
  explanation: string;
}

export const browserScenarios: BrowserScenario[] = [
  {
    id: 'b1',
    url: 'www.bank.com/login',
    realUrl: 'www.bank-secure-login.xyz/login',
    isSecure: false,
    isPhishing: true,
    content: {
      title: 'Bank Online Banking',
      description: 'Enter your account details to continue.',
      hasForm: true,
    },
    certificate: {
      issuedTo: 'bank-secure-login.xyz',
      issuedBy: 'Unknown CA',
      valid: false,
    },
    explanation: 'This is a pharming attack (DNS poisoning). You typed the correct URL, but were secretly redirected to a fake server. The massive red flag is the lack of a secure padlock (HTTPS) and the certificate being issued to a suspicious domain instead of the bank.'
  },
  {
    id: 'b2',
    url: 'www.paypal.com/signin',
    realUrl: 'www.paypal.com.auth-verify.net/signin',
    isSecure: false,
    isPhishing: true,
    content: {
      title: 'Log in to your PayPal account',
      description: 'Update your payment methods.',
      hasForm: true,
    },
    certificate: {
      issuedTo: 'auth-verify.net',
      issuedBy: 'Self-Signed',
      valid: false,
    },
    explanation: 'Pharming attack! The URL looks like PayPal, but the connection is not secure (no green padlock). Financial institutions always use valid HTTPS certificates. The certificate here is self-signed to a fake domain.'
  },
  {
    id: 'b3',
    url: 'www.amazon.co.uk/login',
    realUrl: '192.168.1.105/login',
    isSecure: false,
    isPhishing: true,
    content: {
      title: 'Amazon Sign-In',
      description: 'Sign in to continue to your orders.',
      hasForm: true,
    },
    certificate: {
      issuedTo: 'None',
      issuedBy: 'None',
      valid: false,
    },
    explanation: 'Pharming attack. The browser is showing the site over an unencrypted HTTP connection. An e-commerce giant like Amazon will never serve their login page without encryption.'
  },
  {
    id: 'b4',
    url: 'www.bbc.co.uk/news',
    realUrl: 'www.bbc.co.uk/news',
    isSecure: true,
    isPhishing: false,
    content: {
      title: 'BBC News',
      description: 'Latest news, breaking stories and features.',
      hasForm: false,
    },
    certificate: {
      issuedTo: 'www.bbc.co.uk',
      issuedBy: 'GlobalSign RSA',
      valid: true,
    },
    explanation: 'This is a legitimate site. The URL is correct, the connection is secure (HTTPS), and the certificate is issued to the correct domain by a trusted Certificate Authority.'
  },
  {
    id: 'b5',
    url: 'www.gov.uk/student-finance',
    realUrl: 'www.gov.uk/student-finance',
    isSecure: true,
    isPhishing: false,
    content: {
      title: 'Student finance - GOV.UK',
      description: 'Student finance: how to apply.',
      hasForm: true,
    },
    certificate: {
      issuedTo: 'www.gov.uk',
      issuedBy: 'DigiCert Inc',
      valid: true,
    },
    explanation: 'This is a legitimate government website. The connection is fully secured with a valid certificate matching the government domain.'
  }
];