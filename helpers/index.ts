export function truncateEmail(email: string) {
  let [localPart, domainPart] = email.split('@');

  if (localPart.length > 8) localPart = localPart.substring(0, 8);

  const invalidTrailingChars = ['.', '_', '-', '+'];

  while (
    invalidTrailingChars.includes(localPart.charAt(localPart.length - 1))
  ) {
    localPart = localPart.slice(0, -1);
  }

  return `${localPart}@${domainPart}`;
}

export function formatCurrency(currency: string | number) {
  return `₦${new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(currency) * 1000)}`;
}

export function formatPhoneNumber(phoneNumber: string) {
  return `080${phoneNumber.replace(/\D/g, '')}`.slice(0, 11);
}

export function shortenString(str: string) {
  if (str.length <= 12) return str;

  let shortened = str.slice(0, 12);

  while (shortened.length > 0 && !/[\w\d]$/.test(shortened)) {
    shortened = shortened.slice(0, -1);
  }

  const andRegex = /\b(and)\b$/;
  if (andRegex.test(shortened.trim()))
    shortened = shortened.replace(andRegex, '').trim();

  if (!shortened.length) return str.slice(0, 12).replace(/[^a-zA-Z0-9]+$/, '');

  return shortened;
}
