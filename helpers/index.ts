export function truncateEmail(email: string) {
  let [localPart, domainPart] = email.split('@');

  if (localPart.length > 10) localPart = localPart.substring(0, 10);

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

export default function formatPhoneNumber(phoneNumber: string) {
  return `080${phoneNumber.replace(/\D/g, '')}`.slice(0, 11);
}
