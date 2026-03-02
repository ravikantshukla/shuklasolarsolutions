import { SOLAR_CONFIG } from './config.js';

export function initLeadForm() {
  const form = document.getElementById('solarForm');
  const popup = document.getElementById('successPopup');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = {
      full_name: form.fullName.value.trim(),
      mobile: form.mobile.value.trim(),
      city: form.city.value.trim(),
      monthly_bill: form.monthlyBill.value,
      roof_type: form.roofType.value,
      message: form.message.value.trim(),
      source: 'Landing Page'
    };

    if (!/^\d{10}$/.test(formData.mobile)) {
      alert('Please enter a valid 10-digit mobile number.');
      return;
    }

    try {
      const response = await fetch(SOLAR_CONFIG.makeWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Submission failed');
      form.reset();
      popup.classList.add('show');
      setTimeout(() => popup.classList.remove('show'), 3200);
    } catch (error) {
      alert('Unable to submit right now. Please call us directly.');
    }
  });
}
