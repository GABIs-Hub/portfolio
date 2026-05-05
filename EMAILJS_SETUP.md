# EmailJS Setup Guide

Your contact form is now ready to send emails! Follow these steps to set it up:

## Step 1: Create an EmailJS Account
1. Go to [emailjs.com](https://www.emailjs.com/)
2. Click "Sign Up Free"
3. Create an account with your email

## Step 2: Add an Email Service
1. In the dashboard, go to "Email Services"
2. Click "Add Service"
3. Select your email provider (Gmail recommended)
4. Connect your email account
5. Copy your **Service ID** (looks like: `service_xxxxx`)

## Step 3: Create an Email Template
1. Go to "Email Templates"
2. Click "Create New Template"
3. Name it (e.g., "Portfolio Contact")
4. Use this template format:

```
From: {{from_email}}
Name: {{from_name}}

Message:
{{message}}
```

5. Save and copy your **Template ID** (looks like: `template_xxxxx`)

## Step 4: Get Your Public Key
1. Go to "Account" settings
2. Copy your **Public Key** (looks like: `xxxxxxxxxxxxxxxxxx`)

## Step 5: Update Your Portfolio
Replace these placeholders in `src/Portfolio.jsx`:

```javascript
// Line ~945 - Initialize EmailJS
emailjs.init("YOUR_PUBLIC_KEY_HERE");

// Line ~820 - In the submit function
emailjs.send(
  "YOUR_SERVICE_ID",      // Replace with your Service ID
  "YOUR_TEMPLATE_ID",     // Replace with your Template ID
  {
    to_email: "YOUR_EMAIL@example.com",  // Your email address
    from_name: form.name,
    from_email: form.email,
    message: form.message,
  }
)
```

## Step 6: Test It!
1. Go to your portfolio
2. Fill in the contact form and send a test message
3. Check your email inbox - you should receive the message!

## Troubleshooting
- If emails don't arrive, check that your email service is properly connected
- Make sure you're using the correct IDs and keys
- Check EmailJS dashboard for any error logs
