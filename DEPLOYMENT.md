# 🚀 Deployment Guide for Riyas Portfolio

This guide will help you deploy the portfolio website to Netlify and manage the GitHub repository.

## 📋 Prerequisites

- GitHub account
- Netlify account (free tier available)
- Node.js 20+ installed locally (for development)

## 🌐 Netlify Deployment

### Option 1: Deploy from GitHub (Recommended)

1. **Connect GitHub Repository to Netlify:**
   - Go to [Netlify](https://netlify.com) and sign in
   - Click "New site from Git"
   - Choose "GitHub" and authorize Netlify
   - Select the `mikey22333/portfolio` repository

2. **Configure Build Settings:**
   - **Base directory:** `frontend`
   - **Build command:** `npm run build`
   - **Publish directory:** `frontend/build`
   - **Node version:** `20` (automatically set via netlify.toml)

3. **Environment Variables (Optional - for contact form):**
   - Go to Site settings → Environment variables
   - Add the following variables:
     ```
     REACT_APP_EMAILJS_SERVICE_ID=your_service_id
     REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id
     REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key
     ```

4. **Deploy:**
   - Click "Deploy site"
   - Netlify will automatically build and deploy your site
   - You'll get a random URL like `https://amazing-name-123456.netlify.app`

### Option 2: Manual Deploy

1. **Build the project locally:**
   ```bash
   cd frontend
   npm install
   npm run build
   ```

2. **Deploy to Netlify:**
   - Go to [Netlify](https://netlify.com)
   - Drag and drop the `frontend/build` folder to the deploy area

## 🔧 EmailJS Setup (Contact Form)

To enable the contact form functionality:

1. **Create EmailJS Account:**
   - Go to [EmailJS](https://www.emailjs.com/)
   - Sign up for a free account

2. **Add Email Service:**
   - Go to Email Services
   - Add your email provider (Gmail recommended)
   - Note the Service ID

3. **Create Email Template:**
   - Go to Email Templates
   - Create a new template with these variables:
     - `{{name}}` - Sender's name
     - `{{email}}` - Sender's email
     - `{{subject}}` - Email subject
     - `{{message}}` - Email message
   - Note the Template ID

4. **Get Public Key:**
   - Go to Account → General
   - Copy your Public Key

5. **Configure Environment Variables:**
   - In Netlify: Site settings → Environment variables
   - Add the three variables mentioned above

## 🔄 Automatic Deployments

With the GitHub integration:
- Every push to the `main` branch triggers a new deployment
- Pull requests create deploy previews
- Build status is shown in GitHub commits

## 🌍 Custom Domain (Optional)

1. **In Netlify:**
   - Go to Site settings → Domain management
   - Click "Add custom domain"
   - Enter your domain name

2. **DNS Configuration:**
   - Point your domain's DNS to Netlify's servers
   - Or use Netlify DNS for easier management

## 📊 Performance Optimization

The site is already optimized with:
- ✅ Code splitting
- ✅ Image optimization
- ✅ Gzip compression
- ✅ Browser caching headers
- ✅ Security headers

## 🔍 Monitoring

- **Netlify Analytics:** Built-in traffic analytics
- **Deploy Logs:** Check build logs for any issues
- **Form Submissions:** Monitor contact form submissions

## 🛠️ Troubleshooting

### Build Fails
- Check Node.js version (should be 20+)
- Verify all dependencies are installed
- Check build logs in Netlify

### Contact Form Not Working
- Verify EmailJS environment variables
- Check EmailJS service status
- Test with browser console open

### Routing Issues
- Ensure `_redirects` file is in `frontend/public/`
- Check netlify.toml redirect rules

## 📱 Testing

Before deploying:
1. Test locally: `npm start`
2. Test build: `npm run build && npx serve -s build`
3. Test on different devices and browsers

## 🔐 Security

The deployment includes:
- HTTPS by default (Netlify)
- Security headers (XSS protection, etc.)
- Environment variable protection
- No sensitive data in client-side code

## 📈 Next Steps

After deployment:
1. Test all functionality
2. Set up custom domain (if desired)
3. Configure EmailJS for contact form
4. Monitor performance and analytics
5. Set up form notifications

---

**Your portfolio is now ready for the world! 🌟**
